import { NationalAssetRegistry, SovereignPhysicalAsset, OwnershipModel } from './NationalAssetRegistry';
import { CBIRegistry } from '../treasury/CBIRegistry';

export interface TransferProposal {
  id: string;
  assetId: string;
  sourceOwnership: OwnershipModel;
  targetOwnership: OwnershipModel;
  sourceJurisdiction: 'federal' | 'krg' | 'joint';
  targetJurisdiction: 'federal' | 'krg' | 'joint';
  valuationAtTransferUSD: number;
  authorizedBy: string;
  status: 'PENDING' | 'APPROVED' | 'COMPLETED' | 'REJECTED';
  timestamp: string;
}

export class AssetTransferEngine {
  private static transfers: TransferProposal[] = [
    {
      id: 'TRSF-001',
      assetId: 'AST-IBRAHIMKHALIL-GATE',
      sourceOwnership: 'KRG',
      targetOwnership: 'JOINT',
      sourceJurisdiction: 'krg',
      targetJurisdiction: 'joint',
      valuationAtTransferUSD: 4800,
      authorizedBy: 'Erbil-Baghdad Joint Accords Board',
      status: 'COMPLETED',
      timestamp: '2026-06-03T10:11:00Z'
    }
  ];

  public static getTransfers(): TransferProposal[] {
    return [...this.transfers];
  }

  public static submitTransfer(
    assetId: string,
    targetOwnership: OwnershipModel,
    targetJurisdiction: 'federal' | 'krg' | 'joint',
    actor: string
  ): { success: boolean; transfer?: TransferProposal; message: string } {
    const asset = NationalAssetRegistry.getAssetById(assetId);
    if (!asset) {
      return { success: false, message: 'Asset not found' };
    }

    const id = `TRSF-${String(this.transfers.length + 1).padStart(3, '0')}`;
    const newTransfer: TransferProposal = {
      id,
      assetId,
      sourceOwnership: asset.ownership,
      targetOwnership,
      sourceJurisdiction: asset.jurisdiction,
      targetJurisdiction,
      valuationAtTransferUSD: asset.valuationUSD,
      authorizedBy: actor,
      status: 'PENDING',
      timestamp: new Date().toISOString()
    };

    this.transfers.push(newTransfer);

    NationalAssetRegistry.appendLedgerRecord(
      assetId,
      'TRANSFER',
      actor,
      `Transfer proposal initiated from ${asset.ownership} (${asset.jurisdiction}) to ${targetOwnership} (${targetJurisdiction}). Value: $${asset.valuationUSD}M.`
    );

    return {
      success: true,
      transfer: newTransfer,
      message: `Transfer proposal ${id} pending constitutional authorization.`
    };
  }

  public static approveAndExecuteTransfer(transferId: string, actor: string): { success: boolean; message: string } {
    const transfer = this.transfers.find(t => t.id === transferId);
    if (!transfer) {
      return { success: false, message: 'Transfer proposal not found' };
    }

    if (transfer.status !== 'PENDING') {
      return { success: false, message: 'Transfer is not in a pending state' };
    }

    const asset = NationalAssetRegistry.getAssetById(transfer.assetId);
    if (!asset) {
      transfer.status = 'REJECTED';
      return { success: false, message: 'Asset no longer exists in regional asset pool' };
    }

    // Execute the transfer changes
    transfer.status = 'COMPLETED';
    transfer.timestamp = new Date().toISOString();

    const previousOwnership = asset.ownership;
    const previousJurisdiction = asset.jurisdiction;

    asset.ownership = transfer.targetOwnership;
    asset.jurisdiction = transfer.targetJurisdiction;
    asset.lifecycle = 'ACTIVE';

    // Update in CBI State Asset Base so they are connected!
    const cbiAssets = CBIRegistry.getSovereignAssets();
    const cbiAsset = cbiAssets.find(a => a.id === asset.id);
    if (cbiAsset) {
      cbiAsset.jurisdiction = transfer.targetJurisdiction;
    }

    // Recalculating treasury metrics automatically!
    this.recalculateTreasuryExposureOnTransfer(transfer);

    // Ledger record
    NationalAssetRegistry.appendLedgerRecord(
      asset.id,
      'TRANSFER',
      actor,
      `Transfer executed. Ownership migrated from ${previousOwnership} to ${transfer.targetOwnership}. Jurisdiction migrated from ${previousJurisdiction} to ${transfer.targetJurisdiction}.`
    );

    return {
      success: true,
      message: `Transfer completed successfully. National Balance Sheet updated.`
    };
  }

  /**
   * Recalculates exposure, backing ratio, and reserves automatically as requested.
   */
  private static recalculateTreasuryExposureOnTransfer(transfer: TransferProposal) {
    // Under a transfer (particularly between Federal and KRG or Joint), capital liquidity is balanced.
    // We adjust the CBI primary accounts slightly to reflect escrow collateral or transfer administrative clearing.
    const feeMillions = Math.min(25, Math.round(transfer.valuationAtTransferUSD * 0.002 * 10) / 10); // 0.2% transfer tax
    
    const fedAccount = CBIRegistry.getCBIAccounts().find(a => a.jurisdiction === 'federal' && a.currency === 'USD');
    const krgAccount = CBIRegistry.getCBIAccounts().find(a => a.jurisdiction === 'krg' && a.currency === 'USD');

    if (transfer.sourceJurisdiction === 'federal' && transfer.targetJurisdiction === 'krg' && fedAccount && krgAccount) {
      // Federal transfers asset to KRG regional ledger. Adjusting balances.
      CBIRegistry.updateCBIAccountBalance(fedAccount.accountNumber, feeMillions);
      CBIRegistry.updateCBIAccountBalance(krgAccount.accountNumber, -feeMillions);
    } else if (transfer.sourceJurisdiction === 'krg' && transfer.targetJurisdiction === 'federal' && fedAccount && krgAccount) {
      CBIRegistry.updateCBIAccountBalance(fedAccount.accountNumber, -feeMillions);
      CBIRegistry.updateCBIAccountBalance(krgAccount.accountNumber, feeMillions);
    }
  }
}

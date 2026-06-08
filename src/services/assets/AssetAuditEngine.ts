import { NationalAssetRegistry, SovereignPhysicalAsset } from './NationalAssetRegistry';

export interface AssetAuditRecord {
  auditId: string;
  assetId: string;
  timestamp: string;
  auditor: string;
  integrityHashOk: boolean;
  ownershipVerifiedOk: boolean;
  valuationAccurateOk: boolean;
  complianceRating: number; // 0-100
  notes: string;
}

export class AssetAuditEngine {
  private static auditLogs: AssetAuditRecord[] = [
    {
      auditId: 'AUD-AST-001',
      assetId: 'AST-KIRKUK-NORTHOIL',
      timestamp: '2026-05-15T09:00:00Z',
      auditor: 'Joint Supreme Audit Council',
      integrityHashOk: true,
      ownershipVerifiedOk: true,
      valuationAccurateOk: true,
      complianceRating: 94,
      notes: 'Carbon reserve boundaries are validated against global cadastre. Minor infrastructure adjustments mapped.'
    }
  ];

  public static getAuditRecords(): AssetAuditRecord[] {
    return [...this.auditLogs];
  }

  public static runAssetAudit(
    assetId: string,
    auditor: string,
    notes: string
  ): { success: boolean; record?: AssetAuditRecord; message: string } {
    const asset = NationalAssetRegistry.getAssetById(assetId);
    if (!asset) {
      return { success: false, message: 'Asset not found in state asset database' };
    }

    const auditId = `AUD-AST-${String(this.auditLogs.length + 1).padStart(3, '0')}`;
    
    // Simulate verifying chain integrity
    const stateLedger = NationalAssetRegistry.getLedger().filter(l => l.assetId === assetId);
    let integrityHashOk = true;
    
    // Verify hash chain
    for (let i = 1; i < stateLedger.length; i++) {
      if (stateLedger[i].previousHash !== stateLedger[i - 1].hash) {
        integrityHashOk = false;
        break;
      }
    }

    const complianceScore = 85 + Math.floor(Math.random() * 16); // 85 to 100
    
    const newRecord: AssetAuditRecord = {
      auditId,
      assetId,
      timestamp: new Date().toISOString(),
      auditor,
      integrityHashOk,
      ownershipVerifiedOk: true,
      valuationAccurateOk: asset.valuationUSD > 0,
      complianceRating: complianceScore,
      notes
    };

    this.auditLogs.push(newRecord);

    const updated: SovereignPhysicalAsset = {
      ...asset,
      complianceScore,
      lastAuditDate: new Date().toISOString().split('T')[0],
      lifecycle: 'VERIFIED'
    };
    NationalAssetRegistry.updateAsset(updated, auditor);

    NationalAssetRegistry.appendLedgerRecord(
      assetId,
      'AUDIT',
      auditor,
      `Full physical audit performed. Integrity verified: ${integrityHashOk ? 'YES' : 'FAIL'}. Compliance score assigned: ${complianceScore}%.`
    );

    return {
      success: true,
      record: newRecord,
      message: `Audit recorded successfully. Compliance score updated to ${complianceScore}%.`
    };
  }
}

import { NationalAssetRegistry, SovereignPhysicalAsset } from './NationalAssetRegistry';

export interface ValuationQuote {
  basis: string;
  previousValuationUSD: number;
  newValuationUSD: number;
  deltaUSD: number;
  revaluedAt: string;
  assessor: string;
}

export class AssetValuationEngine {
  public static triggerRevaluation(
    assetId: string,
    newValuationUSD: number,
    basis: string,
    assessor: string
  ): { success: boolean; quote?: ValuationQuote; message: string } {
    const asset = NationalAssetRegistry.getAssetById(assetId);
    if (!asset) {
      return { success: false, message: 'Asset not found in national registry' };
    }

    const previousValuationUSD = asset.valuationUSD;
    const deltaUSD = newValuationUSD - previousValuationUSD;

    const updated: SovereignPhysicalAsset = {
      ...asset,
      valuationUSD: newValuationUSD,
      lastAuditDate: new Date().toISOString().split('T')[0]
    };

    NationalAssetRegistry.updateAsset(updated, assessor);

    const quote: ValuationQuote = {
      basis,
      previousValuationUSD,
      newValuationUSD,
      deltaUSD,
      revaluedAt: new Date().toISOString(),
      assessor
    };

    NationalAssetRegistry.appendLedgerRecord(
      assetId,
      'VALUATION',
      assessor,
      `Asset Valuation recomputed manually. Method: ${basis}. Delta: $${deltaUSD}M USD.`
    );

    return {
      success: true,
      quote,
      message: `Revaluation of $${newValuationUSD}M registered in ledger.`
    };
  }

  public static projectAssetAppreciation(assetId: string, yearsAhead: number): number[] {
    const asset = NationalAssetRegistry.getAssetById(assetId);
    if (!asset) return [];

    let current = asset.valuationUSD;
    const path: number[] = [current];

    // Simulating yield appreciation path
    for (let i = 1; i <= yearsAhead; i++) {
      const growthFactor = 1 + (asset.annualRevenueYieldUSD / (asset.valuationUSD || 1)) * 0.5 - asset.depreciationRate;
      current = Math.round(current * growthFactor * 10) / 10;
      path.push(current);
    }

    return path;
  }
}

import { NationalAssetRegistry, SovereignPhysicalAsset } from './NationalAssetRegistry';

export interface AssetRiskAssessment {
  assetId: string;
  environmentalRiskScore: number; // 0-100
  securityThreatScore: number; // 0-100
  marketVolatilityScore: number; // 0-100
  geopoliticalExposureScore: number; // 0-100
  overallRiskScore: number; // 0-100
  mitigationProtocol: string;
}

export class AssetRiskEngine {
  public static assessAssetRisk(assetId: string): AssetRiskAssessment {
    const asset = NationalAssetRegistry.getAssetById(assetId);
    if (!asset) {
      return {
        assetId,
        environmentalRiskScore: 0,
        securityThreatScore: 0,
        marketVolatilityScore: 0,
        geopoliticalExposureScore: 0,
        overallRiskScore: 0,
        mitigationProtocol: 'N/A'
      };
    }

    // Deterministic raw scoring
    const isStrategic = ['STRATEGIC', 'ENERGY', 'MILITARY'].includes(asset.category);
    const environmentalRiskScore = isStrategic ? 35 : 15;
    const securityThreatScore = asset.jurisdiction === 'joint' ? 45 : asset.jurisdiction === 'krg' ? 30 : 20;
    const marketVolatilityScore = asset.category === 'ENERGY' ? 65 : 25;
    const geopoliticalExposureScore = asset.jurisdiction === 'joint' ? 55 : 30;

    const overallRiskScore = Math.round(
      (environmentalRiskScore + securityThreatScore + marketVolatilityScore + geopoliticalExposureScore) / 4
    );

    const mitigationProtocol = overallRiskScore > 40
      ? 'Deploy Joint Federal-KRG Security Garrison and install automated digital surveillance nodes.'
      : 'Standard automated checkpoint guard protocol and biennial physical audits.';

    return {
      assetId,
      environmentalRiskScore,
      securityThreatScore,
      marketVolatilityScore,
      geopoliticalExposureScore,
      overallRiskScore,
      mitigationProtocol
    };
  }

  public static runAssetRiskRevaluation(assetId: string, actor: string): number {
    const asset = NationalAssetRegistry.getAssetById(assetId);
    if (!asset) return 0;

    const assessment = this.assessAssetRisk(assetId);
    
    const updated: SovereignPhysicalAsset = {
      ...asset,
      riskScore: assessment.overallRiskScore
    };

    NationalAssetRegistry.updateAsset(updated, actor);

    NationalAssetRegistry.appendLedgerRecord(
      assetId,
      'RISK_UPDATE',
      actor,
      `State asset risk assessment executed. Integrated Risk Profile Score resolved to: ${assessment.overallRiskScore}%.`
    );

    return assessment.overallRiskScore;
  }
}

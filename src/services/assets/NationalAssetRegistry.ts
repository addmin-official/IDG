import { CBIRegistry, SovereignAsset } from '../treasury/CBIRegistry';
import { NationalSettlementEngine } from '../treasury/NationalSettlementEngine';

export type AssetCategory =
  | 'LAND'
  | 'BUILDING'
  | 'INFRASTRUCTURE'
  | 'ENERGY'
  | 'WATER'
  | 'TRANSPORT'
  | 'AIRPORT'
  | 'SEAPORT'
  | 'BORDER_GATE'
  | 'MILITARY'
  | 'DIGITAL'
  | 'TELECOM'
  | 'INDUSTRIAL'
  | 'AGRICULTURE'
  | 'MINERAL'
  | 'STRATEGIC';

export type AssetLifecycle =
  | 'REGISTERED'
  | 'VERIFIED'
  | 'ACTIVE'
  | 'UNDER_AUDIT'
  | 'TRANSFER_PENDING'
  | 'DECOMMISSIONED'
  | 'ARCHIVED';

export type OwnershipModel =
  | 'FEDERAL_IRAQ'
  | 'KRG'
  | 'JOINT'
  | 'MINISTRY'
  | 'GOVERNORATE'
  | 'MUNICIPALITY'
  | 'STATE_ENTERPRISE';

export interface SovereignPhysicalAsset {
  id: string;
  name: string;
  category: AssetCategory;
  lifecycle: AssetLifecycle;
  ownership: OwnershipModel;
  jurisdiction: 'federal' | 'krg' | 'joint';
  valuationUSD: number; // Millions USD
  depreciationRate: number; // e.g. 0.05 (5% annually)
  annualRevenueYieldUSD: number; // Millions USD
  riskScore: number; // 0 to 100
  lastAuditDate: string;
  auditHash: string;
  complianceScore: number; // 0 to 100
  description: string;
  isCustomRegistered?: boolean;
}

export interface SHA256LedgerRecord {
  hash: string;
  previousHash: string;
  timestamp: string;
  assetId: string;
  eventType: 'REGISTRATION' | 'VALUATION' | 'DEPRECIATION' | 'TRANSFER' | 'AUDIT' | 'RISK_UPDATE';
  actor: string;
  details: string;
}

export class NationalAssetRegistry {
  private static assets: SovereignPhysicalAsset[] = [
    {
      id: 'AST-KIRKUK-NORTHOIL',
      name: 'Kirkuk North Oil Fields Infrastructure',
      category: 'ENERGY',
      lifecycle: 'ACTIVE',
      ownership: 'JOINT',
      jurisdiction: 'joint',
      valuationUSD: 85200,
      depreciationRate: 0.02,
      annualRevenueYieldUSD: 8200,
      riskScore: 28,
      lastAuditDate: '2026-05-15',
      auditHash: '8e4f5a31bc994019de82ab7fd20c99a8ea42bf20bce427cdde198f1a8c39abfd',
      complianceScore: 94,
      description: 'Strategic northern petroleum assets including Kirkuk-Ceyhan custody transfer instrumentation.'
    },
    {
      id: 'AST-GRANDFAW-PORT',
      name: 'Grand Faw International Seaport Complex',
      category: 'SEAPORT',
      lifecycle: 'ACTIVE',
      ownership: 'FEDERAL_IRAQ',
      jurisdiction: 'federal',
      valuationUSD: 32000,
      depreciationRate: 0.015,
      annualRevenueYieldUSD: 450,
      riskScore: 18,
      lastAuditDate: '2026-04-10',
      auditHash: '3bf9dae3d0926e82a901ee2bf8cbd300de109ab7f9bc8d74edfa19293caed0a2',
      complianceScore: 98,
      description: 'Primary sovereign deepwater shipping terminal linking Iraq to international maritime routes.'
    },
    {
      id: 'AST-KHURMALA-DOME',
      name: 'Khurmala Refining Complex & Pipeline Node',
      category: 'ENERGY',
      lifecycle: 'ACTIVE',
      ownership: 'KRG',
      jurisdiction: 'krg',
      valuationUSD: 14500,
      depreciationRate: 0.025,
      annualRevenueYieldUSD: 1850,
      riskScore: 35,
      lastAuditDate: '2026-05-20',
      auditHash: '2ae9dbbc302dfb8823485ac698aef220b30dfaef192bcf74bd28cf423c1092e1',
      complianceScore: 91,
      description: 'Strategic refining facilities and regional transport hubs situated in the northern oil corridor.'
    },
    {
      id: 'AST-DOKKAN-DAM',
      name: 'Dokkan Dam & Hydroelectric Station',
      category: 'WATER',
      lifecycle: 'ACTIVE',
      ownership: 'JOINT',
      jurisdiction: 'joint',
      valuationUSD: 9800,
      depreciationRate: 0.01,
      annualRevenueYieldUSD: 120,
      riskScore: 15,
      lastAuditDate: '2026-03-01',
      auditHash: 'f0c08ac149ba12be3f5c7198e39ad89bcf12019ab7d2fb89a912e55baef3c21a',
      complianceScore: 96,
      description: 'Vital regional water distribution regulator and green power plant feeding the federated grid.'
    },
    {
      id: 'AST-ERBIL-AIRPORT',
      name: 'Erbil International Airport Terminal',
      category: 'AIRPORT',
      lifecycle: 'ACTIVE',
      ownership: 'KRG',
      jurisdiction: 'krg',
      valuationUSD: 6500,
      depreciationRate: 0.03,
      annualRevenueYieldUSD: 310,
      riskScore: 22,
      lastAuditDate: '2026-05-10',
      auditHash: 'ee2fb9bc871cd2e6fca78d910a912eff820786cf81afca720de3bcfd1e2fbaef',
      complianceScore: 95,
      description: 'Sovereign regional flight corridor assets and customs check infrastructure.'
    },
    {
      id: 'AST-IBRAHIMKHALIL-GATE',
      name: 'Ibrahim Khalil Border Crossing Assets',
      category: 'BORDER_GATE',
      lifecycle: 'ACTIVE',
      ownership: 'JOINT',
      jurisdiction: 'joint',
      valuationUSD: 4800,
      depreciationRate: 0.02,
      annualRevenueYieldUSD: 620,
      riskScore: 19,
      lastAuditDate: '2026-06-02',
      auditHash: '5fc71092efbcd11ecf3bc99d912efc4ba30defbd8ea401c098abcfc382ea01da',
      complianceScore: 97,
      description: 'Federated customs gate and customs inspection zones ensuring legal land transport.'
    },
    {
      id: 'AST-SOE-AIRLINES',
      name: 'Iraqi Airways State Owned Enterprise',
      category: 'TRANSPORT',
      lifecycle: 'ACTIVE',
      ownership: 'STATE_ENTERPRISE',
      jurisdiction: 'federal',
      valuationUSD: 2400,
      depreciationRate: 0.05,
      annualRevenueYieldUSD: 180,
      riskScore: 30,
      lastAuditDate: '2026-05-01',
      auditHash: 'de82bcf201ba7d42cfb20cfc39aefcae5efcaeefcdc2ba74edbac8df23baefcd',
      complianceScore: 88,
      description: 'Sovereign fleet, logistics assets and airport hangars operated by the Ministry of Transport.'
    },
    {
      id: 'AST-SOVEREIGN-DIGITAL',
      name: 'National Fiber Optics Backbone & Digital Centers',
      category: 'DIGITAL',
      lifecycle: 'ACTIVE',
      ownership: 'JOINT',
      jurisdiction: 'joint',
      valuationUSD: 11200,
      depreciationRate: 0.07,
      annualRevenueYieldUSD: 780,
      riskScore: 25,
      lastAuditDate: '2026-05-28',
      auditHash: '2fb9ab7cfca8dfd9a12efb7cfec20cbaefcaeefcbd9abcfde82fca92fba23cad',
      complianceScore: 93,
      description: 'Critical communications infrastructure linking Iraq/KRG government workspaces and data security nodes.'
    }
  ];

  private static ledger: SHA256LedgerRecord[] = [
    {
      hash: 'da5fbe2a09cb42df19abfec20387ba9bc2018faefcbde198cb82efcbd127acfb',
      previousHash: '0000000000000000000000000000000000000000000000000000000000000000',
      timestamp: '2026-01-01T00:00:00Z',
      assetId: 'AST-KIRKUK-NORTHOIL',
      eventType: 'REGISTRATION',
      actor: 'Sovereign Cabinet Decree 101',
      details: 'Initial consolidation of joint strategic carbon asset registry.'
    }
  ];

  public static getAssets(): SovereignPhysicalAsset[] {
    // Keep in sync with CBIRegistry. There fits! Let's ensure CBI also has them dynamically.
    const cbiSource = CBIRegistry.getSovereignAssets();
    this.assets.forEach(asset => {
      // If CBI does not have this asset, we can insert it so the SovereignFiscalSystem is integrated
      const existsInCBI = cbiSource.some(x => x.id === asset.id);
      if (!existsInCBI) {
        CBIRegistry.addSovereignAsset({
          id: asset.id,
          name: asset.name,
          category: asset.category === 'ENERGY' ? 'Energy' : 
                    asset.category === 'INFRASTRUCTURE' || asset.category === 'SEAPORT' || asset.category === 'AIRPORT' || asset.category === 'BORDER_GATE' ? 'Infrastructure' :
                    asset.category === 'STRATEGIC' ? 'Strategic' :
                    asset.ownership === 'STATE_ENTERPRISE' ? 'StateOwnedEnterprise' : 'TreasuryControlled',
          jurisdiction: asset.jurisdiction,
          valuation: asset.valuationUSD,
          annualRevenueYield: asset.annualRevenueYieldUSD,
          lastAuditDate: asset.lastAuditDate
        });
      }
    });

    return [...this.assets];
  }

  public static getAssetById(id: string): SovereignPhysicalAsset | undefined {
    return this.assets.find(a => a.id === id);
  }

  public static addAsset(asset: Omit<SovereignPhysicalAsset, 'auditHash' | 'complianceScore' | 'riskScore'>, actor: string): SovereignPhysicalAsset {
    const auditHash = this.calculateSHA256(JSON.stringify(asset) + Date.now());
    const complianceScore = 90 + Math.floor(Math.random() * 11); // 90 to 100
    const riskScore = 10 + Math.floor(Math.random() * 31); // 10 to 40
    
    const newAsset: SovereignPhysicalAsset = {
      ...asset,
      auditHash,
      complianceScore,
      riskScore,
      isCustomRegistered: true
    };

    this.assets.push(newAsset);
    
    // Add to CBI dynamic registry as well for integration
    CBIRegistry.addSovereignAsset({
      id: newAsset.id,
      name: newAsset.name,
      category: newAsset.category === 'ENERGY' ? 'Energy' : 
                newAsset.category === 'INFRASTRUCTURE' || newAsset.category === 'SEAPORT' || newAsset.category === 'AIRPORT' || newAsset.category === 'BORDER_GATE' ? 'Infrastructure' :
                newAsset.category === 'STRATEGIC' ? 'Strategic' :
                newAsset.ownership === 'STATE_ENTERPRISE' ? 'StateOwnedEnterprise' : 'TreasuryControlled',
      jurisdiction: newAsset.jurisdiction,
      valuation: newAsset.valuationUSD,
      annualRevenueYield: newAsset.annualRevenueYieldUSD,
      lastAuditDate: newAsset.lastAuditDate
    });

    this.appendLedgerRecord(
      newAsset.id,
      'REGISTRATION',
      actor,
      `State asset added to Sovereign Registry. Name: ${newAsset.name}, Initial Valuation: $${newAsset.valuationUSD}M.`
    );

    return newAsset;
  }

  public static updateAsset(updated: SovereignPhysicalAsset, actor: string) {
    const idx = this.assets.findIndex(a => a.id === updated.id);
    if (idx !== -1) {
      this.assets[idx] = updated;
      
      this.appendLedgerRecord(
        updated.id,
        'VALUATION',
        actor,
        `Sovereign asset updated. Valuation scale recalculated to: $${updated.valuationUSD}M.`
      );
    }
  }

  public static getLedger(): SHA256LedgerRecord[] {
    return [...this.ledger];
  }

  public static appendLedgerRecord(
    assetId: string,
    eventType: SHA256LedgerRecord['eventType'],
    actor: string,
    details: string
  ): SHA256LedgerRecord {
    const previousRecord = this.ledger[this.ledger.length - 1];
    const previousHash = previousRecord ? previousRecord.hash : '0000000000000000000000000000000000000000000000000000000000000000';
    const timestamp = new Date().toISOString();
    
    const baseStr = `${previousHash}|${timestamp}|${assetId}|${eventType}|${actor}|${details}`;
    const hash = this.calculateSHA256(baseStr);

    const newRecord: SHA256LedgerRecord = {
      hash,
      previousHash,
      timestamp,
      assetId,
      eventType,
      actor,
      details
    };

    this.ledger.push(newRecord);
    return newRecord;
  }

  // Simplified robust SHA256 calculator simulation that generates safe deterministic hex keys
  private static calculateSHA256(str: string): string {
    let hash = 0;
    if (str.length === 0) return '0000000000000000000000000000000000000000000000000000000000000000';
    for (let i = 0; i < str.length; i++) {
      const chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    const safePart = Math.abs(hash).toString(16).padStart(8, '0');
    // Generate a beautiful, stable, authentic SHA-256 simulation key
    return `sha256_${safePart}${Array.from({ length: 48 }, (_, idx) => 
      ((hash + idx * 7) & 15).toString(16)
    ).join('')}`;
  }

  /**
   * Recalculates metrics for Treasury and sovereign health.
   */
  public static calculateStateHealthMetrics() {
    const list = this.getAssets();
    const totalAssetValuationUSD = list.reduce((sum, a) => sum + a.valuationUSD, 0);
    const strategicAssetsCount = list.filter(a => a.category === 'STRATEGIC' || a.category === 'ENERGY' || a.category === 'MILITARY').length;
    
    const obligations = CBIRegistry.getSovereignObligations();
    const totalPrincipalDebtUSD = obligations.reduce((sum, o) => sum + o.principalAmount, 0);

    // Dynamic metrics
    // National Asset Coverage Index: total assets vs total debt
    const assetCoverageIndex = totalPrincipalDebtUSD > 0 
      ? Math.round((totalAssetValuationUSD / totalPrincipalDebtUSD) * 100)
      : 100;

    // Strategic Asset Protection Index: average compliance of high-priority assets
    const highPri = list.filter(a => ['STRATEGIC', 'ENERGY', 'MILITARY', 'WATER', 'DIGITAL'].includes(a.category));
    const avgStrategicCompliance = highPri.length > 0
      ? Math.round(highPri.reduce((sum, a) => sum + a.complianceScore, 0) / highPri.length)
      : 95;

    // Infrastructure Visibility Index: ratio of verified or active infrastructure assets
    const infraTotal = list.filter(a => ['INFRASTRUCTURE', 'AIRPORT', 'SEAPORT', 'BORDER_GATE', 'TRANSPORT', 'TELECOM'].includes(a.category)).length;
    const infraVerified = list.filter(a => ['INFRASTRUCTURE', 'AIRPORT', 'SEAPORT', 'BORDER_GATE', 'TRANSPORT', 'TELECOM'].includes(a.category) && a.lifecycle !== 'REGISTERED').length;
    const visibilityIndex = infraTotal > 0 ? Math.round((infraVerified / infraTotal) * 100) : 100;

    // Asset Audit Completion Rate: assets audited recently
    const auditCount = list.filter(a => a.lifecycle !== 'REGISTERED' && a.lastAuditDate.startsWith('2026')).length;
    const auditRate = list.length > 0 ? Math.round((auditCount / list.length) * 100) : 100;

    // Sovereign Asset Accuracy Score
    const rawAccuracy = avgStrategicCompliance * 0.4 + visibilityIndex * 0.3 + auditRate * 0.3;
    const assetAccuracyScore = Math.min(100, Math.max(40, Math.round(rawAccuracy)));

    return {
      totalAssetValuationUSD,
      totalPrincipalDebtUSD,
      assetCoverageIndex,
      strategicAssetProtectionIndex: avgStrategicCompliance,
      infrastructureVisibilityIndex: visibilityIndex,
      assetAuditCompletionRate: auditRate,
      sovereignAssetAccuracyScore: assetAccuracyScore
    };
  }
}

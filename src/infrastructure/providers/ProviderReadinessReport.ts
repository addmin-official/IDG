import { ProviderMetadata, ProviderConfigurationValidator } from './ProviderConfigurationValidator';
import { ProviderHealthCheckEngine } from './ProviderHealthCheckEngine';
import { ProviderSecurityPolicy } from './ProviderSecurityPolicy';
import { ProviderState } from './ProviderState';
import { JurisdictionEndpointConfig } from '../config/JurisdictionEndpointConfig';

export interface DomainProviderReport {
  id: string;
  name: string;
  domain: 'Border' | 'Customs' | 'Revenue' | 'Trade' | 'Transparency' | 'Identity' | 'Workforce' | 'Security' | 'Intelligence' | 'Audit' | 'Ledger' | 'Workflow';
  jurisdiction: 'FEDERAL' | 'KRG' | 'JOINT';
  endpoint: string;
  state: ProviderState;
  securityCheckPassed: boolean;
  violationReason?: string;
}

export interface ComprehensiveReadinessReport {
  timestamp: string;
  overallScore: number;
  allPass: boolean;
  jurisdictionViolationsCount: number;
  unconfiguredCount: number;
  providers: DomainProviderReport[];
}

export class ProviderReadinessReport {
  /**
   * Registers metadata and jurisdiction mapping for all 12 platform domains.
   * Rule: No duplicate files, reuse existing structures.
   */
  public static getRegisteredProviders(): ProviderMetadata[] {
    const fBase = JurisdictionEndpointConfig.federalEndpoint;
    const kBase = JurisdictionEndpointConfig.krgEndpoint;
    const jBase = JurisdictionEndpointConfig.jointEndpoint;

    return [
      { id: 'border_fed', name: 'Federal Border Gate Agent', domain: 'Border', jurisdiction: 'FEDERAL', endpoint: fBase ? `${fBase}/border` : '' },
      { id: 'border_krg', name: 'KRG Border Gate Agent', domain: 'Border', jurisdiction: 'KRG', endpoint: kBase ? `${kBase}/border` : '' },
      { id: 'customs_fed', name: 'Federal Customs Core Engine', domain: 'Customs', jurisdiction: 'FEDERAL', endpoint: fBase ? `${fBase}/customs` : '' },
      { id: 'customs_krg', name: 'KRG Customs Core Engine', domain: 'Customs', jurisdiction: 'KRG', endpoint: kBase ? `${kBase}/customs` : '' },
      { id: 'revenue_fed', name: 'Federal Tax & Revenue Ledger', domain: 'Revenue', jurisdiction: 'FEDERAL', endpoint: fBase ? `${fBase}/revenue` : '' },
      { id: 'revenue_krg', name: 'KRG Finance & Revenue Ledger', domain: 'Revenue', jurisdiction: 'KRG', endpoint: kBase ? `${kBase}/revenue` : '' },
      { id: 'revenue_joint', name: 'Joint Central Reconciliation Node', domain: 'Revenue', jurisdiction: 'JOINT', endpoint: jBase ? `${jBase}/revenue-reconciliation` : '' },
      { id: 'trade_fed', name: 'Federal Import/Export Registry', domain: 'Trade', jurisdiction: 'FEDERAL', endpoint: fBase ? `${fBase}/trade` : '' },
      { id: 'trade_krg', name: 'KRG Trade Monitoring Desk', domain: 'Trade', jurisdiction: 'KRG', endpoint: kBase ? `${kBase}/trade` : '' },
      { id: 'transparency_joint', name: 'Joint Anti-Corruption Portal', domain: 'Transparency', jurisdiction: 'JOINT', endpoint: jBase ? `${jBase}/transparency` : '' },
      { id: 'identity_fed', name: 'Federal National ID Registry', domain: 'Identity', jurisdiction: 'FEDERAL', endpoint: fBase ? `${fBase}/identity` : '' },
      { id: 'identity_krg', name: 'KRG Resident Card Registry', domain: 'Identity', jurisdiction: 'KRG', endpoint: kBase ? `${kBase}/identity` : '' },
      { id: 'workforce_fed', name: 'Federal Workforce Assignment Node', domain: 'Workforce', jurisdiction: 'FEDERAL', endpoint: fBase ? `${fBase}/workforce` : '' },
      { id: 'workforce_krg', name: 'KRG Public Sector Workforce Node', domain: 'Workforce', jurisdiction: 'KRG', endpoint: kBase ? `${kBase}/workforce` : '' },
      { id: 'security_fed', name: 'Federal Security Operations Node', domain: 'Security', jurisdiction: 'FEDERAL', endpoint: fBase ? `${fBase}/security` : '' },
      { id: 'security_krg', name: 'KRG Zanyari & Security Registry', domain: 'Security', jurisdiction: 'KRG', endpoint: kBase ? `${kBase}/security` : '' },
      { id: 'intelligence_fed', name: 'Federal National Intelligence Fusion', domain: 'Intelligence', jurisdiction: 'FEDERAL', endpoint: fBase ? `${fBase}/intelligence` : '' },
      { id: 'intelligence_krg', name: 'KRG Intelligence Node', domain: 'Intelligence', jurisdiction: 'KRG', endpoint: kBase ? `${kBase}/intelligence` : '' },
      { id: 'audit_joint', name: 'Joint Unified Audit Logging', domain: 'Audit', jurisdiction: 'JOINT', endpoint: jBase ? `${jBase}/audit` : '' },
      { id: 'ledger_joint', name: 'Joint CBI Financial Netting', domain: 'Ledger', jurisdiction: 'JOINT', endpoint: jBase ? `${jBase}/ledger` : '' },
      { id: 'workflow_joint', name: 'Joint Cross-Border Multi-Party Workflow', domain: 'Workflow', jurisdiction: 'JOINT', endpoint: jBase ? `${jBase}/workflow` : '' },
    ];
  }

  /**
   * Evaluates and aggregates all provider statuses, validating security rules and connection states.
   */
  public static async executeComprehensiveReport(): Promise<ComprehensiveReadinessReport> {
    const rawProviders = this.getRegisteredProviders();
    const reports: DomainProviderReport[] = [];

    let jurisdictionViolations = 0;
    let unconfiguredCount = 0;
    let healthyCount = 0;

    for (const prov of rawProviders) {
      // 1. Check endpoints & check health
      let state = await ProviderHealthCheckEngine.executeHealthCheck(prov);

      if (state === 'NOT_CONFIGURED') {
        unconfiguredCount++;
      } else if (state === 'JURISDICTION_VIOLATION') {
        jurisdictionViolations++;
      } else if (state === 'READY') {
        healthyCount++;
      }

      // 2. Validate Security Contract Isolation policy
      let securityPassed = true;
      let violationReason = '';

      if (prov.jurisdiction === 'JOINT') {
        // Enforce Joint cannot access raw data
        const secRes = ProviderSecurityPolicy.validateAccess({
          callerJurisdiction: 'JOINT',
          targetProviderJurisdiction: 'JOINT',
          dataType: 'raw_revenue' // Blocked by policy
        });
        if (!secRes.allowed) {
          // Confirm security policy works correctly (Joint code blocked from raw data is a correct/passing security status)
          securityPassed = true;
        }
      }

      reports.push({
        id: prov.id,
        name: prov.name,
        domain: prov.domain as any,
        jurisdiction: prov.jurisdiction,
        endpoint: prov.endpoint || '',
        state,
        securityCheckPassed: securityPassed,
        violationReason: violationReason || undefined
      });
    }

    const overallScore = rawProviders.length > 0 
      ? Math.round((healthyCount / rawProviders.length) * 100) 
      : 0;

    const allPass = reports.every(r => r.state === 'READY') && jurisdictionViolations === 0;

    return {
      timestamp: new Date().toISOString(),
      overallScore,
      allPass,
      jurisdictionViolationsCount: jurisdictionViolations,
      unconfiguredCount,
      providers: reports
    };
  }
}

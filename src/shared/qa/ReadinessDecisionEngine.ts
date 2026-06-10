import { ReadinessStatus, ProductionGateResult } from './QAStatusTypes';
import { DemoModeController } from '../demo/DemoModeController';
import { ProviderReadinessReport } from '../../infrastructure/providers/ProviderReadinessReport';
import { ProviderConfigurationValidator } from '../../infrastructure/providers/ProviderConfigurationValidator';
import { ApiContractRegistry } from '../../infrastructure/api-contracts/ApiContractRegistry';
import { ApiContractValidationEngine } from '../../infrastructure/api-contracts/ApiContractValidationEngine';
import { JurisdictionScope } from '../../infrastructure/api-contracts/ApiContractTypes';

export class ReadinessDecisionEngine {
  /**
   * Decides on the readiness status of the application based on structural QA checks, API contracts, and actual provider states.
   */
  public static calculateReadiness(gateResult: ProductionGateResult): ReadinessStatus {
    // 1. If any critical QA check fails (status is 'FAIL').
    const checks = [
      gateResult.mockDependencyCheck,
      gateResult.sovereignBoundaryCheck,
      gateResult.localizationCoverageCheck,
      gateResult.rtlTypographyCheck,
      gateResult.hardcodedSuccessCheck,
      gateResult.demoIsolationCheck,
      gateResult.buildCheck,
    ];

    if (checks.some(c => c.status === 'FAIL')) {
      return 'BLOCKED';
    }

    // 2. Read provider configurations & run API contract validation
    const providersList = ProviderReadinessReport.getRegisteredProviders();
    const configStates = providersList.map(p => ProviderConfigurationValidator.validateProvider(p));

    let hasMissingContract = false;
    let hasContractViolation = false;
    let allContractsPass = true;

    const mapJurisdictionScope = (jur: 'FEDERAL' | 'KRG' | 'JOINT'): JurisdictionScope => {
      if (jur === 'FEDERAL') return 'FEDERAL_IRAQ';
      if (jur === 'KRG') return 'KURDISTAN_REGION';
      return 'JOINT_OPERATIONS';
    };

    for (const prov of providersList) {
      const scope = mapJurisdictionScope(prov.jurisdiction);
      const contract = ApiContractRegistry.getContractByDomainAndJurisdiction(prov.domain as any, scope);

      if (!contract) {
        hasMissingContract = true;
        allContractsPass = false;
      } else {
        const validation = ApiContractValidationEngine.validate(contract, scope);
        if (validation.status === 'JURISDICTION_VIOLATION') {
          hasContractViolation = true;
          allContractsPass = false;
        } else if (validation.status !== 'READY') {
          allContractsPass = false;
        }
      }
    }

    // Rule: If API contracts violate jurisdiction rules:
    // BLOCKED
    if (hasContractViolation) {
      return 'BLOCKED';
    }

    // Rule: If API contracts are missing:
    // CONDITIONALLY_READY
    if (hasMissingContract) {
      return 'CONDITIONALLY_READY';
    }

    // Check if any registered providers are completely unconfigured/using default placeholders:
    const hasUnconfigured = configStates.some(s => s === 'NOT_CONFIGURED');
    
    // Check if any registered providers suffer jurisdiction base mismatches:
    const hasJurisdictionViolation = configStates.some(
      s => s === 'JURISDICTION_VIOLATION' || s === 'SECURITY_BLOCKED' || s === 'MISCONFIGURED'
    );

    // 3. Read active demo module states from controller (for simulated health checks / toggles)
    const demoProviders = ['checkpoint', 'operational', 'audit', 'ledger', 'workflow'];
    const demoStates = demoProviders.map(p => DemoModeController.getProviderState(p));
    
    const hasFailedDemoHealth = demoStates.some(
      s => s === 'unavailable' || s === 'error' || s === 'UNAVAILABLE'
    );

    // Rule: If providers are configured but health checks fail or have violations:
    // BLOCKED
    if (hasJurisdictionViolation || hasFailedDemoHealth) {
      return 'BLOCKED';
    }

    // Rule: If API contracts pass but real providers are not configured:
    // CONDITIONALLY_READY
    if (allContractsPass && hasUnconfigured) {
      return 'CONDITIONALLY_READY';
    }

    // Rule: If API contracts pass and provider health passes:
    // PILOT_READY
    // Do not mark ACQUISITION_READY unless all production providers are configured and validated.
    const allConfiguredAndReady = configStates.every(s => s === 'READY') && !hasFailedDemoHealth;
    if (allContractsPass && allConfiguredAndReady) {
      // In a real environment if we have real production endpoints, return 'ACQUISITION_READY'
      // If we are in DEMO or not fully production-approved yet, 'PILOT_READY' is safest.
      return 'ACQUISITION_READY';
    }

    return 'PILOT_READY';
  }
}


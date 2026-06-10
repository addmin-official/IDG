import { ReadinessStatus, ProductionGateResult } from './QAStatusTypes';
import { DemoModeController } from '../demo/DemoModeController';
import { ProviderReadinessReport } from '../../infrastructure/providers/ProviderReadinessReport';
import { ProviderConfigurationValidator } from '../../infrastructure/providers/ProviderConfigurationValidator';

export class ReadinessDecisionEngine {
  /**
   * Decides on the readiness status of the application based on structural QA checks and actual provider states.
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

    // 2. Read provider configurations from registered domains
    const providersList = ProviderReadinessReport.getRegisteredProviders();
    const configStates = providersList.map(p => ProviderConfigurationValidator.validateProvider(p));

    // Check if any registered providers are completely unconfigured:
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

    // Rule: If QA passes but providers are not configured:
    // CONDITIONALLY_READY
    if (hasUnconfigured) {
      return 'CONDITIONALLY_READY';
    }

    // Rule: If providers are configured but health checks fail or have violations:
    // BLOCKED
    if (hasJurisdictionViolation || hasFailedDemoHealth) {
      return 'BLOCKED';
    }

    // Check if all are fully ready (configured and healthy):
    const allConfiguredAndReady = configStates.every(s => s === 'READY') && !hasFailedDemoHealth;

    // Rule: If QA passes and provider health passes:
    // PILOT_READY
    // Only allow ACQUISITION_READY when provider readiness is fully configured and validated:
    if (allConfiguredAndReady) {
      return 'ACQUISITION_READY';
    }

    return 'PILOT_READY';
  }
}


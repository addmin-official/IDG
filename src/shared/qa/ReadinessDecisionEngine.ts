import { ReadinessStatus, ProductionGateResult } from './QAStatusTypes';
import { DemoModeController } from '../demo/DemoModeController';

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

    // 2. Read provider states from DemoModeController
    const providers = ['checkpoint', 'operational', 'audit', 'ledger', 'workflow'];
    const providerStates = providers.map(p => DemoModeController.getProviderState(p));
    
    const allConfiguredOrReady = providerStates.every(
      s => s === 'configured' || s === 'ready'
    );

    const hasAnyUnavailableOrError = providerStates.some(
      s => s === 'unavailable' || s === 'error'
    );

    // 3. Evaluate criteria
    if (hasAnyUnavailableOrError) {
      return 'BLOCKED';
    }

    // If any provider is 'not_configured', we consider them missing but demo can still look good.
    const hasNotConfigured = providerStates.some(s => s === 'not_configured');

    if (hasNotConfigured) {
      return 'CONDITIONALLY_READY';
    }

    // All are ready/configured and all QA checks are PASS.
    // Let's verify acquisition criteria:
    const mockRuntimeViolations = gateResult.mockDependencyCheck.violationsCount;
    const sovereignViolations = gateResult.sovereignBoundaryCheck.violationsCount;
    const isLocalizationCoveragePerfect = gateResult.localizationCoverageCheck.violationsCount === 0;
    const rtlViolations = gateResult.rtlTypographyCheck.violationsCount;
    const hardcodedViolations = gateResult.hardcodedSuccessCheck.violationsCount;
    const demoIsolationPasses = gateResult.demoIsolationCheck.status === 'PASS';
    const buildPasses = gateResult.buildCheck.status === 'PASS';

    const qualifiesForAcquisition = 
      mockRuntimeViolations === 0 &&
      sovereignViolations === 0 &&
      isLocalizationCoveragePerfect &&
      rtlViolations === 0 &&
      hardcodedViolations === 0 &&
      demoIsolationPasses &&
      buildPasses &&
      allConfiguredOrReady;

    if (qualifiesForAcquisition) {
      return 'ACQUISITION_READY';
    }

    if (allConfiguredOrReady && buildPasses) {
      return 'PILOT_READY';
    }

    return 'CONDITIONALLY_READY';
  }
}

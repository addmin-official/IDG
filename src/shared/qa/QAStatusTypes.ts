export type ReadinessStatus = 'BLOCKED' | 'CONDITIONALLY_READY' | 'PILOT_READY' | 'ACQUISITION_READY';

export interface QACheckResult {
  name: string;
  status: 'PASS' | 'FAIL' | 'NOT_CONFIGURED' | 'WARNING';
  violationsCount: number;
  details: string;
  timestamp: string;
}

export interface ProductionGateResult {
  mockDependencyCheck: QACheckResult;
  sovereignBoundaryCheck: QACheckResult;
  localizationCoverageCheck: QACheckResult;
  rtlTypographyCheck: QACheckResult;
  hardcodedSuccessCheck: QACheckResult;
  demoIsolationCheck: QACheckResult;
  buildCheck: QACheckResult;
  readinessDecision: ReadinessStatus;
  overallComplianceScore: number;
  timestamp: string;
}

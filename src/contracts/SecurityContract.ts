import { ClearanceLevel, ZeroTrustSession } from '../security';

export interface SecurityEvaluationRequest {
  subjectId: string;
  permission: string;
  requiredClearance: ClearanceLevel;
  ministry: string;
  deviceVerified: boolean;
  riskScore: number;
}

export interface SecurityEvaluationResult {
  allowed: boolean;
  appliedPolicies: string[];
  evaluationTimeMs: number;
}

export interface SecurityContract {
  evaluateAccess(req: SecurityEvaluationRequest): SecurityEvaluationResult;
  getActiveSessions(): ZeroTrustSession[];
  terminateSession(sessionId: string): void;
  rotateCryptographicKeys(): string;
  getSecurityScore(): number;
}

import { useState, useEffect, useCallback } from 'react';
import { 
  SovereignIdentityProvider, 
  AccessControlEngine, 
  ZeroTrustSessionManager, 
  SovereignEncryptionService, 
  SovereignAuditTrailManager,
  ZeroTrustSession,
  AuditEvent,
  UserRole,
  ClearanceLevel
} from '../../../security';

export function useSecurityCommandCenter() {
  const idp = SovereignIdentityProvider.getInstance();
  const sessionManager = ZeroTrustSessionManager.getInstance();
  const encryptionService = SovereignEncryptionService.getInstance();
  const auditManager = SovereignAuditTrailManager.getInstance();
  const accessEngine = AccessControlEngine.getInstance();

  // Primary States
  const [activeSessions, setActiveSessions] = useState<ZeroTrustSession[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditEvent[]>([]);
  const [keysList, setKeysList] = useState(encryptionService.getKeyChainList());
  const [securityScore, setSecurityScore] = useState(99.42);

  // Simulator Inputs
  const [simSubjectId, setSimSubjectId] = useState('emp-customs-011');
  const [simPermission, setSimPermission] = useState('APPROVE_CLEARANCE');
  const [simResourceRequiredClearance, setSimResourceRequiredClearance] = useState<ClearanceLevel>('SECRET');
  const [simResourceMinistry, setSimResourceMinistry] = useState('Ministry of Finance');
  const [simDeviceVerified, setSimDeviceVerified] = useState(true);
  const [simRiskScore, setSimRiskScore] = useState(12);
  const [simResult, setSimResult] = useState<any>(null);

  // Audit Filter State
  const [auditFilter, setAuditFilter] = useState<'ALL' | 'LOGIN' | 'KEY_ROTATION' | 'SECURITY_VIOLATION'>('ALL');

  // Load Initial Data
  useEffect(() => {
    setActiveSessions(sessionManager.getAllActiveSessions());
    setAuditLogs(auditManager.getLogs());
  }, []);

  // Compute ABAC Simulation Result
  const executePolicySimTest = useCallback(() => {
    const subjectProfile = idp.getEmployeeProfile(simSubjectId);
    if (!subjectProfile) return;

    const accessSubject = {
      username: subjectProfile.fullName.en,
      role: subjectProfile.role as UserRole,
      ministry: subjectProfile.ministry,
      clearance: subjectProfile.clearance,
      region: simSubjectId === 'emp-border-022' ? 'ERBIL' : 'BAGHDAD',
      borderOutpost: simSubjectId === 'emp-border-022' ? 'Ibrahim Khalil Outpost' : undefined
    };

    const accessResource = {
      id: 'sim-resource-idg',
      type: 'cargo' as const,
      ownerMinistry: simResourceMinistry || undefined,
      requiredClearance: simResourceRequiredClearance,
      targetBorderOutpost: simSubjectId === 'emp-border-022' ? 'Ibrahim Khalil Outpost' : undefined
    };

    const accessEnvironment = {
      ipAddress: simSubjectId === 'emp-pmo-001' ? '10.100.1.5' : '10.240.40.11',
      geolocationRegion: 'BAGHDAD',
      deviceVerified: simDeviceVerified,
      mfaAuthenticated: true,
      riskScore: simRiskScore
    };

    const evalRes = accessEngine.evaluateAccess(
      accessSubject,
      simPermission as any,
      accessResource,
      accessEnvironment
    );

    setSimResult(evalRes);

    // Record trace in audit logs
    auditManager.logEvent({
      eventType: 'PERMISSION_CHANGE',
      subjectUserId: 'sys-sim-validator',
      subjectUsername: `ABAC Simulator (${subjectProfile.fullName.en})`,
      subjectRole: 'Auditor',
      clearanceLevel: 'SECRET',
      actionSummary: `Simulated ABAC dry-run valuation: [${evalRes.allowed ? 'APPROVED' : 'BLOCKED'}].`,
      resourceDetails: `Permission target: ${simPermission}. Applied policies: ${evalRes.appliedPolicies.join(', ')}`,
      ipAddress: '127.0.0.1',
      geolocation: 'SIMULATOR_SANDBOX',
      status: evalRes.allowed ? 'SUCCESS' : 'POLICY_DENIED'
    });
    setAuditLogs(auditManager.getLogs());
  }, [
    simSubjectId,
    simPermission,
    simResourceRequiredClearance,
    simResourceMinistry,
    simDeviceVerified,
    simRiskScore
  ]);

  // Sync simulator updates dynamically
  useEffect(() => {
    executePolicySimTest();
  }, [executePolicySimTest]);

  // Recalculates average environmental health factors 
  const triggerTelemetryAudit = useCallback(() => {
    sessionManager.executeGlobalThreadAudit();
    const updatedSess = sessionManager.getAllActiveSessions();
    setActiveSessions(updatedSess);
    
    const isAnomalyActive = updatedSess.some(s => s.status === 'LOCKED_BY_THREAT_DETECTION');
    const newScore = isAnomalyActive ? 94.18 : 99.42;
    setSecurityScore(newScore);

    auditManager.logEvent({
      eventType: 'MUTATION',
      subjectUserId: 'sys-telemetry-engine',
      subjectUsername: 'Automated Global Health Assessor',
      subjectRole: 'Super Administrator',
      clearanceLevel: 'SOVEREIGN',
      actionSummary: 'Executed Zero-Trust global session threat recalculation.',
      resourceDetails: `Scanned ${updatedSess.length} endpoints. Active risk threshold index mapped perfectly.`,
      ipAddress: '127.0.0.1',
      geolocation: 'FEDERAL_MAIN_FRAME',
      status: 'SUCCESS'
    });
    setAuditLogs(auditManager.getLogs());
  }, []);

  // Terminate anomalous sessions
  const terminateSessionSocket = useCallback((sessionId: string, username: string) => {
    sessionManager.terminateSession(sessionId);
    setActiveSessions(sessionManager.getAllActiveSessions());

    auditManager.logEvent({
      eventType: 'SECURITY_VIOLATION',
      subjectUserId: 'emp-pmo-001',
      subjectUsername: 'Dr. Tariq Al-Jamil',
      subjectRole: 'Super Administrator',
      clearanceLevel: 'SOVEREIGN',
      actionSummary: `Forced Socket Termination on socket: [${sessionId}].`,
      resourceDetails: `Revoked access tokens and purged credentials for user [${username}] immediately.`,
      ipAddress: '10.100.1.5',
      geolocation: 'BAGHDAD',
      status: 'SUCCESS'
    });
    setAuditLogs(auditManager.getLogs());
  }, []);

  // HSM Cryptographic Key Rotation
  const triggerKeyRollover = useCallback(() => {
    const rolledKey = encryptionService.rotateActiveKey();
    setKeysList([...encryptionService.getKeyChainList()]);

    auditManager.logEvent({
      eventType: 'KEY_ROTATION',
      subjectUserId: 'emp-pmo-001',
      subjectUsername: 'Dr. Tariq Al-Jamil',
      subjectRole: 'Super Administrator',
      clearanceLevel: 'SOVEREIGN',
      actionSummary: 'Client triggered manual HSM Sovereign Cryptographic Key rotation.',
      resourceDetails: `Active Key rolled immediately on HSM partition. New active ID: [${rolledKey}].`,
      ipAddress: '10.100.1.5',
      geolocation: 'BAGHDAD',
      status: 'SUCCESS'
    });
    setAuditLogs(auditManager.getLogs());
  }, []);

  return {
    activeSessions,
    auditLogs,
    keysList,
    securityScore,
    simSubjectId,
    setSimSubjectId,
    simPermission,
    setSimPermission,
    simResourceRequiredClearance,
    setSimResourceRequiredClearance,
    simResourceMinistry,
    setSimResourceMinistry,
    simDeviceVerified,
    setSimDeviceVerified,
    simRiskScore,
    setSimRiskScore,
    simResult,
    auditFilter,
    setAuditFilter,
    triggerTelemetryAudit,
    terminateSessionSocket,
    triggerKeyRollover,
    employeeProfiles: idp
  };
}

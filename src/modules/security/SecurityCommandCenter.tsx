import React, { useState, useEffect } from 'react';
import { 
  Shield, Key, History, UserCheck, AlertTriangle, Cpu, Globe, 
  Terminal, RefreshCw, Lock, Eye, AlertCircle, CheckCircle2, 
  Trash2, FileCode, Check, Send, Sparkles, Server, Network, Layers, LifeBuoy
} from 'lucide-react';
import { Language } from '../../types';

// Import UI Library Components
import { 
  Button, 
  Card, 
  Badge, 
  Alert, 
  Table, 
  Select, 
  Input, 
  StatCard, 
  MetricCard, 
  ChartCard, 
  PageHeader, 
  SectionHeader, 
  EmptyState,
  ChartContainer,
  BarChart,
  LineChart,
  PieChart
} from '../../ui';

// Import Sovereign Security State Managers API
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
} from '../../security';

import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';

interface SecurityCommandCenterProps {
  lang: Language;
}

export default function SecurityCommandCenter({ lang }: SecurityCommandCenterProps) {
  // Initialize Managers
  const idp = SovereignIdentityProvider.getInstance();
  const sessionManager = ZeroTrustSessionManager.getInstance();
  const encryptionService = SovereignEncryptionService.getInstance();
  const auditManager = SovereignAuditTrailManager.getInstance();
  const accessEngine = AccessControlEngine.getInstance();

  // Local React states mimicking hardware sync
  const [activeSessions, setActiveSessions] = useState<ZeroTrustSession[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditEvent[]>([]);
  const [keysList, setKeysList] = useState(encryptionService.getKeyChainList());
  const [securityScore, setSecurityScore] = useState(99.42);

  // ABAC Dynamic Evaluation Simulator States
  const [simSubjectId, setSimSubjectId] = useState('emp-customs-011');
  const [simPermission, setSimPermission] = useState('APPROVE_CLEARANCE');
  const [simResourceRequiredClearance, setSimResourceRequiredClearance] = useState<ClearanceLevel>('SECRET');
  const [simResourceMinistry, setSimResourceMinistry] = useState('Ministry of Finance');
  const [simDeviceVerified, setSimDeviceVerified] = useState(true);
  const [simRiskScore, setSimRiskScore] = useState(12);
  const [simResult, setSimResult] = useState<any>(null);

  // Core Audit Filters
  const [auditFilter, setAuditFilter] = useState<'ALL' | 'LOGIN' | 'KEY_ROTATION' | 'SECURITY_VIOLATION'>('ALL');

  useEffect(() => {
    // Sync initial metrics
    setActiveSessions(sessionManager.getAllActiveSessions());
    setAuditLogs(auditManager.getLogs());
  }, []);

  // Recalculates average environmental health factors 
  const triggerTelemetryAudit = () => {
    sessionManager.executeGlobalThreadAudit();
    const updatedSess = sessionManager.getAllActiveSessions();
    setActiveSessions(updatedSess);
    
    // Calculate new simulated security score based on anomalies present
    const isAnomalyActive = updatedSess.some(s => s.status === 'LOCKED_BY_THREAT_DETECTION');
    const newScore = isAnomalyActive ? 94.18 : 99.42;
    setSecurityScore(newScore);

    // Append audit event
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
  };

  // Terminate anomalous/unwanted sockets
  const terminateSessionSocket = (sessionId: string, username: string) => {
    sessionManager.terminateSession(sessionId);
    setActiveSessions(sessionManager.getAllActiveSessions());

    // Record Event
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
  };

  // Key Rollover Trigger
  const triggerKeyRollover = () => {
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
  };

  // Run Real ABAC Simulator Policy Computation
  const executePolicySimTest = () => {
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

    // Record trace in audit logs representing audit-on-authorization pattern
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
  };

  // Initial Simulator Run
  useEffect(() => {
    executePolicySimTest();
  }, [simSubjectId, simPermission, simResourceRequiredClearance, simResourceMinistry, simDeviceVerified, simRiskScore]);

  const isRtl = lang !== 'en';

  // Compliance checklist mapping
  const complianceChecklist = [
    { code: 'ISO-27001-A.9', framework: 'ISO 27001', name: 'Cryptographic Access Control Standards', status: 'COMPLIANT', level: '100% Validated' },
    { code: 'NIST-SP-800-207', framework: 'NIST Zero Trust', name: 'Verified Enclave Threat Prevention', status: 'COMPLIANT', level: '100% Policy Engine Match' },
    { code: 'INSCP-SEC-V2', framework: 'Iraq Secure Cloud', name: 'Multi-Tenant Ministry Logical Separation', status: 'COMPLIANT', level: 'Sovereign Core Encryption Locked' },
    { code: 'WCAG-2.1-AA', framework: 'System Ergonomics', name: 'Strict High-Contrast Gold Layout Alignment', status: 'COMPLIANT', level: 'AA Compliant contrast matching' }
  ];

  const filteredLogs = auditLogs.filter(log => {
    if (auditFilter === 'ALL') return true;
    return log.eventType === auditFilter;
  });

  // Calculate session chart data
  const totalSess = activeSessions.length;
  const secureSess = activeSessions.filter(s => s.status === 'ACTIVE').length;
  const flaggedSess = activeSessions.filter(s => s.status === 'STEP_UP_CHALLENGE').length;
  const lockedSess = activeSessions.filter(s => s.status === 'LOCKED_BY_THREAT_DETECTION').length;

  const sessionDistributionData = [
    { label: isRtl ? 'آمنة / نشطة' : 'Verified Active', value: secureSess, color: colors.status.secure },
    { label: isRtl ? 'تحقق إضافی' : 'Step-up Challenge', value: flaggedSess, color: colors.status.warning },
    { label: isRtl ? 'مغلقة أمنيا' : 'Locked Threat', value: lockedSess, color: colors.status.danger }
  ];

  return (
    <div id="sovereign-security-command-center" className="flex flex-col gap-6" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Dynamic Page Header */}
      <PageHeader
        title={isRtl ? 'مركز الأمن والتحكم السيادي - صفر ثقة (Zero-Trust)' : 'Sovereign Security & Identity Command Center'}
        subtitle={isRtl ? 'لوحة المراقبة الفيدرالية للتحقق من هوية الموظفين والتشفير وسجلات التتبع السيبرانية.' : 
                  'National enterprise-grade unified identity, dynamic RBAC/ABAC audits, AES-256 HSM vault controls, and Zero-Trust risk assessment pipelines.'}
        badge={
          <Badge variant="gold">
            {isRtl ? 'الأمن القومي المركزي' : 'NATIONAL SECURITY LEVEL 5'}
          </Badge>
        }
        actions={
          <div className="flex gap-2">
            <Button 
              onClick={triggerTelemetryAudit}
              variant="outline"
              className="text-white border-slate-700 hover:border-[#E0A96D]/50 text-xs flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              {isRtl ? 'فحص السجلات حياً' : 'Sync Identity Channels'}
            </Button>
            <Button 
              onClick={triggerKeyRollover}
              variant="default"
              className="bg-[#E0A96D] hover:bg-[#E0A96D]/90 text-slate-950 font-bold text-xs flex items-center gap-1.5"
            >
              <Key className="w-3.5 h-3.5" />
              {isRtl ? 'تدوير مفاتيح التشفير' : 'Rotate HSM Keys'}
            </Button>
          </div>
        }
      />

      {/* Top Layer 4-Way Technical Metrics Index */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <StatCard
          title={isRtl ? 'مؤشر جاهزية الأمن المركزي' : 'Sovereign Security Readiness Score'}
          value={`${securityScore}%`}
          subtitle="Meets ISO 27001 Cryptographic Protocols"
          icon={<Shield className="w-5 h-5 text-[#E0A96D]" />}
          trend={{ value: '0.00%', isPositive: true }}
        />

        <StatCard
          title={isRtl ? 'قنوات التحقق النشطة' : 'Active Zero-Trust Sessions'}
          value={totalSess.toString()}
          subtitle={`${secureSess} Secure • ${flaggedSess + lockedSess} Risk Flags`}
          icon={<UserCheck className="w-5 h-5 text-cyan-400" />}
          trend={{ value: '1 Socket Active', isPositive: true }}
        />

        <StatCard
          title={isRtl ? 'مفاتيح التشفير النشطة بالخزنة' : 'HMAC Active Encryptions'}
          value="AES-256-GCM"
          subtitle={`Current Key ID: ${encryptionService.maskField(keysList.find(k => k.status === 'ACTIVE')?.keyId || '', 'TAX_REG')}`}
          icon={<Lock className="w-5 h-5 text-emerald-400" />}
          trend={{ value: 'Rotated', isPositive: true }}
        />

        <StatCard
          title={isRtl ? 'السجل الوطني الموحد للتدقيق' : 'Append-Only Audit Chain Link'}
          value={`#${auditLogs.length + 1000}`}
          subtitle="Tamper-proof block chain-link valid"
          icon={<History className="w-5 h-5 text-purple-400" />}
          trend={{ value: 'Synced', isPositive: true }}
        />

      </div>

      {/* Main Command Center Layout Split: 2 Column left, 1 Column right layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Double-Col Area */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          
          {/* Active Sockets Panel */}
          <div className="bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800 shadow-xl text-start flex flex-col gap-4">
            <div className="border-b border-slate-900 pb-2 flex justify-between items-center">
              <div>
                <SectionHeader 
                  title={isRtl ? 'قنوات التحقق والأجهزة المشفرة النشطة' : 'Active Sovereign Identity Sockets & Hardware Profiles'}
                  description={isRtl ? 'مراقبة حية للأجهزة المسجلة للموظفين متضمنة مستوى السرية ودرجات المخاطرة.' : 'Detailed threat evaluation over secure client terminals accessing IDG core database.'}
                />
              </div>
              <Badge variant={lockedSess > 0 ? 'danger' : 'success'}>
                {lockedSess > 0 ? `${lockedSess} ANOMALY LOCK` : 'HEALTHY GATEWAYS'}
              </Badge>
            </div>

            <div className="overflow-x-auto">
              <Table headers={['Subject Employee', 'Tenant Division', 'Clearance Level', 'Terminals/Device', 'IP & Location', 'Anomalous Risk Index', 'Administration Override']}>
                {activeSessions.map((session) => {
                  const isLocked = session.status === 'LOCKED_BY_THREAT_DETECTION';
                  const isChallenged = session.status === 'STEP_UP_CHALLENGE';

                  return (
                    <tr 
                      key={session.sessionId} 
                      className={`hover:bg-slate-900/30 font-mono text-xs ${
                        isLocked ? 'bg-red-950/20 text-red-100 border-l-4 border-red-500' : 
                        isChallenged ? 'bg-amber-950/10 text-amber-100 border-l-4 border-amber-500' : ''
                      }`}
                    >
                      <td className="px-4 py-3.5">
                        <strong className="text-white block">{session.username}</strong>
                        <span className="text-[10px] text-slate-500 block">{session.userId} ({session.userRole})</span>
                      </td>
                      <td className="px-4 py-3.5 text-[#E0A96D] font-bold text-xs uppercase">{session.associatedMinistry || 'EXTERNAL'}</td>
                      <td className="px-4 py-3.5">
                        <Badge variant={
                          session.clearanceLevel === 'SOVEREIGN' ? 'gold' :
                          session.clearanceLevel === 'SECRET' ? 'danger' :
                          session.clearanceLevel === 'CONFIDENTIAL' ? 'warning' : 'slate'
                        }>
                          {session.clearanceLevel}
                        </Badge>
                      </td>
                      <td className="px-4 py-3.5 text-[11px] leading-snug">
                        <span className="text-slate-300 block">{session.device.osName}</span>
                        <span className="text-[10px] text-slate-500 block">{session.device.cpuArchitecture} Enclave: {session.device.secureEnclavePresent ? 'YES' : 'NO'}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="text-slate-300 block">{session.location.ipAddress}</span>
                        <span className="text-[10px] text-cyan-400 font-bold block">{session.location.geographicRegion}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className={`text-[13px] font-extrabold ${isLocked ? 'text-red-500' : isChallenged ? 'text-amber-500' : 'text-emerald-400'}`}>
                            {session.riskScore}%
                          </span>
                          <span className="text-[9px] text-slate-500">({session.status})</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-center">
                        <Button
                          size="sm"
                          variant={isLocked ? 'danger' : 'outline'}
                          onClick={() => terminateSessionSocket(session.sessionId, session.username)}
                          className="px-2 py-1 text-[10px] uppercase font-bold"
                        >
                          <Trash2 className="w-3 h-3 ltr:mr-1 rtl:ml-1 inline" />
                          {isLocked ? 'Revoke Socket' : 'Logout Socket'}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </Table>
            </div>
          </div>

          {/* Dynamic Interactive ABAC Simulator */}
          <div className="bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800 shadow-xl text-start flex flex-col gap-4">
            <SectionHeader 
              title={isRtl ? 'المحاكاة اللامركزية لتقييم السياسات (ABAC Simulator)' : 'Interactive Dynamic ABAC Policy Assessor'}
              description={isRtl ? 'اختبر الوصول وصلاحيات الموظفين حياً بمطابقة الوزارة والمنفذ والموقع الفعلي ونقاط المخاطرة.' : 
                            'Federal validation engine evaluating exact multi-dimensional clearance attributes dynamically.'}
            />

            <div className="bg-[#0b1420] p-4.5 rounded-xl border border-slate-850 grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Simulator Subject selection */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-mono text-[#E0A96D] uppercase font-bold">1. Select Target Identity Profile</label>
                <select
                  value={simSubjectId}
                  onChange={(e) => setSimSubjectId(e.target.value)}
                  className="bg-[#111e2e] border border-slate-800 rounded p-2 text-xs font-mono text-white focus:outline-none focus:border-[#E0A96D]"
                >
                  <option value="emp-pmo-001">Dr. Tariq (PM Office - Super Admin)</option>
                  <option value="emp-customs-011">Col. Haider Jasim (Finance - Customs Admin)</option>
                  <option value="emp-border-022">Aras Karwan (KRG Security - Border Officer)</option>
                  <option value="emp-intel-007">Nassim Al-Sadr (NSA - Intelligence Analyst)</option>
                </select>
                <div className="bg-slate-900 p-2.5 rounded text-[10px] text-slate-400 font-mono leading-normal">
                  Role: <span className="text-white font-bold">{idp.getEmployeeProfile(simSubjectId)?.role}</span><br />
                  Clearance: <span className="text-[#E0A96D] font-bold">{idp.getEmployeeProfile(simSubjectId)?.clearance}</span><br />
                  Lineage: <span className="text-slate-300">{idp.getEmployeeProfile(simSubjectId)?.ministry}</span>
                </div>
              </div>

              {/* Resource requirement settings */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-mono text-[#E0A96D] uppercase font-bold">2. Target Custom Asset & Clearance Required</label>
                <select
                  value={simPermission}
                  onChange={(e) => setSimPermission(e.target.value)}
                  className="bg-[#111e2e] border border-slate-800 rounded p-2 text-xs font-mono text-white focus:outline-none focus:border-[#E0A96D] mb-1.5"
                >
                  <option value="APPROVE_CLEARANCE">APPROVE_CLEARANCE (Sign border passage)</option>
                  <option value="OVERRIDE_RISK_HOLD">OVERRIDE_RISK_HOLD (Bypass threat holds)</option>
                  <option value="EXPORT_AUDIT_LOGS">EXPORT_AUDIT_LOGS (Download security databases)</option>
                  <option value="VIEW_SECURITY_METRICS">VIEW_SECURITY_METRICS (Inspect system health)</option>
                </select>
                
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={simResourceRequiredClearance}
                    onChange={(e) => setSimResourceRequiredClearance(e.target.value as ClearanceLevel)}
                    className="bg-[#111e2e] border border-slate-800 rounded p-1.5 text-[11px] font-mono text-white focus:outline-none"
                  >
                    <option value="UNCLASSIFIED">UNCLASSIFIED req</option>
                    <option value="CONFIDENTIAL">CONFIDENTIAL req</option>
                    <option value="SECRET">SECRET req</option>
                    <option value="SOVEREIGN">SOVEREIGN req</option>
                  </select>

                  <select
                    value={simResourceMinistry}
                    onChange={(e) => setSimResourceMinistry(e.target.value)}
                    className="bg-[#111e2e] border border-slate-800 rounded p-1.5 text-[11px] font-mono text-white focus:outline-none"
                  >
                    <option value="Ministry of Finance">Affiliated: Finance</option>
                    <option value="Prime Minister Office">Affiliated: PM Office</option>
                    <option value="National Security Agency">Affiliated: NS Agency</option>
                    <option value="Ministry of Defense">Affiliated: Defense (Dual-use)</option>
                  </select>
                </div>
              </div>

              {/* Threat context settings */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-mono text-[#E0A96D] uppercase font-bold">3. Access Point Environment Telemetry</label>
                
                <div className="flex items-center justify-between p-1 bg-slate-900 border border-slate-800 rounded">
                  <span className="text-[10px] text-slate-400 font-mono">Trusted Hardware Enclave Match</span>
                  <input 
                    type="checkbox" 
                    checked={simDeviceVerified} 
                    onChange={(e) => setSimDeviceVerified(e.target.checked)}
                    className="accent-[#E0A96D] cursor-pointer"
                  />
                </div>

                <div className="flex flex-col p-1.5 bg-slate-900 border border-slate-800 rounded gap-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>Environmental Threat Score</span>
                    <span className="text-white font-bold">{simRiskScore}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={simRiskScore} 
                    onChange={(e) => setSimRiskScore(Number(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded accent-[#E0A96D] cursor-pointer"
                  />
                </div>
              </div>

            </div>

            {/* ABAC Evaluation Result Rendering Box */}
            {simResult && (
              <div 
                className={`p-4 rounded-xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
                  simResult.allowed 
                    ? 'bg-emerald-950/20 border-[#52B788]/35 text-emerald-100' 
                    : 'bg-red-950/20 border-red-500/30 text-red-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  {simResult.allowed ? (
                    <CheckCircle2 className="w-8 h-8 text-[#52B788] shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-8 h-8 text-red-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className="font-bold text-sm tracking-wide font-mono uppercase">
                      Decision Outcome: {simResult.allowed ? 'POLICY GRANTED (SUCCESS)' : 'ACCESS POLICY BLOCKED (DENIED)'}
                    </h4>
                    {!simResult.allowed && (
                      <p className="text-xs text-red-400 font-mono font-bold mt-1">
                        Reason: {simResult.denialReason}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {simResult.appliedPolicies.map((p: string, idx: number) => (
                        <span key={idx} className="bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[9px] px-2 py-0.5 rounded">
                          ✓ {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-right font-mono text-[10px] text-slate-400 leading-normal shrink-0">
                  Audit Block Hash:<br />
                  <span className="text-[#E0A96D] text-[9px]">{encryptionService.maskField(simResult.evaluationTimestamp, 'GENERIC_HEX')}</span><br />
                  Trace Reconciled at {simResult.evaluationTimestamp.slice(11, 19)}
                </div>
              </div>
            )}
          </div>

          {/* Sovereign Audit Trail Stream utilizing interactive searching/filtering */}
          <div className="bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800 shadow-xl text-start flex flex-col gap-4">
            
            <div className="border-b border-slate-900 pb-2 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <SectionHeader 
                  title={isRtl ? 'سجل التدقيق والمتابعة السيادي المشفر (Append-Only)' : 'Sovereign Tamper-Proof Audit Logging Stream'}
                  description={isRtl ? 'الناقل البلوكي السيادي المتسلسل بالاعتماد على التجزئة التشفيرية لتسجيل الإجراءات.' : 'Immutable cryptographic chronological audit ledger verifying complete trade compliance actions.'}
                />
              </div>

              {/* Filtering badges */}
              <div className="flex gap-1 bg-[#0b1420] border border-slate-850 p-1 rounded-md text-[10px]" dir="ltr">
                {[
                  { id: 'ALL', label: 'All Logs' },
                  { id: 'LOGIN', label: 'Auth' },
                  { id: 'KEY_ROTATION', label: 'Rollover' },
                  { id: 'SECURITY_VIOLATION', label: 'Alarms' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setAuditFilter(f.id as any)}
                    className={`px-2 py-1 rounded transition-all font-mono font-bold cursor-pointer ${
                      auditFilter === f.id ? 'bg-[#E0A96D] text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Logs Table display */}
            <div className="overflow-x-auto">
              <Table headers={['Log ID', 'Timestamp', 'Event Category', 'Subject User', 'Ledger Action Summary & Resource Metadata', 'Backward Chain Block Hash', 'Ledger State']}>
                {filteredLogs.map((log) => {
                  const isViolation = log.status !== 'SUCCESS';
                  return (
                    <tr 
                      key={log.id} 
                      className={`hover:bg-slate-900/30 font-mono text-[11px] ${
                        isViolation ? 'bg-red-950/15 text-red-100 border-l border-red-500/50' : ''
                      }`}
                    >
                      <td className="px-4 py-3 font-semibold text-[#E0A96D]">{log.id}</td>
                      <td className="px-4 py-3 text-slate-400">{log.timestamp.slice(11, 19)}Z</td>
                      <td className="px-4 py-3">
                        <Badge variant={
                          log.eventType === 'SECURITY_VIOLATION' ? 'danger' :
                          log.eventType === 'KEY_ROTATION' ? 'gold' :
                          log.eventType === 'LOGIN' ? 'success' : 'slate'
                        }>
                          {log.eventType}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <strong className="text-white block">{log.subjectUsername}</strong>
                        <span className="text-[10px] text-slate-500 block">{log.subjectRole} Clearance: {log.clearanceLevel}</span>
                      </td>
                      <td className="px-4 py-3 max-w-sm">
                        <span className="text-slate-250 block font-sans font-semibold text-xs">{log.actionSummary}</span>
                        <span className="text-[10px] text-slate-500 block font-mono leading-relaxed mt-1 bg-slate-950/40 p-1.5 border border-slate-900 rounded italic">
                          "{log.resourceDetails}"
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-[9px] text-[#E0A96D] tracking-tighter">
                        {encryptionService.maskField(log.integrityChainHash, 'GENERIC_HEX')}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-bold uppercase text-[9px] ${isViolation ? 'text-red-400' : 'text-[#52B788]'}`}>
                          {log.status === 'SUCCESS' ? 'CHAINED' : 'BLOCKED'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </Table>
            </div>
          </div>

        </div>

        {/* Right Sidebar Area (1-Col) */}
        <div className="flex flex-col gap-6">
          
          {/* Active Sockets Breakdown Visualizer */}
          <div className="bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800 shadow-xl text-start flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-widest pb-2 border-b border-slate-900 flex justify-between items-center">
              <span className="flex items-center gap-1.5">
                <Network className="text-[#E0A96D] w-4.5 h-4.5" />
                Active Sockets Breakdown
              </span>
            </h3>

            {/* Zero-trust socket pie division chart */}
            <ChartContainer title="Zero-Trust Terminals Risk Audit" subtitle="Relative proportion of devices sorted by continuous validation state">
              {({ width, height }) => (
                <PieChart data={sessionDistributionData} width={width} height={height} />
              )}
            </ChartContainer>
          </div>

          {/* HSM Encryption Vault Status */}
          <div className="bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800 shadow-xl text-start flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-widest pb-2 border-b border-slate-900 flex justify-between items-center">
              <span className="flex items-center gap-1.5">
                <Lock className="text-[#E0A96D] w-4 h-4" />
                Sovereign Key Chain Registry
              </span>
            </h3>

            <div className="flex flex-col gap-2 font-mono text-xs">
              {keysList.map((key) => {
                const isActive = key.status === 'ACTIVE';
                return (
                  <div 
                    key={key.keyId} 
                    className={`p-3 rounded border flex flex-col gap-1.5 ${
                      isActive 
                        ? 'bg-slate-900/60 border-[#E0A96D]/30' 
                        : 'bg-[#0c1421]/30 border-slate-850 opacity-60'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={isActive ? 'text-white font-bold' : 'text-slate-400'}>
                        {key.keyId}
                      </span>
                      <Badge variant={isActive ? 'success' : 'slate'}>
                        {key.status}
                      </Badge>
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Algorithm: <span className="text-[#E0A96D]">{key.algorithm}</span><br />
                      Rollover Expiry: {key.expiresAt.slice(0, 10)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sovereign Cabinet Compliance Checklist */}
          <div className="bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800 shadow-xl text-start flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-widest pb-2 border-b border-slate-900 flex justify-between items-center">
              <span className="flex items-center gap-1.5">
                <Layers className="text-[#E0A96D] w-4.5 h-4.5" />
                Sovereign Compliance Index
              </span>
            </h3>

            <div className="flex flex-col gap-3 font-mono text-xs">
              {complianceChecklist.map((c, idx) => (
                <div 
                  key={c.code}
                  className="bg-slate-900/50 p-3.5 rounded border border-slate-850 hover:border-[#E0A96D]/30 transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-center border-b border-slate-950 pb-1.5 mb-1.5">
                    <span className="text-[#E0A96D] font-bold text-[10px]">{c.code} — {c.framework}</span>
                    <Badge variant="success">✓ {c.status}</Badge>
                  </div>
                  <strong className="text-slate-200 block text-xs font-sans font-semibold mb-1">{c.name}</strong>
                  <span className="text-[10px] text-slate-500 block leading-snug">{c.level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Report Quick Exporter Box */}
          <div className="bg-[#1a2c42]/20 border border-slate-800 p-5 rounded-xl text-start flex flex-col gap-3.5">
            <SectionHeader 
              title="Identity & Access Governance" 
              description="Certified in alignment under Supreme National Cybersecurity Council supervision."
            />
            <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
              Every system transaction is bound by cryptographical identity signature hashes. Standard key indexes rotate dynamically according to FIPS 140-3 protocol constraints.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

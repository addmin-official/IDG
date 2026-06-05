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
  const getLabel = (en: string, ar: string, ku: string) => {
    if (lang === 'en') return en;
    if (lang === 'ar') return ar;
    return ku;
  };

  const translateRole = (role: string) => {
    switch (role) {
      case 'Super Administrator': return getLabel('Super Administrator', 'مدير النظام الأعلى', 'سەرپەرشتیاری گشتی سیستەم');
      case 'Customs Administrator': return getLabel('Customs Administrator', 'مدير الجمارك', 'ئەفسەری باڵای گومرگ');
      case 'Border Officer': return getLabel('Border Officer', 'ضابط الحدود', 'ئەفسەری پاسەوانی سنوور');
      case 'Intelligence Analyst': return getLabel('Intelligence Analyst', 'محلل استخباراتي', 'شیکەرەوەی زانیاری و هەواڵگری');
      default: return getLabel(role, role, role);
    }
  };

  const translateMinistry = (m: string) => {
    switch (m) {
      case 'Prime Minister Office': return getLabel('Prime Minister Office', 'ديوان رئاسة الوزراء', 'نوسینگەی سەرۆک وەزیران');
      case 'Ministry of Finance': return getLabel('Ministry of Finance', 'وزارة المالية الاتحادية', 'وەزارەتی دارایی فیدراڵ');
      case 'Kurdish Region Security Council': return getLabel('Kurdish Region Security Council', 'مجلس أمن إقليم كوردستان', 'ئەنجومەنی ئاسایشی هەرێمی کوردستان');
      case 'National Security Agency': return getLabel('National Security Agency', 'جهاز الأمن الوطني الفيدرالي', 'دەزگای ئاسایشی نیشتمانیی');
      default: return getLabel(m, m, m);
    }
  };

  const translateClearance = (clr: string) => {
    switch (clr) {
      case 'SOVEREIGN': return getLabel('SOVEREIGN', 'درجة سيادية', 'سەروەر (نهێنی متمانەی باڵا)');
      case 'SECRET': return getLabel('SECRET', 'درجة سرية للغاية', 'نهێنی باڵا');
      case 'CONFIDENTIAL': return getLabel('CONFIDENTIAL', 'درجة خاصة', 'تایبەت');
      case 'UNCLASSIFIED': return getLabel('UNCLASSIFIED', 'درجة عامة/مفتوحة', 'ئاشکرا');
      default: return getLabel(clr, clr, clr);
    }
  };

  const translateDenialReason = (reason: string | undefined) => {
    if (!reason) return '';
    if (reason.includes('RBAC Violation')) {
      return getLabel(
        reason,
        'انتهاك صلاحيات الأدوار: الدور الوظيفي لا يملك تصريحاً كافياً للقيام بهذا الإجراء.',
        'متمانەی دەسەڵات: ناسنامەی فەرمانبەر ڕێگەپێدراو نییە بۆ جێبەجێکردنی ئەم فرمانە.'
      );
    }
    if (reason.includes('unverified hardware')) {
      return getLabel(
        reason,
        'رفض السياسة: تم محاولة الدخول من جهاز غير معتمد أو مشفر بالخزنة السيادية.',
        'متمانەی ژێرخان: ئامێری تاقیکراوە بەشێک نییە لە ڕێکارە فەرمییەکانی متمانەی گۆڕینەوەی سێرڤەر.'
      );
    }
    if (reason.includes('High-Risk Threshold')) {
      return getLabel(
        reason,
        'رفض السياسة: تم تجاوز مؤشر المخاطر القصوى للجهاز أو الموقع. تم غلق المنفذ فوراً.',
        'متمانەی ئاسایش: هێڵی دەروازە بەهۆی ئاستی بەرزی مەترسی ئامێر بە شێوەیەکی کاتی داخرا.'
      );
    }
    if (reason.includes('Insufficient security clearance')) {
      return getLabel(
        reason,
        'رفض السياسة: درجة ترخيص الموظف غير كافية للاطلاع على هذا الملف السيادي.',
        'ڕەتکردنەوە: ئاستی دەسەڵاتی فەرمانبەری داواکار لە لایەن مێشکی ئەمنی یەکسان نەکرا بۆ بینینی ئەم بابەتە.'
      );
    }
    if (reason.includes('Cabinet Isolation Violation')) {
      return getLabel(
        reason,
        'رفض السياسة: انتهاك مبدأ عزل الوزارات الفيدرالي. لا يمكن لوزارة التدخل في شؤون وزارة أخرى.',
        'ڕەتکردنەوە: پێشێلکردنی یاسای جیاکردنەوەی وەزارەتەکان. هیچ دامەزراوەیەک ناتوانێت دەستگەیشتنی بە مەلەفی فەرمی کێلەکانی وەزارەتی تر هەبێت.'
      );
    }
    return getLabel(reason, reason, reason);
  };

  // Compliance checklist mapping
  const complianceChecklist = [
    {
      code: 'ISO-27001-A.9',
      framework: 'ISO 27001',
      name: {
        en: 'Cryptographic Access Control Standards',
        ar: 'معايير التحكم بالتشفير والوصول',
        ku: 'تۆماری پابەندبوون بە متمانەی گشتی نهێننووسی گومرگ'
      },
      status: 'COMPLIANT',
      level: {
        en: '100% Validated',
        ar: 'مكتمل ومصادق ١٠٠٪',
        ku: '١٠٠٪ پشتڕاستکراوەتەوە'
      }
    },
    {
      code: 'NIST-SP-800-207',
      framework: 'NIST Zero Trust',
      name: {
        en: 'Verified Enclave Threat Prevention',
        ar: 'منظومة حماية الأجهزة المعتمدة والتحقق',
        ku: 'ئاستی پاراستنی سیستم لە کاتی ڕوودانی هەڕەشەکان'
      },
      status: 'COMPLIANT',
      level: {
        en: '100% Policy Engine Match',
        ar: 'تطابق كامل ومؤمن للسياسات جمركية',
        ku: 'ڕێککەوتنی تەواو لەگەڵ مەکینەی پشکنین'
      }
    },
    {
      code: 'INSCP-SEC-V2',
      framework: 'Iraq Secure Cloud',
      name: {
        en: 'Multi-Tenant Ministry Logical Separation',
        ar: 'بروتوكول عزل تداول البيانات الفيدرالي للوزارات',
        ku: 'یاساکانی جیاکردنەوەی بەشە جیاوازەکانی وەزارەتەکان'
      },
      status: 'COMPLIANT',
      level: {
        en: 'Sovereign Core Encryption Locked',
        ar: 'التشغيل والتشفير مؤمن ومحمي بالخزنة',
        ku: 'مۆری بەستنەوەی کلیلەکان بە تەواوی ئامادەیە'
      }
    },
    {
      code: 'WCAG-2.1-AA',
      framework: 'System Ergonomics',
      name: {
        en: 'Strict High-Contrast Gold Layout Alignment',
        ar: 'معايير تطابق الكونتراست والتصميم العيادي',
        ku: 'بەراوردکردنی پێوانەی سپەیسینگ و جۆری نووسین'
      },
      status: 'COMPLIANT',
      level: {
        en: 'AA Compliant contrast matching',
        ar: 'متوافق مع معايير الويب المقروءة للرؤية البصرية',
        ku: 'هاوتای یاساکانی نێودەوڵەتی خێرایی و ڕوونی ڕەنگەکان'
      }
    }
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
    { label: getLabel('Verified Active', 'آمنة / نشطة', 'سەلمێنراو یان چالاک'), value: secureSess, color: colors.status.secure },
    { label: getLabel('Step-up Challenge', 'تحقق إضافي', 'پشکنینی بەهێزکردنەوە'), value: flaggedSess, color: colors.status.warning },
    { label: getLabel('Locked Threat', 'مغلقة أمنياً', 'داخراو پاش هەڕەشە'), value: lockedSess, color: colors.status.danger }
  ];

  return (
    <div id="sovereign-security-command-center" className="flex flex-col gap-6" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Dynamic Page Header */}
      <PageHeader
        title={getLabel(
          'Sovereign Security & Identity Command Center',
          'مركز الأمن والتحكم السيادي - صفر ثقة (Zero-Trust)',
          'ناوەندی کۆنترۆڵ و ئاسایشی نیشتمانیی سەروەر - متمانەی سفر'
        )}
        subtitle={getLabel(
          'National enterprise-grade unified identity, dynamic RBAC/ABAC audits, AES-256 HSM vault controls, and Zero-Trust risk assessment pipelines.',
          'لوحة المراقبة الفيدرالية للتحقق من هوية الموظفين والتشفير وسجلات التتبع السيبرانية.',
          'سەکۆی کۆنترۆڵ بۆ دڵنیابوونەوە لە ناسنامەی فەرمانبەران، کۆدکردنی کلیلە نیشتمانییەکان، و هێڵە پارێزراوەکانی پشکنینی ناوەندی دژی هەڕەشە.'
        )}
        badge={
          <Badge variant="gold">
            {getLabel('NATIONAL SECURITY LEVEL 5', 'الأمن القومي المركزي', 'ئاستی ئاسایشی نیشتمانی توند')}
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
              {getLabel('Sync Identity Channels', 'فحص السجلات حياً', 'هاوکاتکردنی ڕێڕەوەکانی ناسنامە')}
            </Button>
            <Button 
              onClick={triggerKeyRollover}
              variant="default"
              className="bg-[#E0A96D] hover:bg-[#E0A96D]/90 text-slate-950 font-bold text-xs flex items-center gap-1.5"
            >
              <Key className="w-3.5 h-3.5" />
              {getLabel('Rotate HSM Keys', 'تدوير مفاتيح التشفير', 'خولانەوەی کلیلە پارێزراوەکان')}
            </Button>
          </div>
        }
      />

      {/* Top Layer 4-Way Technical Metrics Index */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <StatCard
          title={getLabel('Sovereign Security Readiness Score', 'مؤشر جاهزية الأمن المركزي', 'پێوانەی ئامادەیی نیشتمانی توندوتۆڵ')}
          value={`${securityScore}%`}
          subtitle={getLabel('Meets ISO 27001 Cryptographic Protocols', 'متوافق مع بروتوكولات التجزئة التشفيرية ISO 27001', 'هاوتای ڕێسا نێودەوڵەتییەکانی نهێننووسی ISO 27001')}
          icon={<Shield className="w-5 h-5 text-[#E0A96D]" />}
          trend={{ value: getLabel('0.00%', '٠.٠٠٪', '٠.٠٠٪'), isPositive: true }}
        />

        <StatCard
          title={getLabel('Active Zero-Trust Sessions', 'قنوات التحقق النشطة', 'پیشاندەری گۆڕینەوەی چالاکی ژێرخانی متمانە')}
          value={totalSess.toString()}
          subtitle={getLabel(`${secureSess} Secure • ${flaggedSess + lockedSess} Risk Flags`, `${secureSess} مؤمنة • ${flaggedSess + lockedSess} علامات المخاطرة`, `${secureSess} پارێزراوە • ${flaggedSess + lockedSess} ئاگاداری مەترسی`)}
          icon={<UserCheck className="w-5 h-5 text-cyan-400" />}
          trend={{ value: getLabel('1 Socket Active', 'قناة نشطة واحدة', 'هێڵێکی گۆڕینەوەی چالاک'), isPositive: true }}
        />

        <StatCard
          title={getLabel('HMAC Active Encryptions', 'مفاتيح التشفير النشطة بالخزنة', 'کلیلەکانی کۆدکردنی گشتی لە خەزێنە')}
          value="AES-256-GCM"
          subtitle={getLabel(`Current Key ID: ${encryptionService.maskField(keysList.find(k => k.status === 'ACTIVE')?.keyId || '', 'TAX_REG')}`, `رمز المفتاح النشط: ${encryptionService.maskField(keysList.find(k => k.status === 'ACTIVE')?.keyId || '', 'TAX_REG')}`, `ناسنامەی کلیلی خۆکار: ${encryptionService.maskField(keysList.find(k => k.status === 'ACTIVE')?.keyId || '', 'TAX_REG')}`)}
          icon={<Lock className="w-5 h-5 text-emerald-400" />}
          trend={{ value: getLabel('Rotated', 'تم التدوير', 'گۆڕدراوە'), isPositive: true }}
        />

        <StatCard
          title={getLabel('Append-Only Audit Chain Link', 'السجل الوطني الموحد للتدقيق', 'زنجیرەی کۆدکراوی پاراستنی نیشتمانی')}
          value={`#${auditLogs.length + 1000}`}
          subtitle={getLabel('Tamper-proof block chain-link valid', 'سلسلة الكتل المقاومة للتلاعب صحيحة ومؤمنة', 'زنجیرەی بلۆک بە تەواوی پشتڕاستکراوەتەوە')}
          icon={<History className="w-5 h-5 text-purple-400" />}
          trend={{ value: getLabel('Synced', 'متزمن', 'هاوکاتکراوە'), isPositive: true }}
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
                  title={getLabel('Active Sockets & Hardware Profiles', 'قنوات التحقق والأجهزة المشفرة النشطة', 'دەروازە و ئامێرە تۆمارکراوە ئەمنییەکان')}
                  description={getLabel('Detailed threat evaluation over secure client terminals accessing IDG core database.', 'مراقبة حية للأجهزة المسجلة للموظفين متضمنة مستوى السرية ودرجات المخاطرة.', 'چاودێری ڕاستەوخۆ بۆ ناسنامەی ئامێرەکانی فەرمانبەران بەپێی دەسەڵات.')}
                />
              </div>
              <Badge variant={lockedSess > 0 ? 'danger' : 'success'}>
                {lockedSess > 0 ? getLabel(`${lockedSess} ANOMALY LOCK`, `${lockedSess} قفل أمني نشط`, `${lockedSess} داخرا بەهۆی هەڕەشە`) : getLabel('HEALTHY GATEWAYS', 'بوابات سليمة ومؤمنة', 'دەروازە ساغەکان')}
              </Badge>
            </div>

            <div className="overflow-x-auto">
              <Table headers={[
                getLabel('Subject Employee', 'الموظف المسؤول', 'فەرمانبەری دەسەڵاتدار'),
                getLabel('Tenant Division', 'المؤسسة/الوزارة', 'وەزارەت یان دامەزراوە'),
                getLabel('Clearance Level', 'مستوى الترخيص', 'ئاستی دەسەڵات'),
                getLabel('Terminals/Device', 'الجهاز/البيئة المعتمدة', 'ئامێر و ژێرخان'),
                getLabel('IP & Location', 'العنوان والموقع', 'ناونیشان و شوێن'),
                getLabel('Anomalous Risk Index', 'مؤشر المخاطر', 'پێوانەی مەترسی فێڵ'),
                getLabel('Administration Override', 'إجراءات التحكم', 'پەسەندکردن یان ڕەتکردنەوە')
              ]}>
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
                        <span className="text-[10px] text-slate-500 block">{session.userId} ({translateRole(session.userRole)})</span>
                      </td>
                      <td className="px-4 py-3.5 text-[#E0A96D] font-bold text-xs uppercase">{session.associatedMinistry ? translateMinistry(session.associatedMinistry) : getLabel('EXTERNAL', 'خارجي', 'دەرەکی')}</td>
                      <td className="px-4 py-3.5">
                        <Badge variant={
                          session.clearanceLevel === 'SOVEREIGN' ? 'gold' :
                          session.clearanceLevel === 'SECRET' ? 'danger' :
                          session.clearanceLevel === 'CONFIDENTIAL' ? 'warning' : 'slate'
                        }>
                          {translateClearance(session.clearanceLevel)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3.5 text-[11px] leading-snug">
                        <span className="text-slate-300 block">{session.device.osName}</span>
                        <span className="text-[10px] text-slate-500 block">{session.device.cpuArchitecture} Enclave: {session.device.secureEnclavePresent ? getLabel('YES', 'نعم', 'بەڵێ') : getLabel('NO', 'لا', 'نەخێر')}</span>
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
                          <span className="text-[9px] text-slate-500">
                            ({isLocked ? getLabel('LOCK', 'مغلق', 'داخراو') : isChallenged ? getLabel('CHALLENGE', 'تحدي', 'پشکنین') : getLabel('ACTIVE', 'نشط', 'چالاک')})
                          </span>
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
                          {isLocked ? getLabel('Revoke Socket', 'إلغاء الاتصال فوراً', 'وەستاندنی دەستبەجێ') : getLabel('Logout Socket', 'تسجيل خروج', 'دەرچوون لە هێڵ')}
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
              title={getLabel('Interactive Dynamic ABAC Policy Assessor', 'المحاكاة اللامركزية لتقييم السياسات (ABAC Simulator)', 'سیستەمی هەڵسەنگاندنی مۆڵەتەکان (ABAC)')}
              description={getLabel('Federal validation engine evaluating exact multi-dimensional clearance attributes dynamically.', 'اختبر الوصول وصلاحيات الموظفين حياً بمطابقة الوزارة والمنفذ والموقع الفعلي ونقاط المخاطرة.', 'سەکۆی تاقیکردنەوەی دەستگەگەیشتنی فەرمانبەران بەپێی ئاستی دەسەڵات، شوێن و بارودۆخی دەروازەکان.')}
            />

            <div className="bg-[#0b1420] p-4.5 rounded-xl border border-slate-850 grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Simulator Subject selection */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-mono text-[#E0A96D] uppercase font-bold">
                  {getLabel('1. Select Target Identity Profile', '١. اختر هوية الموظف المستهدف', '١. ناسنامەی فەرمانبەرەکە دیاری بکە')}
                </label>
                <select
                  value={simSubjectId}
                  onChange={(e) => setSimSubjectId(e.target.value)}
                  className="bg-[#111e2e] border border-slate-800 rounded p-2 text-xs font-mono text-white focus:outline-none focus:border-[#E0A96D]"
                >
                  <option value="emp-pmo-001">{getLabel('Dr. Tariq (PM Office - Super Admin)', 'د. طارق (رئاسة الوزراء - مدير عام)', 'د. تاریق (نوسینگەی سەرۆک وەزیران - گشتی)')}</option>
                  <option value="emp-customs-011">{getLabel('Col. Haider Jasim (Finance - Customs Admin)', 'العقيد حيدر جاسم (المالية - مدير الجمارك)', 'عەقید حەیدەر جاسم (دارایی - سەرپەرشتیاری گومرگ)')}</option>
                  <option value="emp-border-022">{getLabel('Aras Karwan (KRG Security - Border Officer)', 'أراس كروان (أمن الإقليم - ضابط الحدود)', 'ئاراس کاروان (ئاسایشی هەرێم - ئەفسەری سنوور)')}</option>
                  <option value="emp-intel-007">{getLabel('Nassim Al-Sadr (NSA - Intelligence Analyst)', 'نسيم الصدر (الأمن الوطني - محلل استخباراتي)', 'نەسیم ئەلسەدر (ئاسایشی نیشتمانیی - شیکەرەوە)')}</option>
                </select>
                <div className="bg-slate-900 p-2.5 rounded text-[10px] text-slate-400 font-mono leading-normal">
                  {getLabel('Role', 'الدور الوظيفي', 'پلە و پۆست')}: <span className="text-white font-bold">{translateRole(idp.getEmployeeProfile(simSubjectId)?.role || '')}</span><br />
                  {getLabel('Clearance', 'مستوى الترخيص', 'ئاستی دەسەڵات')}: <span className="text-[#E0A96D] font-bold">{translateClearance(idp.getEmployeeProfile(simSubjectId)?.clearance || '')}</span><br />
                  {getLabel('Lineage', 'التبعية المؤسسية', 'دامەزراوە')}: <span className="text-slate-300">{translateMinistry(idp.getEmployeeProfile(simSubjectId)?.ministry || '')}</span>
                </div>
              </div>

              {/* Resource requirement settings */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-mono text-[#E0A96D] uppercase font-bold">
                  {getLabel('2. Target Custom Asset & Clearance Required', '٢. الملف المطلوب ومستوى الحماية', '٢. دیاریکردنی جۆری فرمان و دەسەڵات')}
                </label>
                <select
                  value={simPermission}
                  onChange={(e) => setSimPermission(e.target.value)}
                  className="bg-[#111e2e] border border-slate-800 rounded p-2 text-xs font-mono text-white focus:outline-none focus:border-[#E0A96D] mb-1.5"
                >
                  <option value="APPROVE_CLEARANCE">APPROVE_CLEARANCE ({getLabel('Sign border passage', 'توقيع تصريح المرور', 'واژۆکردنی مۆڵەتی سنوور')})</option>
                  <option value="OVERRIDE_RISK_HOLD">OVERRIDE_RISK_HOLD ({getLabel('Bypass threat holds', 'تجاوز حظر التهديدات', 'مامەڵەکردن لەگەڵ پێشێلکاری')})</option>
                  <option value="EXPORT_AUDIT_LOGS">EXPORT_AUDIT_LOGS ({getLabel('Download security databases', 'تنزيل قواعد البيانات الأمنية', 'داگرتنی داتابەیسی تۆمارەکان')})</option>
                  <option value="VIEW_SECURITY_METRICS">VIEW_SECURITY_METRICS ({getLabel('Inspect system health', 'فحص جاهزية النظام', 'بینینی ئاستی ئاسایشی سیستم')})</option>
                </select>
                
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={simResourceRequiredClearance}
                    onChange={(e) => setSimResourceRequiredClearance(e.target.value as ClearanceLevel)}
                    className="bg-[#111e2e] border border-slate-800 rounded p-1.5 text-[11px] font-mono text-white focus:outline-none"
                  >
                    <option value="UNCLASSIFIED">{getLabel('UNCLASSIFIED req', 'مطلوب: عام', 'داواکراو: ئاشکرا')}</option>
                    <option value="CONFIDENTIAL">{getLabel('CONFIDENTIAL req', 'مطلوب: خاص', 'داواکراو: تایبەت')}</option>
                    <option value="SECRET">{getLabel('SECRET req', 'مطلوب: سري', 'داواکراو: نهێنی')}</option>
                    <option value="SOVEREIGN">{getLabel('SOVEREIGN req', 'مطلوب: سيادي', 'داواکراو: سەروەر')}</option>
                  </select>

                  <select
                    value={simResourceMinistry}
                    onChange={(e) => setSimResourceMinistry(e.target.value)}
                    className="bg-[#111e2e] border border-slate-800 rounded p-1.5 text-[11px] font-mono text-white focus:outline-none"
                  >
                    <option value="Ministry of Finance">{getLabel('Affiliated: Finance', 'الجهة المالك: المالية', 'خاوەندارێتی: دارایی')}</option>
                    <option value="Prime Minister Office">{getLabel('Affiliated: PM Office', 'الجهة المالك: الوزراء', 'خاوەندارێتی: سەرۆک وەزیران')}</option>
                    <option value="National Security Agency">{getLabel('Affiliated: NS Agency', 'الجهة المالك: الأمن الوطني', 'خاوەندارێتی: ئاسایشی نیشتمانی')}</option>
                    <option value="Ministry of Defense">{getLabel('Affiliated: Defense (Dual-use)', 'الجهة المالك: الدفاع', 'خاوەندارێتی: بەرگری')}</option>
                  </select>
                </div>
              </div>

              {/* Threat context settings */}
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-mono text-[#E0A96D] uppercase font-bold">
                  {getLabel('3. Access Point Environment Telemetry', '٣. القياسات الفنية والبيئة والشبكة', '٣. زانیاری و تاقیکردنەوەی خێرایی هێڵ')}
                </label>
                
                <div className="flex items-center justify-between p-1 bg-slate-900 border border-slate-800 rounded">
                  <span className="text-[10px] text-slate-400 font-mono">
                    {getLabel('Trusted Hardware Enclave Match', 'مطابقة تشفير معالج الجهاز الآمن', 'هاوتای زانیاری ناسنامەی ئامێر')}
                  </span>
                  <input 
                    type="checkbox" 
                    checked={simDeviceVerified} 
                    onChange={(e) => setSimDeviceVerified(e.target.checked)}
                    className="accent-[#E0A96D] cursor-pointer"
                  />
                </div>

                <div className="flex flex-col p-1.5 bg-slate-900 border border-slate-800 rounded gap-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>
                      {getLabel('Environmental Threat Score', 'مؤشر المخاطر والتهديدات للبيئة', 'پێوانەی چاودێری ئستای ئامێرەکە')}
                    </span>
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
                      {getLabel('Decision Outcome', 'قرار مجمع السياسات الفوري', 'بڕیاری کۆتایی مێشکی ئەمنی')}: {simResult.allowed ? getLabel('POLICY GRANTED (SUCCESS)', 'تمت الموافقة وتدقيق السياسة بنجاح', 'ڕێگەپێدراو (سەرکەوتوو)') : getLabel('ACCESS POLICY BLOCKED (DENIED)', 'تم حجب صلاحية الدخول لعدم طوابق الشروط', 'دەستگەیشتن ڕەتکرایەوە (داخراو)')}
                    </h4>
                    {!simResult.allowed && (
                      <p className="text-xs text-red-400 font-mono font-bold mt-1">
                        {getLabel('Reason', 'السبب', 'مەترسی یان هۆکار')}: {translateDenialReason(simResult.denialReason)}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      {simResult.appliedPolicies.map((p: string, idx: number) => (
                        <span key={idx} className="bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[9px] px-2 py-0.5 rounded">
                          ✓ {getLabel(p, p.replace('Audit', 'تدقيق').replace('Authorization', 'صلاحيات'), p.replace('Policy', 'ڕێسا').replace('Check', 'تاقیکردنەوە'))}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-right font-mono text-[10px] text-slate-400 leading-normal shrink-0">
                  {getLabel('Audit Block Hash', 'كود التجزئة المشفر للتدقيق', 'واژۆی دیجیتاڵی مۆرکردن')}:<br />
                  <span className="text-[#E0A96D] text-[9px]">{encryptionService.maskField(simResult.evaluationTimestamp, 'GENERIC_HEX')}</span><br />
                  {getLabel('Trace Reconciled at', 'تمت المزامنة في الساعة', 'هاوکاتکرا لە کاتی')} {simResult.evaluationTimestamp.slice(11, 19)}
                </div>
              </div>
            )}
          </div>

          {/* Sovereign Audit Trail Stream utilizing interactive searching/filtering */}
          <div className="bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800 shadow-xl text-start flex flex-col gap-4">
            
            <div className="border-b border-slate-900 pb-2 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <SectionHeader 
                  title={getLabel('Sovereign Tamper-Proof Audit Logging Stream', 'سجل التدقيق والمتابعة السيادي المشفر (Append-Only)', 'سجلی فەرمیی پشکنین و کۆنتڕۆڵی گشتی (بێ دەستکاری)')}
                  description={getLabel('Immutable cryptographic chronological audit ledger verifying complete trade compliance actions.', 'الناقل البلوكي السيادي المتسلسل بالاعتماد على التجزئة التشفيرية لتسجيل الإجراءات.', 'زنجیرەی کۆدکراوی هێڵی دەروازەکان بەپێی کات و جۆری کارە گومرگییەکان.')}
                />
              </div>

              {/* Filtering badges */}
              <div className="flex gap-1 bg-[#0b1420] border border-slate-850 p-1 rounded-md text-[10px]" dir="ltr">
                {[
                  { id: 'ALL', label: getLabel('All Logs', 'جميع السجلات', 'گشت تۆمارەکان') },
                  { id: 'LOGIN', label: getLabel('Auth', 'الدخول', 'چوونەژورەوەکان') },
                  { id: 'KEY_ROTATION', label: getLabel('Rollover', 'التدوير', 'گۆڕینی کلیل') },
                  { id: 'SECURITY_VIOLATION', label: getLabel('Alarms', 'التهديدات', 'مەترسییەکان') }
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
              <Table headers={[
                getLabel('Log ID', 'رمز السجل', 'ناسنامەی تۆمار'),
                getLabel('Timestamp', 'طابع الوقت', 'کاتی تۆمارکردن'),
                getLabel('Event Category', 'فئة الحدث', 'پۆلی ڕووداوەکە'),
                getLabel('Subject User', 'المستخدم المسؤول', 'فەرمانبەری پەیوەندیدار'),
                getLabel('Ledger Action Summary & Resource Metadata', 'خلاصة العملية وتفاصيل الموارد', 'وەسف و زانیاری ڕاپۆرتی فەرمی'),
                getLabel('Backward Chain Block Hash', 'توقيع التجزئة المتسلسل (Hash)', 'واژۆی دیجیتاڵی کۆدکراو'),
                getLabel('Ledger State', 'حالة السجل', 'بارودۆخی زنجیرە')
              ]}>
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
                          {log.eventType === 'SECURITY_VIOLATION' ? getLabel('Violation', 'مخالفة أمنية', 'هەڵەی یاسایی') :
                           log.eventType === 'KEY_ROTATION' ? getLabel('Key Roll', 'تدوير مفتاح', 'گۆڕینی کلیل') :
                           log.eventType === 'LOGIN' ? getLabel('Auth Login', 'تسجيل دخول', 'چوونەژوورەوە') :
                           getLabel(log.eventType, log.eventType, log.eventType)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <strong className="text-white block">{log.subjectUsername}</strong>
                        <span className="text-[10px] text-slate-500 block">{translateRole(log.subjectRole)} {getLabel('Clearance', 'درجة الترخيص', 'ئاستی متمانە')}: {translateClearance(log.clearanceLevel)}</span>
                      </td>
                      <td className="px-4 py-3 max-w-sm">
                        <span className="text-slate-250 block font-sans font-semibold text-xs">
                          {getLabel(
                            log.actionSummary,
                            log.actionSummary.replace('Granted', 'تم التصريح').replace('Blocked', 'تم الحجب').replace('Verification', 'التحقق'),
                            log.actionSummary.replace('Granted', 'پەسەندکرا بۆ').replace('Blocked', 'ڕەتکرایەوە بۆ').replace('Verification', 'پشکنینی')
                          )}
                        </span>
                        <span className="text-[10px] text-slate-500 block font-mono leading-relaxed mt-1 bg-slate-950/40 p-1.5 border border-slate-900 rounded italic">
                          "{getLabel(
                            log.resourceDetails,
                            log.resourceDetails.replace('Outpost', 'منفذ حدودي').replace('Clearance', 'ترخيص').replace('Enclave', 'المعالج المشفر'),
                            log.resourceDetails.replace('Outpost', 'دەروازەی سنووری').replace('Clearance', 'دەسەڵاتی بڕیار').replace('Enclave', 'سەکۆی پارێزراو')
                          )}"
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-[9px] text-[#E0A96D] tracking-tighter">
                        {encryptionService.maskField(log.integrityChainHash, 'GENERIC_HEX')}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`font-bold uppercase text-[9px] ${isViolation ? 'text-red-400' : 'text-[#52B788]'}`}>
                          {log.status === 'SUCCESS' ? getLabel('CHAINED', 'مربوط بالكتلة', 'تۆمارکراو') : getLabel('BLOCKED', 'محجوب/ممنوع', 'داخراو')}
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
                {getLabel('Active Sockets Breakdown', 'تفاصيل القنوات النشطة', 'پۆلێنکردنی دەروازە چالاکەکان')}
              </span>
            </h3>

            {/* Zero-trust socket pie division chart */}
            <ChartContainer title={getLabel('Zero-Trust Terminals Risk Audit', 'تدقيق مخاطر الأجهزة المعتمدة', 'پێوانەی چاودێری ئامێرە پارێزراوەکان')} subtitle={getLabel('Relative proportion of devices sorted by continuous validation state', 'توزيع نسب الأجهزة حسب حالة المحاكاة الأمنية اللحظية', 'ڕێژەی سەرەکی دەروازەکان بەپێی ئاستی دەرکەوتنی جۆری مەترسی')}>
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
                {getLabel('Sovereign Key Chain Registry', 'سجل أرقام كود المفاتيح الاتحادية', 'تۆماری فەرمی کلیلە سەروەرەکان')}
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
                        {isActive ? getLabel('Active', 'نشط ومؤمن', 'چالاک') : getLabel('Expired', 'منتهي الصلاحية', 'بەسەرچوون')}
                      </Badge>
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {getLabel('Algorithm', 'خوارزمية التشفير', 'جۆری كۆدکردن')}: <span className="text-[#E0A96D]">{key.algorithm}</span><br />
                      {getLabel('Rollover Expiry', 'تاريخ انتهاء الفحص الفعلي', 'کاتی بەسەرچوون')}: {key.expiresAt.slice(0, 10)}
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
                {getLabel('Sovereign Compliance Index', 'مؤشر موازنة ومعايير الامتثال', 'تۆماری فەرمی یاسا و بەڵگەکانی پابەندبوون')}
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
                    <Badge variant="success">✓ {getLabel('COMPLIANT', 'ممتثل ومطابق', 'پابەندبووە')}</Badge>
                  </div>
                  <strong className="text-slate-200 block text-xs font-sans font-semibold mb-1">{c.name[lang]}</strong>
                  <span className="text-[10px] text-slate-500 block leading-snug">{c.level[lang]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Report Quick Exporter Box */}
          <div className="bg-[#1a2c42]/20 border border-slate-800 p-5 rounded-xl text-start flex flex-col gap-3.5">
            <SectionHeader 
              title={getLabel('Identity & Access Governance', 'حوكمة بطاقات المعاملات والولوج', 'ناوەندی ئاسایشی ناسنامەی دیجیتاڵیی')} 
              description={getLabel('Certified in alignment under Supreme National Cybersecurity Council supervision.', 'مصادق بالكامل تحت إشراف المجلس الوطني للأمن السيبراني العراقي.', 'پەسەندکراوە لە لایەن دەستەی باڵای ئاسایشی ئەلیکترۆنی عێراق.')}
            />
            <p className="text-[11px] text-[#E0E1DD] font-mono leading-relaxed">
              {getLabel(
                'Every system transaction is bound by cryptographical identity signature hashes. Standard key indexes rotate dynamically according to FIPS 140-3 protocol constraints.',
                'جميع المعاملات في النظام محمية وموثقة بواسطة تواقيع وتجزئات التشفير الرقمية، ويتم تدوير مفاتيح التشفير بالخزنة السيادية بشكل ديناميكي وفقاً لمعايير بروتوكول FIPS 140-3.',
                'هەموو کار و داتایەک لە نێو سیستەمدا بە واژۆی دیجیتاڵیی کلیلە گشتییەکان دەپارێزرێت و جۆری کلیلەکان بە شێوەیەکی خۆکار بەپێی ستانداردەکانی FIPS 140-3 ئەپدەیت دەکرێن.'
              )}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

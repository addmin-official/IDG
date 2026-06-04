import React, { useState, useEffect, useMemo } from 'react';
import { 
  Zap, 
  Cpu, 
  Shield, 
  Truck, 
  FileText, 
  Activity, 
  Coins, 
  Database, 
  Lock, 
  Eye, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw,
  Scale,
  Play,
  Pause,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Language } from '../types';

interface EcosystemWorkflowsProps {
  lang: Language;
}

interface WorkflowStep {
  id: string;
  number: number;
  title: {
    en: string;
    ar: string;
    ku: string;
  };
  domain: string;
  description: {
    en: string;
    ar: string;
    ku: string;
  };
  automationLevel: 'Fully Automated' | 'Autonomous AI' | 'Edge Computed';
  automationDetail: {
    en: string;
    ar: string;
    ku: string;
  };
  metricName: {
    en: string;
    ar: string;
    ku: string;
  };
  metricValue: string;
}

export default function EcosystemWorkflows({ lang }: EcosystemWorkflowsProps) {
  const [activeWorkflow, setActiveWorkflow] = useState<string>('mnf-ingestion');
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [simulationSpeed, setSimulationSpeed] = useState<number>(3000); // ms
  const [processedTx, setProcessedTx] = useState<number>(1524890);
  const [autoApprovalRate, setAutoApprovalRate] = useState<number>(98.62);
  const [totalDutyCalculatedIQD, setTotalDutyCalculatedIQD] = useState<bigint>(BigInt(412850380294));
  const [currentThreatLevel, setCurrentThreatLevel] = useState<'low' | 'moderate' | 'elevated'>('moderate');
  const [activePresetFlow, setActivePresetFlow] = useState<string>('machinery-basra');
  const [simulationLogs, setSimulationLogs] = useState<Array<{ id: string; time: string; text: string; success: boolean }>>([
    { id: '1', time: '12:35:10 AST', text: 'Cargo Manifest MNF-2026-9081 automatically ingested. Zero manual steps.', success: true },
    { id: '2', time: '12:35:11 AST', text: 'CBI LC ledger mapping confirmed. Value check within acceptable 8% deviation limit.', success: true },
    { id: '3', time: '12:35:12 AST', text: 'AI classified commodity description (Steel Hot-rolled) into HS Code 7208.39.00.', success: true },
    { id: '4', time: '12:35:12 AST', text: 'Autonomous Risk Engine computed low risk index (12%). Gate release approved.', success: true }
  ]);

  // Handle translation dictionary for this panel specifically
  const dict = useMemo(() => {
    return {
      en: {
        title: "FEDERAL SOVEREIGN BORDER SYSTEM",
        subtitle: "100% Automated Multi-Gateway Pipeline & Dynamic Transaction Engine",
        desc: "Interactive visualizer of the 13 foundational autonomous trade ecosystems. Fully mechanized, eliminating regulatory friction and human gatekeeper bottlenecks under zero-trust protocols.",
        millionTxMetric: "SIMULATED TX PER ANNUM",
        autoApproveMetric: "AI DOCK-TO-HIGHWAY CLEARANCE",
        dutyMetric: "TOTAL TAX REVENUE LOGGED",
        threatStatus: "THREAT ANOMALY POSTURE",
        speedController: "Simulation Heartbeat",
        play: "Resume Automated Manifest Streams",
        pause: "Pause Ingestion Feed",
        activeFlow: "Current Active Corridors",
        activeFlowDesc: "Select a high-throughput scenario to execute across the 13 automated digital checkpoints.",
        machineryLabel: "Basra Umm Qasr • Industrial Metals & Heavy Machinery",
        transitLabel: "Duhok Ibrahim Khalil • Harmonized Transit (Helsinki Accord)",
        medicalLabel: "Baghdad Capital Air Hub • Cryo-Controlled Therapeutics",
        stepDetailHeader: "System Automation Telemetry Check",
        automationLevel: "DIGITAL PROTOCOLS",
        domainTag: "Sovereign Domain",
        runSimulationBtn: "Enact Scenario Throughput",
        txLogs: "Live Transaction Audit Log",
        noManualNote: "Sovereign Law Compliance: Designed specifically under Iraqi Article 23 / KRG Accord to enforce zero human intervention, preventing customs bribery and revenue leakage.",
        lowThreat: "STABILIZED (LOW RISK)",
        modThreat: "CALIBRATED (ANOMALY SCANNING)",
        eleThreat: "SHIELD ACTIVE (ELEVATED RISK)"
      },
      ar: {
        title: "المنظومة الفيدرالية السيادية لإدارة الحدود والجمارك",
        subtitle: "مسار رقمي مؤتمت بالكامل بنسبة 100% للتدقيق الجمركي وحساب المعاملات الفورية",
        desc: "محاكاة تفاعلية للأنظمة اللوجستية الفيدرالية الـ 13 المستقلة بالكامل. تعمل دون أي تدخل بشري للقضاء على عقبات الاستيراد والتصدير وضمان صفر تسريبات جمركية بنظام صفر ثقة.",
        millionTxMetric: "المعاملات المستهدفة سنوياً بمليون",
        autoApproveMetric: "معدل الإيقاف والفسح الآلي بالكامل",
        dutyMetric: "إجمالي الرسوم الجمركية المجمعة للخزينة لعام 2026",
        threatStatus: "موقف استخبارات التهديد السيادي",
        speedController: "معدل سرعة تدوير المحاكاة",
        play: "استئناف معالجة المانيفست الفوري",
        pause: "إيقاف التدفق اللوجستي مؤقتاً",
        activeFlow: "الممر التجاري ومسار الشاحنات النشط حالياً",
        activeFlowDesc: "اختر سيناريو استيراد عالي الكثافة لمتابعة آليات معالجته الفورية عبر المحاور الـ 13.",
        machineryLabel: "ميناء أم قصر البصرة • الحديد المستورد والآلات الثقيلة",
        transitLabel: "منفذ إبراهيم الخليل دهوك • الترانزيت الموحد (اتفاقية هلسنكي)",
        medicalLabel: "مطار بغداد الدولي • الأدوية الحيوية والمبردة عالية القيمة",
        stepDetailHeader: "مراقبة القياس البعيد لنظام الأتمتة الفيدرالي",
        automationLevel: "البروتوكولات الرقمية المفعّلة",
        domainTag: "القطاع والمنظمة",
        runSimulationBtn: "تشغيل مسار الشحنة بالكامل",
        txLogs: "سجل التدقيق الفوري للمعاملات الرقمية",
        noManualNote: "قانون الجمارك والمالية: تصميم خوارزميات مستقلة تماماً تلغي سلطة الموظفين التقديرية لمنع المحسوبية وحماية إيرادات الدولة الجمركية والضريبية بشكل صارم.",
        lowThreat: "آمن ومستقر (مخاطر منخفضة)",
        modThreat: "تفتيش ومعايرة نشطة للأجهزة الحرارية",
        eleThreat: "حماية مشددة (تم رصد شذوذ مالي)"
      },
      ku: {
        title: "سیستەمی نیشتمانیی یەکگرتووی سنوورەکان و تاریفەی هاوبەش",
        subtitle: "سیستەمی دیجیتاڵی ئۆتۆماتیکی ١٠٠٪ی دەروازەکان و کۆنتڕۆڵی بازرگانی",
        desc: "سەکۆی ڕاستەوخۆی ١٣ کایە ئەمنیی و ئابوورییەکانی دەروازە سنوورییەکان. کاردەکات بەبێ دەستێوەردانی مرۆیی بە مەبەستی پاراستنی خەزێنەی گشتی و جێبەجێکردنی هاوسەنگی دارایی.",
        millionTxMetric: "باڕکۆدو کارتی کارپێکراو لە ساڵێکدا",
        autoApproveMetric: "ڕێژەی ڕێگەپێدانی ئۆتۆماتیکیی بێ مرۆڤ",
        dutyMetric: "کۆی باجی گومرگی هاتووەتە خەزێنەی فیدراڵ",
        threatStatus: "ئاستی چاودێری ئەمنی دەروازەکان",
        speedController: "خێرایی نیشاندانی تێپەڕبوونی بار",
        play: "دەستپێکردنەوەی لێکۆڵینەوەی مانيفێست",
        pause: "ڕاگرتنی کاتی چوونە ژوورەوەی بارهەڵگرەکان",
        activeFlow: "ڕێڕەوی بازرگانی ئەکتیڤ لە ئێستادا",
        activeFlowDesc: "سکین کایەیەکی لۆجستی تایبەت بکە بۆ ئەوەی ببینی چۆن لە ڕێگەی ١٣ جومگەکان تێپەڕ دەبێت.",
        machineryLabel: "بەندەری ئوم قەسر بەسرە • جومگەی کەرەستەی پیشەسازیی کانزا",
        transitLabel: "ئیبراهیم خەلیل دهۆک • گواستنەوەی نێودەوڵەتی هاوبەش",
        medicalLabel: "فڕۆکەخانەی بەغداد • دەرمان و پێکهاتەی تەندروستی گرانبەها",
        stepDetailHeader: "چاودێری سیستەمی بڕیاردانی ئەلکترۆنی دەروازە",
        automationLevel: "یاسای نیشتمانیی ئەلکترۆنی",
        domainTag: "یاساکانی گشتی نیشتمانیی",
        runSimulationBtn: "جێبەجێکردنی پڕۆسەی بار",
        txLogs: "تۆماری پشکنینی بلۆکچەینی دۆکیومێنتەکان",
        noManualNote: "تێبینی یاسایی: لەسەر ڕێنمایی یەکگرتووی گۆڕانکاری گومرگی بەغداد-هەولێر بۆ ڕێگریکردن لە هەر دەستێوەردانێکی مرۆیی کە ببێتە هۆی فێڵی باج.",
        lowThreat: "سیستەم جێگیرە (ئارامە)",
        modThreat: "چالاکبوونی چاودێری گەرمی و تیشکی",
        eleThreat: "کۆنتڕۆڵ توندتر کراوە (مەترسی هەیە)"
      }
    };
  }, []);

  const isRtl = lang !== 'en';
  const d = dict[lang];

  // 13 Framework Items representing requested core modules
  const workflowSteps: WorkflowStep[] = useMemo(() => [
    {
      id: 'mnf-ingestion',
      number: 1,
      title: {
        en: 'Automated Manifest Processing',
        ar: 'معالجة المانيفست الآلية',
        ku: 'پرۆسێسی ئۆتۆماتیکی مانيفێست'
      },
      domain: 'Logistics Ingress',
      description: {
        en: 'Instant parsing of international maritime XML & EDI bills of lading. Zero paper document queues.',
        ar: 'معالجة جمركية رقمية فورية لبيانات الشحن وأوراق الحمولة الواردة بحرياً أو برياً خلال أجزاء من الثانية دون طوابير ورقية.',
        ku: 'لێکدانەوەی ڕاستەوخۆی ئەلیکترۆنیی دۆکیومێنتی دەرەکی بێ بەکارهێنانی کاغەز.'
      },
      automationLevel: 'Fully Automated',
      automationDetail: {
        en: 'Decoupled optical character recognition and cryptographic digital schema alignment.',
        ar: 'مطابقة المعاملات رقمياً باستخدام التوقيع الإلكتروني المشفر وتقاسم الداتا الجمركية.',
        ku: 'پشتڕاستکردنەوە زمانەوانییەکان لەگەڵ داتای ترانزێتی نێودەوڵەتی.'
      },
      metricName: {
        en: 'Avg. Parsing Speed',
        ar: 'سرعة التحليل والمسح',
        ku: 'خێرایی پشکنین'
      },
      metricValue: '480ms / document'
    },
    {
      id: 'border-control-sentry',
      number: 2,
      title: {
        en: 'Border Control Sentry',
        ar: 'رقابة أمن المنافذ الفيدرالية',
        ku: 'ئەمنییەتی بازگەی گشتی'
      },
      domain: 'Security & Sovereignty',
      description: {
        en: 'Federal terminal gates scanning vehicle logistics numbers automatically and integrating visual identity checks.',
        ar: 'أبواب تحكم فيدرالية ذكية تمسح لوحات الشاحنات وتطابق القياسات البايومترية وأوراق السائق فورياً.',
        ku: 'ناساندنی تابلۆی بارهەڵگرەکان و چاودێری خێرایی چوونە ژوورەوەیان.'
      },
      automationLevel: 'Edge Computed',
      automationDetail: {
        en: 'Computer vision neural nets at physical border gates.',
        ar: 'شبكة الكاميرات العصبية لمعاينة محاور الشاحنات عند البوابات.',
        ku: 'ناسنامەی خودکاری بەکارهێنانی سستم بۆ دۆزینەوەی ئۆتۆمبێلی نایاسایی.'
      },
      metricName: {
        en: 'Sentry Lane Latency',
        ar: 'فترة انتظار الشاحنة للمطابقة',
        ku: 'کات بۆ پێناسی لۆری'
      },
      metricValue: '1.4 seconds / truck'
    },
    {
      id: 'import-validation',
      number: 3,
      title: {
        en: 'Import Trade Verification',
        ar: 'حوكمة إدارة الاستيراد والاعتمادات',
        ku: 'پشکنینی داتای هاوردە'
      },
      domain: 'Trade Compliance',
      description: {
        en: 'Cross-checks dynamic imports against national licensing boundaries, quota schedules, or defense authorization protocols.',
        ar: 'التدقيق الآلي لمعاملات الاستيراد ومطابقتها للتراخيص الرسمية والكوتا المستهدفة لمنع الاستيراد العشوائي.',
        ku: 'بەراوردکردنی ڕاستەوخۆی باری هاوردەکراو لەگەڵ مۆڵەتی بازرگانی لە لایەن وەزارەت.'
      },
      automationLevel: 'Autonomous AI',
      automationDetail: {
        en: 'Direct database ledger connection with the Iraqi Trade Ministry.',
        ar: 'ربط مباشر بقاعدة بيانات وزارة التجارة والشركات المعتمدة في الإقليم والمركز.',
        ku: 'گواستنەوەی خودکار بۆ مۆڵەتی وەزارەتی بازرگانی عێراقی فیدراڵ.'
      },
      metricName: {
        en: 'Database Query Time',
        ar: 'مدة استعلام قاعدة البيانات المشتركة',
        ku: 'کاتی گەڕان بەدوای داتادا'
      },
      metricValue: '85ms'
    },
    {
      id: 'export-clearance',
      number: 4,
      title: {
        en: 'Export Compliance Clearance',
        ar: 'تدقيق أذونات التصدير والمنتج المحلي',
        ku: 'هاوسەنگی باری ناردنی دەرەکی'
      },
      domain: 'Customs & Sourcing',
      description: {
        en: 'Validates certificates of origin for Iraqi products (sulfur, oil derivatives, dates) destined for global markets.',
        ar: 'التحقق التلقائي لبلد المنشأ ووزن السلع المصدرة مثل الكبريت والتمور والمواد النفطية لتفادي التهرب من عوائد التصدير.',
        ku: 'وردبینی کردنی دۆکیومێنتی باری ناردنی دەرەکی وەک گۆگرد و رۆن.'
      },
      automationLevel: 'Fully Automated',
      automationDetail: {
        en: 'Sovereign ledger matching with certified export warehouses.',
        ar: 'مطابقة المستودعات التجارية السيادية لمنع خروج سلع تابعة للأمن الاستراتيجي الوطني.',
        ku: 'بەراوردکردنی ڕاستەوخۆ بە داتا گشتییەکان لە کۆگاکان.'
      },
      metricName: {
        en: 'Origin Validation Rate',
        ar: 'دقة وتطابق شهادة المنشأ الآلية',
        ku: 'وردی پشتڕاستکردنەوە'
      },
      metricValue: '100% Automated'
    },
    {
      id: 'hs-ai',
      number: 5,
      title: {
        en: 'HS Classification AI Engine',
        ar: 'عقل تصنيف السلع الذكي (HS-Code)',
        ku: 'سیستم زیرەکی پۆلێنکردنی دۆسیە'
      },
      domain: 'Sovereign AI Core',
      description: {
        en: 'Translates free-text commodity logs into global 8-digit Customs Tariff chapters automatically.',
        ar: 'لترجمة وتحليل الوصف العشوائي المكتوب بالمانيفست وتحويله إلى الباب الجمركي الصحيح والفقرة القانونية رقمياً.',
        ku: 'وەرگێڕان و پۆلێنکردنی خودکاری بوارەکان بۆ دیاریکردنی کۆدی تاریفەی جیهانی گومرگ.'
      },
      automationLevel: 'Autonomous AI',
      automationDetail: {
        en: 'Custom fine-tuned large language model specialized in trade schemas.',
        ar: 'مستند لنموذج الذكاء الاصطناعي الخاص بالجمارك والتعرفة الموحدة (قانون رقم 23).',
        ku: 'مۆدێلی تایبەتی پشکنینی زمانەوانی گومرگی.'
      },
      metricName: {
        en: 'Classification Accuracy',
        ar: 'دقة تحديد وتبويب التعرفة الموحدة',
        ku: 'وردی دیاریکردنی کۆد'
      },
      metricValue: '99.3% accuracy'
    },
    {
      id: 'risk-brain',
      number: 6,
      title: {
        en: 'Zero-Trust Risk Analysis Engine',
        ar: 'محرك تحليل المخاطر وسياساتها المتقدمة',
        ku: 'مێشکی شیکردنەوەی مەترسی فێڵ'
      },
      domain: 'Threat Intelligence',
      description: {
        en: 'Detects trade fraud anomalies: currency flight arbitrage, invoice over-valuation, and dual-use defense concerns.',
        ar: 'مخصص لكشف عمليات غسيل الأموال وتضخيم القيمة في فواتير الاستيراد لتهريب النقد للخارج وكشف المواد المزدوجة.',
        ku: 'ڕێگری لە گواستنەوەی نایاسایی دراو دەکات بەراورد بە بەهای ڕاستەقینەی کەلوپەل لە ئاستی نێودەوڵەتی.'
      },
      automationLevel: 'Autonomous AI',
      automationDetail: {
        en: 'Cross-references CBI Letters of Credit instantly in real-time.',
        ar: 'تحليل سلوكيات المستوردين ومطابقتها لقوائم الحظر ومؤشرات البنك المركزي العراقي.',
        ku: 'گواستنەوە و کۆنترۆڵی ڕێڕەوی دارایی بەراورد بە بانکی ناوەندی.'
      },
      metricName: {
        en: 'Fraud Block Ratio',
        ar: 'كفاءة منع تهريب العملة الأجنبية',
        ku: 'ڕێژەی ڕێگرتن لە فێڵ'
      },
      metricValue: '18.4B IQD Saved/Mo'
    },
    {
      id: 'duty-calc',
      number: 7,
      title: {
        en: 'Customs Duty Engine',
        ar: 'محرك ونظم احتساب التعرفة الفيدرالية',
        ku: 'بزوێنەری ژماردنی تاریفەی گومرگ'
      },
      domain: 'Sovereign Treasury',
      description: {
        en: 'Maps goods category to unified KRG-Baghdad tariff schedules (5%, 10%, 15%, 20%, 30%) with legal audit stamps.',
        ar: 'تحديد فئة المستوردات وحساب التعرفة الجمركية الموحدة فوراً بنسب قانون الجمارك لضمان الشفافية المالية.',
        ku: 'دانانی تاریفەی گومرگی هاوبەش لە دەرچەی سەرەکی عێراق بە هەبوونی مۆری ئەلیکترۆنیی.'
      },
      automationLevel: 'Fully Automated',
      automationDetail: {
        en: 'Immutable mathematical matrices verified on centralized federal servers.',
        ar: 'أنظمة جرد أوتوماتيكية مربوطة مباشرة بحساب الخزينة الفيدرالية الموحد للوزارة.',
        ku: 'ژمارەی خودکار بەبێ دەست تێوەردانی فەرمانبەری خاڵە سنوورییەکان.'
      },
      metricName: {
        en: 'Discretionary Deviation',
        ar: 'رصد تلاعب الموظفين بالرسوم الجمركية',
        ku: 'ڕێژەی لادانی مرۆیی'
      },
      metricValue: '0.00% (Absolute Fixed)'
    },
    {
      id: 'tax-settlement',
      number: 8,
      title: {
        en: 'CBI Automated Tax Calculation',
        ar: 'التسوية والمقاصة المالية الفورية (IQD)',
        ku: 'گواستنەوەی خودکار بۆ بانکی ناوەندی'
      },
      domain: 'Financial Gateway',
      description: {
        en: 'Converts USD valuation directly to Iraqi Dinar at the official Central Bank exchange rate (currently 1,310 IQD).',
        ar: 'تحويل القيم النقدية من الدولار أو اليورو بشكل مباشر وخاطف للدينار بالاعتماد على نشرة سعر الصرف الرسمية للبنك المركزي.',
        ku: 'گۆڕینەوەی بەهای دۆلار و خەمڵاندنی بە دیناری عێراقی بە پێی نرخ بنەڕەتی بڵاوکراوەی فەرمی CBI.'
      },
      automationLevel: 'Fully Automated',
      automationDetail: {
        en: 'Direct institutional API pipeline with the Central Bank of Iraq.',
        ar: 'واجهة برمجية حكومية آمنة ومباشرة مع البنك المركزي العراقي لإصدار سندات الدفع المالي.',
        ku: 'بەستنەوە بە بەهای فەرمی ڕۆژانەی پلاتفۆرمی CBI.'
      },
      metricName: {
        en: 'FX Reconciliation Speed',
        ar: 'وفاق تسوية التحويل المالي الجمركي',
        ku: 'خێرایی گۆڕینەوە متمانەدار'
      },
      metricValue: 'Real-time Sync'
    },
    {
      id: 'inspect-management',
      number: 9,
      title: {
        en: 'Inspection & Scanner Routing',
        ar: 'إدارة وتوجيه الفحص الإشعاعي والحراري',
        ku: 'ڕێڕەوی ئامێری سکێنەری تیشکی و گەرمی'
      },
      domain: 'Physical Security',
      description: {
        en: 'Coordinates scan routing to non-intrusive high-energy X-ray portals based on dynamic risk triggers.',
        ar: 'تخصيص مسار التدقيق الفيزيائي وتوجيه الشاحنات لفتحات مسح الأشعة الضخمة حسب المخرجات لإنهاء الطوابير الطويلة.',
        ku: 'دیاریکردني ئاڕاستەی پشکنین و دابەشکردنی لۆرییەکان بۆ بەشی پشکنینی تیشکی.'
      },
      automationLevel: 'Edge Computed',
      automationDetail: {
        en: 'Automated dispatch triggers for thermal scan tunnels.',
        ar: 'ربط مباشر بأجهزة الفحص ومستشعرات المسح الحجمي في المنافذ الحدودية.',
        ku: 'دیاریکردني خێرای ئۆفلاین مۆدس.'
      },
      metricName: {
        en: 'Physical Bypass Rate',
        ar: 'نسبة الإعفاء من التفتيش اليدوي البطيء',
        ku: 'ڕێژەی تێپەڕبوونی خێرا'
      },
      metricValue: '88% Bypass Approved'
    },
    {
      id: 'cargo-tracking',
      number: 10,
      title: {
        en: 'Container & RFID Tracking',
        ar: 'مراقبة الشحنات وتتبع الحاويات بالموجات',
        ku: 'چودێری بارهەڵگر لە ڕێگەی RFID و GPS'
      },
      domain: 'Logistics Corridor',
      description: {
        en: 'Tracks cargo container seals using RFID signatures and geo-fenced GPS corridor tracking from ports to inland terminals.',
        ar: 'متابعة الشحنات لضمان عدم تبديل الحمولات على الطرق الداخلية العابرة للمحافظات عبر شرائح المسار المشفرة.',
        ku: 'چاودێریکردنی جووڵەی بارهەڵگرەکان لە ڕێگەی نیشانەی ئەلیکترۆنیی بۆ ڕێگری لە گۆڕینی کەلوپەل.'
      },
      automationLevel: 'Edge Computed',
      automationDetail: {
        en: 'Decentralized sensor mesh networks on national highways.',
        ar: 'تنبيهات جغرافية فورية بمجرد خروج الشاحنة من ممرات الأمن القومي التجاري.',
        ku: 'ئاگادارکردنەوەی خودکار لە کاتی لادان لە ڕێڕەوی فەرمی.'
      },
      metricName: {
        en: 'Tracking Uptime',
        ar: 'استمرارية التغطية اللاسلكية للشحنات',
        ku: 'بەردەوامی چاودێری'
      },
      metricValue: '99.98% coverage'
    },
    {
      id: 'transit-operations',
      number: 11,
      title: {
        en: 'Transit & Development Road Corridors',
        ar: 'إدارة حركة الترانزيت وممرات طريق التنمية',
        ku: 'ڕێڕەوی گواستنەوەی طريق التنمية'
      },
      domain: 'Global Logistics',
      description: {
        en: 'Automated escrow bonds for dry-canal transit between Gulf ports and Europe or adjacent countries. Swift international clearance.',
        ar: 'إصدار كفالات جمركية مؤقتة عابرة للحدود لتسهيل ممر التنمية البري من الفاو للمنافذ التركية دون تفتيش مكرر.',
        ku: 'سیستەمی کارپێکردنی گواستنەوەی خێرا و ئۆتۆماتیکی نێوان کەنداوی عەرەبی بە دەروازەی باشوورو باکوور.'
      },
      automationLevel: 'Fully Automated',
      automationDetail: {
        en: 'Unified border clearing ledger supported by neighboring states.',
        ar: 'اتفاقية الربط الثلاثي الرقمي المشترك مع دول الجوار لتفادي إزدواجية دفع الرسوم المالي.',
        ku: 'بەستنەوەی ناڕاستەوخۆ بە داتای گومرگی گشتی وڵاتانی هاوسنوور.'
      },
      metricName: {
        en: 'Transit Pass-through Time',
        ar: 'المدة الزمنية الإجمالية لبقاء بضائع الترانزيت',
        ku: 'ماوەی مانی باری ترانزێت'
      },
      metricValue: 'UNDER 40 mins'
    },
    {
      id: 'border-intelligence',
      number: 12,
      title: {
        en: 'Border Security & Defense Intelligence',
        ar: 'مركز الاستخبارات والتنبؤات الأمنية للحدود',
        ku: 'هەواڵگری و ئاسایشی گشتی سنوورەکان'
      },
      domain: 'Sovereignty Protection',
      description: {
        en: 'National defense telemetry hub aggregate data to secure strategic borders from contraband, illicit materials, and weapons.',
        ar: 'لوحة استخبارات حكومية تجمع مؤشرات الخطر لصد تهريب المواد المحظورة والمنشطات ومواد تصنيع المتفجرات.',
        ku: 'ناوەندی هەواڵگری گشتی بۆ ڕێگریکردن لە هاوردەکردنی مەترسیدار.'
      },
      automationLevel: 'Autonomous AI',
      automationDetail: {
        en: 'Defense analysis mapping with automatic alert routing to military commands.',
        ar: 'إرسال إنذارات أمنية وتوجيه برمجيات رادار المسار الجمركي فور رصد خلل بالأوراق الثبوتية.',
        ku: 'هاوردنی زانیاری گشتی بە شێوەی نهێنیی.'
      },
      metricName: {
        en: 'Threat Intercept Time',
        ar: 'سرعة الإبلاغ والتوزيع لأجهزة الحدود',
        ku: 'خێرایی ئاگادارکردنەوەی هێزەکان'
      },
      metricValue: 'Instant (< 250ms)'
    },
    {
      id: 'customs-integration',
      number: 13,
      title: {
        en: 'Unified Customs Integration',
        ar: 'نظام الدمج الجمركي الفيدرالي الشامل',
        ku: 'سیستەمی گشتی یەکگرتووی گومرگ'
      },
      domain: 'Sovereign Core Base',
      description: {
        en: 'Immutable zero-trust single database synchronizing northern KRG and southern federal gates into a single national dashboard.',
        ar: 'دمج وتطابق جميع المنافذ الحدودية الشمالية لإقليم كوردستان والجنوبية في البصرة في خادم سيادي وطني واحد مشفر بالكامل.',
        ku: 'هاوئاهەنگی نێوان داتاکانی دەروازەی باشور لە بەسرە بە دەروازەی باکووری هەرێمی کوردستان.'
      },
      automationLevel: 'Fully Automated',
      automationDetail: {
        en: 'Decentralized ledger technology ensuring total non-repudiation.',
        ar: 'دفتر أستاذ مشفر فيدرالي للتأكد من نزاهة الرسوم ومنع تسريب العوائد بموجب الموازنة الاتحادية.',
        ku: 'سیستەمی بلۆکچەینی تایبەت بۆ پاراستنی ئەمنییەتی دارایی نیشتمانیی.'
      },
      metricName: {
        en: 'Node Sync Quality',
        ar: 'مزامنة وجودة البيانات بين المنافذ',
        ku: 'هاوکاتبوونی تەواوی داتاکان'
      },
      metricValue: '100% Interoperable'
    }
  ], []);

  // Simulation effect loop to mimic active trade pipeline
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      // Rotate active step
      setSimulationLogs(prev => {
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')} AST`;
        
        // Select a random step logs
        const selectedStep = workflowSteps[Math.floor(Math.random() * workflowSteps.length)];
        const success = Math.random() > 0.03; // 97% success rate
        
        let message = '';
        if (activePresetFlow === 'machinery-basra') {
          message = success 
            ? `[FAW-BASRA CORRIDOR] ${selectedStep.title[lang]} verified heavy cargo load reference MNF-${Math.floor(1000 + Math.random() * 9000)}. Status: APPROVED.`
            : `[ANOMALY WARNING] ${selectedStep.title[lang]} flagged mismatch on machine specifications tonnage metrics. High Alert triggered.`;
        } else if (activePresetFlow === 'transit-krg') {
          message = success
            ? `[KRG-BAGHDAD INTEGRATION] ${selectedStep.title[lang]} synced unified tariff certificate for Ibrahim Khalil transport. Zero-friction clearance.`
            : `[GATE DISCREPANCY] ${selectedStep.title[lang]} caught VAT duty calculation deviation. Automatically re-routing manifest.`;
        } else {
          message = success
            ? `[AIR CARGO APEX] ${selectedStep.title[lang]} authenticated temperature-controlled pharmaceutical seal index. Clearance approved in green lane.`
            : `[BIOLOGICAL SUSPISCION] ${selectedStep.title[lang]} detected ambient discrepancy in biological vaccine load cold-chain registry.`;
        }

        return [
          { id: String(Date.now()), time: timeStr, text: message, success },
          ...prev.slice(0, 10)
        ];
      });

      // Update counters
      setProcessedTx(prev => prev + Math.floor(1 + Math.random() * 5));
      setAutoApprovalRate(prev => {
        const delta = (Math.random() - 0.49) * 0.05;
        return parseFloat(Math.min(99.9, Math.max(95.0, prev + delta)).toFixed(2));
      });
      setTotalDutyCalculatedIQD(prev => prev + BigInt(Math.floor(150000 + Math.random() * 850000)));

    }, simulationSpeed);

    return () => clearInterval(interval);
  }, [isSimulating, simulationSpeed, activePresetFlow, lang, workflowSteps]);

  const activeStep = useMemo(() => {
    return workflowSteps.find(s => s.id === activeWorkflow) || workflowSteps[0];
  }, [activeWorkflow, workflowSteps]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" id="idg-ecosystem-visualizer">
      
      {/* 1. Dynamic Simulation Metrics Banner */}
      <div className="lg:col-span-12 bg-gradient-to-r from-[#0d1f33] to-[#071321] border border-[#1b324d] rounded-xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#1b324d] pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#cca553]/10 border border-[#cca553]/30 rounded-lg text-[#cca553]">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-wide">
                {d.title}
              </h3>
              <p className="text-xs text-slate-300">
                {d.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#050c14] border border-[#15273d] p-1.5 rounded-lg">
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className={`px-3 py-1.5 rounded text-xs font-bold font-mono uppercase transition flex items-center gap-1.5 ${
                isSimulating ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25' : 'bg-slate-700 text-slate-300'
              }`}
            >
              {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isSimulating ? d.pause : d.play}</span>
            </button>

            <span className="text-[10px] text-slate-400 px-2 font-mono uppercase border-l border-[#15273d]">
              {d.speedController}
            </span>
            <select
              value={simulationSpeed}
              onChange={(e) => setSimulationSpeed(Number(e.target.value))}
              className="bg-transparent border border-none text-xs text-[#cca553] font-mono focus:outline-none pr-2"
            >
              <option value="1500" className="bg-[#08111c]">1.5s (Turbo)</option>
              <option value="3000" className="bg-[#08111c]">3.0s (Normal)</option>
              <option value="6000" className="bg-[#08111c]">6.0s (Relaxed)</option>
            </select>
          </div>
        </div>

        {/* Dynamic National Live Stats Blocks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="bg-[#050c14] border border-[#15273d] p-3.5 rounded-lg flex flex-col justify-between">
            <div className="text-[10px] uppercase text-slate-400 font-mono tracking-wider font-bold">
              {d.millionTxMetric}
            </div>
            <div className="text-lg md:text-xl font-mono font-black text-white mt-1.5">
              {(processedTx).toLocaleString(lang === 'en' ? 'en' : 'ar')}
            </div>
            <div className="text-[9px] text-slate-400 font-semibold uppercase tracking-widest mt-1 text-emerald-400">
              Active National Grid Synced
            </div>
          </div>

          <div className="bg-[#050c14] border border-[#15273d] p-3.5 rounded-lg flex flex-col justify-between">
            <div className="text-[10px] uppercase text-slate-400 font-mono tracking-wider font-bold">
              {d.autoApproveMetric}
            </div>
            <div className="text-lg md:text-xl font-mono font-black text-emerald-400 mt-1.5 flex items-baseline gap-1">
              <span>{autoApprovalRate}%</span>
              <span className="text-[10px] text-emerald-500 font-sans font-light">Auto</span>
            </div>
            <div className="text-[9px] text-slate-400 font-semibold uppercase tracking-widest mt-1 text-slate-500">
              0% Discretionary Bribery Index
            </div>
          </div>

          <div className="bg-[#050c14] border border-[#15273d] p-3.5 rounded-lg flex flex-col justify-between">
            <div className="text-[10px] uppercase text-slate-400 font-mono tracking-wider font-bold">
              {d.dutyMetric}
            </div>
            <div className="text-md md:text-lg font-mono font-black text-white mt-1.5 mt-0.5 truncate">
              {(totalDutyCalculatedIQD / BigInt(1000000)).toLocaleString()}<span className="text-xs text-[#cca553] font-sans font-normal ml-1">M IQD</span>
            </div>
            <div className="text-[9px] text-slate-400 font-semibold uppercase tracking-widest mt-1">
              ≈ ${(Number(totalDutyCalculatedIQD / BigInt(1000000)) / 1.31).toFixed(1)}k USD Equivalent
            </div>
          </div>

          <div className="bg-[#050c14] border border-[#15273d] p-3.5 rounded-lg flex flex-col justify-between">
            <div className="text-[10px] uppercase text-slate-400 font-mono tracking-wider font-bold">
              {d.threatStatus}
            </div>
            <div className="text-xs font-bold uppercase mt-2 flex items-center gap-1.5 font-mono text-amber-400 font-bold mt-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse inline-block" />
              <span>{d.modThreat}</span>
            </div>
            <div className="text-[9px] text-slate-400 font-semibold uppercase tracking-widest mt-1 text-slate-500">
              Umm Qasr Scan Bay 2 Calibrated
            </div>
          </div>

        </div>
      </div>

      {/* 2. Left side: The 13 interconnected stages vertical workflow rail */}
      <div className="lg:col-span-4 bg-[#0b1724] border border-[#1b324d] rounded-xl p-4 shadow-xl">
        <div className="border-b border-[#1b324d] pb-3.5 mb-4">
          <h4 className="font-bold text-white text-sm uppercase tracking-wider font-mono">
            {lang === 'en' ? 'Sovereign 13-Domain Pipeline' : 'سلسلة العمليات السيادية الـ 13'}
          </h4>
          <p className="text-xs text-slate-400 mt-1">
            {d.desc}
          </p>
        </div>

        <div className="space-y-2 max-h-[580px] overflow-y-auto pr-2">
          {workflowSteps.map((step) => {
            const isSelected = activeWorkflow === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveWorkflow(step.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all duration-300 flex items-center justify-between gap-3 ${
                  isSelected 
                    ? 'border-[#cca553] bg-[#cca553]/10 text-white shadow-md' 
                    : 'border-[#1b324d] bg-[#07111c] text-slate-300 hover:border-[#1c334f]'
                }`}
                dir={isRtl ? 'rtl' : 'ltr'}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className={`w-6 h-6 rounded-md font-mono text-xs font-black flex items-center justify-center border shrink-0 ${
                    isSelected 
                      ? 'bg-[#cca553] text-[#08111c] border-[#cca553]' 
                      : 'bg-black/30 border-[#1b324d] text-slate-400'
                  }`}>
                    {step.number}
                  </div>
                  <div className="truncate text-left">
                    <span className="font-bold text-xs block text-white truncate">{step.title[lang]}</span>
                    <span className="text-[9px] text-[#cca553] font-mono font-semibold uppercase tracking-wider block mt-0.5">{step.domain}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase font-bold tracking-tight ${
                    step.automationLevel === 'Fully Automated' 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : step.automationLevel === 'Autonomous AI' 
                      ? 'bg-purple-500/10 text-purple-400' 
                      : 'bg-sky-500/10 text-sky-400'
                  }`}>
                    {step.automationLevel.split(' ')[0]}
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 text-slate-500 transition-transform ${isSelected ? 'translate-x-1.5 text-[#cca553]' : ''}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Center/Right column: Selected Stage Telemetry & Interactive Scenarios */}
      <div className="lg:col-span-8 flex flex-col gap-6">

        {/* Selected workflow step detail board */}
        <div className="bg-[#0b1724] border border-[#1b324d] rounded-xl p-5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-slate-900/10 pointer-events-none border-b border-l border-[#cca553]/10 transform translate-x-12 -translate-y-12 rotate-45" />

          <div className="flex items-center gap-2 mb-3.5">
            <Cpu className="w-5 h-5 text-[#cca553]" />
            <span className="text-xs uppercase tracking-widest text-[#cca553] font-mono font-bold">
              {d.stepDetailHeader}
            </span>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#cca553]/10 border border-[#cca553]/30 text-[#cca553] font-mono text-sm font-black flex items-center justify-center">
                #{activeStep.number}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">
                  {activeStep.title[lang]}
                </h3>
                <p className="text-[10px] text-[#cca553] uppercase font-semibold font-mono tracking-widest block mt-0.5">
                  {d.domainTag}: {activeStep.domain}
                </p>
              </div>
            </div>
            
            <p className="text-xs text-slate-300 mt-4 leading-relaxed font-sans bg-black/15 p-3 rounded-lg border border-[#152a42]">
              {activeStep.description[lang]}
            </p>
          </div>

          {/* Core Pipeline Metrics of This Sub-Stage */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pt-2">
            
            <div className="bg-[#050c14] border border-[#15273d] p-3 rounded-lg">
              <span className="text-[10px] text-slate-400 block font-mono font-bold uppercase uppercase tracking-wider">{d.automationLevel}</span>
              <span className="text-xs font-black text-emerald-400 mt-1 block">
                {activeStep.automationLevel}
              </span>
            </div>

            <div className="bg-[#050c14] border border-[#15273d] p-3 rounded-lg">
              <span className="text-[10px] text-slate-400 block font-mono font-bold uppercase uppercase tracking-wider">Underlying Mechanism</span>
              <span className="text-xs font-semibold text-white mt-1 block truncate">
                {activeStep.automationDetail[lang]}
              </span>
            </div>

            <div className="bg-[#050c14] border border-[#15273d] p-3 rounded-lg">
              <span className="text-[10px] text-slate-400 block font-mono font-bold uppercase uppercase tracking-wider">
                {activeStep.metricName[lang]}
              </span>
              <span className="text-xs font-bold text-[#cca553] mt-1 block font-mono">
                {activeStep.metricValue}
              </span>
            </div>

          </div>

          {/* Interactive Trigger block explaining automation benefits */}
          <div className="bg-[#cca553]/5 border border-[#cca553]/35 rounded-xl p-3.5 text-xs text-slate-300 leading-relaxed font-sans">
            <span className="text-[#cca553] font-bold block mb-1">
              {lang === 'en' ? '🔒 NO MANUAL INTERVENTION SAFEGUARD' : lang === 'ar' ? '🔒 ضمان إلغاء الرقابة والتدخل البشري' : '🔒 پاراستنی چاودێری دوور لە دەستی مرۆیی'}
            </span>
            <p className="text-[11px] leading-relaxed">
              {d.noManualNote}
            </p>
          </div>
        </div>

        {/* Dynamic Scenario Driver (Choose cargo path scenario to view metrics) */}
        <div className="bg-[#0b1724] border border-[#1b324d] rounded-xl p-5 shadow-xl">
          <div className="border-b border-[#1b324d] pb-3 mb-4">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider font-mono">
              {d.activeFlow}
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              {d.activeFlowDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-4">
            
            <button
              onClick={() => setActivePresetFlow('machinery-basra')}
              className={`p-3 text-left rounded-lg border transition-all duration-200 flex flex-col gap-1 text-xs ${
                activePresetFlow === 'machinery-basra'
                  ? 'border-[#cca553] bg-[#1a2d42] text-white'
                  : 'border-[#1b324d] bg-[#07111c] text-slate-400 hover:border-[#1c334f]'
              }`}
            >
              <span className="font-bold block uppercase text-[10px] text-slate-200">FAW COMMERCIAL AXIS</span>
              <p className="text-slate-400 leading-snug select-none">{d.machineryLabel}</p>
            </button>

            <button
              onClick={() => setActivePresetFlow('transit-krg')}
              className={`p-3 text-left rounded-lg border transition-all duration-200 flex flex-col gap-1 text-xs ${
                activePresetFlow === 'transit-krg'
                  ? 'border-[#cca553] bg-[#1a2d42] text-white'
                  : 'border-[#1b324d] bg-[#07111c] text-slate-400 hover:border-[#1c334f]'
              }`}
            >
              <span className="font-bold block uppercase text-[10px] text-slate-200">HELSINKI INTER-GATE</span>
              <p className="text-slate-400 leading-snug select-none">{d.transitLabel}</p>
            </button>

            <button
              onClick={() => setActivePresetFlow('medical-airport')}
              className={`p-3 text-left rounded-lg border transition-all duration-200 flex flex-col gap-1 text-xs ${
                activePresetFlow === 'medical-airport'
                  ? 'border-[#cca553] bg-[#1a2d42] text-white'
                  : 'border-[#1b324d] bg-[#07111c] text-slate-400 hover:border-[#1c334f]'
              }`}
            >
              <span className="font-bold block uppercase text-[10px] text-slate-200">CRITICAL HEALTH GRID</span>
              <p className="text-slate-400 leading-snug select-none">{d.medicalLabel}</p>
            </button>

          </div>

          <div className="bg-[#050c14] border border-[#15273d] p-3 rounded-lg">
            <span className="text-[10px] uppercase text-[#cca553] font-mono font-bold block mb-1">
              {d.txLogs}
            </span>
            <div className="space-y-1.5 h-[140px] overflow-y-auto pr-1">
              {simulationLogs.map((log) => (
                <div key={log.id} className="text-[11px] font-mono text-slate-300 flex items-center justify-between border-b border-[#15273d]/50 pb-1 last:border-0">
                  <div className="flex gap-2 items-start shrink-0 truncate max-w-[85%]">
                    <span className="text-[#cca553]">{log.time}</span>
                    <span className="truncate">{log.text}</span>
                  </div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded shrink-0 uppercase tracking-tight ${
                    log.success ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                  }`}>
                    {log.success ? 'Secure' : 'Alert'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

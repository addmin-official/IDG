import { useState } from 'react';
import { 
  Shield, Check, AlertTriangle, Activity, Database, Cpu, 
  TrendingUp, FileText, Send, Server, 
  RefreshCw, Layers, Landmark, Network, 
  ArrowRight, BookOpen, Lock
} from 'lucide-react';
import { CHECKPOINTS, DICTIONARY, CARGO_PRESETS } from '../mockData';
import EcosystemWorkflows from '../modules/workflow/EcosystemWorkflows';
import SovereignAIBrain from '../modules/ai/SovereignAIBrain';
import NationalCommandCenter from '../modules/command-center/NationalCommandCenter';
import SecurityCommandCenter from '../modules/security/SecurityCommandCenter';
import NationalDataCommandCenter from '../modules/data-fabric/NationalDataCommandCenter';
import NationalIdentityCommandCenter from '../modules/digital-identity/NationalIdentityCommandCenter';
import { useI18n } from '../providers/I18nProvider';
import { Brain } from 'lucide-react';

// Custom Enterprise Hooks to isolate Business Logic
import { useManifestAudit } from '../hooks/useManifestAudit';
import { usePolicyAdvisor } from '../hooks/usePolicyAdvisor';
import { useEconomicCorridor } from '../hooks/useEconomicCorridor';
import { useNationalTelemetry } from '../hooks/useNationalTelemetry';

export default function App() {
  const { locale: lang, setLocale: setLang } = useI18n();
  const d = DICTIONARY[lang];

  // Tab Navigation State
  const [activeTab, setActiveTab] = useState<string>('command-center');

  // Load isolated state from Business Logic Hooks
  const {
    selectedPreset,
    customManifest,
    setCustomManifest,
    isAuditing,
    auditResult,
    handlePresetSelect,
    handleInitiateAudit
  } = useManifestAudit();

  const {
    chatInput,
    setChatInput,
    chatHistory,
    isChatLoading,
    handleSendChat
  } = usePolicyAdvisor(d.policyWelcome);

  const {
    selectedCorridor,
    setSelectedCorridor,
    policyLevel,
    setPolicyLevel,
    cbiSurveillance,
    setCbiSurveillance,
    isPredicting,
    predictionResult,
    handleTriggerForecast
  } = useEconomicCorridor();

  const {
    ledgerBlocks,
    uptime,
    processedTodayCumulative,
    revenueTodayCumulative
  } = useNationalTelemetry();

  // Selected Blueprint in Architectural Atlas
  const [activeBlueprintId, setActiveBlueprintId] = useState<string>('system-context');

  const BLUEPRINT_METADATA = [
    {
      id: 'system-context',
      title: {
        en: '1. System Context Diagram',
        ar: '1. مخطط سياق النظام الموحد',
        ku: '١. نەخشەی گشتی ڕێڕەوی سیستەم',
      },
      desc: {
        en: 'The global interaction map depicting the IDG core as Iraq\'s unified trade border gateway interfaces with sovereign state agents and international merchants.',
        ar: 'خريطة التفاعل العالمية التي تصور نواة البوابة كمنفذ حدودي تجاري موحد ورابط مع منظمات الدولة الفيدرالية والتجار.',
        ku: 'نەخشەی گشتی کارتێکردن کە پێشاندەری چۆنێتی هاوئاهەنگی دەروازەی عێراقە لەگەڵ دامەزراوە فەرمییەکان و بازرگانان.',
      },
      points: {
        en: [
          'External Actors: Unified Importers, Multi-modal Carriers, and Customs Brokers.',
          'Sovereign Interlocks: Central Bank of Iraq (CBI), Baghdad Federal Min of Finance, and KRG Min of Finance.',
          'Core Gateway Functions: High-speed manifest decryption, cryptographic ledgers, and Gemini compliance brain.',
          'Physical Nodes/Outposts: Land checkpoints, Arabian Gulf deepwater maritime seaport bays, and Capital air cargo terminals.'
        ],
        ar: [
          'الأطراف الخارجية: المستوردون المعتمرون، الناقلون متعددو الوسائط والمخلصون الجمركيون.',
          'الترابط السيادي: البنك المركزي العراقي (CBI)، وزارة المالية الفيدرالية ببغداد، ووزارة المالية في إقليم كوردستان.',
          'الوظائف الأساسية للبوابة: فك تشفير البيانات فائقة السرعة، سجلات الكتل المقاومة للتلاعب، وعقل التدقيق (Gemini).',
          'العقد والروابط الحدودية: المنافذ البرية، موانئ الخليج العربي العميقة، ومحطات الشحن الفائقة بالمطارات الدولية.'
        ],
        ku: [
          'لایەنە دەرەکییەکان: هاوردەکاران، گواستنەوەی فرە-شێواز، و بریکارەکانی گومرگ.',
          'پەیوەندییە نیشتمانییەکان: بانکی ناوەندی عێراق (CBI)، وەزارەتی دارایی فیدراڵ، و وەزارەتی دارایی هەرێمی کوردستان.',
          'ئەرکە سەرەکییەکان: فەککردنی کۆدی دەروازە بازرگانییەکان، زنجیرە بلۆکی بێ دەستکاریکردن، و ژیری دەستکردی گومرگی.',
          'خاڵە چالاكە فیزیکییەکان: دەروازە سنوورییەکان، بەندەرەکانی دەریایی باشور، و هۆبەکانی فڕۆکەخانەی نێودەوڵەتی.'
        ],
      }
    },
    {
      id: 'business-capabilities',
      title: {
        en: '2. Business Capability Map',
        ar: '2. خارطة القدرات والمهام التشغيلية',
        ku: '٢. نەخشەی توانستەکانی بازرگانی',
      },
      desc: {
        en: 'Operational capability taxonomy defining the core of our sovereign trade infrastructure. Designed to build trust and eradicate custom duty evasion.',
        ar: 'التصنيف العملياتي للقدرات المحددة للأنشطة والمهام الجمركية لمكافحة التهرب المالي وترسيخ الشفافية.',
        ku: 'پۆلێنکردنی دەروازە چالاکەکان و بەهێزکردنی تواناکانی گومرگ بۆ ڕاگرتنی فێڵ و فێڵبازی دارایی لە باج لێدان.',
      },
      points: {
        en: [
          'Sovereign Customs Clearance: Form handling, HS code mapping, and dynamic tariff computations.',
          'Legal Harmonization: Instant parity checks between Baghdad federal guidelines and Kurdistan Regional Government custom regulations.',
          'Economic Threat Auditing: AML wire comparison, over-invoicing indicators, and contraband anomaly profiling.',
          'Economic Forecasting & Analytics: Dynamic corridor trends, regional traffic modeling, and capital reserve prediction.'
        ],
        ar: [
          'التخليص الجمركي السيادي: إدارة الاستمارات، مطابقة وتصنيف رموز التعرفة، واحتساب الرسوم جمركية ديناميكياً.',
          'التوافق التشريعي والقانوني: مقارنة فورية بين لوائح بغداد الاتحادية وقوانين جمرك إقليم كوردستان.',
          'التدقيق المالي ومكافحة الاحتيال: مطابقة حوالات العملات الصعبة ومراقبة تضخم الفواتير وتوصيف التهديدات المهربة.',
          'الاستشراف والنمذجة الاقتصادية: تحليلات اتجاهات الممرات والأثري المالي ونمو داهات الخزينة.'
        ],
        ku: [
          'ڕێکارە گشتییەکانی گومرگ: تەسلیمکردنی فۆرم، دیاریکردنی کۆدی تاریفە، و گۆڕینەوەی بەها داراییەکان.',
          'هاوئاهەنگی یاسایی: پێداچوونەوەی ڕاستەوخۆ لە نێوان حوکمەکانی بەغداد و یاساکانی هەرێمی کوردستان.',
          'چاودێری فێڵ و تەڵەکەبازین: بەراوردکردنی مۆڵەتەکانی کڕینی دۆلار لەگەڵ جۆری بار بۆ ڕاگرتنی زیانە داراییەکان.',
          'پێشپێبینی داهات و گەشەسەندن: شیکاری نوێ بۆ داهاتی گومرگ و دۆخی تێپەڕبوونی ئۆتۆمبێلەکان.'
        ],
      }
    },
    {
      id: 'ddd-boundaries',
      title: {
        en: '3. Domain Driven Design Boundaries',
        ar: '3. حدود سياقات التصاميم الموجهة للمجالات',
        ku: '٣. چوارچێوەی نەخشەسازی بەشەکان (DDD)',
      },
      desc: {
        en: 'Sovereign domain bounded contexts separated with strict transaction contracts to support modularity, hot-swappability, and resilient local isolation.',
        ar: 'فصل تام مجالات وسياقات البيانات ببروتوكولات صارمة لضمان موثوقية فصل الأنظمة والتحكم المحلي.',
        ku: 'جیاکردنەوەی بەشە جیاوازەکانی سیستەمی کۆنترۆڵ بۆ کارکردنی باشتر و هێمنتر لە کاتی پچڕانی هێڵی ئینتەرنێت.',
      },
      points: {
        en: [
          'Sovereign Manifest Evaluator: Handles schemas, imports, and carrier logs.',
          'Financial Integrity Syncer: CBI trade wire validation, customs-to-bank ledger matching, tariff calculation.',
          'Cognitive Threat Intelligence: Isolated Gemini-native risk processing, classification, and validation.',
          'National Security Ledger: Cryptographic append-only block ledger capturing tamper-proof clearance logs (Iraqi Sovereign Ledger).'
        ],
        ar: [
          'مقاصة وتقييم المانيفست السيادي: إدارة البيانات والمخاطبين وسجلات الناقلين.',
          'اتساق النظام المالي: مطابقة حسابات البنك المركزي والمدفوعات واحتساب الرسوم.',
          'الذكاء والتحليل المعرفي: معالجة سحابية معزولة عبر Gemini لتشخيص مخاطر الشحنات الاستيرادية فورياً.',
          'سجل الأمان الوطني الفيدرالي: سجل مشفر غير قابل للتلاعب (سلسلة الكتل السيادية العراقية).'
        ],
        ku: [
          'کۆنتڕۆڵی بەیاننامەی بارهەڵگر: بەڕێوەبردنی داتاکانی بار و بریکاری گواستنەوە.',
          'سیستەمی پێکهاتەی دارایی: لێکۆڵینەوەی ڕاستەوخۆ لە مەکینەی داهات و تێچووەکانی گومرگ.',
          'هەواڵگری زیرەکی دەستکرد: پشکنینی ناوەکی لە لایەن Gemini بۆ پێدانی نمرەی مەترسی فێڵبازی.',
          'بلۆکچەینی فەرمی نیشتمانیی: زنجیرە تۆماری هێمن بۆ هەڵگرتنی گشت بڕیارە دراوەکان بەبێ بڕانی هێل.'
        ],
      }
    },
    {
      id: 'event-architecture',
      title: {
        en: '4. Event-Driven Messaging Architecture',
        ar: '4. هندسة الرسائل والاتصالات الموجهة بالحدث',
        ku: '٤. تەکنەلۆژیای ناردنی نامەی سیستم بە دەستپێکردنی ڕووداوەکان',
      },
      desc: {
        en: 'The asynchronous publish-subscribe workflow handling heavy national logistics loads. Guarantees 100% offline edge processing resilience.',
        ar: 'آلية نفل البيانات وإدارة الأنشطة لمعالجة بارهەڵگرەكان دون التأثر بانقطاع الاتصال المؤقت بين المراكز.',
        ku: 'شێوازی ناردنی داتاکان بەبێ چاوەڕوانی بۆ هێماکردنی کارە جیاوازەکان بە شێوەی ئۆفلاین لە بنکە سنوورییەکان.',
      },
      points: {
        en: [
          'Event Bus: Apache Kafka configured for federal distributed clusters (Baghdad and Erbil nodes).',
          'State Sequence: ManifestSubmitted → CBSAssetMatched → CognitiveRiskEvaluated → FederalLedgerCommitted → ClearanceGranted.',
          'Offline Standby: Edge nodes process cargo locally and buffer events to disk during network partitioning with automatic backpressure resolution.'
        ],
        ar: [
          'منصة الأحداث: تهيئة Apache Kafka ضمن منظومة خوادم موزعة ومحمية بين بغداد وأربيل.',
          'تتابع الحالات: إدخال المانيفست ← مطابقة الاعتماد المالي ← تقييم مخاطر السلعة ← التدوين بالسجل المشفر ← منح رخصة التخليص.',
          'التشغيل اللامركزي دون إنترنت: معالجة بيانات الشحنات محلياً وتخزينها لحين عودة الاتصال ومزامنتها تلقائياً لدائرة الجمرك المركزي.'
        ],
        ku: [
          'ناوەندی ناردنی ڕووداوەکان: بەکارهێنانی Apache Kafka لە نێوان سێرڤەرەکانی بەغداد و هەولێر.',
          'دوایەکی ڕووداوەکان: دۆکیومێنتی نێردراو ← هاوتاکردنی لایەنی مۆڵەت ← پێدانی نمرەی مەترسی ← تۆمارکردن لە بلۆکچین ← ڕێگەپێدانی تێپەڕبوون.',
          'کارامەیی ئۆفلاین: تۆمارکردنی داتا لەسەر دیسکی بنکە ناوخۆییەکان لە کاتی نەبوونی تۆڕ بۆ نەهێشتنی دواکەوتنی بارهەڵگرەکان.'
        ],
      }
    },
    {
      id: 'microservice-topology',
      title: {
        en: '5. Horizontal Microservice Architecture',
        ar: '5. معمارية الخدمات المصغرة الأفقية المستقلة',
        ku: '٥. مایکرۆسێرڤسی ئاسۆیی سەربەخۆ',
      },
      desc: {
        en: 'Stateless custom microservices scaling horizontally on containerized Kubernetes clusters. Free from single-point-of-failure vulnerabilities.',
        ar: 'بنية برمجية معتمدة على خوادم Kubernetes مستقلة وخالية تماماً من ثغرات ومخاطر توقف الخادم الرئيسي.',
        ku: 'سێرڤسی گچکەی سەربەخۆ لەسەر سەکۆی کانتینەری Kubernetes بێ مەترسی پچڕانی سیستەمی گشتی.',
      },
      points: {
        en: [
          'Services: API Manifest Gateway, Cognitive Risk Intelligence Brain, CBI Liaison, Sovereign Ledger Worker, Multi-lang Translation Helper.',
          'Scaling Strategy: HPA (Horizontal Pod Autoscaling) triggered dynamically by active transit queues and checkpoint API traffic.',
          'Independent Contracts: REST/gRPC interfaces ensuring any service can be fully rewritten or upgraded with zero system downtimes.'
        ],
        ar: [
          'قائمة الخدمات: واجهات المانيفست، عقل مقارنة المخاطر بالذكاء الاصطناعي، ربط البنك المركزي، وسلسلة الكتل، والمترجم اللغوي.',
          'موازنة الحجم التلقائي: التوسع الأفقي بالاستجابة الفورية لأحجام بارهەڵگرەكان والطلبات عبر المنافد.',
          'الاستقلالية التامة: واجهات REST/gRPC تضمن ترقية وتطوير أي خدمة مستقلة دون التسبب في تعطيل أو إيقاف المنظومة الكلية.'
        ],
        ku: [
          'بەکارهێنەرانی سێرڤس: دەروازەی API بەیاننامە، مێشکی لێکۆڵینەوەی مەترسی، کۆنتڕۆڵی CBI، جێگیرکەری بلۆکچین، و وەرگێڕی فەرمی.',
          'پلانی گەشەی خۆکار: بەهێزکردنی تواناکانی سێرفەر بەپێی قەرەباڵغی دەروازە بازرگانییەکان.',
          'پەیوەندی سەربەخۆ: بەکارهێنانی واژۆی REST/gRPC بۆ گۆڕینی هەر سێرڤسێک بەبێ بڕانی چرکەیەک لە خزمەتگوزارییەکان.'
        ],
      }
    },
    {
      id: 'security-architecture',
      title: {
        en: '6. Zero-Trust Security Architecture',
        ar: '6. معمارية الأمن السيبراني - مبدأ صفر ثقة',
        ku: '٦. ژێرخانی ئەمنیی متمانەی سفر (Zero-Trust)',
      },
      desc: {
        en: 'The federal-grade posture protecting national trade streams against cyber threats, tampering, in-transit evasion, and fraud.',
        ar: 'المنظومة الدفاعية السيبرانية الموحدة لحماية البيانات التجارة الوطنية من الاختراقات الأمنية والتلاعب بالملفات القانونية.',
        ku: 'پلانی گشتی چاودێری و پاراستنی ئامێرەکان و زانیارییەکان لە هێرشە دەرەکییەکان و فێڵبازی دارایی لە خاڵە سنوورییەکان.',
      },
      points: {
        en: [
          'Identity & Access: Zero-Trust IAM with biological signature validation, secure federal hardware keys, and token-based API passes.',
          'Data Security: AES-256-GCM encryption in-transit and at-rest across all border nodes and federal databases.',
          'API Security: WAF protection, strict schema validations, and gRPC endpoint locking.',
          'Integrity Assurance: Real-time SHA-256 ledger checkpoints ensuring every clearance is cryptographically auditable.'
        ],
        ar: [
          'الهوية وتصريح الدخول: نظام IAM المعزز بالمصادقة البايومترية، مفاتيح أمنية فيديرالية صلبة وتصاريح مشفرة.',
          'أمان وحماية البيانات: تشفير متطور بمستوى AES-256-GCM للبيانات المخزنة والمنقولة عبر الحدود والقواعد الاتحادية.',
          'أمان واجهات التطبيقات: جدار ناري ذكي بروتوكول WAF، ومطابقة صارمة لجميع طلبات البيانات المتبادلة.',
          'التثبت والأرشيف المشفر: تدقيق SHA-256 لحظي لخرائط الشحنات والرسوم لضمان تدوين آمن وسليم.'
        ],
        ku: [
          'هێمای چوونەژوورەوە: بەکارهێنانی واژۆی پەنجەمۆر، بەڵگەنامەی مۆبایلی هێمن، و کۆنتڕۆڵی چوونەژوور بۆ ستافی فەرمی.',
          'پاراستنی داتاکان: کۆدکردنی زانیارییەکان بە سیستەمی AES-256-GCM لەسەر مەکینە نیشتمانییەکان بۆ دژایەتی دزینی داتا.',
          'پاراستنی هێڵەکان: پشکنینی ناوخۆیی هێڵی WAF و بەستنی دەرچەکانی گواستنەوەی زانیاری gRPC.',
          'پێداچوونەوەی ڕەسەنایەتی: مۆری SHA-256 ڕاستەوخۆ بۆ هەموو ڕێگەپێدانێک بۆ لێکۆڵینەوە لە بڕیارە دراوەکان.'
        ],
      }
    },
    {
      id: 'data-architecture',
      title: {
        en: '7. Data Architecture & Master Registries',
        ar: '7. معمارية قواعد البيانات والسجلات السيادية الفيدرالية',
        ku: '٧. چوارچێوەی هەڵگرتن و کۆنتڕۆڵی داتاکان',
      },
      desc: {
        en: 'The unified multi-region hybrid database structure maintaining ledger compliance and national trade history.',
        ar: 'البنية الهيكلية الموحدة متعددة أقاليم الاستضافة لقواعد البيانات لضمان كفاءة تخزين وحفظ السجلات الوطنية للفترات الطويلة.',
        ku: 'پلانی لۆجستی پاشەکەوتکردنی داتاکان لە شارە جیاوازەکان بۆ یەکڕاست کردنەوەی مێژووی بازرگانی نیشتمانیی.',
      },
      points: {
        en: [
          'Core DB: Google Cloud Spanner database with geographically redundant sync nodes distributed in Baghdad, Basra, and Erbil.',
          'Sovereign Ledger: Distributed append-only ledger for immutable chronological registration.',
          'Federal Master Registries: Cohesive tariff chapters lookup datasets, restricted merchant indexes, and approved global exporter tables.'
        ],
        ar: [
          'قاعدة البيانات المركزية: اعتماد Google Cloud Spanner عبر موزعات طرفية في بغداد والبصرة وأربيل لعدم فقدان البيانات.',
          'الأرشيف المشفر السيادي: سجل تاريخي لا يقبل التعديل والحذف لمراجعة التعديلات الجمركية زمنياً.',
          'فهارس التعرفة والأطراف الموحدة: تحديث مركزي مستمر للوائح التعرفة، الشركات المقيدة والمصدرين المعتمدين.'
        ],
        ku: [
          'کۆگای سەرەکی داتا: بەکارهێنانی سەکۆی Google Cloud Spanner لە نێوان شارەکانی بەغداد، بەسرە، و هەولێر.',
          'سجل سەرەکی بلۆکچین: تۆماری مێژووی کارەکان بەبێ ویستی سڕینەوە بۆ چاودێریکردن لە پاشەڕۆژدا.',
          'تۆماری گشتی تاریفەی دەوڵەت: خشتەی مەرجەکانی باج لە خاڵە جیاوازەکان، کۆمپانیا ڕێگەپێدراوەکان و دەرچەکان.'
        ],
      }
    },
    {
      id: 'ai-cognitive-architecture',
      title: {
        en: '8. AI Cognitive Architecture (Gemini Engine)',
        ar: '8. المعمارية المعرفية للذكاء الاصطناعي (Gemini Core)',
        ku: '٨. نەخشەی زیرەکی مێشکی جومگە بۆ شیکردنەوەی مەترسی (Gemini)',
      },
      desc: {
        en: 'Deep cognitive processing stack utilizing Gemini-3.5-flash to analyze physical manifest parameters against federal law datasets.',
        ar: 'منظومة المعالجة والتحليل المعرفي الفوري المدعومة بـ Gemini-3.5-flash لمطابقة توصيف السلعة باللوائح الاتحادية العيارية.',
        ku: 'بەکارهێنانی سیستەمی زیرەکی Gemini-3.5-flash بۆ لێکۆڵینەوە لە بەڵگەنامە گومرگییەکان هاوتای یاساکانی دەوڵەت.',
      },
      points: {
        en: [
          'Semantic Classification: Cross-references physical descriptions with the global HS-Code 8-digit tariff indexes.',
          'Financial Threat Analysis: Highlights trade mis-invoicing and value inflation ratios relative to normal global price ranges.',
          'Automated Multilingual Generation: Dispatches immediate real-time clear translations in formal Arabic, Sorani Kurdish, and English.'
        ],
        ar: [
          'التصنيف والتحليل اللفظي: ربط وقراءة الكلمات والأوصاف ومطابقتها برمز السلعة العيادي ذو 8 أرقام للتعرفة الموحدة.',
          'كشف التلاعب المالي: اكتشاف الفواتير المستوردة المبالغ بأسعارها أو الرخيصة لمنع التلاعب وتبييض العملات الصعبة.',
          'ترجمة وصياغة المستندات فورياً: تعريب وكردة تلقائية للوائح الشحن والمعاملات التجارية بدقة رسمية حكومية.'
        ],
        ku: [
          'پۆلێنکردنی زمانەوانی: بەراوردکردنی زمانەوانی لە نێوان وەسفی بار و کۆدی جیهانی ٨-ژمارەیی HS بۆ دیاریکردنی باجی فەرمی.',
          'چاودێری فێڵبازی دارایی: دیاریکردنی جیاوازی زۆری نێوان نرخی ڕاگەیەندراو و بەهای ڕاستەقینەی شتومەک لە بازاڕدا.',
          'وەرگێڕانی خێرا و ڕاست ڕاست: پێشکەشکردنی دەقی فەرمی بە زمانەکانی کوردی، عەرەبی، و ئینگلیزی بەبێ هەڵەی وەرگێڕ.'
        ],
      }
    },
    {
      id: 'government-interoperability',
      title: {
        en: '9. Unified Government Web Bridge',
        ar: '9. جسر اتصالات التكامل الحكومي الرقمي الموحد',
        ku: '٩. پردی هاوئاهەنگی نێوان دەزگا جیاوازەکانی دەوڵەت',
      },
      desc: {
        en: 'Inter-ministerial integration hub providing standard Restful, gRPC, and SOAP adapters connecting legacy and modern state systems.',
        ar: 'بوابة الدمج والربط مع المنظومات والأنظمة الاتحادية ووزارات القطاع المالي والصحي والأمني للجمهورية.',
        ku: 'ناوەندی گشتی هاوئاهەنگی نێوان وەزارەتەکانی حکومەت و سیستەمە کۆنە دیجیتاڵییەکان بۆ گواستنەوەی بی کێشەی زانیاری.',
      },
      points: {
        en: [
          'State Interfaces: Central Bank of Iraq (CBI AML portal), Ministry of Oil (crude distribution registries), Ministry of Health (medical clearances).',
          'KRG Interoperability: Direct secure data bridge syncing Erbil Custom Authority, Sulaymaniyah trade gates, and the Central Treasury in Baghdad.'
        ],
        ar: [
          'الربط الداخلي الفيدرالي: التكامل المباشر مع البنك المركزي (تصاريح الاعتمادات)، وزارة النفط، ووزارة الصحة (مطابقة اللقاحات).',
          'التكامل مع إقليم كوردستان: تأسيس رابط أمني مباشر لمزامنة بوابات أربيل والسليمانية جمركياً مع حسابات الخزينة ببغداد.'
        ],
        ku: [
          'هاوتاکردن لەگەڵ دەزگاکان: بەراوردکردن لەگەڵ بانکی ناوەندی (CBI PML)، وەزارەتی سامانە سروشتییەکان، و وەزارەتی تەندروستی.',
          'هاوبەشی هەرێم و بەغداد: پردی هێمن بۆ بەستنەوەی خاڵەکانی هەرێمی کوردستان (هەولێر، سلێمانی، دهۆک) لەگەڵ خەزێنەی سەرەکی عێراق.'
        ],
      }
    },
    {
      id: 'national-command-center',
      title: {
        en: '10. National Command Center Topology',
        ar: '10. هيكلية وهندسة غرفة العمليات والتحكم المركزي',
        ku: '١٠. نەخشەی لۆجستی ژووری کۆنتڕۆڵی سەرەکی نیشتمانیی',
      },
      desc: {
        en: 'Centralized telemetry, latency monitoring, real-time alert aggregation, and emergency country-wide bypass failovers.',
        ar: 'المنظومة المركزية لمراقبة الأداء واختبار اتصالات الحدود وكشف الأعطال وتدابير الطوارئ البديلة والتشغيل بالاتصال اللاسلكي.',
        ku: 'چاودێری خێرایی سێرڤەرەکان، کاتی گواستنەوەی دۆکیومێنت، و کۆنترۆڵکردنی باری پچڕان یان حاڵەتی لەناکاوی دەروازە سنوورییەکان.',
      },
      points: {
        en: [
          'Real-time Telemetry: Logs connection speed, physical gateway scanner heat maps, and border congestion times.',
          'State Contingency: Disaster Recovery automation with sub-second failovers to redundant fiber optics and local secure wireless backups.'
        ],
        ar: [
          'التحكم والمراقبة الفورية: رصد سرعات الربط للمنافذ، درجات حرارة أجهزة السونار، وتكامل البيانات اللوجستية التشغيلية للحدود.',
          'تدابير مواجهة الكوارث: معالجة تلقائية للأعطال والتحول الفوري للخطوط والألياف الضوئية البديلة وشبكات الطوارئ المستقلة.'
        ],
        ku: [
          'چاودێری ڕاستەوخۆ: تۆمارکردنی خێرایی تۆڕ، پلەی گەرمی سکێنەرەکانی سۆنەر، و کاتی تێپەڕبوونی ئۆتۆمبێلەکان.',
          'ئامادەکاری باری ناڕەحەتی: سووڕانەوەی خۆکار بۆ هێڵی ئینتەرنێتی ماهوارەیی یان بێ تەل لە کاتی بڕانی هێمای نیشتمانیی.'
        ],
      }
    }
  ];

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-slate-100 flex flex-col font-sans antialiased text-sm" dir={lang !== 'en' ? 'rtl' : 'ltr'}>
      
      {/* Sovereign Federal Header bar */}
      <header id="idg-main-header" className="bg-[#111e2e] border-b border-[#E0A96D]/30 shadow-lg px-4 py-3.5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo & Seal */}
          <div className="flex items-center gap-3.5">
            <div className="bg-[#E0A96D]/10 p-2 rounded-lg border border-[#E0A96D]/45 flex items-center justify-center shadow-inner hover:scale-[1.02] transition-transform duration-200">
              <Shield className="w-8 h-8 text-[#E0A96D]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-display font-bold tracking-wider text-white uppercase">{d.title}</h1>
                <span className="text-xs bg-emerald-950/90 text-[#52B788] border border-emerald-500/30 px-2 py-0.5 rounded font-mono uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52B788] animate-pulse"></span>
                  Sovereign Live
                </span>
              </div>
              <p className="text-xs text-[#E0A96D] font-mono tracking-widest mt-0.5 font-medium">{d.subtitle}</p>
            </div>
          </div>

          {/* Quick status bar and multi-language controls */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="hidden lg:flex flex-col text-start md:text-right border-[#E0A96D]/20 pr-4 ltr:border-r rtl:border-l pl-4">
              <span className="text-slate-400 text-[10px] uppercase font-mono tracking-wider">{d.location}</span>
              <span className="text-[#E0A96D] font-semibold">{d.securityAccess}</span>
            </div>

            {/* Language Controls with Premium Gold #E0A96D & Strict WCAG AAA Contrast */}
            <div className="flex items-center bg-[#1a2c42] p-1 rounded-md border border-slate-700 shadow-lg" dir="ltr">
              <button 
                onClick={() => setLang('en')} 
                className={`cursor-pointer px-2.5 py-1 rounded transition-all font-semibold ${lang === 'en' ? 'bg-[#E0A96D] text-[#0D1B2A] shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang('ar')} 
                className={`cursor-pointer px-3 py-1 rounded transition-all font-semibold ${lang === 'ar' ? 'bg-[#E0A96D] text-[#0D1B2A] shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'}`}
              >
                العربية
              </button>
              <button 
                onClick={() => setLang('ku')} 
                className={`cursor-pointer px-3 py-1 rounded transition-all font-semibold ${lang === 'ku' ? 'bg-[#E0A96D] text-[#0D1B2A] shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'}`}
              >
                کوردی
              </button>
            </div>

            <div className="bg-[#1a2c42] px-3 py-1.5 rounded text-slate-300 border border-slate-700/80 font-mono hidden sm:block shadow-sm">
              2026-06-04 • 01:27Z
            </div>
          </div>

        </div>
      </header>

      {/* Primary Navigation System */}
      <nav id="idg-navigation" className="bg-[#122237] border-b border-slate-800 py-1.5 px-4 shadow">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2">
          
          <button
            onClick={() => setActiveTab('command-center')}
            className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 font-medium capitalize text-xs ${
              activeTab === 'command-center' 
                ? 'bg-[#1a2c42] text-white border-l-2 border-[#cca553] shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4 text-[#cca553]" />
            {d.dashboard}
          </button>

          <button
            onClick={() => setActiveTab('blueprints')}
            className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 font-medium capitalize text-xs ${
              activeTab === 'blueprints' 
                ? 'bg-[#1a2c42] text-white border-l-2 border-[#cca553] shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4 text-[#cca553]" />
            Sovereign Architecture Atlas
          </button>

          <button
            onClick={() => setActiveTab('ai-auditor')}
            className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 font-medium capitalize text-xs relative ${
              activeTab === 'ai-auditor' 
                ? 'bg-[#1a2c42] text-white border-l-2 border-[#cca553] shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-4 h-4 text-[#cca553]" />
            {d.analyzer}
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('policy-advisor')}
            className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 font-medium capitalize text-xs ${
              activeTab === 'policy-advisor' 
                ? 'bg-[#1a2c42] text-white border-l-2 border-[#cca553] shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Landmark className="w-4 h-4 text-[#cca553]" />
            {d.advisor}
          </button>

          <button
            onClick={() => setActiveTab('economic-corridors')}
            className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 font-medium capitalize text-xs ${
              activeTab === 'economic-corridors' 
                ? 'bg-[#1a2c42] text-white border-l-2 border-[#cca553] shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-[#cca553]" />
            {d.intelligence}
          </button>

          <button
            onClick={() => setActiveTab('ecosystem')}
            className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 font-medium capitalize text-xs ${
              activeTab === 'ecosystem' 
                ? 'bg-[#1a2c42] text-white border-l-2 border-[#cca553] shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
            id="nav-btn-ecosystem"
          >
            <Network className="w-4 h-4 text-[#cca553]" />
            {lang === 'en' ? 'Digital Border Ecosystem' : lang === 'ar' ? 'منظومة المنافذ المستقلة' : 'هاوئاهەنگی نیشتمانیی دەروازە'}
          </button>

          <button
            onClick={() => setActiveTab('ai-brain')}
            className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 font-medium capitalize text-xs relative ${
              activeTab === 'ai-brain' 
                ? 'bg-[#1a2c42] text-white border-l-2 border-[#cca553] shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
            id="nav-btn-ai-brain"
          >
            <Brain className="w-4 h-4 text-[#cca553]" />
            Sovereign AI Brain
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 font-medium capitalize text-xs relative ${
              activeTab === 'security' 
                ? 'bg-[#1a2c42] text-white border-l-2 border-[#cca553] shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
            id="nav-btn-security"
          >
            <Lock className="w-4 h-4 text-[#cca553]" />
            {lang === 'en' ? 'Sovereign Security' : lang === 'ar' ? 'الأمن السبراني السيادي' : 'ئاسایشی ئەلیکترۆنی'}
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('data-fabric')}
            className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 font-medium capitalize text-xs relative ${
              activeTab === 'data-fabric' 
                ? 'bg-[#1a2c42] text-white border-l-2 border-[#cca553] shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
            id="nav-btn-data-fabric"
          >
            <Database className="w-4 h-4 text-[#cca553]" />
            {lang === 'en' ? 'Sovereign Data Fabric' : lang === 'ar' ? 'نسيج البيانات الوطني السيادي' : 'نسیجی داتای نیشتمانیی'}
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('sovereign-trust')}
            className={`px-4 py-2 rounded-md transition-all flex items-center gap-2 font-medium capitalize text-xs relative ${
              activeTab === 'sovereign-trust' 
                ? 'bg-[#1a2c42] text-white border-l-2 border-[#cca553] shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
            id="nav-btn-sovereign-trust"
          >
            <Shield className="w-4 h-4 text-[#cca553]" />
            {lang === 'en' ? 'Sovereign Trust Portal' : lang === 'ar' ? 'بوابة الثقة الفيدرالية والمفاتيح ' : 'مەکینەی ناسنامەی نیشتمانیی'}
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
          </button>

        </div>
      </nav>

      {/* Live Statecraft Telemetry Ticker - Preventing Bi-directional Text Inversion */}
      <section id="idg-metrics-ticker" className="bg-[#0b1420] border-b border-slate-800/60 py-3 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Sync Status Metric */}
            <div className="flex items-center gap-2 bg-[#102235]/40 px-3 py-1 rounded border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
              <span className="text-slate-400 font-semibold">
                {lang === 'en' ? 'FEDERAL SYNC' : lang === 'ar' ? 'المزامنة الاتحادية' : 'هاوئاهەنگی فیدراڵ'}:
              </span>
              <span dir="ltr" className="text-[#52B788] font-bold font-mono">100% SECURE</span>
            </div>

            {/* Immutable Blocks Metric */}
            <div className="flex items-center gap-2 bg-[#102235]/40 px-3 py-1 rounded border border-slate-800">
              <Database className="w-3.5 h-3.5 text-[#E0A96D] shrink-0" />
              <span className="text-slate-400 font-semibold">
                {lang === 'en' ? 'IMMUTABLE BLOCKS' : lang === 'ar' ? 'الكتل المحمية' : 'بلۆکە بێدەستکارییەکان'}:
              </span>
              <span dir="ltr" className="text-slate-200 font-bold font-mono">#10,453</span>
            </div>

            {/* Latency Metric */}
            <div className="flex items-center gap-2 bg-[#102235]/40 px-3 py-1 rounded border border-slate-800">
              <Activity className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="text-slate-400 font-semibold">
                {lang === 'en' ? 'FED-CORRIDOR LATENCY' : lang === 'ar' ? 'استجابة الممر الفيدرالي' : 'مۆنیتۆری خێرایی دەروازە'}:
              </span>
              <span dir="ltr" className="text-cyan-400 font-bold font-mono">12ms (AVG)</span>
            </div>

            {/* Uptime Metric */}
            <div className="flex items-center gap-2 bg-[#102235]/40 px-3 py-1 rounded border border-slate-800">
              <Shield className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="text-slate-400 font-semibold">
                {lang === 'en' ? 'UPTIME' : lang === 'ar' ? 'جاهزية الخدمة' : 'کارامەیی بەردەوام'}:
              </span>
              <span dir="ltr" className="text-[#E0A96D] font-bold font-mono">{uptime}%</span>
            </div>

          </div>

          <div className="text-[#E0A96D] font-bold text-xs uppercase tracking-wide leading-relaxed">
            {d.customStatus}
          </div>
        </div>
      </section>

      {/* MAIN APPLICATION CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 flex flex-col gap-6">

        {/* ==================== TAB 1: COMMAND CENTER ==================== */}
        {activeTab === 'command-center' && (
          <div className="animate-fade-in">
            <NationalCommandCenter lang={lang} />
          </div>
        )}

        {/* ==================== TAB 2: SOVEREIGN ARCHITECTURAL ATLAS ==================== */}
        {activeTab === 'blueprints' && (
          <div className="bg-[#111e2e]/90 p-5 lg:p-6 rounded-xl border border-slate-800/80 shadow-lg animate-fade-in flex flex-col gap-6">
            
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-lg font-display font-semibold text-slate-100 flex items-center gap-2">
                <Layers className="text-[#cca553]" />
                {lang === 'en' ? 'Sovereign Digital Infrastructure - Master Architect Blueprint Suite' : lang === 'ar' ? 'البنية التحتية القيادية الرقمية - مخططات المكتَب الهندسي الاستراتيجي العيادي' : 'ژێرخانی دیجیتاڵیی هەمەلایەن - نەخشەسازی سەرەکی ئەندازیاری نیشتمانیی'}
              </h2>
              <p className="text-slate-400 text-xs mt-1">
                {lang === 'en' ? 'Explore the formal enterprise-grade system diagrams prepared by the Chief enterprise and systems architects for the Republic of Iraq Trade & Customs Ecosystem.' : lang === 'ar' ? 'استطلع مخططات النمذجة التقنية لجمهورية العراق المعدة من قبل المهندسين والمستشارين الفنيين لبوابة المنافذ الموحدة والمكوس.' : 'سەیری نەخشەسازی فەرمیی نیشتمانیی بکە کە لە لایەن گەورە ئەندازیارانی عێراق ئامادەکراوە بۆ هەمەجۆریی سیستەمی دەروازەی سنووری نیشتمانیی.'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              
              {/* Left sidebar directory selector */}
              <div className="lg:col-span-1 flex flex-col gap-1">
                <h3 className="text-xs uppercase tracking-wider text-slate-400 font-mono mb-2 px-2 font-bold">
                  {lang === 'en' ? 'Cabinet Blueprints (A-Z)' : lang === 'ar' ? 'مخططات مجلس الوزراء (أ-ي)' : 'نەخشەکانی کابینەی حکومەت'}
                </h3>
                {BLUEPRINT_METADATA.map((bp) => (
                  <button
                    key={bp.id}
                    onClick={() => setActiveBlueprintId(bp.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                      activeBlueprintId === bp.id 
                        ? 'bg-[#1a2c42] text-white border-l-4 border-[#cca553] shadow' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-[#0c1521]'
                    }`}
                  >
                    {bp.title[lang]}
                  </button>
                ))}
              </div>

              {/* Right column view area for Selected Blueprint */}
              <div className="lg:col-span-3 bg-slate-950/85 rounded-xl border border-slate-800/80 p-5 md:p-6 flex flex-col gap-6">
                
                {/* Meta details */}
                <div>
                  <h3 className="text-base font-display font-semibold text-[#cca553] flex items-center gap-2">
                    <BookOpen className="w-4.5 h-4.5" />
                    {BLUEPRINT_METADATA.find(b => b.id === activeBlueprintId)?.title[lang]}
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed mt-2 p-3 bg-slate-900/60 rounded border-l-2 border-[#cca553]/60 italic font-mono">
                    "{BLUEPRINT_METADATA.find(b => b.id === activeBlueprintId)?.desc[lang]}"
                  </p>
                </div>

                {/* SVG Visualizations Render */}
                <div className="bg-[#0c1421] rounded-xl p-4 md:p-6 border border-slate-800 shadow-inner flex items-center justify-center min-h-[300px]">
                  
                  {activeBlueprintId === 'system-context' && (
                    <svg viewBox="0 0 800 400" className="w-full max-w-[650px] h-auto font-mono text-[10px] text-slate-300">
                      {/* Grid background representation */}
                      <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(207, 168, 94, 0.04)" strokeWidth="1"/>
                        </pattern>
                      </defs>
                      <rect width="800" height="400" fill="url(#grid)" rx="8"/>

                      {/* CORE IDG GATEWAY SYSTEM */}
                      <g transform="translate(300, 150)">
                        <rect x="0" y="0" width="200" height="100" rx="6" fill="#111e2e" stroke="#cca553" strokeWidth="2" />
                        <text x="100" y="35" textAnchor="middle" fill="#cca553" fontWeight="bold" fontSize="12">IDG DIGITAL GATEWAY</text>
                        <text x="100" y="55" textAnchor="middle" fill="#94a3b8" fontSize="9">Iraq Core Sovereign Core</text>
                        <text x="100" y="75" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold">● ACTIVE & SECURED</text>
                      </g>

                      {/* EXTERNAL Actor 1: Importer Systems */}
                      <g transform="translate(40, 60)">
                        <rect x="0" y="0" width="160" height="50" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1"/>
                        <text x="80" y="22" textAnchor="middle" fill="#f8fafc" fontWeight="medium">Importers & Carrier Fleets</text>
                        <text x="80" y="38" textAnchor="middle" fill="#64748b">Digital Manifest submission</text>
                      </g>

                      {/* EXTERNAL Actor 2: CBI */}
                      <g transform="translate(600, 60)">
                        <rect x="0" y="0" width="160" height="50" rx="4" fill="#1e293b" stroke="#eab308" strokeWidth="1"/>
                        <text x="80" y="22" textAnchor="middle" fill="#f8fafc" fontWeight="medium">Central Bank of Iraq (CBI)</text>
                        <text x="80" y="38" textAnchor="middle" fill="#eab308">Wire compliance verification</text>
                      </g>

                      {/* EXTERNAL Actor 3: KRG & Baghdad Min of Finance */}
                      <g transform="translate(600, 290)">
                        <rect x="0" y="0" width="160" height="50" rx="4" fill="#1e293b" stroke="#cca553" strokeWidth="1"/>
                        <text x="80" y="22" textAnchor="middle" fill="#f8fafc" fontWeight="medium">Federal Ministry of Finance</text>
                        <text x="80" y="38" textAnchor="middle" fill="#cca553">Erbil-Baghdad unified sync</text>
                      </g>

                      {/* EXTERNAL Actor 4: Physical Ports Checkpoint Nodes */}
                      <g transform="translate(40, 290)">
                        <rect x="0" y="0" width="160" height="50" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="1"/>
                        <text x="80" y="22" textAnchor="middle" fill="#f8fafc" fontWeight="medium">Custom Checkpoints</text>
                        <text x="80" y="38" textAnchor="middle" fill="#10b981">Thermal Scanners & Gateways</text>
                      </g>

                      {/* CONNECTIONS & LINES */}
                      <path d="M 200 85 L 250 85 L 250 170 L 300 170" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4"/>
                      <circle cx="300" cy="170" r="3" fill="#64748b"/>
                      <text x="235" y="115" fill="#94a3b8" fontSize="8">Secure REST API</text>

                      {/* IDG Core -> CBI */}
                      <path d="M 500 180 L 550 180 L 550 85 L 600 85" fill="none" stroke="#eab308" strokeWidth="1.5"/>
                      <circle cx="600" cy="85" r="3" fill="#eab308"/>
                      <text x="540" y="145" fill="#eab308" fontSize="8">AML Check</text>

                      {/* IDG Core -> Federal Ministry */}
                      <path d="M 500 220 L 550 220 L 550 315 L 600 315" fill="none" stroke="#cca553" strokeWidth="1.5"/>
                      <circle cx="600" cy="315" r="3" fill="#cca553"/>
                      <text x="540" y="270" fill="#cca553" fontSize="8">Tariff sync</text>

                      {/* Checkpoint Nodes <-> IDG Core */}
                      <path d="M 200 315 L 250 315 L 250 220 L 300 220" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4"/>
                      <circle cx="300" cy="220" r="3" fill="#10b981"/>
                      <text x="215" y="270" fill="#10b981" fontSize="8">gRPC stream</text>
                    </svg>
                  )}

                  {activeBlueprintId === 'business-capabilities' && (
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[650px] font-sans">
                      <div className="bg-[#112235] p-4 rounded-lg border border-[#cca553]/30">
                        <h4 className="font-semibold text-slate-100 flex items-center gap-1.5 text-xs mb-2 text-[#cca553]">
                          <Shield className="w-4 h-4 text-[#cca553]" /> Customs Clearance Layer
                        </h4>
                        <ul className="text-xs text-slate-300 flex flex-col gap-1.5 font-mono">
                          <li>• Unified Tariff Computation (Decree 1984)</li>
                          <li>• Digitized Manifest Registry Management</li>
                          <li>• 8-digit HS Code Auto-Matching engine</li>
                          <li>• Instant Dual-Use licensing checks</li>
                        </ul>
                      </div>
                      <div className="bg-[#112235] p-4 rounded-lg border border-[#cca553]/30">
                        <h4 className="font-semibold text-slate-100 flex items-center gap-1.5 text-xs mb-2 text-[#cca553]">
                          <Activity className="w-4 h-4 text-[#cca553]" /> Legal Harmonization Portal
                        </h4>
                        <ul className="text-xs text-slate-300 flex flex-col gap-1.5 font-mono">
                          <li>• Erbil-Baghdad dynamic treaty compliance</li>
                          <li>• Central Sovereign Revenue Integration</li>
                          <li>• Customs Clearance mutual recognition</li>
                          <li>• Inter-provincial bypass auditing</li>
                        </ul>
                      </div>
                      <div className="bg-[#112235] p-4 rounded-lg border border-[#cca553]/30">
                        <h4 className="font-semibold text-slate-100 flex items-center gap-1.5 text-xs mb-2 text-[#cca553]">
                          <Database className="w-4 h-4 text-[#cca553]" /> Anti-Fraud & Compliance (AML)
                        </h4>
                        <ul className="text-xs text-slate-300 flex flex-col gap-1.5 font-mono">
                          <li>• Central Bank of Iraq trade wire validation</li>
                          <li>• Unit valuation comparison (fraud check)</li>
                          <li>• High-risk carrier & importer matching</li>
                          <li>• Anomaly alarm triggers</li>
                        </ul>
                      </div>
                      <div className="bg-[#112235] p-4 rounded-lg border border-[#cca553]/30">
                        <h4 className="font-semibold text-slate-100 flex items-center gap-1.5 text-xs mb-2 text-[#cca553]">
                          <Cpu className="w-4 h-4 text-[#cca553]" /> Forecasting & Economic Intelligence
                        </h4>
                        <ul className="text-xs text-slate-300 flex flex-col gap-1.5 font-mono">
                          <li>• Strategic transit corridor modeling</li>
                          <li>• Dynamic tax revenue projections</li>
                          <li>• Trade volume forecasting with Gemini</li>
                          <li>• Regional logistics corridor telemetry</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {activeBlueprintId === 'ddd-boundaries' && (
                    <svg viewBox="0 0 800 400" className="w-full max-w-[650px] h-auto font-mono text-[10px] text-slate-300">
                      <rect width="800" height="400" fill="url(#grid)" rx="8"/>
                      
                      {/* Bounded Context 1: Core Manifest Evaluation */}
                      <g transform="translate(50, 60)">
                        <rect width="320" height="135" rx="6" fill="#131e2d" stroke="#1d4ed8" strokeWidth="2.5" strokeDasharray="3 3"/>
                        <rect width="180" height="25" rx="4" fill="#1d4ed8" x="10" y="-12"/>
                        <text x="100" y="5" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10">Core Manifest Context</text>
                        <text x="20" y="40" fill="#94a3b8">• Manifest aggregation entity</text>
                        <text x="20" y="65" fill="#94a3b8">• Validates cargo descriptions</text>
                        <text x="20" y="90" fill="#94a3b8">• Formulates digital customs clearance files</text>
                      </g>

                      {/* Bounded Context 2: Financial Integrity Core */}
                      <g transform="translate(420, 60)">
                        <rect width="320" height="135" rx="6" fill="#131e2d" stroke="#b45309" strokeWidth="2.5"/>
                        <rect width="180" height="25" rx="4" fill="#b45309" x="10" y="-12"/>
                        <text x="100" y="5" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10">Financial Settlement Sync</text>
                        <text x="20" y="40" fill="#f59e0b">• Central Bank wire validation value checks</text>
                        <text x="20" y="65" fill="#f59e0b">• Dynamic tariff calculation rules</text>
                        <text x="20" y="90" fill="#f59e0b">• Anti-money laundering tracking records</text>
                      </g>

                      {/* Bounded Context 3: Risk Intelligence & Ledgers */}
                      <g transform="translate(230, 230)">
                        <rect width="340" height="130" rx="6" fill="#131e2d" stroke="#10b981" strokeWidth="2.5"/>
                        <rect width="190" height="25" rx="4" fill="#10b981" x="10" y="-12"/>
                        <text x="105" y="5" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10">Risk Intelligence & Ledger</text>
                        <text x="20" y="40" fill="#a7f3d0">• Gemini-3.5 cognitive analysis and risks scores</text>
                        <text x="20" y="65" fill="#a7f3d0">• Iraqi Sovereign Ledger (Decentralized logs)</text>
                        <text x="20" y="90" fill="#a7f3d0">• Operational checkpoint route command hub</text>
                      </g>

                      {/* Inter-domain Shared kernel bridge */}
                      <path d="M 370 120 L 420 120" stroke="#cca553" strokeWidth="2"/>
                      <text x="395" y="110" textAnchor="middle" fill="#cca553" fontSize="8" fontWeight="bold">Shared SDK</text>
                    </svg>
                  )}

                  {activeBlueprintId === 'event-architecture' && (
                    <svg viewBox="0 0 800 400" className="w-full max-w-[650px] h-auto font-mono text-[10px] text-slate-300">
                      <rect width="800" height="400" fill="url(#grid)" rx="8"/>
                      
                      {/* Event Bus center stream */}
                      <rect x="50" y="180" width="700" height="40" rx="4" fill="#111e2e" stroke="#cca553" strokeWidth="2" />
                      <text x="400" y="205" textAnchor="middle" fill="#cca553" fontWeight="bold" fontSize="11" letterSpacing="0.2em">
                        APACHE KAFKA SOVEREIGN EVENT CONGO • MULTI-REGION HIGHWAY
                      </text>

                      {/* Event Producers/Publishers */}
                      <g transform="translate(80, 50)">
                        <rect width="180" height="60" rx="4" fill="#1e293b" stroke="#3b82f6" strokeWidth="1"/>
                        <text x="90" y="22" textAnchor="middle" fill="#ffffff" fontWeight="semibold">Manifest Portal</text>
                        <text x="90" y="42" textAnchor="middle" fill="#3b82f6">Publishes: ManifestSubmitted</text>
                        <path d="M 90 60 L 90 130" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3"/>
                      </g>

                      <g transform="translate(310, 50)">
                        <rect width="180" height="60" rx="4" fill="#1e293b" stroke="#eab308" strokeWidth="1"/>
                        <text x="90" y="22" textAnchor="middle" fill="#ffffff" fontWeight="semibold">CBI Gateway Portal</text>
                        <text x="90" y="42" textAnchor="middle" fill="#eab308">Publishes: CBTWireVerified</text>
                        <path d="M 90 60 L 90 130" stroke="#eab308" strokeWidth="1.5" strokeDasharray="3 3"/>
                      </g>

                      <g transform="translate(540, 50)">
                        <rect width="180" height="60" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="1"/>
                        <text x="90" y="22" textAnchor="middle" fill="#ffffff" fontWeight="semibold">Gemini Risk Engine</text>
                        <text x="90" y="42" textAnchor="middle" fill="#10b981">Publishes: RiskAudited</text>
                        <path d="M 90 60 L 90 130" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3"/>
                      </g>

                      {/* Consumers */}
                      <g transform="translate(200, 290)">
                        <rect width="180" height="60" rx="4" fill="#0f172a" stroke="#cca553" strokeWidth="1"/>
                        <text x="90" y="25" textAnchor="middle" fill="#cca553" fontWeight="bold">Sovereign Ledger Worker</text>
                        <text x="90" y="43" textAnchor="middle" fill="#94a3b8">Writes block log to Spanner</text>
                        <path d="M 90 0 L 90 -70" stroke="#cca553" strokeWidth="1.5"/>
                      </g>

                      <g transform="translate(440, 290)">
                        <rect width="180" height="60" rx="4" fill="#0f172a" stroke="#cca553" strokeWidth="1"/>
                        <text x="90" y="25" textAnchor="middle" fill="#cca553" fontWeight="bold">Notification System</text>
                        <text x="90" y="43" textAnchor="middle" fill="#94a3b8">Issues gateway release pass</text>
                        <path d="M 90 0 L 90 -70" stroke="#cca553" strokeWidth="1.5"/>
                      </g>
                    </svg>
                  )}

                  {/* Fallback for remaining blueprints */}
                  {!['system-context', 'business-capabilities', 'ddd-boundaries', 'event-architecture'].includes(activeBlueprintId) && (
                    <div className="text-center py-6 px-4">
                      <div className="w-16 h-16 rounded-full bg-[#111e2e] border border-[#cca553] flex items-center justify-center mx-auto mb-4 shadow ">
                        <Server className="w-7 h-7 text-[#cca553]" />
                      </div>
                      <h4 className="font-semibold text-slate-200 uppercase tracking-widest text-sm mb-1">
                        {lang === 'en' ? 'Sovereign Specification Detail' : lang === 'ar' ? 'تفاصيل المواصفات الفنية السيادية' : 'فۆرمی ووردەکارییەکانی ڕێبەرنامەی فەرمی'}
                      </h4>
                      <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
                        {lang === 'en' ? 'Full implementation blueprints, API specifications, database parameters, and server configurations are optimized as decoupled service structures below.' : lang === 'ar' ? 'مخططات التنفيذ الكاملة، ومواصفات واجهة برمجة التطبيقات (API)، ومعلمات قاعدة البيانات، وتكوينات الخادم مُحسَّنة كبنى خدمات منفصلة أدناه.' : 'نەخشەکانی جێبەجێکردنی تەواو، فۆرم و چوارچێوەی API، داتابەیسەکان، و ڕێکخستنی سێرڤەرەکان وەکو سێرڤسی سەربەخۆ دانراون.'}
                      </p>
                      <div className="inline-block bg-[#1a2c42] border border-slate-700/60 rounded px-3 py-1.5 text-xs text-slate-300 font-mono">
                        {lang === 'en' ? 'Security Clearance Certified • Zero-Trust Interoperability Handled' : lang === 'ar' ? 'مصادق عليه أمنياً • جرت صياغة التوافقية وفق مبدأ صفر ثقة' : 'مۆری ڕێگەپێدانی ئاسایش • پارێزراو بە متمانەی گشتی سفر'}
                      </div>
                    </div>
                  )}

                </div>

                {/* Key architectural requirements specifications lists */}
                <div className="mt-2">
                  <h4 className="text-sm font-semibold text-slate-100 uppercase tracking-wider mb-3">
                    {lang === 'en' ? 'Architectural Integrity Rules' : lang === 'ar' ? 'ضوابط السلامة والنزاهة الهندسية' : 'یاساکانی سەلامەتی و یەکپارچەیی ژێرخان'}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {BLUEPRINT_METADATA.find(b => b.id === activeBlueprintId)?.points[lang].map((pt, idx) => (
                      <div key={idx} className="bg-slate-900/40 p-3.5 rounded-lg border border-slate-800/80 flex items-start gap-2.5">
                        <span className="bg-[#cca553]/15 text-[#cca553] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed font-mono">{pt}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ==================== TAB 3: COGNITIVE CARGO AUDITOR ==================== */}
        {activeTab === 'ai-auditor' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            
            {/* Left 1 Column: Presets & Form Data Fields */}
            <div className="lg:col-span-1 bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800/80 shadow-md">
              <div className="mb-5">
                <span className="text-xs text-[#cca553] uppercase font-mono block">Customs Audit Core</span>
                <h2 className="text-lg font-display font-medium text-slate-100 mt-0.5">
                  Manifest Audit Parameters
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Load an authorized federal merchant trade manifest preset, or override values manually to audit legal classification and find under-invoiced tax evasion.
                </p>
              </div>

              {/* Presets Selection */}
              <div className="mb-5 bg-slate-950/60 p-4 rounded-lg border border-slate-800">
                <label className="text-xs text-slate-400 font-mono uppercase block mb-2">{d.manifestPreset}</label>
                <div className="flex flex-col gap-2">
                  {CARGO_PRESETS.map((preset) => {
                    const presetId = preset.manifestId;
                    return (
                      <button
                        key={presetId}
                        onClick={() => handlePresetSelect(presetId)}
                        className={`w-full text-left p-2.5 rounded text-xs transition-all border flex flex-col cursor-pointer ${
                          selectedPreset === presetId 
                            ? 'bg-[#1a2c42] border-[#E0A96D] text-white shadow-lg' 
                            : 'bg-[#101925] border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <span className="font-mono font-semibold text-slate-300 text-[11px]">{presetId}</span>
                          <span className="text-[10px] text-[#E0A96D]/90 italic font-mono">{preset.originCountry}</span>
                        </div>
                        <span className="truncate max-w-[240px] text-slate-400 font-medium text-[11px] mt-1">
                          {preset.importerName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Input fields */}
              <div className="flex flex-col gap-4 font-mono text-xs font-medium">
                <div className="text-slate-400 text-[10px] uppercase font-mono my-1 border-b border-slate-800 pb-1">
                  {d.orCustomText}
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Document Manifest ID</label>
                  <input 
                    type="text" 
                    value={customManifest.manifestId}
                    onChange={(e) => setCustomManifest(prev => ({ ...prev, manifestId: e.target.value }))}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-[#cca553]"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Importer Corporate Name</label>
                  <input 
                    type="text" 
                    value={customManifest.importerName}
                    onChange={(e) => setCustomManifest(prev => ({ ...prev, importerName: e.target.value }))}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-[#cca553]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-400 block mb-1">Origin Country</label>
                    <input 
                      type="text" 
                      value={customManifest.originCountry}
                      onChange={(e) => setCustomManifest(prev => ({ ...prev, originCountry: e.target.value }))}
                      className="w-full bg-slate-950/80 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-[#cca553]"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Dest. City</label>
                    <input 
                      type="text" 
                      value={customManifest.destinationCity}
                      onChange={(e) => setCustomManifest(prev => ({ ...prev, destinationCity: e.target.value }))}
                      className="w-full bg-slate-950/80 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-[#cca553]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-400 block mb-1">Declared HS Code</label>
                    <input 
                      type="text" 
                      value={customManifest.hsCodeDeclared}
                      onChange={(e) => setCustomManifest(prev => ({ ...prev, hsCodeDeclared: e.target.value }))}
                      className="w-full bg-slate-950/80 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-[#cca553]"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Logistics Category</label>
                    <input 
                      type="text" 
                      value={customManifest.goodsCategory}
                      onChange={(e) => setCustomManifest(prev => ({ ...prev, goodsCategory: e.target.value }))}
                      className="w-full bg-slate-950/80 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-[#cca553]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-400 block mb-1">Valuation (USD)</label>
                    <input 
                      type="number" 
                      value={customManifest.declaredValueUSD || 0}
                      onChange={(e) => setCustomManifest(prev => ({ ...prev, declaredValueUSD: Number(e.target.value) }))}
                      className="w-full bg-slate-950/80 border border-slate-800 rounded p-2 text-slate-100 focus:outline-none focus:border-[#cca553] font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Weight (Tons)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={customManifest.weightTons || 0}
                      onChange={(e) => setCustomManifest(prev => ({ ...prev, weightTons: Number(e.target.value) }))}
                      className="w-full bg-slate-950/80 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-[#cca553]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Cargo / Physical Description</label>
                  <textarea 
                    value={customManifest.description}
                    onChange={(e) => setCustomManifest(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded p-2 text-slate-200 focus:outline-none focus:border-[#cca553] text-xs resize-none font-sans"
                  />
                </div>

                <button
                  onClick={handleInitiateAudit}
                  disabled={isAuditing}
                  className="w-full bg-[#cca553] text-[#111e2e] py-3 px-4 rounded-lg font-semibold transition-all hover:bg-[#b08e48] disabled:bg-slate-800 disabled:text-slate-500 font-sans tracking-wide uppercase text-xs flex items-center justify-center gap-2 mt-2 shadow-lg"
                >
                  {isAuditing ? (
                    <>
                      <RefreshCw className="animate-spin w-4 h-4" />
                      {d.analyzing}
                    </>
                  ) : (
                    <>
                      <Cpu className="w-4.5 h-4.5" />
                      {d.analyzeButton}
                    </>
                  )}
                </button>
              </div>

            </div>

            {/* Right 2 Columns: Audit output reports */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              <div className="bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800/80 shadow-md min-h-[500px] flex flex-col justify-between">
                
                {(!auditResult && !isAuditing) && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
                    <div className="p-4 bg-slate-950/60 rounded-full border border-slate-800 mb-4 animate-pulse">
                      <Cpu className="w-12 h-12 text-[#cca553]" />
                    </div>
                    <h3 className="font-semibold text-slate-200 uppercase tracking-widest text-sm mb-1">
                      Cognitive Audit Brain Standby
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-4">
                      Configure your cargo parameters on the left and trigger the sovereign AI compliance algorithm to instantly map tariffs and identify contraband discrepancies under Iraqi Law No. 23.
                    </p>
                    <div className="flex items-center gap-2 text-xs bg-slate-950/50 px-3 py-1.5 rounded text-amber-400 border border-amber-500/20 font-mono">
                      <Shield className="w-4 h-4 shrink-0" />
                      FED-CLEAR SECURITY SYSTEM READY
                    </div>
                  </div>
                )}

                {isAuditing && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
                    <div className="p-4 bg-[#cca553]/10 rounded-full border border-[#cca553]/40 mb-4 animate-spin">
                      <RefreshCw className="w-10 h-10 text-[#cca553]" />
                    </div>
                    <h3 className="font-semibold text-[#cca553] uppercase tracking-widest text-sm mb-1 animate-pulse">
                      Processing Custom Risk Brain (Gemini)
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-4 font-mono">
                      De-crypting cargo specifications, cross-checking central tariff registries, and analyzing letter-of-credit values with the Central Bank of Iraq...
                    </p>
                    <div className="text-[10px] text-slate-500 font-mono flex flex-col gap-1 items-center">
                      <span>• Algorithm Protocol: IQ-CUSTOMS-DEC2026</span>
                      <span>• Sovereign Database mesh: Synced (Erbil ⇄ Baghdad)</span>
                    </div>
                  </div>
                )}

                {auditResult && (
                  <div className="flex flex-col gap-6">
                    
                    {/* Audit Top summary */}
                    <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] text-[#cca553] uppercase font-mono tracking-widest font-semibold block">
                          FEDERAL INTELLIGENCE CLEARANCE
                        </span>
                        <h3 className="text-base font-display font-semibold text-slate-100 mt-0.5">
                          {d.resultTitle}
                        </h3>
                        {auditResult.notice && (
                          <span className="inline-block mt-2 text-[10px] text-amber-400 bg-amber-950/20 px-2 py-0.5 rounded border border-amber-500/10 font-mono">
                            {auditResult.notice}
                          </span>
                        )}
                        {auditResult.isDemoMode && !auditResult.notice && (
                          <span className="inline-block mt-1 text-[10px] text-cyan-400 bg-cyan-950/20 px-2 py-0.5 rounded border border-cyan-500/10 font-mono">
                            Demo Mode: Local Fallback Output
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <span className="text-[10px] text-slate-500 block uppercase font-mono">Verdict</span>
                          <span className={`text-base font-bold uppercase ${
                            auditResult.status === 'APPROVED' ? 'text-emerald-400' : 'text-amber-500'
                          }`}>
                            {auditResult.status}
                          </span>
                        </div>
                        <div className={`p-2 rounded-lg border flex items-center justify-center ${
                          auditResult.status === 'APPROVED' ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400' : 'bg-amber-950/20 border-[#cca553]/30 text-amber-400'
                        }`}>
                          {auditResult.status === 'APPROVED' ? <Check className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                        </div>
                      </div>
                    </div>

                    {/* Numeric Indicators */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      
                      <div className="bg-[#0a111a] p-4 rounded-lg border border-slate-800">
                        <span className="text-slate-500 text-[10px] uppercase font-mono block mb-1">
                          Calculated Sovereign Duty
                        </span>
                        <span className="text-base font-extrabold text-[#cca553] font-mono block">
                          {auditResult.tariffCalculatedIQD.toLocaleString()} IQD
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          ({auditResult.tariffPercentage}% of declared value)
                        </span>
                      </div>

                      <div className="bg-[#0a111a] p-4 rounded-lg border border-slate-800">
                        <span className="text-slate-500 text-[10px] uppercase font-mono block mb-1">
                          Threat Integrity Index
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={`text-base font-extrabold font-mono block ${
                            auditResult.riskScore > 50 ? 'text-red-400' : auditResult.riskScore > 20 ? 'text-amber-400' : 'text-emerald-400'
                          }`}>
                            {auditResult.riskScore} / 100
                          </span>
                          <span className="text-[9px] text-slate-500 font-mono uppercase">
                            {auditResult.riskScore > 50 ? 'HIGH RISK' : 'LOW RISK'}
                          </span>
                        </div>
                        <div className="w-full bg-slate-800/80 rounded-full h-1.5 mt-1.5 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              auditResult.riskScore > 50 ? 'bg-red-500' : auditResult.riskScore > 20 ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${auditResult.riskScore}%` }}
                          />
                        </div>
                      </div>

                      <div className="bg-[#0a111a] p-4 rounded-lg border border-slate-800">
                        <span className="text-slate-500 text-[10px] uppercase font-mono block mb-1">
                          HS-Code Verification
                        </span>
                        <span className="text-sm font-bold text-slate-100 font-mono block">
                          {auditResult.hsCodeVerification.suggestedHSCode}
                        </span>
                        <span className={`text-[10px] font-mono ${
                          auditResult.hsCodeVerification.isMatch ? 'text-emerald-400' : 'text-amber-500'
                        }`}>
                          {auditResult.hsCodeVerification.isMatch ? '✓ Matching Verified' : '⚠ Discrepancy Found'}
                        </span>
                      </div>

                    </div>

                    {/* Threat / Risk Points list */}
                    <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800/85">
                      <h4 className="text-xs font-semibold uppercase font-mono text-slate-300 mb-2 flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-amber-400" />
                        Risk Integrity Log Entries
                      </h4>
                      <ul className="flex flex-col gap-2 font-mono text-xs">
                        {auditResult.riskAnalysis.map((item, idx) => (
                          <li key={idx} className="flex gap-2 text-slate-300 leading-relaxed">
                            <span className="text-amber-400 shrink-0">■</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Border Action Routing Recommendation */}
                    <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800/85">
                      <h4 className="text-xs font-semibold uppercase font-mono text-slate-300 mb-1 flex items-center gap-1.5">
                        <Server className="w-3.5 h-3.5 text-emerald-400" />
                        Border Command Action Routing Recommendation
                      </h4>
                      <p className="text-xs text-emerald-400 font-mono leading-relaxed bg-[#0a111a] p-2.5 rounded border-l-2 border-emerald-500">
                        {auditResult.routingRecommendation}
                      </p>
                      <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
                        <span>Federal Compliance: {auditResult.complianceProtocolUsed}</span>
                      </div>
                    </div>

                    {/* Bilingual Translations for regional governors */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-800/80 pt-4 text-xs font-mono">
                      
                      {/* Arabic translation */}
                      <div className="bg-slate-950/40 p-4 rounded border border-slate-800 text-right" dir="rtl">
                        <h4 className="text-amber-400 font-bold mb-2 font-sans text-xs">تقرير الأمن والتدقيق الجمركي الفدرالي</h4>
                        <p className="text-slate-300/90 leading-relaxed text-[11px]">
                          {auditResult.arabicSummary || "تم فحص الشحنة ومطابقة البنك المركزي العراقي بنجاح."}
                        </p>
                      </div>

                      {/* Kurdish translation */}
                      <div className="bg-slate-950/40 p-4 rounded border border-slate-800">
                        <h4 className="text-amber-400 font-bold mb-2 font-sans text-xs">ڕاپۆرتی سەرەکی لێکۆڵینەوە بازرگانی نیشتمانی</h4>
                        <p className="text-slate-300/90 leading-relaxed text-[11px]">
                          {auditResult.kurdishSummary || "شتومەکەکە پشکنینی بۆ کراوە بە پشتبەستن بە یاسای گومرگی فیدراڵی."}
                        </p>
                      </div>

                    </div>

                  </div>
                )}

                <div className="text-[10px] text-slate-500 text-center font-mono border-t border-slate-800 pt-3 mt-4">
                  REPUBLIC OF IRAQ CUSTOMS AUDIT BRAIN • SECURED DECENTRALIZED DATAFLOW
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ==================== TAB 4: SOVEREIGN POLICY ADVISOR ==================== */}
        {activeTab === 'policy-advisor' && (
          <div className="max-w-4xl mx-auto bg-[#111e2e]/95 rounded-xl border border-slate-800/80 shadow-lg p-5 lg:p-6 flex flex-col gap-4 animate-fade-in">
            
            <div className="border-b border-slate-800 pb-3 mb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div>
                <span className="text-xs text-[#cca553] uppercase font-mono block">Unified Legal Repository</span>
                <h2 className="text-lg font-display font-medium text-slate-100 mt-0.5">
                  {d.policyAdvisorTitle}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Query the sovereign policy core on trade treaties, custom regulations, KRG tariffs agreements, and anti-fraud protocols.
                </p>
              </div>
              <span className="bg-[#cca553]/10 text-[#cca553] border border-[#cca553]/20 px-2.5 py-1 rounded text-xs font-mono uppercase tracking-wide shrink-0">
                Authorized Official
              </span>
            </div>

            {/* Quick suggested queries list buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Suggested Audit Questions:</span>
              <button 
                onClick={() => {
                  setChatInput('Explain the Baghdad-Erbil customs agreements and KRG checkpoint revenue model.');
                  handleSendChat('Explain the Baghdad-Erbil customs agreements and KRG checkpoint revenue model.');
                }}
                className="bg-[#1a2c42] hover:bg-[#112032] border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded text-[11px] font-mono transition-all selection-none"
              >
                Erbil-Baghdad Custom Treaty
              </button>
              <button 
                onClick={() => {
                  setChatInput('What are the Central Bank of Iraq wire regulations for under-invoicing and currency arbitrage prevention?');
                  handleSendChat('What are the Central Bank of Iraq wire regulations for under-invoicing and currency arbitrage prevention?');
                }}
                className="bg-[#1a2c42] hover:bg-[#112032] border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded text-[11px] font-mono transition-all selection-none"
              >
                CBI Anti-Money Laundering
              </button>
              <button 
                onClick={() => {
                  setChatInput('Clarify the tariff rate structure for imported machinery under Chapter 84 of Iraqi Customs Law No. 23.');
                  handleSendChat('Clarify the tariff rate structure for imported machinery under Chapter 84 of Iraqi Customs Law No. 23.');
                }}
                className="bg-[#1a2c42] hover:bg-[#112032] border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded text-[11px] font-mono transition-all selection-none"
              >
                Custom Law Tariff Brackets
              </button>
            </div>

            {/* Chat message display window */}
            <div className="bg-slate-950/80 rounded-xl border border-slate-800 shadow-inner p-4 min-h-[350px] max-h-[500px] overflow-y-auto flex flex-col gap-4">
              {chatHistory.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex flex-col gap-1 max-w-[85%] ${
                    msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                  }`}
                >
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
                    {msg.sender === 'user' ? 'Authorized Officer' : 'Sovereign Knowledge Base'} 
                    {msg.isDemo && ' (Cache Vault)'}
                  </span>
                  
                  <div className={`p-3.5 rounded-lg text-slate-200 leading-relaxed text-xs font-mono whitespace-pre-line ${
                    msg.sender === 'user' 
                      ? 'bg-[#1a2c42]/80 border border-slate-700 text-right rounded-br-none' 
                      : 'bg-[#122033]/90 border border-[#cca553]/20 rounded-bl-none prose prose-invert max-w-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isChatLoading && (
                <div className="self-start flex items-center gap-2.5 bg-[#122033]/50 border border-slate-800 p-3 rounded-lg text-xs text-slate-400 font-mono animate-pulse">
                  <RefreshCw className="animate-spin w-4 h-4 text-[#cca553]" />
                  Consulting Sovereign trade intelligence matrices...
                </div>
              )}
            </div>

            {/* Input submission box */}
            <div className="flex gap-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendChat();
                }}
                disabled={isChatLoading}
                placeholder="Ask instructions about Iraq Customs Law 23, KRG treaty parameters, Al-Faw development hubs..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 focus:outline-none focus:border-[#cca553] text-xs font-mono"
              />
              <button 
                onClick={() => handleSendChat()}
                disabled={isChatLoading || !chatInput.trim()}
                className="bg-[#cca553] text-[#111e2e] hover:bg-[#b08e48] transition-all px-5 py-3 rounded-lg font-semibold flex items-center gap-2 shrink-0 disabled:bg-slate-800 disabled:text-slate-500 uppercase text-xs"
              >
                <Send className="w-4 h-4" />
                {d.sendButton}
              </button>
            </div>

            <div className="text-[10px] text-slate-500 text-center font-mono pt-1">
              DECISION INTEGRITY SECURED DIRECTLY VIA THE IRAQI CENTRAL STATE DATABASES
            </div>

          </div>
        )}

        {/* ==================== TAB 5: ECONOMIC CORRIDOR FORECASTER ==================== */}
        {activeTab === 'economic-corridors' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
            
            {/* Left 1 Column: Inputs and Parameters controls */}
            <div className="lg:col-span-1 bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800/80 shadow-md">
              <div className="mb-5">
                <span className="text-xs text-[#cca553] uppercase font-mono block">Econometric Trade Simulator</span>
                <h2 className="text-lg font-display font-medium text-slate-100 mt-0.5">
                  Macro Planning Parameters
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Tune sovereign variables, trade corridor focuses, and Central Bank security modes to run AI forecasting models predicting duty volumes and revenue captured.
                </p>
              </div>

              {/* Selection Inputs */}
              <div className="flex flex-col gap-4 font-mono text-xs">
                
                <div>
                  <label className="text-slate-400 block mb-1.5">{d.corridorDropdown}</label>
                  <select 
                    value={selectedCorridor}
                    onChange={(e) => setSelectedCorridor(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded p-2.5 text-slate-200 focus:outline-none focus:border-[#cca553]"
                  >
                    <option value="al-faw-dev-road">Development Road (Grand Faw Port ⇄ Turkey)</option>
                    <option value="basra-gulf-maritime">Basra Arabian Gulf Maritime Corridor</option>
                    <option value="ibrahim-khalil-land">Ibrahim Khalil land highway route (Europe - Iraq)</option>
                    <option value="jordan-trebil-highway">Trebil transit corridor (Jordan ⇄ Baghdad)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1.5">Border Customs Oversight Style</label>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2 p-2.5 rounded bg-slate-950/50 border border-slate-800 cursor-pointer hover:border-slate-700 transition">
                      <input 
                        type="radio" 
                        name="policyLevel" 
                        value="harmonized" 
                        checked={policyLevel === 'harmonized'}
                        onChange={() => setPolicyLevel('harmonized')}
                        className="text-[#cca553] focus:ring-0"
                      />
                      <div>
                        <span className="text-slate-100 font-semibold block text-xs">Harmonized Unified Trade</span>
                        <span className="text-[10px] text-slate-400 block">Baghdad-Erbil unified clearing, green-channel prioritizations.</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 rounded bg-slate-950/50 border border-slate-800 cursor-pointer hover:border-slate-700 transition">
                      <input 
                        type="radio" 
                        name="policyLevel" 
                        value="hardened" 
                        checked={policyLevel === 'hardened'}
                        onChange={() => setPolicyLevel('hardened')}
                        className="text-[#cca553] focus:ring-0"
                      />
                      <div>
                        <span className="text-slate-100 font-semibold block text-xs">Hardened Sovereign Security</span>
                        <span className="text-[10px] text-slate-400 block">Strict 100% physical checks, high-frequency anti-smuggling audits.</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1.5">CBI Dollar Currency Surveillance Mode</label>
                  <select 
                    value={cbiSurveillance}
                    onChange={(e) => setCbiSurveillance(e.target.value)}
                    className="w-full bg-slate-950/80 border border-slate-800 rounded p-2.5 text-slate-200 focus:outline-none focus:border-[#cca553]"
                  >
                    <option value="standard">Standard Digital Matching (LC validations)</option>
                    <option value="strict">Strict Cross-Border Price auditing (Stop currency flight)</option>
                    <option value="decoupled">Independent Settlement Clearings (Regional exemptions)</option>
                  </select>
                </div>

                <button
                  onClick={handleTriggerForecast}
                  disabled={isPredicting}
                  className="w-full bg-[#cca553] text-[#111e2e] py-3 px-4 rounded-lg font-semibold transition-all hover:bg-[#b08e48] disabled:bg-slate-800 disabled:text-slate-500 font-sans tracking-wide uppercase text-xs flex items-center justify-center gap-2 mt-2 shadow-lg"
                >
                  {isPredicting ? (
                    <>
                      <RefreshCw className="animate-spin w-4 h-4" />
                      {d.predicting}
                    </>
                  ) : (
                    <>
                      <TrendingUp className="w-4.5 h-4.5" />
                      {d.generateForecast}
                    </>
                  )}
                </button>

              </div>
            </div>

            {/* Right 2 Columns: Outputs and Econometric Trends */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              
              <div className="bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800/80 shadow-md min-h-[480px] flex flex-col justify-between">
                
                {!predictionResult && !isPredicting && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
                    <div className="p-4 bg-slate-900/60 rounded-full border border-slate-800 mb-4 animate-pulse">
                      <TrendingUp className="w-12 h-12 text-[#cca553]" />
                    </div>
                    <h3 className="font-semibold text-slate-200 uppercase tracking-widest text-sm mb-1">
                      Economic Corridor Simulator Standby
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-4">
                      Adjust macro policy levels, select a corridor trade lane on the left and synthesize future planning projections for the National Treasury.
                    </p>
                  </div>
                )}

                {isPredicting && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
                    <div className="p-4 bg-[#cca553]/10 rounded-full border border-[#cca553]/40 mb-4 animate-spin">
                      <RefreshCw className="w-10 h-10 text-[#cca553]" />
                    </div>
                    <h3 className="font-semibold text-[#cca553] uppercase tracking-widest text-sm mb-1 animate-pulse">
                      Synthesizing Econometric Prognostic Models...
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-2 font-mono">
                      Running multi-variable linear predictions on custom tariffs captured and estimating border congestion delays from historical trade patterns...
                    </p>
                  </div>
                )}

                {predictionResult && (
                  <div className="flex flex-col gap-6">
                    
                    <div className="border-b border-slate-800 pb-3">
                      <span className="text-[10px] text-[#cca553] uppercase font-mono tracking-widest font-semibold block">
                        Macro Economic Forecast Report Context
                      </span>
                      <h3 className="text-base font-display font-semibold text-slate-100 mt-0.5">
                        {d.economicCorridorTitle}
                      </h3>
                      {predictionResult.isDemoMode && (
                        <span className="inline-block mt-1 text-[10px] text-cyan-400 bg-cyan-950/20 px-2 py-0.5 rounded border border-cyan-500/10 font-mono">
                          Economic Simulator fallback prediction report loaded
                        </span>
                      )}
                    </div>

                    {/* Volume and Duty capture deltas */}
                    <div className="grid grid-cols-2 gap-4">
                      
                      <div className="bg-[#0a111a] p-4 rounded-lg border border-slate-800">
                        <span className="text-slate-500 text-[10px] uppercase font-mono block mb-1">
                          {d.borderTradeFlow}
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className={`text-2xl font-extrabold font-mono ${
                            predictionResult.volumeChangePercentage >= 0 ? 'text-emerald-400' : 'text-red-400'
                          }`}>
                            {predictionResult.volumeChangePercentage >= 0 ? '+' : ''}{predictionResult.volumeChangePercentage}%
                          </span>
                          <span className="text-xs text-slate-400 font-sans">Projected Change</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1.5 font-mono">
                          Logistics transit velocity across nodes
                        </p>
                      </div>

                      <div className="bg-[#0a111a] p-4 rounded-lg border border-slate-800">
                        <span className="text-slate-500 text-[10px] uppercase font-mono block mb-1">
                          {d.predictedRevenue}
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-extrabold text-[#cca553] font-mono">
                            {predictionResult.revenueChangePercentage >= 0 ? '+' : ''}{predictionResult.revenueChangePercentage}%
                          </span>
                          <span className="text-xs text-slate-400 font-sans">Duty Captured</span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1.5 font-mono text-[#cca553]/80">
                          Captured treasury leakage optimization
                        </p>
                      </div>

                    </div>

                    {/* Comprehensive Trend writeup */}
                    <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800">
                      <h4 className="text-xs font-semibold uppercase font-mono text-slate-300 mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#cca553]" />
                        Federal Treasury Strategic Trend Analysis
                      </h4>
                      <p className="text-xs text-slate-300 font-mono leading-relaxed bg-[#0a111a] p-3 rounded border-l-2 border-[#cca553]/60 italic">
                        "{predictionResult.treasuryTrendAnalysis}"
                      </p>
                    </div>

                    {/* Executive Action Directive */}
                    <div className="bg-slate-950/80 p-4 rounded-lg border border-slate-800">
                      <h4 className="text-xs font-semibold uppercase font-mono text-slate-300 mb-2 flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-emerald-400" />
                        Federal Cabinet Executive Planning Directive
                      </h4>
                      <div className="bg-[#020617] border border-emerald-500/20 p-3 rounded text-emerald-400 text-xs font-mono leading-relaxed">
                        <strong>DIRECTIVE ST/2026-66:</strong> {predictionResult.executiveActionDirective}
                      </div>
                    </div>

                  </div>
                )}

                <div className="text-[10px] text-slate-500 text-center font-mono border-t border-slate-800 pt-3 mt-4">
                  CENTRAL ECONOMIC PREDICTION BRAIN • GOVERNMENT MACROECONOMIC OPTIMIZATIONS
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ==================== TAB 6: DIGITAL BORDER ECOSYSTEM WORKFLOWS ==================== */}
        {activeTab === 'ecosystem' && (
          <div className="animate-fade-in">
            <EcosystemWorkflows lang={lang} />
          </div>
        )}

        {/* ==================== TAB 7: SOVEREIGN AI BRAIN ==================== */}
        {activeTab === 'ai-brain' && (
          <div className="animate-fade-in">
            <SovereignAIBrain lang={lang} />
          </div>
        )}

        {/* ==================== TAB 8: SOVEREIGN ZERO TRUST SECURITY ==================== */}
        {activeTab === 'security' && (
          <div className="animate-fade-in">
            <SecurityCommandCenter lang={lang} />
          </div>
        )}

        {/* ==================== TAB 9: SOVEREIGN NATIONAL DATA FABRIC ==================== */}
        {activeTab === 'data-fabric' && (
          <div className="animate-fade-in">
            <NationalDataCommandCenter lang={lang} />
          </div>
        )}

        {/* ==================== TAB 10: SOVEREIGN TRUST FRAMEWORK ==================== */}
        {activeTab === 'sovereign-trust' && (
          <div className="animate-fade-in">
            <NationalIdentityCommandCenter lang={lang} />
          </div>
        )}

      </main>

      {/* Sovereign National Institutional footer */}
      <footer className="bg-[#0a111a] border-t border-slate-800/80 py-6 mt-10 text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#cca553] shrink-0" />
            <div>
              <p className="text-slate-300 font-semibold font-mono">IRAQ DIGITAL GATEWAY (IDG) • SOVEREIGN NATIONAL SECURITY STREAMS</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Republic of Iraq & Council of Ministers Unified Custom Interoperability Infrastructure</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-500 font-mono text-[10px] text-right">
            <span>Baghdad Central Hub • 01:27 AST</span>
            <span>Erbil Regional Gateway • Standby Secure</span>
            <span>Umm Qasr Basra Router • Online</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

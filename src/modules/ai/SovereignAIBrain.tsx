import React, { useState } from 'react';
import { 
  Cpu, Database, Sparkles, Server, Activity, ShieldAlert, CheckCircle2, 
  HelpCircle, RefreshCw, Send, AlertTriangle, Layers, ShieldCheck, 
  ChevronRight, ArrowRight, BookOpen, AlertCircle, Play, Eye
} from 'lucide-react';
import { Language } from '../../types';

interface SovereignAIBrainProps {
  lang: Language;
}

export default function SovereignAIBrain({ lang }: SovereignAIBrainProps) {
  // Service Map Active Module
  const [activeModule, setActiveModule] = useState<string>('hs-classifier');

  const isRtl = lang !== 'en';

  const getLabel = (enVal: string, arVal: string, kuVal: string) => {
    if (lang === 'ku') return kuVal;
    if (lang === 'ar') return arVal;
    return enVal;
  };

  // Prompt Playground State
  const [activePromptId, setActivePromptId] = useState<string>('hs-prompt');
  
  const getPromptTemplate = (id: string) => {
    switch(id) {
      case 'hs-prompt':
        return getLabel(
          `[SYSTEM_INSTRUCTION: ACT_AS_SOVEREIGN_IDG_CLASSIFIER]\nYou are the secure HS Classification AI for the Iraq Digital Gateway.\nAudit the following customs manifest to map the correct Harmonized System (HS) code:\n\nCargo Description: {{description}}\nDeclared Country of Origin: {{origin}}\nReported Unit Cost: {{cost}}\n\nDetermine: (1) Correct HS 8-digit Code, (2) Recommended Duty rate, (3) Risk match profile.`,
          `[تعليمات النظام: محاكي تصنيف البضائع الموحد]\nأنت العقل والذكاء المعتمد لتصنيف البضائع الجمركية للبوابة الرقمية العراقية.\nقم بتدقيق الشحنة التالية لتحديد رمز التنسيق العالمي (HS Code):\n\nوصف البضاعة: {{description}}\nبلد المنشأ المصرح به: {{origin}}\nالتكلفة المصرح بها: {{cost}}\n\nحدد: (١) الرمز الصحيح المكون من ٨ أرقام، (٢) الرسوم الجمركية، (٣) معامل المخاطر والشبهات.`,
          `[ڕێنمایی گشتی سیستەم: پۆلێنکردنی کاڵاکانی گومرگ]\nتۆ مێشکی بەرپرسیاری زیرەکی دەستکردی بۆ دیاریکردنی کۆدی تاریفەی دەروازەی عێراق.\nئەم زانیارییانەی خوارەوە بۆ بارهەڵگرەکە پشتڕاستبکەرەوە بۆ وەرگرتنی کۆدی نێودەوڵەتی (HS Code):\n\nپێناسەی کاڵاکە: {{description}}\nوڵاتی سەرچاوە: {{origin}}\nبەهای پارە: {{cost}}\n\nدیاری بکە: (١) کۆدی ٨ خانەیی دروست، (٢) ڕێژەی مۆری گومرگی، (٣) ئاستی شیاوی مەترسی بارهەڵگرەکە.`
        );
      case 'eval-prompt':
        return getLabel(
          `[INSTRUCTION: CHIEF_REVENUE_PROTECT_AGENT]\nCompare the declared price against raw trade indices.\n\nDescription: {{description}}\nDeclared Value: {{cost}}\nExporter origin: {{origin}}\n\nEstimate if reported price deviates from median index values. Recommend penalty or hold.`,
          `[توجيه: ضابط حماية العائد المالي الوطني]\nقارن الأسعار المصرح بها للمواد بأسعار الأسواق العالمية القياسية المقررة.\n\nالوصف الفني: {{description}}\nالقيمة المصرح بها: {{cost}}\nبلد المنشأ المورد: {{origin}}\n\nقدر نسبة الانحراف عن السعر الفعلي. أوصِ بغرامة مالية أو إيقاف الشحنة للاحتراز.`,
          `[ڕێنمایی گشتی: فەرمانبەری پاراستنی داهاتی نیشتمانی]\nبەراوردی نرخی ڕاگەیەندراوی کاڵاکە بکە لەگەڵ پێوەرە فەرمییەکانی بازرگانی نێودەوڵەتی.\n\nشیکاری کاڵا: {{description}}\nبەهای ڕاگەیەندراو: {{cost}}\nوڵاتی سەرچاوە: {{origin}}\n\nبخەمڵێنە ئەگەر نرخی کاڵاکە گومانی تێدابێت. پێشنیار بکە بۆ سزادان یان دەستبەسەرداگرتن.`
        );
      case 'quarantine-prompt':
        return getLabel(
          `[SAFETY_INSPECT_FILTER]\nAnalyze agricultural cargos and quarantine codes.\n\nProduct description: {{description}}\nDeclared origin: {{origin}}\n\nCheck for biological safety alerts, active grain rust warnings, and certification hashes conformities.`,
          `[فلتر الفحص والحجر الصحي والبيولوجي الموحد]\nحلل طبيعة الشحنات الزراعية ومدى مطابقتها لضوابط السلامة الفيدرالية.\n\nوصف المنتج زراعياً: {{description}}\nالمنشأ ومكان التصدير: {{origin}}\n\nتحقق من تحذيرات الأمن البيولوجي، ومطابقة شهادة الفحص وشهادات المنشأ الصحية المعتمدة.`,
          `[پشکنەری کشتوکاڵی و بایۆلۆجی دەروازەکان]\nشیکردنەوەی بارهەڵگرەکانی کەرتی کشتوکاڵ بکە بۆ ڕێگریکردن لە نەخۆشی جۆراوجۆر.\n\nشیکاری زانستی کاڵا: {{description}}\nسەرچاوەی فەرمی هاوردە: {{origin}}\n\nپشکنین بکە بۆ وجودی مەترسی کشتوکاڵی، مۆری تەندروستی گشتی و گونجاوی شهادەی وڵاتی هاوردەکەر.`
        );
      default:
        return '';
    }
  };

  const [promptTemplate, setPromptTemplate] = useState<string>(getPromptTemplate('hs-prompt'));

  // Custom prompt inputs for dynamic playground test
  const [playDesc, setPlayDesc] = useState<string>('Multi-axle steel alloy drill pipes for petroleum wells');
  const [playOrigin, setPlayOrigin] = useState<string>('Germany');
  const [playCost, setPlayCost] = useState<string>('$3,400 USD / Ton');
  
  const [isInferencing, setIsInferencing] = useState<boolean>(false);
  const [inferenceResult, setInferenceResult] = useState<string | null>(null);

  // HITL Active Decisions list
  const [hitlList, setHitlList] = useState([
    { id: 'hitl-2061', checkpoint: 'Umm Qasr Sea', cargo: 'Refined Vegetable Oils', score: '78%', anomaly: 'Weight/volume ratio diverges by 42% from standard merchant profiles', status: 'pending' },
    { id: 'hitl-2062', checkpoint: 'Ibrahim Khalil Land', cargo: 'Wireless Telemetry Systems', score: '61%', anomaly: 'Exporter matching flagged on dual-use RF transmitter registry without MoD seal', status: 'pending' },
    { id: 'hitl-2063', checkpoint: 'Trebil Crossing Land', cargo: 'Agricultural Feed Strains', score: '82%', anomaly: 'Grain inspection certificates mismatch phytosanitary stamp hash', status: 'pending' }
  ]);
  const [hitlApprovals, setHitlApprovals] = useState<Array<{ id: string; action: string; timestamp: string }>>([]);

  const translateCheckpoint = (chName: string) => {
    if (chName.includes('Umm Qasr')) {
      return getLabel('Umm Qasr Seaport', 'ميناء أم قصر الجنوبي', 'بەندەری ئوم قەسری باشوور');
    }
    if (chName.includes('Ibrahim Khalil')) {
      return getLabel('Ibrahim Khalil Border Gate', 'منفذ إبراهيم الخليل البري', 'دەروازەی سنووری ئیبراهیم خەلیل');
    }
    if (chName.includes('Trebil')) {
      return getLabel('Trebil border gate', 'منفذ طريبيل الحدودي البري', 'دەروازەی سنووری نێودەوڵەتی ترێبل');
    }
    return chName;
  };

  const translateCargo = (cargo: string) => {
    if (cargo.includes('Vegetable')) {
      return getLabel('Refined Vegetable Oils', 'زيوت نباتية مكررة ومصنعة', 'ڕۆنی ڕووەکی پاڵێوراو');
    }
    if (cargo.includes('Wireless')) {
      return getLabel('Wireless Telemetry Systems', 'أنظمة ارسال لاسلكي عن بعد', 'سیستەمی گواستنەوەی بێ تەل');
    }
    if (cargo.includes('Agricultural')) {
      return getLabel('Agricultural Feed Strains', 'أعلاف وحبوب زراعية معالجة', 'دانەوێڵە و کەرەستەی خۆراکی ئاژەڵی');
    }
    return cargo;
  };

  const translateAnomaly = (anomaly: string) => {
    if (anomaly.includes('Weight/volume')) {
      return getLabel(
        'Weight/volume ratio diverges by 42% from standard merchant profiles',
        'معدل الوزن مقابل الحجم يختلف بنسبة ٤٢٪ عن المعايير المعتمدة للشحن',
        'ڕێژەی کێش بەرامبەر قەبارە بە ڕێژەی ٤٢٪ جیاوازە لە پێوەرە فەرمییەکان'
      );
    }
    if (anomaly.includes('Exporter matching')) {
      return getLabel(
        'Exporter matching flagged on dual-use RF transmitter registry without MoD seal',
        'تم رصد مصدر لاسلكي مشبوه ضمن المواد ثنائية الاستخدام دون تصريح الدفاع',
        'وەرگری بێ تەل بە بێ مۆری فەرمی وەزارەتی بەرگری هاوردەکراوە کە مەترسی هەیە'
      );
    }
    if (anomaly.includes('Grain inspection')) {
      return getLabel(
        'Grain inspection certificates mismatch phytosanitary stamp hash',
        'تفاصيل شهادة فحص واختبار الحبوب لا تتطابق مع ترميز الفحص الصحي المعتمد',
        'تۆماری پشکنینی تەندروستی دانەوێڵە گونجاو نییە لەگەڵ مۆری فەرمی بەرگری کشتوکاڵ'
      );
    }
    return anomaly;
  };

  const runTestInference = () => {
    setIsInferencing(true);
    setInferenceResult(null);
    setTimeout(() => {
      const isDrillPipe = playDesc.toLowerCase().includes('drill') || playDesc.toLowerCase().includes('pipe');
      const standardResponse = isDrillPipe ? 
        getLabel(
`[SOVEREIGN_INFERENCE_ENGINE: CLEARED_BY_GATEWAY_BRAIN]
=========================================
1. HS CLASSIFICATION MAPPING:
   • RESOLVED HS-CODE: 7304.22.00 (Seamless drill pipes of stainless steel, for oil/gas drilling)
   • RECONFIRMED CODE INDEX PATH: Products of iron/steel -> Tubes/pipes -> Seamless drill pipes.

2. REGISTERED DUTY RECONCILIATION:
   • STANDARD TARIFF VALUE: 8% Ad-Valorem
   • STRATEGIC CLEARANCE: Verified oil exploration dual-use exemption code: MOD-PETRO-2026.

3. RISK ASSESSMENT REPORT:
   • SCANNED ANOMALIES: 0.00% (Declarant values completely in line with certified German invoices)
   • INTEGRITY STATUS: GREEN (Secure to proceed)`,
`[محرك الاستدلال السيادي: تم السماح بالمرور عبر منصة البوابة]
=========================================
١. مخطط تصنيف البضائع والتعرفة:
   • رمز التنسيق (HS-CODE): 7304.22.00 (أنابيب حفر فولاذية غير ملحومة لآبار النفط والغاز)
   • مسار التصنيف المعتمد: منتجات الحديد والصلب -> أنابيب -> أنابيب حفر غير ملحومة.

٢. مطابقة الرسوم المعتمدة:
   • التعرفة الجمركية القياسية: ٨٪ من القيمة التقديرية
   • تصفية جمركية خاصة: تم مطابقة إعفاء الاستخدام المزدوج المعتمد: MOD-PETRO-2026.

٣. تقرير تحليل المخاطر:
   • المخالفات المرصودة: ٠.٠٠٪ (القيم المصرح بها تتناسب تماماً مع فواتير المنشأ الألمانية المعتمدة)
   • حالة السلامة: خضراء (آمن للمرور تحت الحوكمة)`,
`[بزوێنەری بڕیاردانی زیرەکی نیشتمانی: بە سەرکەوتوویی تێپەڕی]
=========================================
١. پۆلێنکردنی کاڵاکان و کۆدی تاریفە:
   • کۆدی گونجاو (HS-CODE): 7304.22.00 (بۆری پۆڵاینی بەهێز بۆ بیرەکانی نەوت/گاز)
   • ڕێڕەوی پۆلێنکردن: بەرهەمەکانی پۆڵا -> بۆری گشتی -> بۆری هەڵکەندنی بیرەکان.

٢. تاریفەی گونجاو و پەسەندکراو:
   • تاریفەی جێگیرکراو: ٨٪ لە بەهای کاڵاکە
   • بەخشینی گومرگی: گونجاو لەگەڵ بەخشینی تایبەتی کەرتی وزە: MOD-PETRO-2026.

٣. ڕاپۆرتی لێکۆڵینەوەی مەترسی:
   • کێموکوڕی بەدیارکەوتوو: ٠.٠٠٪ (بەهاکان بە تەواوی هاوتای فاکتۆری فەرمی ئەڵمانین)
   • باری تەندروستی: سەوز (ڕێگەپێدراوە بۆ پاسدان بە بێ کێشە)`
        ) : getLabel(
`[SOVEREIGN_INFERENCE_ENGINE: ACCORD_ACTIVE]
=========================================
1. HS CLASSIFICATION MAPPING:
   • RESOLVED HS-CODE: 8471.30.00 (Data processing machines, laptops, portable consoles)
   • CONFIDENCE SCORE: 98.42%

2. REGISTERED DUTY RECONCILIATION:
   • STANDARD TARIFF: 5.0%
   • EXEMPTIONS: Educational state rebate applied correctly.

3. RISK PROFILE:
   • RISK SCALE: LOW (Origin matches verified supplier path).`,
`[محرك الاستدلال السيادي: اتفاقية التدقيق نشطة]
=========================================
١. مخطط تصنيف البضائع والتعرفة:
   • رمز التنسيق (HS-CODE): 8471.30.00 (أجهزة معالجة داتا حاسوبية، أجهزة كمبيوتر محمولة)
   • نسبة الثقة المعيارية: ٩٨.٤٢٪

٢. مطابقة الرسوم المعتمدة:
   • التعرفة الجمركية القياسية: ٥.٠٪
   • الإعفاءات الجمركية: تم مطابقة خصم القطاع التعليمي بنجاح.

٣. تقرير مخاطر الشحنة:
   • درجة الخطورة: منخفضة (المنشأ يتطابق مع المورد المعتمد رسمياً لدى البوابة).`,
`[بزوێنەری بڕیاردانی زیرەکی نیشتمانی: پڕۆسەکە چالاکە]
=========================================
١. پۆلێنکردنی کاڵاکان و کۆدی تاریفە:
   • کۆدی گونجاو (HS-CODE): 8471.30.00 (حاسیبەی دەستی، کۆمپیوتەری گواستراوە)
   • ئاستی متمانەی گشتی: ٩٨.٤٢٪

٢. تاریفەی گونجاو و پەسەندکراو:
   • تاریفەی دیاریکراو: ٥.٠٪
   • لێخۆشبوون: لێخۆشبوونی کەرتی پەروەردە بە سەرکەوتوویی جێبەجێ کرا.

٣. ڕاپۆرتی مەترسی:
   • ئاستی مەترسی: نزم (سەرچاوەکە هاوتای دابینکاری فەرمی پشتڕاستکراوەیە بە تەواوی).`
        );
      
      setInferenceResult(standardResponse);
      setIsInferencing(false);
    }, 1800);
  };

  const handleHITLResolve = (id: string, action: 'APPROVED' | 'REJECTED') => {
    setHitlList(prev => prev.filter(h => h.id !== id));
    setHitlApprovals(prev => [
      { id, action, timestamp: 'Confirmed' },
      ...prev
    ]);
  };

  const registryPrompts: Record<string, { title: string; desc: string; origin: string; cost: string }> = {
    'hs-prompt': {
      title: getLabel('HS Code Classifier (Model UR-Cortex)', 'مصنف ترميز البضائع (نموذج UR-Cortex)', 'پۆلێنکەرە فەرمییەکانی کۆدی گومرگی (Model UR-Cortex)'),
      desc: getLabel('Multi-axle steel alloy drill pipes for petroleum wells', 'أنابيب حفر فولاذية متعددة المحاور لآبار النفط والغاز', 'ڕێڕەوی بۆری پۆڵاینی بەهێز بۆ بیرە نەوتەکانی باشوور'),
      origin: 'Germany',
      cost: '$3,400 USD / Ton'
    },
    'eval-prompt': {
      title: getLabel('Under-Invoicing Auditor (Model Tigris-Risk)', 'مدقق تخفيض الفواتير (نموذج Tigris-Risk)', 'وردبینیکردنی دابەزینی نرخەکان (Model Tigris-Risk)'),
      desc: getLabel('High-density polyethylene resins', 'راتنجات البولي إيثيلين عالية الكثافة للبلاستيك', 'سامانی پۆلیمر و پلاستیکی ڕەق بە چڕی بەرز'),
      origin: 'Korea',
      cost: '$450 USD / Ton (Under-invoiced estimate)'
    },
    'quarantine-prompt': {
      title: getLabel('Biosecurity quarantine scanner (Model Euphrates-Phyto)', 'فاحص الحجر الصحي والأمن الحيوي (Euphrates-Phyto)', 'پشکنەری کشتوکاڵ و کەرەنتینەی کشتوکاڵی (Model Euphrates-Phyto)'),
      desc: getLabel('Bulk seed-potatoes for farming hubs', 'بطاطس تقاوي سائبة لمراكز الإنتاج الزراعي', 'دەنکە پەتاتەی فەرمی چێنراو بۆ کێڵگە کشتوکاڵییەکان'),
      origin: 'Lebanon',
      cost: '$620 USD / Ton'
    }
  };

  const loadPrompt = (id: string) => {
    const p = registryPrompts[id];
    setActivePromptId(id);
    setPromptTemplate(getPromptTemplate(id));
    setPlayDesc(p.desc);
    setPlayOrigin(p.origin);
    setPlayCost(p.cost);
  };

  // Modules metadata list
  const aiModules = [
    { id: 'hs-classifier', index: 'IDG-Cortex-V3', accuracy: '99.8%', latency: '40ms' },
    { id: 'customs-auditor', index: 'Ur-Transit-MoE', accuracy: '99.2%', latency: '52ms' },
    { id: 'logistics-seq', index: 'Tigris-Agent-V2', accuracy: '98.5%', latency: '35ms' },
    { id: 'compliance-intercept', index: 'CBI-Interlock-MoE', accuracy: '99.96%', latency: '65ms' },
    { id: 'risk-assessment', index: 'Iraq-Risk-V1', accuracy: '97.2%', latency: '28ms' },
    { id: 'decision-support', index: 'Ur-Statecraft-LLM', accuracy: '99.1%', latency: '120ms' },
    { id: 'predictive-corridors', index: 'Corridor-Flow-MoE', accuracy: '96.8%', latency: '45ms' },
    { id: 'economic-forecaster', index: 'Fiscal-Atlas-MoE', accuracy: '98.7%', latency: '90ms' }
  ];

  const translateModuleName = (id: string) => {
    switch (id) {
      case 'hs-classifier': return getLabel('HS Classification AI', 'ذكاء تصنيف البضائع والتعرفة', 'زیرەکی پۆلێنکردنی تاریفەکان (HS Classifier)');
      case 'customs-auditor': return getLabel('Customs Assistant AI', 'مساعد التدقيق الجمركي الآلي', 'هاوکار و عەقڵی گشتی گومرگ (Customs Assistant)');
      case 'logistics-seq': return getLabel('Logistics AI Core', 'محرك جدولة اللوجستية والمسارات', 'بزوێنەری مۆنیتۆری هۆشیاری لۆجستی (Logistics Core)');
      case 'compliance-intercept': return getLabel('Compliance Intercept AI', 'ذكاء مراقبة الحوالات والامتثال', 'زیرەکی پاراستنی بەڵگەنامە گشتییەکان (Compliance AI)');
      case 'risk-assessment': return getLabel('Risk Assessment neural', 'تحليل المخاطر العصبية للمنافذ', 'تۆڕی هەڵسەنگاندنی مەترسییەکان (Risk Assessment)');
      case 'decision-support': return getLabel('Decision Support Agent', 'وكيل دعم القرار الوزاري', 'سیرڤسی هاوکاری بڕیاری وەزارەت (Decision Support)');
      case 'predictive-corridors': return getLabel('Predictive Transit AI', 'ذكاء مسارات الترانزيت التنبؤي', 'زیرەکی پێشبینیکردنی ڕێڕەوەکانی ترانزیت (Predictive Transit)');
      case 'economic-forecaster': return getLabel('Economic Intel Network', 'الشبكة الاستخباراتية الاقتصادية', 'تۆڕی زانیاریی ئابووری نیشتمانیی (Economic Intel)');
      default: return id;
    }
  };

  const translateModuleStatus = (id: string) => {
    switch (id) {
      case 'hs-classifier': return getLabel('Live & Recommending', 'متصل ويقدم التوصيات', 'چالاک و پێشنیارکەر');
      case 'customs-auditor': return getLabel('Backup Active', 'خادم احتياطي نشط', 'پاڵپشتی چالاک');
      case 'logistics-seq': return getLabel('Live & Active', 'متصل ونشط', 'ڕاستەوخۆ چالاک');
      case 'compliance-intercept': return getLabel('Strict Zero-Trust', 'عديم الثقة النشطة', 'سیستەمی چاودێری توند');
      case 'risk-assessment': return getLabel('Monitoring Stream', 'يراقب تدفق البيانات', 'مۆنیتۆرکردنی ڕاستەوخۆ');
      case 'decision-support': return getLabel('On-Standby', 'في وضع الاستعداد', 'لەسەر هێڵە');
      case 'predictive-corridors': return getLabel('Active', 'نشط', 'چالاکە');
      case 'economic-forecaster': return getLabel('Live', 'مباشر', 'چالاکی ڕاستەوخۆ');
      default: return '';
    }
  };

  return (
    <div id="sovereign-ai-brain-canvas" className="bg-[#111e2e]/95 rounded-xl border border-slate-800 p-5 lg:p-6 shadow-2xl flex flex-col gap-6 text-slate-100" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Sovereign AI Central Display Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="text-[10px] uppercase font-mono text-[#E0A96D] tracking-widest font-bold">
            {getLabel('REPUBLIC OF IRAQ • REVENUE SHIELD DIGITAL ASSETS', 'جمهورية العراق - قصر حماية العائد المالي الوطني', 'کۆماری عێراق - مۆری دیجیتاڵیی داهاتی نیشتمانیی')}
          </span>
          <h2 className="text-xl font-display font-semibold tracking-wide text-slate-50 uppercase flex items-center gap-2.5 mt-0.5">
            <span className="p-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/30 shrink-0">
              <Cpu className="w-5 h-5 text-emerald-400" />
            </span>
            {getLabel('Sovereign AI Brain & Model Registry (IDG Cortex)', 'العقل الاصطناعي السيادي وخادم سجلات النماذج العصبية', 'مێشکی زیرەکی دەستکردی نیشتمانی عێراق (IDG Cortex)')}
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
            {getLabel(
              'Centralized strategic artificial intelligence network executing statecraft-grade customs categorization, currency-drain audits, biological quarantine filtering, and intercorridor logistics orchestration.',
              'الشبكة العصبية المركزية المشفرة لحماية الإيرادات ومراقبة قيم تداول البضائع واكتشاف محاولات تبييض وتهريب العملات الصعبة.',
              'تۆڕی زانیارییە ناوەندییە نیشتمانییە پارێزراوەکان بۆ پاراستنی داهات، چاودێری جووڵەی کاڵاکان و ڕێگری لە سپیکردنەوەی زیانبەخشی دراوی قورس.'
            )}
          </p>
        </div>

        {/* Neural general statistics tickers */}
        <div className="flex gap-4 bg-[#0b1420] border border-slate-800/80 p-3 rounded-lg text-xs font-mono shrink-0 justify-between">
          <div className="text-center border-r border-slate-850 pr-4 rtl:border-r-0 rtl:border-l rtl:pl-4">
            <span className="text-slate-500 text-[10px] block uppercase">
              {getLabel('Average Latency', 'متوسط زمن الاستجابة', 'تێکڕای وەڵامدانەوە')}
            </span>
            <span className="text-[#52B788] font-bold block mt-0.5">48ms</span>
          </div>
          <div className="text-center border-r border-slate-850 pr-4 rtl:border-r-0 rtl:border-l rtl:pl-4">
            <span className="text-slate-500 text-[10px] block uppercase">
              {getLabel('Precision score', 'درجة الدقة المعيارية', 'ڕێژەی وردی گشتی')}
            </span>
            <span className="text-[#E0A96D] font-bold block mt-0.5">99.14%</span>
          </div>
          <div className="text-center">
            <span className="text-slate-500 text-[10px] block uppercase">
              {getLabel('Model Nodes', 'عقد النمذجة الرياضية', 'گرێی مۆدێلەکان')}
            </span>
            <span className="text-cyan-400 font-bold block mt-0.5">
              {getLabel('32 Clustered', '٣٢ عقدة متصلة', '٣٢ گرێی پەیوەستکراو')}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left column / 2/3 width */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          
          {/* Section 1: Dynamic neural models service map */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 border-b border-slate-900 pb-2">
              {getLabel('Centralized AI Neural Cluster Map', 'خارطة العناقيد العصبية الموحدة للذكاء الاصطناعي', 'نەخشەی سەرەکی عەقڵی زیرەکی دەستکرد')}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {getLabel(
                'Interactive roster map of tactical-grade neural networks, pre-trained datasets, and sovereign statecraft APIs running across Iraq custom hubs.',
                'خريطة تفاعلية للشبكات العصبية، ومجموعات البيانات والاتصالات المبرمجة الجارية عبر منافذ العراق الاتحادية.',
                'نەخشەیەکی بەهێز بۆ مۆدێلەکانی زیرەکی دەستکرد و داتاکانی ڕاهێنراو لە سەرجەم دەروازە بازرگانییەکاندا بۆ بڕیاردان.'
              )}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {aiModules.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setActiveModule(m.id)}
                  className={`p-3 rounded-lg border transition-all cursor-pointer flex flex-col justify-between h-[125px] ${
                    activeModule === m.id
                      ? 'bg-emerald-950/20 border-emerald-500 shadow-md ring-1 ring-emerald-500/20'
                      : 'bg-[#0f1b29]/90 border-slate-850 hover:border-slate-700 hover:bg-[#112032]'
                  }`}
                >
                  <div className="flex justify-between items-start gap-1">
                    <span className="text-[10px] bg-slate-900 border border-slate-800 rounded px-1 text-slate-400 font-mono font-medium">{m.index}</span>
                    <span className={`h-2.5 w-2.5 rounded-full ${activeModule === m.id ? 'bg-[#52B788] animate-pulse' : 'bg-emerald-500/60'}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200 text-xs mt-1 leading-snug">{translateModuleName(m.id)}</h4>
                    <p className="text-[10px] font-mono text-slate-400 mt-1 capitalize">
                      {getLabel('Duty Grade: ', 'فئة العمل: ', 'پلەی ئەرک: ')}{translateModuleStatus(m.id)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-[9px] font-mono mt-1 pt-1 border-t border-slate-850 text-slate-500">
                    <span>{getLabel('Precision: ', 'الدقة: ', 'وردی: ')}{m.accuracy}</span>
                    <span>{getLabel('Lat: ', 'الاستجابة: ', 'کاتی ناردن: ')}{m.latency}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Module Detail Panel */}
            <div className="bg-[#0b1420] p-4 rounded-lg border border-slate-850/80 flex flex-col gap-2 mt-2">
              <div className="flex justify-between items-center border-b border-slate-850/60 pb-2 mb-2">
                <span className="text-[10px] font-mono text-[#E0A96D] uppercase font-bold">
                  {getLabel('CLUSTER REPORT: ', 'تقرير العنقود الموحد: ', 'ڕاپۆرتی سەرەکی گومرگی: ')}{activeModule.toUpperCase()}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {getLabel('NODE HEALTH: OPTIMAL (100% SECURE)', 'صحة العقدة: ممتازة (١٠٠٪ مؤمنة)', 'تەندروستی گرێکان: بەرزترین ئاست (١٠٠٪ پارێزراو)')}
                </span>
              </div>
              <p className="text-xs text-slate-350 leading-relaxed font-sans">
                {activeModule === 'hs-classifier' && getLabel(
                  'Our HS Code Classifier parses multi-language manifests in Kurdish, Arabic, and Western scripts, matching declared item textures to global custom indices. This intercepts intentional misclassifications designed to hide toxic industrial chemicals or avoid tariffs.',
                  'يقوم مصنف ترميز البضائع بتحليل المانيفستات متعددة اللغات باللغات الكردية والعربية وغيرها ومطابقتها بمؤشرات السلع العالمية لمنع التهريب الجمركي ومحالات تزييف البضائع.',
                  'پۆلێنکەری جۆری کاڵاکان بە شێوازێکی کارامە مانیفێستەکان بە زمانەکانی کوردی و عەرەبی لێکدەداتەوە بۆ پێدانی کۆدی گونجاو و ڕێگەگرتن لە شاردنەوەی سەرچاوە فەرمییەکان.'
                )}
                {activeModule === 'customs-auditor' && getLabel(
                  'Under-invoicing analyzer. Examines container item valuations and correlates them against global market averages. Generates instant revenue protection warnings if cargo worth deviates sharply from trade averages.',
                  'محلل خفض قيمة الفواتير العادلة للشحنات. يقارن أسعار الفواتير بالنطاق السعري في الأسواق العالمية حماية للعائد المالي السيادي الوطني.',
                  'سیستەمی دیاریکردنی کەمکردنەوەی فاکتۆرەکان. هەڵسەنگاندنی بەهای ڕاستەقینەی کاڵاکان دەکات بۆ پاراستنی داهاتی گشتی عێراق بە شێوازێکی زۆر خێرا.'
                )}
                {activeModule === 'logistics-seq' && getLabel(
                  'Autonomously sequences logistics backlogs. Correlates queue densities at Trebil, Ibrahim Khalil, and southern harbors to predict custom processing congestions and schedules automatic re-routes.',
                  'ينظم طوابير الشاحنات لوجستياً بشكل مستقل تماماً. يربط بين كثافة الطوابير في معبر إبراهيم الخليل ومنفذ طريبيل لتنظيم التدفق بذكاء.',
                  'سیستەم بە شێوەیەکی خۆکار لۆجستی و جووڵەی بارهەڵگرەکان لە نێوان دەروازەی باشوور و دەروازە وشکانییەکاندا بە وردی ڕێکدەخات.'
                )}
                {activeModule === 'compliance-intercept' && getLabel(
                  'Sovereign compliance interlock. Matches high-frequency financial wire transfers matching CBI auction indices. Exposes capital evasion, currency manipulations, and phantom imports.',
                  'محور الامتثال السيادي لتعاملات البنك المركزي العراقي. يكشف عمليات تهريب الدولار، تهريب العملات واستيرادات الوهمية غير الحقيقية.',
                  'تۆڕی پاراستنی بەڵگەنامە گشتییەکان. هاوشێوەکردنی جووڵەی پارە نێردراوەکان دەکات بۆ ڕێگری لە بردنە دەرەوەی زیانبەخشی دراوی قورس و سپیکردنەوە.'
                )}
                {activeModule === 'risk-assessment' && getLabel(
                  'Evaluates risk profiles on all inbound shipments. Cross-references shippers, shipping ports, transport fleets, and cargo descriptions to flag physical inspection priorities without impacting clean traders.',
                  'يقيم درجات المخاطرة للشحنات الواردة. يربط بين الموانئ، والشركات المصدرة والناقلة لتحديد الشحنات المشتبه بها للتدقيق اليدوي.',
                  'هەڵسەنگاندنی ئاستی مەترسی بارهەڵگرەکان دەکات. پەیوەندی نێوان بەندەرەکان و کۆمپانیاکان چاودێری دەکات بۆ تەرخانکردنی کاتی پشکنینی فیزیکی لە دەروازەکان.'
                )}
                {activeModule === 'decision-support' && getLabel(
                  'Strategic statecraft advisor. Synthesizes fiscal outcomes, trade tax yields, and commodity flows to provide ministries with forecast summaries, tariff optimizations, and policy projections.',
                  'مستشار الدعم الاستراتيجي لصناع القرار الوزاري. يلخص العوائد والضرائب ويوفر توقعات واضحة لدعم السياسات المالية الفيدرالية والمحلية.',
                  'ڕاوێژکاری ستراتیژی بڕیاردانی وەزارەتەکان. کۆکەرەوەی داتاکانی داهات و گومرگییە بۆ پیشاندانی پێشبینییە فەرمییەکان بە ڕاستەوخۆیی لەسەر کۆمپیوتەری بەردەست.'
                )}
                {activeModule === 'predictive-corridors' && getLabel(
                  'Monitors transit currents across active regional dry links. Tracks transshipments and verifies sealing integrity from initial seaport gates to regional egress terminals.',
                  'يراقب التدفق المستمر عبر الممرات الجافة الإقليمية. يتتبع حركة شحنات الترانزيت ويتأكد من الأختام الجمركية الإلكترونية وحرمتها.',
                  'چاودێری ڕێڕەوە وشکانییەکان دەکات. کۆنترۆڵکردنی بارهەڵگرەکانی ترانزیت دەکات لە یەکەم دەروازەی هاتنەوە تا دەروازەی کۆتایی بە ئۆتۆماتیکی.'
                )}
                {activeModule === 'economic-forecaster' && getLabel(
                  'Consolidates trade balance data vectors across Iraq and Kurdistan borders. Assists the Ministry of Finance in predicting domestic market pricing and trade surplus developments.',
                  'يوحد البيانات التجارية بين المركز والإقليم. يساعد وزارة المالية في رصد حركة البضائع والأسعار والتوقعات المالية بدقة ووضوح.',
                  'کۆکەرەوەی هاوسەنگی بازرگانی نێوان حکومەتی فیدراڵ و هەرێمی کوردستانە. متمانە و یارمەتی وەزارەتی دارایی دەدات بۆ پێشبینی نرخەکان.'
                )}
              </p>
            </div>
          </div>

          {/* Section 2: Editable Prompt State Playground & Live Test Run */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
            <div className="border-b border-slate-900 pb-2 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                  {getLabel('Prompt Registry & Sovereign Playground', 'سجل التوجيهات الحاكمة ومنصة التجارب السيادية', 'سەکۆی ڕاستەوخۆی ڕاهێنان و چاکسازی فڕامەکان')}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {getLabel('Edit system instructions directly inside the statecraft prompt register, then test-run inference simulation.', 'قم بتعديل وتطوير التوجيهات البرمجية وحزم التعليمات مباشرة، ثم شغل محاكاة القرار المستقل عاجلاً.', 'دەستکاری ناوەڕۆکی فڕامەکانی ڕێنمایی بکە بە شێوەیەکی ڕاستەوخۆ، پاشان پشکنینی کارامەیی ئەنجام بدە.')}
                </p>
              </div>
              <div className="flex gap-1.5 self-start shrink-0">
                <button
                  onClick={() => loadPrompt('hs-prompt')}
                  className={`px-2 py-1 rounded font-mono text-[9px] uppercase border transition-all ${
                    activePromptId === 'hs-prompt'
                      ? 'bg-slate-900 border-[#E0A96D] text-[#E0A96D] font-bold'
                      : 'bg-[#0f1b29] border-slate-850 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {getLabel('HS Code', 'تصنيف التعرفة', 'کۆدی گومرگی')}
                </button>
                <button
                  onClick={() => loadPrompt('eval-prompt')}
                  className={`px-2 py-1 rounded font-mono text-[9px] uppercase border transition-all ${
                    activePromptId === 'eval-prompt'
                      ? 'bg-slate-900 border-[#E0A96D] text-[#E0A96D] font-bold'
                      : 'bg-[#0f1b29] border-slate-850 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {getLabel('Underpricing', 'تخفيض السعر', 'کەم نرخاندن')}
                </button>
                <button
                  onClick={() => loadPrompt('quarantine-prompt')}
                  className={`px-2 py-1 rounded font-mono text-[9px] uppercase border transition-all ${
                    activePromptId === 'quarantine-prompt'
                      ? 'bg-slate-900 border-[#E0A96D] text-[#E0A96D] font-bold'
                      : 'bg-[#0f1b29] border-slate-850 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {getLabel('Quarantine', 'الحجر الصحي', 'کەرەنتینە')}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left Column: Prompt Template input box */}
              <div className="flex flex-col gap-3 text-start">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-slate-500 uppercase font-mono tracking-wider font-semibold">
                    {getLabel('Prompt Template System Instructions:', 'التعليمات والتوجيهات الحاكمة للنظام (Prompt Instructions):', 'ڕێنمایی و فڕامەکانی سیستەمی فەرمی:')}
                  </label>
                  <textarea
                    rows={8}
                    value={promptTemplate}
                    onChange={(e) => setPromptTemplate(e.target.value)}
                    className="w-full bg-[#0b1420] font-mono text-xs text-slate-300 border border-slate-800 rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 leading-relaxed"
                  />
                </div>

                <div className="bg-[#0b1420] p-3 rounded-lg border border-slate-850 flex flex-col gap-2.5">
                  <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider block font-bold">
                    {getLabel('Dynamic Cargo Variables:', 'المتغيرات الديناميكية للشحنات والمواد:', 'گۆڕاوە چاودێریکراوەکانی بارهەڵگرەکان:')}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase font-mono">{getLabel('Description', 'الوصف الفني', 'شیکاری کاڵا')}</span>
                      <input
                        type="text"
                        value={playDesc}
                        onChange={(e) => setPlayDesc(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded px-2 py-1 mt-0.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase font-mono">{getLabel('Origin', 'بلد المنشأ', 'وڵاتی سەرچاوە')}</span>
                      <input
                        type="text"
                        value={playOrigin}
                        onChange={(e) => setPlayOrigin(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded px-2 py-1 mt-0.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase font-mono">{getLabel('Cost Value', 'التكلفة لكل طن', 'بەهای نرخ بۆ هەر تەن')}</span>
                      <input
                        type="text"
                        value={playCost}
                        onChange={(e) => setPlayCost(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded px-2 py-1 mt-0.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <button
                      onClick={runTestInference}
                      disabled={isInferencing}
                      className="px-4 py-1.5 bg-[#E0A96D] hover:bg-[#E0A96D]/90 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-semibold font-mono rounded text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow transition-all cursor-pointer"
                    >
                      {isInferencing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                      {isInferencing ? getLabel('Inference...', 'جاري الاستدلال...', 'لێکۆڵینەوە...') : getLabel('Test Run Inference', 'شغل محاكاة التحليل الفوري', 'پشکنینی خۆکار دەستپێبکە')}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Simulated result viewer */}
              <div className="flex flex-col gap-2 text-start">
                <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider font-semibold">
                  {getLabel('Sovereign Compiler Inference Stream:', 'مسار نتائج محرك الاستدلال السيادي المركزي:', 'سەرچاوەی لێکدانەوەی بڕیاردانی ژیری دەستکرد:')}
                </span>
                <div id="compiler-stream-viewer" className="flex-1 bg-slate-950 border border-slate-850 p-4 rounded-lg font-mono text-[11px] leading-relaxed text-[#E0A96D] flex flex-col justify-between min-h-[220px]">
                  {inferenceResult ? (
                    <div className="whitespace-pre-wrap text-slate-300">
                      {inferenceResult}
                    </div>
                  ) : isInferencing ? (
                    <div className="flex flex-col items-center justify-center h-full gap-2 py-12 text-slate-400">
                      <Cpu className="w-8 h-8 text-emerald-400 animate-spin" />
                      <p className="animate-pulse">{getLabel('Accessing secure AI-Cluster Model UR-Cortex-V3...', 'جاري الدخول إلى نماذج العنقود المركزي المؤمن...', 'پەیوەستبوون بە مێشکی زیرەکی گومرگی فیدراڵی...')}</p>
                      <p className="text-[10px] text-[#4a6381]">{getLabel('Resolving custom tariff index database matrices', 'يحلل مصفوفات قاعدة بيانات التعريفة الجمركية', 'ڕێکخستنی جۆری کۆدی تاریفەی گشتی وڵات')}</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-2 py-12">
                      <Server className="w-8 h-8 text-slate-700" />
                      <p className="text-center italic">{getLabel('Waiting for prompt compilation sequence trigger...', 'في انتظار تفعيل تسلسل برمجة التوجيه المركزي...', 'سیستەمی چاودێڕی بیرۆکەی پێشوەختە چالاک نییە...')}</p>
                      <p className="text-[10px] text-slate-600">{getLabel('Select any template and click "Test Run" above.', 'اختر نموذجاً ثم انقر على "شغل محاكاة التحليل" أعلاه.', 'سەرچاوەی فڕامەکە دەستنیشان بکە و پشکنینی خۆکار داگیرسێنە.')}</p>
                    </div>
                  )}
                  {inferenceResult && (
                    <div className="mt-4 pt-2 border-t border-slate-850/60 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                      <span>{getLabel('Response Token: JWT-ASS-0329', 'رمز الاستجابة: JWT-ASS-0329', 'ناسنامەی چاودێری: JWT-ASS-0329')}</span>
                      <span>{getLabel('Latency: ', 'زمن الاستجابة: ', 'کاتی لێکۆڵینەوە: ')}{(320 + Math.random() * 80).toFixed(0)}ms</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right column sidebar / 1/3 width */}
        <div className="flex flex-col gap-6 text-start">
          
          {/* Section 3: human in loop console */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
            <div className="border-b border-slate-900 pb-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="text-emerald-400 w-4.5 h-4.5" />
                {getLabel('Human-in-the-Loop Audit Console', 'منصة التدقيق البشري للتدخل والرقابة', 'بەشی چاودێری و وردبینی فەرمانبەرانی باڵا (HITL)')}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {getLabel('Audit low-confidence neural decisions and apply sovereign central government overrides.', 'تدقيق القرارات العصيبة ذات الثقة المنخفضة وفرض الإلغاء السيادي المركزي من قبل الملاك البشري.', 'وردبینی بڕیارە نادڵنیاکان و ڕێگەپێدانی فەرمی لەلایەن بەرپرسانی گومرگ.')}
              </p>
            </div>

            {hitlList.length === 0 ? (
              <div className="bg-emerald-950/20 border border-emerald-500/20 p-4 rounded text-center text-xs">
                <p className="text-[#52B788] font-bold mb-1">
                  ✓ {getLabel('HUMAN OVERRIDES EXPENDED', 'اكتمل التدقيق البشري بالكامل', 'تەواوی وردبینییەکان جێبەجێ کران')}
                </p>
                <p className="text-[10px] text-slate-400">
                  {getLabel('All low-confidence classifier assessments have been securely audited by central agencies.', 'تمت مراجعة وتصفية كافة الشحنات المشتبه بها من قبل الجهات والأجهزة الحكومية المختصة.', 'هەموو بڕیارە جومگەییەکان لە لایەن دەستەی فەرمی چاودێری بە سەرکەوتوویی پشتڕاستکراونەتەوە.')}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {hitlList.map((h) => (
                  <div key={h.id} className="bg-slate-900 p-3.5 rounded border border-slate-850 flex flex-col gap-2.5 text-xs text-slate-300">
                    <div className="flex justify-between items-center text-slate-400 font-mono text-[10px] border-b border-slate-850 pb-1.5">
                      <span>{getLabel('INCIDENT:', 'حالة مشتبه بها:', 'کێشەی بەردەست:')} <strong className="text-slate-200">{h.id}</strong></span>
                      <span className="text-amber-400 bg-amber-950/40 px-1.5 py-0.5 rounded font-semibold font-mono text-[9px]">
                        {getLabel('Score: ', 'نسبة الثقة: ', 'ئاستی متمانە: ')}{h.score}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-100">{translateCargo(h.cargo)}</p>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">{translateCheckpoint(h.checkpoint)}</p>
                      <p className="text-[11px] text-slate-404 mt-1.5 leading-relaxed bg-slate-950/45 p-2 rounded border border-slate-850/60 italic text-start">
                        "{translateAnomaly(h.anomaly)}"
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <button
                        onClick={() => handleHITLResolve(h.id, 'APPROVED')}
                        className="py-1.5 bg-emerald-955 hover:bg-emerald-900 border border-emerald-500/20 text-emerald-300 rounded font-semibold font-mono text-[10px] uppercase transition-all cursor-pointer"
                      >
                        {getLabel('Accept Override', 'الموافقة والتمرير', 'ڕێگەپێدان و پاسدان')}
                      </button>
                      <button
                        onClick={() => handleHITLResolve(h.id, 'REJECTED')}
                        className="py-1.5 bg-red-955 hover:bg-red-900 border border-red-500/20 text-red-300 rounded font-semibold font-mono text-[10px] uppercase transition-all cursor-pointer"
                      >
                        {getLabel('Reject & Hold', 'رفض واحتراض جمركي', 'ڕەتکردنەوە و دەستبەسەر')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Resolved human override records ledger list */}
            {hitlApprovals.length > 0 && (
              <div className="mt-2 bg-slate-900 p-3 rounded border border-slate-850">
                <span className="text-[10px] uppercase font-mono text-slate-500 block mb-2 font-bold">
                  {getLabel('Secure Human Overrides Ledger:', 'سجل الموافقات والتجاوزات البشرية الموثقة:', 'تۆماری فەرمی کار چالاکییەکانی بەکارهێنەران:')}
                </span>
                <div className="flex flex-col gap-2 max-h-[140px] overflow-y-auto">
                  {hitlApprovals.map((r, idx) => (
                    <div key={idx} className="text-[10px] font-mono text-slate-400 border-b border-slate-850 last:border-0 pb-1.5 last:pb-0">
                      <div className="flex justify-between items-center text-[#E0A96D] font-bold">
                        <span>{getLabel('MITIGATED: ', 'تم تسويتها جمركياً: ', 'چارەسەرکراو: ')}{r.id}</span>
                        <span className="text-slate-500 text-[8px]">{getLabel('Secured', 'مؤمن', 'پارێزراوە')}</span>
                      </div>
                      <p className="text-slate-300 mt-0.5 leading-normal">
                        {getLabel('Resolution Action: ', 'إجراء التدقيق البشري: ', 'بڕیاری فەرماندە: ')}
                        <span className={r.action === 'APPROVED' ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                          {r.action === 'APPROVED' ? getLabel('APPROVED', 'موافق عليها', 'ڕێگەپێدراو') : getLabel('REJECTED', 'مرفوض كلياُ', 'ڕەتکراوە')}
                        </span>
                      </p>
                      <p className="text-[9px] text-[#425870] mt-0.5">{getLabel('Authorizing Cert: CIPHER-JWT-SECURE3921', 'شهادة التفويض الجمركي الموثقة: CIPHER-JWT-SECURE3921', 'ناسنامەی واژۆی ئەلیکترۆنی: CIPHER-JWT-SECURE3921')}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 4: AI Governance Framework Section */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 border-b border-slate-900 pb-1.5 flex items-center gap-1.5">
              <Layers className="text-[#E0A96D] w-4.5 h-4.5" />
              {getLabel('Sovereign Governance Framework', 'ميثاق وإطار الحوكمة السيادي الموحد', 'چوارچێوەی فەرمی بەڕێوەبردن و حووکمڕانی داتا')}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              {getLabel(
                'Every artificial intelligence model deployed within the Iraq Digital Gateway ecosystem must strictly satisfy the Supreme Sovereign Auditing Accords of 2026.',
                'يجب أن تخضع كافة نماذج الذكاء الاصطناعي المفعلة في البوابة الرقمية المشتركة لبنود ميثاق تدقيق السيادة العليا لعام ٢٠٢٦ م.',
                'هەموو مۆدێلەکانی زیرەکی دەستکردی نێو پۆرتالەکە دەبێت بە پێی یاسای مۆری سیادی گومرگی فیدراڵی بۆ ساڵی ٢٠٢٦ لەژێر چاودێری فەرمیدا بن.'
              )}
            </p>
            <div className="flex flex-col gap-2.5 mt-1">
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-850 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-200 text-xs">{getLabel('No External Cloud Dependencies', 'انعدام الاعتماد على السحابة الخارجية', 'پشت نەبەستن بە کۆگای دەرەکی')}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">{getLabel('AI models execute in secure local Baghdad micro-servers with offline fallback support.', 'تنفذ النماذج الذكية بالكامل محلياً داخل بغداد على خوادم حكومية معزولة وآمنة.', 'هەموو پشکنینەکان بە شێوازی ناوخۆیی لە بەغدا چارەسەر دەکرێن بە بێ بەستنەوە بە دەرەوە یان ئینتەرنێتی گشتی.')}</p>
                </div>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-850 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-200 text-xs">{getLabel('Zero-Bias Multi-Lingual Accord', 'ميثاق حظر التحيز وتعدد اللغات المعتمدة', 'بێلایەنی ته‌واوی زمانه‌ فه‌رمییه‌کان')}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">{getLabel('Kurdish, Arabic, and English trade entities are evaluated utilizing identical objective semantic parameters.', 'تتم معاملة الشحنات الكردية، العربية والإنجليزية بالتساوي وفقاً لمعايير وثوق معتدلة عادلة.', 'زمانەکانی کوردی، عەرەبی، و ئینگلیزی بە شێوازێکی بێلایەنانە و یەکسان هەڵسەنگاندنیان بۆ دەکرێت لە مۆدێلەکاندا.')}</p>
                </div>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-850 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-200 text-xs">{getLabel('Auditable Prompt Registers', 'سجلات توجيه ومعالجة خاضعة للرقابة الفورية', 'تۆماری فەرمی دانیشتنەکانی چاکسازی')}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">{getLabel('All dynamic statecraft prompts require electronic signatures before deploying into live gateway channels.', 'تتطلب التوجيهات البرمجية توقيعاً جمركياً إلكترونياً مشفراً قبل إدراجها ضمن القنوات الحية للبوابة.', 'سەرجەم دەستکاری و پێنووسینی ڕێنماییەکان پێویستیان بە واژۆی ئەلیکترۆنی فەرمی هەیە پێش جێبەجێکردنیان.')}</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

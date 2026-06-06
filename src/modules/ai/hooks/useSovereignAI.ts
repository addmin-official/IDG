import { useState, useCallback, useMemo } from 'react';
import { Language } from '../../../types';

export interface AIModule {
  id: string;
  index: string;
  accuracy: string;
  latency: string;
}

export interface HITLIncident {
  id: string;
  checkpoint: string;
  cargo: string;
  score: string;
  anomaly: string;
  status: string;
}

export interface HITLApproval {
  id: string;
  action: 'APPROVED' | 'REJECTED';
  timestamp: string;
}

export function useSovereignAI(lang: Language) {
  // Service Map Active Module
  const [activeModule, setActiveModule] = useState<string>('hs-classifier');

  // Prompt Playground State
  const [activePromptId, setActivePromptId] = useState<string>('hs-prompt');

  const getPromptTemplate = useCallback((id: string) => {
    switch(id) {
      case 'hs-prompt':
        return lang === 'ku' 
          ? `[ڕێنمایی گشتی سیستەم: پۆلێنکردنی کاڵاکانی گومرگ]\nتۆ مێشکی بەرپرسیاری زیرەکی دەستکردی بۆ دیاریکردنی کۆدی تاریفەی دەروازەی عێراق.\nئەم زانیارییانەی خوارەوە بۆ بارهەڵگرەکە پشتڕاستبکەرەوە بۆ وەرگرتنی کۆدی نێودەوڵەتی (HS Code):\n\nپێناسەی کاڵاکە: {{description}}\nوڵاتی سەرچاوە: {{origin}}\nبەهای پارە: {{cost}}\n\nدیاری بکە: (١) کۆدی ٨ خانەیی دروست، (٢) ڕێژەی مۆری گومرگی، (٣) ئاستی شیاوی مەترسی بارهەڵگرەکە.`
          : lang === 'ar'
          ? `[تعليمات النظام: محاكي تصنيف البضائع الموحد]\nأنت العقل والذكاء المعتمد لتصنيف البضائع الجمركية للبوابة الرقمية العراقية.\nقم بتدقيق الشحنة التالية لتحديد رمز التنسيق العالمي (HS Code):\n\nوصف البضاعة: {{description}}\nبلد المنشأ المصرح به: {{origin}}\nالتكلفة المصرح بها: {{cost}}\n\nحدد: (١) الرمز الصحيح المكون من ٨ أرقام، (٢) الرسوم الجمركية، (٣) معامل المخاطر والشبهات.`
          : `[SYSTEM_INSTRUCTION: ACT_AS_SOVEREIGN_IDG_CLASSIFIER]\nYou are the secure HS Classification AI for the Iraq Digital Gateway.\nAudit the following customs manifest to map the correct Harmonized System (HS) code:\n\nCargo Description: {{description}}\nDeclared Country of Origin: {{origin}}\nReported Unit Cost: {{cost}}\n\nDetermine: (1) Correct HS 8-digit Code, (2) Recommended Duty rate, (3) Risk match profile.`;
      case 'eval-prompt':
        return lang === 'ku'
          ? `[ڕێنمایی گشتی: فەرمانبەری پاراستنی داهاتی نیشتمانی]\nبەراوردی نرخی ڕاگەیەندراوی کاڵاکە بکە لەگەڵ پێوەرە فەرمییەکانی بازرگانی نێودەوڵەتی.\n\nشیکاری کاڵا: {{description}}\nبەهای ڕاگەیەندراو: {{cost}}\nوڵاتی سەرچاوە: {{origin}}\n\nبخەمڵێنە ئەگەر نرخی کاڵاکە گومانی تێدابێت. پێشنیار بکە بۆ سزادان یان دەستبەسەرداگرتن.`
          : lang === 'ar'
          ? `[توجيه: ضابط حماية العائد المالي الوطني]\nقارن الأسعار المصرح بها للمواد بأسعار الأسواق العالمية القياسية المقررة.\n\nالوصف الفني: {{description}}\nالقيمة المصرح بها: {{cost}}\nبلد المنشأ المورد: {{origin}}\n\nقدر نسبة الانحراف عن السعر الفعلي. أوصِ بغرامة مالية أو إيقاف الشحنة للاحتراز.`
          : `[INSTRUCTION: CHIEF_REVENUE_PROTECT_AGENT]\nCompare the declared price against raw trade indices.\n\nDescription: {{description}}\nDeclared Value: {{cost}}\nExporter origin: {{origin}}\n\nEstimate if reported price deviates from median index values. Recommend penalty or hold.`;
      case 'quarantine-prompt':
        return lang === 'ku'
          ? `[پشکنەری کشتوکاڵی و بایۆلۆجی دەروازەکان]\nشیکردنەوەی بارهەڵگرەکانی کەرتی کشتوکاڵ بکە بۆ ڕێگریکردن لە نەخۆشی جۆراوجۆر.\n\nشیکاری زانستی کاڵا: {{description}}\nسەرچاوەی فەرمی هاوردە: {{origin}}\n\nپشکنین بکە بۆ وجودی مەترسی کشتوکاڵی، مۆری تەندروستی گشتی و گونجاوی شهادەی وڵاتی هاوردەکەر.`
          : lang === 'ar'
          ? `[فلتر الفحص والحجر الصحي والبيولوجي الموحد]\nحلل طبيعة الشحنات الزراعية ومدى مطابقتها لضوابط السلامة الفيدرالية.\n\nوصف المنتج زراعياً: {{description}}\nالمنشأ ومكان التصدير: {{origin}}\n\nتحقق من تحذيرات الأمن البيولوجي، ومطابقة شهادة الفحص وشهادات المنشأ الصحية المعتمدة.`
          : `[SAFETY_INSPECT_FILTER]\nAnalyze agricultural cargos and quarantine codes.\n\nProduct description: {{description}}\nDeclared origin: {{origin}}\n\nCheck for biological safety alerts, active grain rust warnings, and certification hashes conformities.`;
      default:
        return '';
    }
  }, [lang]);

  const [promptTemplate, setPromptTemplate] = useState<string>(() => getPromptTemplate('hs-prompt'));

  // Custom prompt inputs for dynamic playground test
  const [playDesc, setPlayDesc] = useState<string>('Multi-axle steel alloy drill pipes for petroleum wells');
  const [playOrigin, setPlayOrigin] = useState<string>('Germany');
  const [playCost, setPlayCost] = useState<string>('$3,400 USD / Ton');
  
  const [isInferencing, setIsInferencing] = useState<boolean>(false);
  const [inferenceResult, setInferenceResult] = useState<string | null>(null);

  // HITL Active Decisions list
  const [hitlList, setHitlList] = useState<HITLIncident[]>([
    { id: 'hitl-2061', checkpoint: 'Umm Qasr Sea', cargo: 'Refined Vegetable Oils', score: '78%', anomaly: 'Weight/volume ratio diverges by 42% from standard merchant profiles', status: 'pending' },
    { id: 'hitl-2062', checkpoint: 'Ibrahim Khalil Land', cargo: 'Wireless Telemetry Systems', score: '61%', anomaly: 'Exporter matching flagged on dual-use RF transmitter registry without MoD seal', status: 'pending' },
    { id: 'hitl-2063', checkpoint: 'Trebil Crossing Land', cargo: 'Agricultural Feed Strains', score: '82%', anomaly: 'Grain inspection certificates mismatch phytosanitary stamp hash', status: 'pending' }
  ]);
  const [hitlApprovals, setHitlApprovals] = useState<HITLApproval[]>([]);

  const runTestInference = useCallback(() => {
    setIsInferencing(true);
    setInferenceResult(null);
    setTimeout(() => {
      const isDrillPipe = playDesc.toLowerCase().includes('drill') || playDesc.toLowerCase().includes('pipe');
      const standardResponse = isDrillPipe ? (
        lang === 'ku' ?
`[بزوێنەری بڕیاردانی زیرەکی نیشتمانی: بە سەرکەوتوویی تێپەڕی]
=========================================
١. پۆلێنکردنی کاڵاکان و کۆدی تاریفە:
   • کۆدی گونجاو (HS-CODE): 7304.22.00 (بۆری پۆڵاینی بەهێز بۆ بیرەکانی نەوت/گاز)
   • ڕێڕەوی پۆلێنکردن: بەرهەمەکانی پۆڵا -> بۆری گشتی -> بۆری هەڵکەندنی بیرەکان.

٢. تاریفەی گونجاو و پەسەندکراو:
   • تاریفەی جێگیرکراو: ٨٪ لە بەهای کاڵاکە
   • بەخشینی گومرگی: گونجاو لەگەڵ بەخشینی تایبەتی کەرتی وزە: MOD-PETRO-2026.

٣. ڕاپۆڕتی لێکۆڵینەوەی مەترسی:
   • کێموکوڕی بەدیارکەوتوو: ٠.٠٠٪ (بەهاکان بە تەواوی هاوتای فاکتۆری فەرمی ئەڵمانین)
   • باری تەندروستی: سەوز (ڕێگەپێدراوە بۆ پاسدان بە بێ کێشە)` :
        lang === 'ar' ?
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
   • حالة السلامة: خضراء (آمن للمرور تحت الحوكمة)` :
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
   • INTEGRITY STATUS: GREEN (Secure to proceed)`
      ) : (
        lang === 'ku' ?
`[بزوێنەری بڕیاردانی زیرەکی نیشتمانی: پڕۆسەکە چالاکە]
=========================================
١. پۆلێنکردنی کاڵاکان و کۆدی تاریفە:
   • کۆدی گونجاو (HS-CODE): 8471.30.00 (حاسیبەی دەستی، کۆمپیوتەری گواستراوە)
   • ئاستی متمانەی گشتی: ٩٨.٤٢٪

٢. تاریفەی گونجاو و پەسەندکراو:
   • تاریفەی دیاریکراو: ٥.٠٪
   • لێخۆشبوون: لێخۆشبوونی کەرتی پەروەردە بە سەرکەوتوویی جێبەجێ کرا.

٣. ڕاپۆڕتی مەترسی:
   • ئاستی مەترسی: نزم (سەرچاوەکە هاوتای دابینکاری فەرمی پشتڕاستکراوەیە بە تەواوی).` :
        lang === 'ar' ?
`[محرك الاستدلال السيادي: اتفاقية التدقيق نشطة]
=========================================
١. مخطط تصنيف البضائع والتعرفة:
   • رمز التنسيق (HS-CODE): 8471.30.00 (أجهزة معالجة داتا حاسوبية، أجهزة كمبيوتر محمولة)
   • نسبة الثقة المعيارية: ٩٨.٤٢٪

٢. مطابقة الرسوم المعتمدة:
   • التعرفة الجمركية القياسية: ٥.٠٪
   • الإعفاءات الجمركية: تم مطابقة خصم القطاع التعليمي بنجاح.

٣. تقرير مخاطر الشحنة:
   • درجة الخطورة: منخفضة (المنشأ يتطابق مع المورد المعتمد رسمياً لدى البوابة).` :
`[SOVEREIGN_INFERENCE_ENGINE: ACCORD_ACTIVE]
=========================================
1. HS CLASSIFICATION MAPPING:
   • RESOLVED HS-CODE: 8471.30.00 (Data processing machines, laptops, portable consoles)
   • CONFIDENCE SCORE: 98.42%

2. REGISTERED DUTY RECONCILIATION:
   • STANDARD TARIFF: 5.0%
   • EXEMPTIONS: Educational state rebate applied correctly.

3. RISK PROFILE:
   • RISK SCALE: LOW (Origin matches verified supplier path).`
      );
      
      setInferenceResult(standardResponse);
      setIsInferencing(false);
    }, 1800);
  }, [playDesc, lang]);

  const handleHITLResolve = useCallback((id: string, action: 'APPROVED' | 'REJECTED') => {
    setHitlList(prev => prev.filter(h => h.id !== id));
    setHitlApprovals(prev => [
      { id, action, timestamp: 'Confirmed' },
      ...prev
    ]);
  }, []);

  const registryPrompts = useMemo<Record<string, { title: string; desc: string; origin: string; cost: string }>>(() => ({
    'hs-prompt': {
      title: lang === 'ku' ? 'پۆلێنکەرە فەرمییەکانی کۆدی گومرگی (Model UR-Cortex)' : lang === 'ar' ? 'مصنف ترميز البضائع (نموذج UR-Cortex)' : 'HS Code Classifier (Model UR-Cortex)',
      desc: lang === 'ku' ? 'ڕێڕەوی بۆری پۆڵاینی بەهێز بۆ بیرە نەوتەکانی باشوور' : lang === 'ar' ? 'أنابيب حفر فولاذية متعددة المحاور لآبار النفط والغاز' : 'Multi-axle steel alloy drill pipes for petroleum wells',
      origin: 'Germany',
      cost: '$3,400 USD / Ton'
    },
    'eval-prompt': {
      title: lang === 'ku' ? 'وردبینیکردنی دابەزینی نرخەکان (Model Tigris-Risk)' : lang === 'ar' ? 'مدقق تخفيض الفواتير (نموذج Tigris-Risk)' : 'Under-Invoicing Auditor (Model Tigris-Risk)',
      desc: lang === 'ku' ? 'سامانی پۆلیمر و پلاستیکی ڕەق بە چڕی بەرز' : lang === 'ar' ? 'راتنجات البولي إيثيلين عالية الكثافة للبلاستيك' : 'High-density polyethylene resins',
      origin: 'Korea',
      cost: '$450 USD / Ton (Under-invoiced estimate)'
    },
    'quarantine-prompt': {
      title: lang === 'ku' ? 'پشکنەری کشتوکاڵ و کەرەنتینەی کشتوکاڵی (Model Euphrates-Phyto)' : lang === 'ar' ? 'فاحص الحجر الصحي والأمن الحيوي (Euphrates-Phyto)' : 'Biosecurity quarantine scanner (Model Euphrates-Phyto)',
      desc: lang === 'ku' ? 'دەنکە پەتاتەی فەرمی چێنراو بۆ کێڵگە کشتوکاڵییەکان' : lang === 'ar' ? 'بطاطس تقاوي سائبة لمراكز الإنتاج الزراعي' : 'Bulk seed-potatoes for farming hubs',
      origin: 'Lebanon',
      cost: '$620 USD / Ton'
    }
  }), [lang]);

  const loadPrompt = useCallback((id: string) => {
    const p = registryPrompts[id];
    if (p) {
      setActivePromptId(id);
      setPromptTemplate(getPromptTemplate(id));
      setPlayDesc(p.desc);
      setPlayOrigin(p.origin);
      setPlayCost(p.cost);
    }
  }, [registryPrompts, getPromptTemplate]);

  // Modules metadata list
  const aiModules = useMemo<AIModule[]>(() => [
    { id: 'hs-classifier', index: 'IDG-Cortex-V3', accuracy: '99.8%', latency: '40ms' },
    { id: 'customs-auditor', index: 'Ur-Transit-MoE', accuracy: '99.2%', latency: '52ms' },
    { id: 'logistics-seq', index: 'Tigris-Agent-V2', accuracy: '98.5%', latency: '35ms' },
    { id: 'compliance-intercept', index: 'CBI-Interlock-MoE', accuracy: '99.96%', latency: '65ms' },
    { id: 'risk-assessment', index: 'Iraq-Risk-V1', accuracy: '97.2%', latency: '28ms' },
    { id: 'decision-support', index: 'Ur-Statecraft-LLM', accuracy: '99.1%', latency: '120ms' },
    { id: 'predictive-corridors', index: 'Corridor-Flow-MoE', accuracy: '96.8%', latency: '45ms' },
    { id: 'economic-forecaster', index: 'Fiscal-Atlas-MoE', accuracy: '98.7%', latency: '90ms' }
  ], []);

  return {
    activeModule,
    setActiveModule,
    activePromptId,
    setActivePromptId,
    promptTemplate,
    setPromptTemplate,
    playDesc,
    setPlayDesc,
    playOrigin,
    setPlayOrigin,
    playCost,
    setPlayCost,
    isInferencing,
    inferenceResult,
    hitlList,
    hitlApprovals,
    runTestInference,
    handleHITLResolve,
    loadPrompt,
    aiModules
  };
}

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

export const getPromptTemplate = (id: string, lang: 'en' | 'ar' | 'ku') => {
  switch(id) {
    case 'hs-prompt':
      return lang === 'ku' 
        ? `[ڕێنمایی گشتی سیستەم: پۆلێنکردنی کاڵاکانی گومرگ]\nتۆ مێشکی بەرپرسیاری زیرەکی دەستکردی بۆ دیاریکردنی کۆدی تاریفەی دەروازەی عێراق.\nئەم زانیارییانەی خوارەوە بۆ بارهەڵگرەکە پشتڕاستبکەرەوە بۆ وەرگرتنی کۆدی نێودەوڵەتی (HS Code):\n\nپێناسەی کاڵاکە: {{description}}\nوڵاتی سەرچاوە: {{origin}}\nبەهای پارە: {{cost}}\n\nدیاری بکە: (١) کۆدی ٨ خانەیی دروست، (٢) ڕێژەی مۆری گومرگی، (٣) ئاستی شیاوی مەترسی بارهەڵگرەکە.`
        : lang === 'ar'
        ? `[تعليمات النظام: محاكي تصنيف البضائع الموحد]\nأنت العقل والذكاء المعتمد لتصنيف البضائع الجمركية للبوابة الرقمية العراقية.\nقم بتدقيق الشحنة التالية لتحديد رمز التنسيق العالمي (HS Code):\n\nوصف البضاعة: {{description}}\nبلد المنشأ المصرح به: {{origin}}\nالتكلفة المصرح بها: {{cost}}\n\nحدد: (١) الرمز الصحيح المكون من ٨ أرقام، (٢) الرسوم الجمركية، (٣) معامل المخاطر والشبهات.`
        : `[SYSTEM_INSTRUCTION: ACT_AS_SOVEREIGN_IDG_CLASSIFIER]\nYou are the secure HS Classification AI for the Iraq Gateway.\nCargo Description: {{description}}\nOrigin: {{origin}}\nCost: {{cost}}\nDetermine: (1) Correct HS Code, (2) Recommended Duty rate, (3) Risk profile.`;
    case 'eval-prompt':
      return lang === 'ku'
        ? `[ڕێنمایی گشتی: فەرمانبەری پاراستنی داهاتی نیشتمانی]\nبه‌راوردی نرخی ڕاگه‌یه‌ندراوی کاڵاکە بکە لەگەڵ پێوه‌رە فه‌رمییه‌کانی بازرگانی نێودەوڵەتی.`
        : lang === 'ar'
        ? `[توجيه: ضابط حماية العائد المالي الوطني]\nقارن الأسعار المصرح بها للمواد بأسعار الأسواق العالمية القياسية المقررة.`
        : `[INSTRUCTION: CHIEF_REVENUE_PROTECT_AGENT]\nCompare the declared price against raw trade indices.\nDescription: {{description}}\nDeclared Value: {{cost}}\nExporter origin: {{origin}}\nEstimate deviation.`;
    case 'quarantine-prompt':
      return lang === 'ku'
        ? `[پشکنەری کشتوکاڵی و بایۆلۆجی دەروازەکان]\nشیکردنەوەی بارهەڵگرەکانی کهرتی کشتوکاڵ بکە بۆ ڕێگریکردن لە نەخۆشی جۆراوجۆر.`
        : lang === 'ar'
        ? `[فلتر الفحص والحجر الصحي والبيولوجي الموحد]\nحلل طبيعة الشحنات الزراعية ومدى مطابقتها لضوابط السلامة الفيدرالية.`
        : `[SAFETY_INSPECT_FILTER]\nAnalyze agricultural cargos and quarantine codes.\nProduct description: {{description}}\nOrigin: {{origin}}\nCheck biological alerts.`;
    default:
      return '';
  }
};

export const getStandardResponse = (playDesc: string, lang: 'en' | 'ar' | 'ku') => {
  const isDrillPipe = playDesc.toLowerCase().includes('drill') || playDesc.toLowerCase().includes('pipe');
  if (isDrillPipe) {
    if (lang === 'ku') {
      return `[بزوێنەری بڕیاردانی زیرەکی نیشتمانی]\n١. HS-CODE: 7304.22.00\n٢. تاریفە: ٨٪\n٣. مەترسی: سەوز`;
    }
    if (lang === 'ar') {
      return `[محرك الاستدلال السيادي]\n١. الرمز (HS-CODE): 7304.22.00\n٢. الرسوم: ٨٪\n٣. تقرير المخاطر: خضراء`;
    }
    return `[SOVEREIGN_INFERENCE_ENGINE: CLEARED]\n1. RESOLVED HS-CODE: 7304.22.00\n2. TARIFF: 8% Ad-Valorem\n3. INTEGRITY: GREEN`;
  } else {
    if (lang === 'ku') {
      return `[بزوێنەری بڕیاردانی زیرەکی نیشتمانی]\n١. HS-CODE: 8471.30.00\n٢. تاریفە: ٥.٠٪\n٣. مەترسی: نزم`;
    }
    if (lang === 'ar') {
      return `[محرك الاستدلال السيادي]\n١. الرمز (HS-CODE): 8471.30.00\n٢. الرسوم: ٥.٠٪\n٣. تقرير المخاطر: منخفضة`;
    }
    return `[SOVEREIGN_INFERENCE_ENGINE: CLEARED]\n1. RESOVED HS-CODE: 8471.30.00\n2. TARIFF: 5.0%\n3. RISK PROFILE: LOW`;
  }
};

export const getRegistryPrompts = (lang: 'en' | 'ar' | 'ku') => ({
  'hs-prompt': {
    title: lang === 'ku' ? 'پۆلێنکەرە فەرمییەکانی کۆدی گومرگی (Model UR-Cortex)' : lang === 'ar' ? 'مصنف ترميز البضائع (نموذج UR-Cortex)' : 'HS Code Classifier (Model UR-Cortex)',
    desc: 'Multi-axle steel alloy drill pipes for petroleum wells',
    origin: 'Germany',
    cost: '$3,400 USD / Ton'
  },
  'eval-prompt': {
    title: lang === 'ku' ? 'وردبینیکردنی دابەزینی نرخەکان (Model Tigris-Risk)' : lang === 'ar' ? 'مدقق تخفيض الفواتير (نموذج Tigris-Risk)' : 'Under-Invoicing Auditor (Model Tigris-Risk)',
    desc: 'High-density polyethylene resins',
    origin: 'Korea',
    cost: '$450 USD / Ton (Under-invoiced estimate)'
  },
  'quarantine-prompt': {
    title: lang === 'ku' ? 'پشکنەری کشتوکاڵ و کەرەنتینەی فەرمی (Euphrates-Phyto)' : lang === 'ar' ? 'فاحص الحجر الصحي والأمن الحيوي (Euphrates-Phyto)' : 'Biosecurity quarantine scanner (Euphrates-Phyto)',
    desc: 'Bulk seed-potatoes for farming hubs',
    origin: 'Lebanon',
    cost: '$620 USD / Ton'
  }
});

export const aiModules = [
  { id: 'hs-classifier', index: 'IDG-Cortex-V3', accuracy: '99.8%', latency: '40ms' },
  { id: 'customs-auditor', index: 'Ur-Transit-MoE', accuracy: '99.2%', latency: '52ms' },
  { id: 'logistics-seq', index: 'Tigris-Agent-V2', accuracy: '98.5%', latency: '35ms' },
  { id: 'compliance-intercept', index: 'CBI-Interlock-MoE', accuracy: '99.96%', latency: '65ms' },
  { id: 'risk-assessment', index: 'Iraq-Risk-V1', accuracy: '97.2%', latency: '28ms' },
  { id: 'decision-support', index: 'Ur-Statecraft-LLM', accuracy: '99.1%', latency: '120ms' },
  { id: 'predictive-corridors', index: 'Corridor-Flow-MoE', accuracy: '96.8%', latency: '45ms' },
  { id: 'economic-forecaster', index: 'Fiscal-Atlas-MoE', accuracy: '98.7%', latency: '90ms' }
];

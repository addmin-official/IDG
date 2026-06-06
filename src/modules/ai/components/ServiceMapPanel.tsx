import React from 'react';
import { Language } from '../../../types';
import { t } from '../localization/aiTranslations';
import { AIModule } from '../hooks/useSovereignAI';

interface ServiceMapPanelProps {
  lang: Language;
  activeModule: string;
  setActiveModule: (id: string) => void;
  aiModules: AIModule[];
}

export const ServiceMapPanel: React.FC<ServiceMapPanelProps> = React.memo(({
  lang,
  activeModule,
  setActiveModule,
  aiModules
}) => {
  const getModuleName = (id: string) => {
    switch (id) {
      case 'hs-classifier': return lang === 'ku' ? 'زیرەکی پۆلێنکردنی تاریفەکان (HS Classifier)' : lang === 'ar' ? 'ذكاء تصنيف البضائع والتعرفة' : 'HS Classification AI';
      case 'customs-auditor': return lang === 'ku' ? 'هاوکار و عەقڵی گشتی گومرگ (Customs Assistant)' : lang === 'ar' ? 'مساعد التدقيق الجمركي الآلي' : 'Customs Assistant AI';
      case 'logistics-seq': return lang === 'ku' ? 'بزوێنەری مۆنیتۆری هۆشیاری لۆجستی (Logistics Core)' : lang === 'ar' ? 'محرك جدولة اللوجستية والمسارات' : 'Logistics AI Core';
      case 'compliance-intercept': return lang === 'ku' ? 'زیرەکی پاراستنی بەڵگەنامە گشتییەکان (Compliance AI)' : lang === 'ar' ? 'ذكاء مراقبة الحوالات والامتثال' : 'Compliance Intercept AI';
      case 'risk-assessment': return lang === 'ku' ? 'تۆڕی هەڵسەنگاندنی مەترسییەکان (Risk Assessment)' : lang === 'ar' ? 'تحليل المخاطر العصبية للمنافذ' : 'Risk Assessment neural';
      case 'decision-support': return lang === 'ku' ? 'سیرڤسی هاوکاری بڕیاری وەزارەت (Decision Support)' : lang === 'ar' ? 'وكيل دعم القرار الوزاري' : 'Decision Support Agent';
      case 'predictive-corridors': return lang === 'ku' ? 'زیرەکی پێشبینیکردنی ڕێڕەوەکانی ترانزیت (Predictive Transit)' : lang === 'ar' ? 'ذكاء مسارات الترانزيت التنبؤي' : 'Predictive Transit AI';
      case 'economic-forecaster': return lang === 'ku' ? 'تۆڕی زانیاریی ئابووری نیشتمانیی (Economic Intel)' : lang === 'ar' ? 'الشبكة الاستخباراتية الاقتصادية' : 'Economic Intel Network';
      default: return id;
    }
  };

  const getModuleStatus = (id: string) => {
    switch (id) {
      case 'hs-classifier': return lang === 'ku' ? 'چالاک و پێشنیارکەر' : lang === 'ar' ? 'متصل ويقدم التوصيات' : 'Live & Recommending';
      case 'customs-auditor': return lang === 'ku' ? 'پاڵپشتی چالاک' : lang === 'ar' ? 'خادم احتياطي نشط' : 'Backup Active';
      case 'logistics-seq': return lang === 'ku' ? 'ڕاستەوخۆ چالاک' : lang === 'ar' ? 'متصل ونشط' : 'Live & Active';
      case 'compliance-intercept': return lang === 'ku' ? 'سیستەمی چاودێری توند' : lang === 'ar' ? 'عديم الثقة النشطة' : 'Strict Zero-Trust';
      case 'risk-assessment': return lang === 'ku' ? 'مۆنیتۆرکردنی ڕاستەوخۆ' : lang === 'ar' ? 'يراقب تدفق البيانات' : 'Monitoring Stream';
      case 'decision-support': return lang === 'ku' ? 'لەسەر هێڵە' : lang === 'ar' ? 'في وضع الاستعداد' : 'On-Standby';
      case 'predictive-corridors': return lang === 'ku' ? 'چالاکە' : lang === 'ar' ? 'نشط' : 'Active';
      case 'economic-forecaster': return lang === 'ku' ? 'چالاکی ڕاستەوخۆ' : lang === 'ar' ? 'مباشر' : 'Live';
      default: return '';
    }
  };

  const getModuleDetail = (id: string) => {
    switch (id) {
      case 'hs-classifier': return lang === 'ku'
        ? 'پۆلێنکەری جۆری کاڵاکان بە شێوازێکی کارامە مانیفێستەکان بە زمانەکانی کوردی و عەرەبی لێکدەداتەوە بۆ پێدانی کۆدی گونجاو و ڕێگەگرتن لە شاردنەوەی سەرچاوە فەرمییەکان.'
        : lang === 'ar'
        ? 'يقوم مصنف ترميز البضائع بتحليل المانيفستات متعددة اللغات باللغات الكردية والعربية وغيرها ومطابقتها بمؤشرات السلع العالمية لمنع التهريب الجمركي ومحالات تزييف البضائع.'
        : 'Our HS Code Classifier parses multi-language manifests in Kurdish, Arabic, and Western scripts, matching declared item textures to global custom indices. This intercepts intentional misclassifications designed to hide toxic industrial chemicals or avoid tariffs.';
      case 'customs-auditor': return lang === 'ku'
        ? 'سیستەمی دیاریکردنی کەمکردنەوەی فاکتۆرەکان. هەڵسەنگاندنی بەهای ڕاستەقینەی کاڵاکان دەکات بۆ پاراستنی داهاتی گشتی عێراق بە شێوازێکی زۆر خێرا.'
        : lang === 'ar'
        ? 'محلل خفض قيمة الفواتير العادلة للشحنات. يقارن أسعار الفواتير بالنطاق السعري في الأسواق العالمية حماية للعائد المالي السيادي الوطني.'
        : 'Under-invoicing analyzer. Examines container item valuations and correlates them against global market averages. Generates instant revenue protection warnings if cargo worth deviates sharply from trade averages.';
      case 'logistics-seq': return lang === 'ku'
        ? 'سیستەم بە شێوەیەکی خۆکار لۆجستی و جووڵەی بارهەڵگرەکان لە نێوان دەروازەی باشوور و دەروازە وشکانییەکاندا بە وردی ڕێکدەخات.'
        : lang === 'ar'
        ? 'ينظم طوابير الشاحنات لوجستياً بشكل مستقل تماماً. يربط بين كثافة الطوابير في معبر إبراهيم الخليل ومنفذ طريبيل لتنظيم التدفق بذكاء.'
        : 'Autonomously sequences logistics backlogs. Correlates queue densities at Trebil, Ibrahim Khalil, and southern harbors to predict custom processing congestions and schedules automatic re-routes.';
      case 'compliance-intercept': return lang === 'ku'
        ? 'تۆڕی پاراستنی بەڵگەنامە گشتییەکان. هاوشێوەکردنی جووڵەی پارە نێردراوەکان دەکات بۆ ڕێگری لە بردنە دەرەوەی زیانبەخشی دراوی قورس و سپیکردنەوە.'
        : lang === 'ar'
        ? 'محور الامتثال السيادي لتعاملات البنك المركزي العراقي. يكشف عمليات تهريب الدولار، تهريب العملات والاستيرادات الوهمية غير الحقيقية.'
        : 'Sovereign compliance interlock. Matches high-frequency financial wire transfers matching CBI auction indices. Exposes capital evasion, currency manipulations, and phantom imports.';
      case 'risk-assessment': return lang === 'ku'
        ? 'هەڵسەنگاندنی ئاستی مەترسی بارهەڵگرەکان دەکات. پەیوەندی نێوان بەندەرەکان و کۆمپانیاکان چاودێری دەکات بۆ تەرخانکردنی کاتی پشکنینی فیزیکی لە دەروازەکان.'
        : lang === 'ar'
        ? 'يقيم درجات المخاطرة للشحنات الواردة. يربط بين الموانئ، والشركات المصدرة والناقلة لتحديد الشحنات المشتبه بها للتدقيق اليدوي.'
        : 'Evaluates risk profiles on all inbound shipments. Cross-references shippers, shipping ports, transport fleets, and cargo descriptions to flag physical inspection priorities without impacting clean traders.';
      case 'decision-support': return lang === 'ku'
        ? 'ڕاوێژکاری ستراتیژی بڕیاردانی وەزارەتەکان. کۆکەرەوەی داتاکانی داهات و گومرگییە بۆ پیشاندانی پێشبینییە فەرمییەکان بە ڕاستەوخۆیی لەسەر کۆمپیوتەری بەردەست.'
        : lang === 'ar'
        ? 'مستشار الدعم الاستراتيجي لصناع القرار الوزاري. يلخص العوائد والضرائب ويوفر توقعات واضحة لدعم السياسات المالية الفيدرالية والمحلية.'
        : 'Strategic statecraft advisor. Synthesizes fiscal outcomes, trade tax yields, and commodity flows to provide ministries with forecast summaries, tariff optimizations, and policy projections.';
      case 'predictive-corridors': return lang === 'ku'
        ? 'چاودێری ڕێڕەوە وشکانییەکان دەکات. کۆنترۆڵکردنی بارهەڵگرەکانی ترانزیت دەکات لە یەکەم دەروازەی هاتنەوە تا دەروازەی کۆتایی بە ئۆتۆماتیکی.'
        : lang === 'ar'
        ? 'يراقب التدفق المستمر عبر الممرات الجافة الإقليمية. يتتبع حركة شحنات الترانزيت ويتأكد من الأختام الجمركية الإلكترونية وحرمتها.'
        : 'Monitors transit currents across active regional dry links. Tracks transshipments and verifies sealing integrity from initial seaport gates to regional egress terminals.';
      case 'economic-forecaster': return lang === 'ku'
        ? 'کۆکەرەوەی هاوسەنگی بازرگانی نێوان حکومەتی فیدراڵ و هەرێمی کوردستانە. متمانە و یارمەتی وەزارەتی دارایی دەدات بۆ پێشبینی نرخەکان.'
        : lang === 'ar'
        ? 'يوحد البيانات التجارية بين المركز والإقليم. يساعد وزارة المالية في رصد حركة البضائع والأسعار والتوقعات المالية بدقة ووضوح.'
        : 'Consolidates trade balance data vectors across Iraq and Kurdistan borders. Assists the Ministry of Finance in predicting domestic market pricing and trade surplus developments.';
      default: return '';
    }
  };

  return (
    <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4 text-start">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 border-b border-slate-900 pb-2 text-start">
        {t(lang, 'cluster.title')}
      </h3>
      <p className="text-xs text-slate-400 leading-relaxed text-start">
        {t(lang, 'cluster.subtitle')}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-start">
        {aiModules.map((m) => (
          <button
            key={m.id}
            onClick={() => setActiveModule(m.id)}
            className={`p-3 rounded-lg border text-start transition-all cursor-pointer flex flex-col justify-between h-[125px] w-full ${
              activeModule === m.id
                ? 'bg-emerald-950/20 border-emerald-500 shadow-md ring-1 ring-emerald-500/20'
                : 'bg-[#0f1b29]/90 border-slate-800 hover:border-slate-700 hover:bg-[#112032]'
            }`}
          >
            <div className="flex justify-between items-start gap-1 w-full">
              <span className="text-[10px] bg-slate-900 border border-slate-800 rounded px-1 text-slate-400 font-mono font-medium">{m.index}</span>
              <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${activeModule === m.id ? 'bg-[#52B788] animate-pulse' : 'bg-emerald-500/60'}`} />
            </div>
            <div className="w-full">
              <h4 className="font-semibold text-slate-200 text-xs mt-1 leading-snug truncate w-full">{getModuleName(m.id)}</h4>
              <p className="text-[10px] font-mono text-slate-405 mt-1 capitalize truncate w-full">
                {t(lang, 'cluster.dutyGrade')}{getModuleStatus(m.id)}
              </p>
            </div>
            <div className="flex justify-between items-center text-[9px] font-mono mt-1 pt-1 border-t border-slate-800 text-slate-500 w-full">
              <span>{t(lang, 'cluster.precision')}{m.accuracy}</span>
              <span>{t(lang, 'cluster.latency')}{m.latency}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Module Detail Panel */}
      <div className="bg-[#0b1420] p-4 rounded-lg border border-slate-800/85 flex flex-col gap-2 mt-2 text-start">
        <div className="flex justify-between items-center border-b border-slate-800/60 pb-2 mb-2 w-full text-start">
          <span className="text-[10px] font-mono text-[#E0A96D] uppercase font-bold text-start">
            {t(lang, 'cluster.reportPrefix')}{activeModule.toUpperCase()}
          </span>
          <span className="text-[10px] text-slate-500 font-mono text-end">
            {t(lang, 'cluster.nodeHealth')}
          </span>
        </div>
        <p className="text-xs text-slate-350 leading-relaxed font-sans text-start">
          {getModuleDetail(activeModule)}
        </p>
      </div>
    </div>
  );
});

ServiceMapPanel.displayName = 'ServiceMapPanel';

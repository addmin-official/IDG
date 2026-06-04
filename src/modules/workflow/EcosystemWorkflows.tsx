import React, { useState, useEffect } from 'react';
import { 
  Network, Play, Pause, RefreshCw, Zap, Ship, Truck, Plane, Sparkles, 
  Database, ShieldCheck, Landmark, Building2, Eye, Activity, HelpCircle, 
  ArrowRight, CheckCircle, BarChart3, AlertCircle, Cpu, BadgeCheck, FileCheck
} from 'lucide-react';
import { Language } from '../../types';

interface EcosystemWorkflowsProps {
  lang: Language;
}

export default function EcosystemWorkflows({ lang }: EcosystemWorkflowsProps) {
  // Scenario selector ('general-trade', 'krg-trade', 'air-cargo')
  const [activeScenario, setActiveScenario] = useState<'general-trade' | 'krg-trade' | 'air-cargo'>('general-trade');
  
  // Simulation Active/Paused state
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [simulationSpeed, setSimulationSpeed] = useState<number>(3000); // ms per step
  
  // Step active pointer inside the 13-stage pipeline
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  
  // Custom transaction logs
  const [logs, setLogs] = useState<Array<{ id: string; step: string; status: string; detail: string; timestamp: string }>>([
    { id: 'TX-0981', step: '1. Manifest Input', status: 'Success', detail: 'Pre-filing container batch registration processed via secure terminal.', timestamp: 'Just now' },
    { id: 'TX-0980', step: '13. Settlement Dispatch', status: 'Success', detail: 'National Treasury ledger updated; custom duty IQD cleared.', timestamp: '2 mins ago' }
  ]);

  // General simulation counters
  const [simMetrics, setSimMetrics] = useState({
    processedTransactions: 124,
    unmitigatedAnomalies: 0,
    totalDutyCalculated: 4124900000, // IQD
    averageClearanceTime: 14.2 // Minutes
  });

  // 13-step unified statecraft workflow list definitions
  const workflowSteps = [
    {
      id: 'step-1',
      title: { en: 'Secure Digital Manifest Submission', ar: 'تقديم بيان الشحنة الرقمي المشفر', ku: 'پێشکەشکردنی بەیاننامەی بارهەڵگری کۆدکراو' },
      actor: { en: 'Importer Trade Entity', ar: 'الجهة المستوردة المصرحة', ku: 'کۆمپانیای هاوردەکاری فەرمی' },
      detail: { en: 'The trader uploads the cargo manifest into IDG portal using cryptographic biosecurity signature verification.', ar: 'يقوم المستورد برفع تفاصيل الشحنة عبر البوابة بختم وبصمة إلكترونية بايومترية مشفرة صفر ثقة.', ku: 'هاوردەکار وەسفی گشتی شتوومەک پاشەکەوت دەکات لە ڕێگەی مۆری دیجیتاڵیی هێمن.' }
    },
    {
      id: 'step-2',
      title: { en: 'Autonomous HS-Code Translation Audit', ar: 'التدقيق الآلي لرمز النظام المنسق', ku: 'تدقیقی خودکاری کایەکانی کۆدی جیهانی HS' },
      actor: { en: 'Sovereign IDG Cortex', ar: 'العقل الاصطناعي السيادي (IDG Cortex)', ku: 'مێشکی زیرەکی نیشتمانیی (IDG Cortex)' },
      detail: { en: 'Gemini NLP parses description to verify correct HS Code classification representation, rejecting mismatches.', ar: 'يقوم محرك الذكاء الاصطناعي التابع للبوابة بمطابقة التوصيف اللفظي للتأكد من رمز السلعة ورسومها.', ku: 'مۆدێلی ژیری دەستکرد وەسفی بار بۆ کۆدی ستانداردی HS پۆلێن دەکات تا ڕێگری بکات لە هەڵە.' }
    },
    {
      id: 'step-3',
      title: { en: 'Central Bank (CBI) FX-Collateral Match', ar: 'مطابقة حوالة عملة البنك المركزي العراقي', ku: 'هاوتاکردنی حەواڵەی دارایی بانکی ناوەندی عێراق (CBI)' },
      actor: { en: 'Central Bank of Iraq (CBI)', ar: 'البنك المركزي العراقي (CBI)', ku: 'بانکی ناوەندی عێراق (CBI)' },
      detail: { en: 'Verifies matching legal purchase of foreign reserves against customs evaluation parameters, blocking capital flight.', ar: 'يتم التدقيق التلقائي لمطابقة الاعتماد المالي ومزاد العملة مع قيمة البضاعة لمنع التهرب المالي.', ku: 'پڕبوونی مۆڵەتی کڕینی دۆلاری فەرمی بەراورد دەکرێت لەگەڵ بەهای بار بۆ ڕاگرتنی سپیکردنەوەی پارە.' }
    },
    {
      id: 'step-4',
      title: { en: 'Quality & Standardization Interlock', ar: 'تدقيق التقييس والسيطرة النوعية الفيدرالي', ku: 'کۆنتڕۆڵی جۆری و مەرجی ستانداردەکانی عێراق' },
      actor: { en: 'COSQC Standardization Authority', ar: 'الجهاز المركزي للتقييس والسيطرة النوعية', ku: 'ناوەندی گشتی کۆنترۆڵی جۆری (COSQC)' },
      detail: { en: 'Cross checks electronic standardization certificates based on national quality protection guidelines.', ar: 'مطابقة الفحوصات الفنية لسلامة ومطابقة السلع للمواصفات العراقية المعتمدة إلكترونياً.', ku: 'پشکنینی بڕوانامەی تەندروستی و سەلامەتی بار بە پێی ڕێنمایی یەکگرتووي دەوڵەت.' }
    },
    {
      id: 'step-5',
      title: { en: 'Dual-Use Strategic Material Defense Gate', ar: 'بوابة تراخيص السلع الاستراتيجية والوزارية', ku: 'پشکنینی دەروازەی وەزارەتی ناوخۆ بۆ باری تایبەت' },
      actor: { en: 'Ministry of Defense & Civil Auth', ar: 'وزارة الدفاع الوطني واللجان المشتركة', ku: 'وەزارەتی فیدراڵ و لیژنەی باڵای ئەمنی' },
      detail: { en: 'Verifies dual-use industrial chemical reagents or alloys matching military security authorization registers.', ar: 'فحص مسبق للمواد الكيميائية والأجهزة الحساسة لمنع دخول المواد الخطرة دون تفويض.', ku: 'پشکنینی تەواوی ماددە جۆربەجۆرەکانی پیشەسازی پیش دانی ڕێپێدانی تێپەڕبوون.' }
    },
    {
      id: 'step-6',
      title: { en: 'Phytosanitary Medical Clearance Audit', ar: 'الفحص الطبي الزراعي والصحي للشحنة', ku: 'تدقیقی تەندروستی پزیشکی و کشتوکاڵی' },
      actor: { en: 'Ministry of Health & Agriculture', ar: 'وزارتا الصحة والزراعة الاتحادية', ku: 'وەزارەتی تەندروستی و وەزارەتی کشتوکاڵ' },
      detail: { en: 'Validates quarantine safety stamps, biological certifications, and expiry codes at entrance hubs.', ar: 'تدقيق شهادات الحجر الصحي الحيوانية والنباتية وصلاحيات اللقاحات ومطابقة المخازن المبردة.', ku: 'پشتڕاستکردنەوەی مۆری کەرەنتینە و مەرجەکانی سەلامەتی بایۆلۆجی بۆ باری خۆراک یان دەرمان.' }
    },
    {
      id: 'step-7',
      title: { en: 'Under-Invoicing Revenue Protection Audit', ar: 'تدقيق التسعير الاستيرادي ومكافحة التهرب الفاتوري', ku: 'پشکینی فێڵی بەهەرزان نیشاندانی تێچووی هاوردە' },
      actor: { en: 'Federal Customs Anti-Fraud unit', ar: 'وحدة حماية الإيرادات ومكافحة التهرب الجمركي', ku: 'بەشی دەروازە بۆ چاودێری فێڵ و داگرتنی نرخ' },
      detail: { en: 'Correlates price profiles to prevent tariff losses from undervalued and misdeclared imports.', ar: 'يقوم الذكاء الاصطناعي بكشف كذب الفواتير الاستعراضية الرخيصة لإلزام المستورد بالقيمة العادلة الموحدة.', ku: 'بەراوردکردنی نرخی ڕاگەیەندراو لەگەڵ نرخی بازاڕ بۆ ڕاگرتنی تێکدانی هاوسەنگی باج.' }
    },
    {
      id: 'step-8',
      title: { en: 'Centralized Risk Scoring Vector Assessment', ar: 'محرك تقييم المخاطر الأمنية والجمركية', ku: 'بزوێنەری پۆلێنکردنی مەترسییە ئەمنییەکان' },
      actor: { en: 'Joint Intelligence Risk Hub', ar: 'المركز المشترك لتقدير المخاطر واستخبارات الحدود', ku: 'ناوەندی کێشانی نەخشەی مەترسی خاڵە سنوورییەکان' },
      detail: { en: 'Compiles custom behavioral data records to assign high, medium, or green speed audit lanes.', ar: 'تصنيف سلوك المستورد للتسهيل المباشر أو الالتزام بالتفتيش الميداني والأشعة الحية.', ku: 'دانانی نمرەی مەترسی گشتی بۆ گواستنەوەی بار بۆ ڕێڕەوی خێرا یان پشکنینی سۆنەر.' }
    },
    {
      id: 'step-9',
      title: { en: 'Physical Border X-Ray Scanner Match', ar: 'الفحص الميداني الفيزيائي وأجهزة السونار', ku: 'پشکنینی سۆنەر و سکێنەری تیشکی فورت' },
      actor: { en: 'Border Crossing Hardware Auth', ar: 'أجهزة السونار ومراقبة المنافذ الميدانية', ku: 'ناوەندی پشکنینی فیزيائي و تيشكي دەروازە' },
      detail: { en: 'Schedules bulk container scanning. Computer vision identifies density anomalies inside cargo panels.', ar: 'مطابقة صور الأشعة السينية للحاويات بالذكاء الاصطناعي للتأكد من مطابقة اللوائح للواقع المادي.', ku: 'پێداچوونەوەی وێنەی سۆنەری کانتینەر لەگەڵ زانیاری دۆکیومێنتی باری هاتووە ژوورەوە.' }
    },
    {
      id: 'step-10',
      title: { en: 'Federal Tariff calculation & Assessment', ar: 'احتساب قيمة الرسوم الجمركية والضرائب الاتحادية', ku: 'محاسبەکردنی بڕی باجی فەرمی تاریفەی جومگەیی' },
      actor: { en: 'Unified General Customs Authority', ar: 'الهيئة الاتحادية للجمارك والتعرفة الموحدة', ku: 'ناوەندی باجی گومرگی فیدراڵی عێراقی' },
      detail: { en: 'Generates secure final ad-valorem duty calculations based on checked HS-code rules.', ar: 'إصدار التسعيرة الرسمية النهائية للضريبة والجمارك والرسوم الإضافية بموجب القانون الموحد.', ku: 'دروستکردنی فۆرمی کۆتایی تێچووی گومرگ بە پێی یاسای تاریفەی پەسەندکراوی دەوڵەت.' }
    },
    {
      id: 'step-11',
      title: { en: 'Human-in-the-Loop Override Approval', ar: 'المصادقة والتفويض البشري للمعاملة الجمركية', ku: 'پەسەندکردنی کۆتایی ئەفسەری ڕێپێدراو (مرۆیی)' },
      actor: { en: 'Authorized Customs Officer', ar: 'ضابط الجمارك المفوض (التوقيع البشري)', ku: 'ئەفسەری فەرمی بەرپرسی متمانەی کۆتایی' },
      detail: { en: 'The officer reviews compiled intelligence reports to click approval stamps, releasing cargo grids.', ar: 'مراجعة نهائية من قبل ضابط الإدخال للمصادقة وتمرير المعاملة أو تعليقها للتحقيق.', ku: 'ئەفسەری نیشتمانیی پێداچوونەوە دەکات بە گشت بەڵگەکان و مۆری کۆتایی تێپەڕبوون دەدات.' }
    },
    {
      id: 'step-12',
      title: { en: 'Blockchain Ledger Escrow Settlement', ar: 'تأمين الحوالة البنكية ومقاصة الضمان الإلكتروني', ku: 'پاشەکەوتکردنی ژمارەیی معاملەکە لە بلۆکچین' },
      actor: { en: 'Sovereign Clearing Ledger', ar: 'منظومة السجل والكتل المالية المشفرة', ku: 'سیستەمی تۆماری بلۆکچینی گومرگ' },
      detail: { en: 'Binds the transactional logs into a secure immutable state ledger block, verifying audit trail integrity.', ar: 'إرسال تفاصيل المعاملة والرسوم المقبوضة لسلسلة الكتل المشفرة غير القابلة للتلاعب.', ku: 'جێگیرکردنی داتاکانی گومرگ لەناو بلۆکچینی نیشتمانیی بێ ویستی دەستکاریکردن.' }
    },
    {
      id: 'step-13',
      title: { en: 'National Treasury Ledger Dispatch', ar: 'إيداع وتسوية أموال الرسوم في الخزينة المركزية', ku: 'ناردنی داهات بۆ خەزێنەی سەرەکی دەوڵەت' },
      actor: { en: 'Iraq Ministry of Finance', ar: 'وزارة المالية الاتحادية وخزينة الدولة', ku: 'وەزارەتی دارایی فیدراڵی عێراق' },
      detail: { en: 'Triggers dynamic payout settlements into the executive Central Treasury cash buffer account.', ar: 'تسوية الحوالة ونقل الأموال من حساب الضمان إلى الخزينة المركزية الفيدرالية رسمياً.', ku: 'ناردنی فەرمی پارەی باج بۆ ئەکاونتی گشتی خەزێنەی متمانەپێکراوی وەزارتی دارایی.' }
    }
  ];

  // Active step pointer automatically increments if Simulation is live
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSimulating) {
      timer = setInterval(() => {
        setActiveStepIndex((prev) => {
          const next = (prev + 1) % workflowSteps.length;
          
          // Generate simulated statistics change dynamically
          if (next === 0) {
            setSimMetrics(prevMetrics => ({
              processedTransactions: prevMetrics.processedTransactions + 1,
              unmitigatedAnomalies: Math.random() > 0.85 ? prevMetrics.unmitigatedAnomalies + 1 : prevMetrics.unmitigatedAnomalies,
              totalDutyCalculated: prevMetrics.totalDutyCalculated + Math.floor(12000000 + Math.random() * 8000000),
              averageClearanceTime: Number((13.8 + Math.random() * 0.8).toFixed(1))
            }));
          }

          // Randomly append fresh simulated transaction logs on step change
          const stepObj = workflowSteps[next];
          const newTx = `TX-${Math.floor(1000 + Math.random() * 9000)}`;
          setLogs(prevLogs => [
            { 
              id: newTx, 
              step: `${next + 1}. ${stepObj.title[lang]}`, 
              status: 'Processing', 
              detail: lang === 'en' 
                ? `Cleared stage under ${activeScenario.toUpperCase()} credentials.` 
                : lang === 'ar' 
                ? `تم اجتياز المرحلة بنجاح وفق وثائق تفويض المعبر.` 
                : `بە سەرکەوتوویی لەم قۆناغە تێپەڕی بە پێی بەڵگەنامەکانی دەروازە.`, 
              timestamp: lang === 'en' ? 'Just now' : lang === 'ar' ? 'الآن' : 'ئێستا' 
            },
            ...prevLogs.slice(0, 11)
          ]);

          return next;
        });
      }, simulationSpeed);
    }
    return () => clearInterval(timer);
  }, [isSimulating, simulationSpeed, activeScenario, lang]);

  const activeStep = workflowSteps[activeStepIndex];
  const isRtl = lang !== 'en';

  return (
    <div id="ecosystem-workflows-canvas" className="bg-[#111e2e]/95 rounded-xl border border-slate-800 p-5 lg:p-6 shadow-2xl flex flex-col gap-6 text-slate-100" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Simulation Dashboard Header Banner */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-slate-850 pb-5">
        <div>
          <span className="text-[10px] uppercase font-mono text-[#cca553] tracking-widest font-bold">
            {lang === 'en' ? 'REPUBLIC OF IRAQ • INTEROPERABILITY INTERLOCK SYSTEM' : lang === 'ar' ? 'جمهورية العراق - نظام محاكاة وتسوية التكامل الفيدرالي' : 'کۆماری عێراق - ماتیڕالی هاوئاهەنگی نیشتمانیی فیدراڵ'}
          </span>
          <h2 className="text-xl font-display font-semibold tracking-wide text-slate-50 uppercase flex items-center gap-2.5 mt-0.5">
            <span className="p-1.5 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
              <Network className="w-5 h-5 text-cyan-400" />
            </span>
            {lang === 'en' ? 'Sovereign Interoperability Accords (SLA Engine)' : lang === 'ar' ? 'نموذج محاكاة ممرات التبادل التجاري الموحدة' : 'هاوشێوەکەری ڕێڕەوی گشتی بازرگانی کۆدکراو'}
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            {lang === 'en' ? 'A 13-stage centralized cargo clearance pipeline orchestrating federal import treaties, phytosanitary biology checks, standardize quality interlocks, and real-time bank settlements.' :
             lang === 'ar' ? 'خطوات المعالجة الجمركية الموحدة المؤلفة من 13 مرحلة متتالية تضمن مطابقة معايير البنك المركزي وجودة السلع وتسوية الموازنة الاتحادية.' :
             'سیستمێکی ١٣ قۆناغی بۆ چاودێری گواستنەوەی بارهەڵگرە سنوورییەکان بە هەڵسەنگاندنی مەرجەکانی گشتی گومرگ.'}
          </p>
        </div>

        {/* Live Simulation Controls */}
        <div className="flex flex-wrap items-center gap-2.5 bg-[#0b1420] border border-slate-850 p-2 rounded-lg">
          <span className="text-[10px] font-mono text-slate-500 uppercase px-1 font-bold">
            {lang === 'en' ? 'SIM SPEED:' : lang === 'ar' ? 'سرعة المحاكاة:' : 'خێرایی:'}
          </span>
          
          <button
            onClick={() => setSimulationSpeed(4500)}
            className={`px-2 py-1 rounded text-[10px] font-mono transition-all ${
              simulationSpeed === 4500 ? 'bg-slate-900 border border-slate-800 text-[#cca553] font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'en' ? 'Slower (4.5s)' : lang === 'ar' ? 'أبطأ (٤.٥ ث)' : 'هێواشتر (٤.٥ چ)'}
          </button>
          
          <button
            onClick={() => setSimulationSpeed(3000)}
            className={`px-2 py-1 rounded text-[10px] font-mono transition-all ${
              simulationSpeed === 3000 ? 'bg-slate-900 border border-slate-850 text-[#cca553] font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'en' ? 'Normal (3s)' : lang === 'ar' ? 'طبيعي (٣ ث)' : 'ئاسایی (٣ چ)'}
          </button>

          <button
            onClick={() => setSimulationSpeed(1500)}
            className={`px-2 py-1 rounded text-[10px] font-mono transition-all ${
              simulationSpeed === 1500 ? 'bg-slate-900 border border-slate-850 text-[#cca553] font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            {lang === 'en' ? 'Accelerated (1.5s)' : lang === 'ar' ? 'مسرّع (١.٥ ث)' : 'خێراتر (١.٥ چ)'}
          </button>

          <div className="h-4 w-[1px] bg-slate-800 mx-1"></div>

          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`px-3 py-1 rounded text-[10px] uppercase font-mono font-bold transition-all flex items-center gap-1 ${
              isSimulating 
                ? 'bg-amber-950/40 text-amber-400 border border-amber-500/25' 
                : 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/25'
            }`}
          >
            {isSimulating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {isSimulating 
              ? (lang === 'en' ? 'Pause Sim' : lang === 'ar' ? 'إيقاف مؤقت' : 'ڕاگرتن') 
              : (lang === 'en' ? 'Resume Sim' : lang === 'ar' ? 'تشغيل' : 'جێبەجێکردن')}
          </button>
        </div>
      </div>

      {/* Roster of Scenarios Selection Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5">
        
        {/* Scenario 1: Gulf Basra Corridor */}
        <div
          onClick={() => {
            setActiveScenario('general-trade');
            setSimMetrics(prev => ({ ...prev, averageClearanceTime: 14.1 }));
          }}
          className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 h-[115px] ${
            activeScenario === 'general-trade'
              ? 'bg-[#1a2c42]/30 border-[#cca553] shadow-md ring-1 ring-[#cca553]/15'
              : 'bg-slate-950/80 border-slate-855 hover:border-slate-750'
          }`}
        >
          <span className="p-2 bg-slate-900 rounded-lg border border-slate-800">
            <Ship className={`w-5 h-5 ${activeScenario === 'general-trade' ? 'text-[#cca553]' : 'text-slate-500'}`} />
          </span>
          <div>
            <h3 className="font-semibold text-slate-100 text-xs">
              {lang === 'en' ? 'Gulf-Basra Corridor (Grand Faw Link)' : lang === 'ar' ? 'ممر الخليج العربي - البصرة (رابط الفاو الكبير)' : 'ڕێڕەوی کەنداو-بەسرە (بەندەری فاو)'}
            </h3>
            <p className="text-[10px] text-slate-400 mt-1 leading-normal">
              {lang === 'en' ? 'Simulates container shipments from Umm Qasr sea-nodes to Baghdad logistics terminals. Standard revenue tariff rules apply.' : lang === 'ar' ? 'يحاكي شحنات الحاويات من ميناء أم قصر إلى محطات بغداد اللوجستية. تطبق قواعد التعرفة الجمركية الرسمية.' : 'پیشاندانی هاوردەکردنی بار لە کۆمەڵگەی بەسرەوە بۆ ناودواکانی بەغداد لە ڕێگەی یاسای تاریفەی جومگەیی.'}
            </p>
          </div>
        </div>

        {/* Scenario 2: Northern KRG Baghdad treaty route */}
        <div
          onClick={() => {
            setActiveScenario('krg-trade');
            setSimMetrics(prev => ({ ...prev, averageClearanceTime: 12.8 }));
          }}
          className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 h-[115px] ${
            activeScenario === 'krg-trade'
              ? 'bg-[#1a2c42]/30 border-[#cca553] shadow-md ring-1 ring-[#cca553]/15'
              : 'bg-slate-950/80 border-slate-855 hover:border-slate-750'
          }`}
        >
          <span className="p-2 bg-slate-900 rounded-lg border border-slate-800">
            <Truck className={`w-5 h-5 ${activeScenario === 'krg-trade' ? 'text-[#cca553]' : 'text-slate-500'}`} />
          </span>
          <div>
            <h3 className="font-semibold text-slate-100 text-xs">
              {lang === 'en' ? 'KRG-Federal Border Treaty Pipeline' : lang === 'ar' ? 'أقسام ممر معاهدة اقليم كوردستان الاتحادية' : 'ڕێڕەوی ڕێککەوتننامەی گومرگی هەرێم و فیدراڵ'}
            </h3>
            <p className="text-[10px] text-slate-400 mt-1 leading-normal">
              {lang === 'en' ? 'Simulates transit agreements at Ibrahim Khalil and Fishkhabour nodes. Automated Arabic-Kurdish translation protocols active.' : lang === 'ar' ? 'محاكاة حركة المرور في معبري إبراهيم الخليل وفيشخابور. بروتوكولات الترجمة الكردية والعربية الآلية مفعلة.' : 'هاوشێوەکەری بازرگانی عێراق و تورکیا لە ئیبراهیم خەلیل بە بەکارهێنانی تەرجەمەی زمانەکانی کوردی و عەرەبی.'}
            </p>
          </div>
        </div>

        {/* Scenario 3: Air Cargo high value imports */}
        <div
          onClick={() => {
            setActiveScenario('air-cargo');
            setSimMetrics(prev => ({ ...prev, averageClearanceTime: 8.4 }));
          }}
          className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 h-[115px] ${
            activeScenario === 'air-cargo'
              ? 'bg-[#1a2c42]/30 border-[#cca553] shadow-md ring-1 ring-[#cca553]/15'
              : 'bg-slate-950/80 border-slate-855 hover:border-slate-750'
          }`}
        >
          <span className="p-2 bg-slate-900 rounded-lg border border-slate-800">
            <Plane className={`w-5 h-5 ${activeScenario === 'air-cargo' ? 'text-[#cca553]' : 'text-slate-500'}`} />
          </span>
          <div>
            <h3 className="font-semibold text-slate-100 text-xs">
              {lang === 'en' ? 'Air Cargo Expedited Ingress Terminal' : lang === 'ar' ? 'ممر الشحن الجوي السريع بمطارات العراق' : 'ڕێڕەوی خێرای باری ئاسمانی فڕۆکەخانەکان'}
            </h3>
            <p className="text-[10px] text-slate-404 mt-1 leading-normal">
              {lang === 'en' ? 'Simulates high-value strategic computing elements or raw therapeutics arriving at Baghdad and Erbil airports.' : lang === 'ar' ? 'محاكاة الشحنات عالية القيمة والمواد الحساسة والأجهزة ووصولها إلى مطارات بغداد وأربيل.' : 'هاوشێوەکەری باری پزیشکی و ئامێرە تەکنەلۆژییە گرنگەکان بۆ فڕۆکەخانەی بەغداد یان هەولێر.'}
            </p>
          </div>
        </div>

      </div>

      {/* Live Pipeline Step Visual Grid Map */}
      <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
        <h3 className="text-xs uppercase font-mono tracking-wider text-slate-500 border-b border-slate-900 pb-2 font-bold">
          {lang === 'en' ? '13-Stage Centralized Trade Pipeline Map' : lang === 'ar' ? 'خارطة مسار التجارة الموحد المكون من ١٣ مرحلة جمركية ومصرفية' : 'نەخشەی سەرەکی پرۆسەی دەروازەی ١٣ قۆناغی نیشتمانیی'}
        </h3>
        
        {/* Horizontal scroll steps train tracker */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 select-none scrollbar-thin">
          {workflowSteps.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            const isCompleted = idx < activeStepIndex;
            return (
              <div key={step.id} className="flex items-center gap-1.5 shrink-0 last:pr-4">
                <div
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-3 rounded-lg border font-mono transition-all text-xs cursor-pointer flex flex-col justify-between h-[82px] w-[145px] ${
                    isActive 
                      ? 'bg-cyan-950/30 border-cyan-400 text-cyan-300 shadow-lg ring-1 ring-cyan-500/20 font-bold' 
                      : isCompleted
                      ? 'bg-slate-900/60 border-slate-800 text-slate-400 line-through decoration-slate-700'
                      : 'bg-[#0f1b29]/80 border-slate-855 text-slate-500 hover:text-slate-350 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center text-[9px] text-[#4d6682] uppercase">
                    <span>{lang === 'en' ? 'Stage' : lang === 'ar' ? 'المرحلة' : 'قۆناغی'} {idx + 1}</span>
                    {isCompleted && <FileCheck className="w-3 h-3 text-emerald-400 shrink-0" />}
                    {isActive && <Activity className="w-3 h-3 text-cyan-400 shrink-0 animate-pulse" />}
                  </div>
                  <p className="font-semibold text-[10px] truncate leading-tight mt-1">{step.title[lang]}</p>
                  <p className="text-[9px] text-slate-500 font-mono mt-1 font-semibold truncate uppercase">{step.actor[lang]}</p>
                </div>
                {idx < workflowSteps.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-700 shrink-0 lg:mx-0.5 rtl:rotate-180" />
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Stage Detail Monitor */}
        <div className="bg-[#0b1420] p-5 rounded-lg border border-slate-850/80 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 border-r border-slate-850/60 pr-5 rtl:border-r-0 rtl:border-l rtl:pr-0 rtl:pl-5 flex flex-col gap-2">
            <span className="text-[10px] font-mono text-[#cca553] uppercase font-bold tracking-widest">
              {lang === 'en' ? `CURRENT PROCESS WAVE OVERWATCH: STAGE ${activeStepIndex + 1} OF 13` : lang === 'ar' ? `مراقبة موجة العمليات الجارية: المرحلة ${activeStepIndex + 1} من أصل ١٣` : `مۆنیتۆری ڕێڕەوی گشتی پرۆسەکە: قۆناغی ${activeStepIndex + 1} لە کۆی ١٣`}
            </span>
            <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <span className="p-1 px-1.5 bg-[#cca553]/15 rounded border border-[#cca553]/30 font-mono text-xs text-[#cca553]">
                {activeStepIndex + 1}
              </span>
              {activeStep.title[lang]}
            </h4>
            <p className="text-xs text-slate-400 capitalize font-mono font-bold mt-1">
              {lang === 'en' ? 'Authorized Coordinating Ministry: ' : lang === 'ar' ? 'الوزارة أو السُلطة المنسقة المفوّضة: ' : 'وەزارەتی ڕێگەپێدراوی هاوئاهەنگیکار: '} <span className="text-slate-200">{activeStep.actor[lang]}</span>
            </p>
            <p className="text-xs text-slate-300 leading-relaxed font-mono mt-2 pt-2 border-t border-slate-850/40">
              {activeStep.detail[lang]}
            </p>
          </div>

          <div className="flex flex-col justify-between gap-3 text-xs">
            <span className="text-[10px] text-slate-500 uppercase font-mono block font-bold">
              {lang === 'en' ? 'Live Simulation Counters:' : lang === 'ar' ? 'عدادات المحاكاة اللحظية:' : 'ژمارەری هۆشمەندی ڕێڕەوەکە:'}
            </span>
            <div className="grid grid-cols-2 gap-3 text-[11px] font-mono">
              <div className="bg-slate-900 p-2.5 rounded border border-slate-855 text-center">
                <span className="text-[9px] text-slate-500 block">
                  {lang === 'en' ? 'TRANSACTIONS' : lang === 'ar' ? 'إجمالي المعاملات' : 'کۆی کارەکان'}
                </span>
                <span className="text-xs font-bold text-slate-200 mt-1 block">
                  {simMetrics.processedTransactions} {lang === 'en' ? 'processed' : lang === 'ar' ? 'تمت معالجتها' : 'جێبەجێکراو'}
                </span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-855 text-center">
                <span className="text-[9px] text-slate-500 block">
                  {lang === 'en' ? 'ANOMALIES INTERCEPTED' : lang === 'ar' ? 'المخالفات المكتشفة' : 'هەڵە دۆزراوەکان'}
                </span>
                <span className="text-xs font-bold text-emerald-400 mt-1 block">
                  100.0% {lang === 'en' ? 'Mitigation' : lang === 'ar' ? 'معالجة وتصحيح' : 'ڕێگری لێکراو'}
                </span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-855 text-center">
                <span className="text-[9px] text-slate-500 block">
                  {lang === 'en' ? 'TOTAL DIRECT REVENUES' : lang === 'ar' ? 'عوائد التعرفة والضرائب' : 'کۆی داهاتی باج'}
                </span>
                <span className="text-xs font-bold text-[#cca553] mt-1 block">{(simMetrics.totalDutyCalculated / 1000000).toFixed(0)}M IQD</span>
              </div>
              <div className="bg-slate-900 p-2.5 rounded border border-slate-855 text-center">
                <span className="text-[9px] text-slate-500 block">
                  {lang === 'en' ? 'AVG LANE LATENCY' : lang === 'ar' ? 'معدل كفاءة المسار' : 'لایەنی کاتی تێپەڕین'}
                </span>
                <span className="text-xs font-bold text-cyan-400 mt-1 block">
                  {simMetrics.averageClearanceTime} {lang === 'en' ? 'Min' : lang === 'ar' ? 'دقيقة' : 'خولەک'}
                </span>
              </div>
            </div>
            <div className="bg-slate-900 p-2 rounded border border-slate-850 text-center font-mono text-[10px] text-slate-500 leading-normal">
              {lang === 'en' ? 'CURRENT SCENARIO:' : lang === 'ar' ? 'السيناريو الحالي:' : 'سیناریۆی چالاک:'} <span className="text-cyan-400 font-bold">{activeScenario.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom sections: Transaction monitor split with logs */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left 2/3: Live Transaction logs list */}
        <div className="xl:col-span-2 bg-[#0a1523]/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
          <h3 className="text-xs uppercase font-mono tracking-wider text-slate-350 border-b border-slate-900 pb-2 font-bold">
            {lang === 'en' ? 'Secure Ledger transaction flow stream' : lang === 'ar' ? 'تدفق سجل الحوالات والمعاملات الآمن' : 'مۆنیتۆری ڕاستەوخۆی تۆماری جێگیری کارە فەرمییەکان'}
          </h3>
          <div className="overflow-x-auto text-xs font-mono">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-850 text-slate-500 text-[9px] uppercase font-mono">
                  <th className="pb-2">
                    {lang === 'en' ? 'Secure TX ID' : lang === 'ar' ? 'رمز المعاملة الآمن' : 'ناسنامەی کارەکە'}
                  </th>
                  <th className="pb-2">
                    {lang === 'en' ? 'Pipeline Phase' : lang === 'ar' ? 'مرحلة التدفق' : 'قۆناغی کار'}
                  </th>
                  <th className="pb-2">
                    {lang === 'en' ? 'Audit Status' : lang === 'ar' ? 'حالة التدقيق الجمركي' : 'بارودۆخی پێداچوونەوە'}
                  </th>
                  <th className="pb-2">
                    {lang === 'en' ? 'Execution Log Detail' : lang === 'ar' ? 'تفاصيل سجل التنفيذ اللحظي' : 'زانیاری نووسراوی ڕاپۆرت'}
                  </th>
                  <th className="pb-2 text-right">
                    {lang === 'en' ? 'Sequence Timestamp' : lang === 'ar' ? 'التوقيت الرقمي' : 'کاتی گواستنەوە'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850/60 text-slate-300 text-[10.5px]">
                {logs.map((log, idx) => (
                  <tr key={idx} className={idx === 0 ? 'text-[#cca553] font-bold animate-pulse' : ''}>
                    <td className="py-2.5 font-bold text-[#cca553]">{log.id}</td>
                    <td>{log.step}</td>
                    <td>
                      <span className="px-1.5 py-0.5 bg-emerald-950/80 text-emerald-400 border border-emerald-500/20 rounded uppercase text-[9px] font-semibold">
                        {log.status === 'Success' ? (lang === 'en' ? 'Success' : lang === 'ar' ? 'ناجح' : 'سەرکەوتوو') : (lang === 'en' ? 'Processing' : lang === 'ar' ? 'خاضع للمطابقة' : 'پڕۆسە دەکرێت')}
                      </span>
                    </td>
                    <td className="text-slate-400 max-w-xs truncate">{log.detail}</td>
                    <td className="text-right text-slate-500 text-[10px]">{log.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1/3 sidebar framework governance rules */}
        <div className="bg-[#0a1523]/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-3.5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 border-b border-slate-900 pb-2 flex items-center gap-1.5">
            <Sparkles className="text-[#cca553] w-4.5 h-4.5" />
            {lang === 'en' ? 'Integrative Governance Accords' : lang === 'ar' ? 'اتفاقيات الحوكمة المشتركة' : 'ڕێککەوتننامەکانی حوكمڕانی نوێ'}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed font-mono">
            {lang === 'en' ? 'The IDG system autonomously validates agreements between the Iraq General Customs Authority and regional agencies to enforce revenue preservation.' : lang === 'ar' ? 'يقوم نظام IDG تلقائياً بالتحقق من الاتفاقات بين الهيئة العامة للجمارك والجهات الإقليمية لمنع التهرب وتوحيد الضرائب.' : 'سیستەمی IDG بە شێوەیەکی خۆکار ڕێککەوتنەکانی نێوان دەستەی گشتی گومرگ و وەزارەتەکان جێبەجێ دەکات.'}
          </p>
          <div className="flex flex-col gap-2.5 text-xs font-mono">
            <div className="bg-slate-900/45 p-2.5 rounded border border-slate-850/60">
              <strong className="text-slate-200 block text-[11px] mb-1">
                {lang === 'en' ? 'Central Bank CBI Integration' : lang === 'ar' ? 'التكامل مع البنك المركزي العراقي' : 'بەستنەوە بە بانکی ناوەندی عێراقی'}
              </strong>
              <p className="text-[10px] text-slate-500 leading-normal">
                {lang === 'en' ? 'Prevents capital evasion by ensuring foreign exchange matches actual imported containers.' : lang === 'ar' ? 'يمنع تهريب الأموال الصعبة للتأكد من مطابقة مبيعات الدولار مع الحاويات المستوردة بالفعل.' : 'ڕێگە لە بردنی ناڕەوای دۆلار دەگرێت بە بەراوردکردنی تێچووی نێو سۆنەر و کاغەزی هاوردە.'}
              </p>
            </div>
            <div className="bg-slate-900/45 p-2.5 rounded border border-slate-850/60">
              <strong className="text-slate-200 block text-[11px] mb-1">
                {lang === 'en' ? 'Standardized COSQC Harmonization' : lang === 'ar' ? 'مطابقة التقييس والسيطرة النوعية' : 'ڕێککەوتني گشتني هاوسەنگي COSQC'}
              </strong>
              <p className="text-[10px] text-slate-500 leading-normal font-mono">
                {lang === 'en' ? 'Ensures that bulk imports meet quality specifications prior to dispatch in land hubs.' : lang === 'ar' ? 'يضمن مطابقة البضائع للمواصفات الصحية السليمة قبل السماح بدخولها وخروجها.' : 'دڵنیادەبێتەوە کە خواروباری هاوردەکراو پشکنینی تەواوی بۆ کراوە پێش گەیشتنی بە بەکاربەر.'}
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

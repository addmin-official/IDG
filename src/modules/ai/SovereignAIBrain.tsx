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

  // Prompt Playground State
  const [activePromptId, setActivePromptId] = useState<string>('hs-prompt');
  const [promptTemplate, setPromptTemplate] = useState<string>(
    `[SYSTEM_INSTRUCTION: ACT_AS_SOVEREIGN_IDG_CLASSIFIER]\nYou are the secure HS Classification AI for the Iraq Digital Gateway.\nAudit the following customs manifest to map the correct Harmonized System (HS) code:\n\nCargo Description: {{description}}\nDeclared Country of Origin: {{origin}}\nReported Unit Cost: {{cost}}\n\nDetermine: (1) Correct HS 8-digit Code, (2) Recommended Duty rate, (3) Risk match profile.`
  );
  
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

  const runTestInference = () => {
    setIsInferencing(true);
    setInferenceResult(null);
    setTimeout(() => {
      // Dynamic output based on inputs
      const isDrillPipe = playDesc.toLowerCase().includes('drill') || playDesc.toLowerCase().includes('pipe');
      const standardResponse = isDrillPipe ? 
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
   • INTEGRITY STATUS: GREEN (Secure to proceed)` :
`[SOVEREIGN_INFERENCE_ENGINE: ACCORD_ACTIVE]
=========================================
1. HS CLASSIFICATION MAPPING:
   • RESOLVED HS-CODE: 8471.30.00 (Data processing machines, laptops, portable consoles)
   • CONFIDENCE SCORE: 98.42%

2. REGISTERED DUTY RECONCILIATION:
   • STANDARD TARIFF: 5.0%
   • EXEMPTIONS: Educational state rebate applied correctly.

3. RISK PROFILE:
   • RISK SCALE: LOW (Origin matches verified supplier path).`;
      
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

  const registryPrompts: Record<string, { title: string; template: string; desc: string; origin: string; cost: string }> = {
    'hs-prompt': {
      title: 'HS Code Classifier (Model UR-Cortex)',
      template: `[SYSTEM_INSTRUCTION: ACT_AS_SOVEREIGN_IDG_CLASSIFIER]\nYou are the secure HS Classification AI for the Iraq Digital Gateway.\nAudit the following customs manifest to map the correct Harmonized System (HS) code:\n\nCargo Description: {{description}}\nDeclared Country of Origin: {{origin}}\nReported Unit Cost: {{cost}}\n\nDetermine: (1) Correct HS 8-digit Code, (2) Recommended Duty rate, (3) Risk match profile.`,
      desc: 'Multi-axle steel alloy drill pipes for petroleum wells',
      origin: 'Germany',
      cost: '$3,400 USD / Ton'
    },
    'eval-prompt': {
      title: 'Under-Invoicing Auditor (Model Tigris-Risk)',
      template: `[INSTRUCTION: CHIEF_REVENUE_PROTECT_AGENT]\nCompare the declared price against raw trade indices.\n\nDescription: {{description}}\nDeclared Value: {{cost}}\nExporter origin: {{origin}}\n\nEstimate if reported price deviates from median index values. Recommend penalty or hold.`,
      desc: 'High-density polyethylene resins',
      origin: 'Korea',
      cost: '$450 USD / Ton (Under-invoiced estimate)'
    },
    'quarantine-prompt': {
      title: 'Biosecurity quarantine scanner (Model Euphrates-Phyto)',
      template: `[SAFETY_INSPECT_FILTER]\nAnalyze agricultural cargos and quarantine codes.\n\nProduct description: {{description}}\nDeclared origin: {{origin}}\n\nCheck for biological safety alerts, active grain rust warnings, and certification hashes conformities.`,
      desc: 'Bulk seed-potatoes for farming hubs',
      origin: 'Lebanon',
      cost: '$620 USD / Ton'
    }
  };

  const loadPrompt = (id: string) => {
    const p = registryPrompts[id];
    setActivePromptId(id);
    setPromptTemplate(p.template);
    setPlayDesc(p.desc);
    setPlayOrigin(p.origin);
    setPlayCost(p.cost);
  };

  // Modules metadata list
  const aiModules = [
    { id: 'hs-classifier', name: 'HS Classification AI', index: 'IDG-Cortex-V3', accuracy: '99.8%', latency: '40ms', status: 'Live & Recommending' },
    { id: 'customs-auditor', name: 'Customs Assistant AI', index: 'Ur-Transit-MoE', accuracy: '99.2%', latency: '52ms', status: 'Backup Active' },
    { id: 'logistics-seq', name: 'Logistics AI Core', index: 'Tigris-Agent-V2', accuracy: '98.5%', latency: '35ms', status: 'Live & Active' },
    { id: 'compliance-intercept', name: 'Compliance Intercept AI', index: 'CBI-Interlock-MoE', accuracy: '99.96%', latency: '65ms', status: 'Strict Zero-Trust' },
    { id: 'risk-assessment', name: 'Risk Assessment neural', index: 'Iraq-Risk-V1', accuracy: '97.2%', latency: '28ms', status: 'Monitoring Stream' },
    { id: 'decision-support', name: 'Decision Support Agent', index: 'Ur-Statecraft-LLM', accuracy: '99.1%', latency: '120ms', status: 'On-Standby' },
    { id: 'predictive-corridors', name: 'Predictive Transit AI', index: 'Corridor-Flow-MoE', accuracy: '96.8%', latency: '45ms', status: 'Active' },
    { id: 'economic-forecaster', name: 'Economic Intel Network', index: 'Fiscal-Atlas-MoE', accuracy: '98.7%', latency: '90ms', status: 'Live' }
  ];

  const isRtl = lang !== 'en';

  const translateModuleName = (id: string) => {
    switch (id) {
      case 'hs-classifier': return lang === 'en' ? 'HS Classification AI' : lang === 'ar' ? 'ذكاء تصنيف البضائع والتعرفة' : 'زیرەکی پۆلێنکردنی تاریفەکان';
      case 'customs-auditor': return lang === 'en' ? 'Customs Assistant AI' : lang === 'ar' ? 'مساعد التدقيق الجمركي الآلي' : 'عەقڵی هاوکاری گشتی گومرگ';
      case 'logistics-seq': return lang === 'en' ? 'Logistics AI Core' : lang === 'ar' ? 'محرك جدولة اللوجستية والمسارات' : 'بزوێنەری مۆنیتۆری هۆشیاری لۆجستی';
      case 'compliance-intercept': return lang === 'en' ? 'Compliance Intercept AI' : lang === 'ar' ? 'ذكاء مراقبة الحوالات والامتثال' : 'زیرەکی پاراستنی بەڵگەنامەکانی دارایی';
      case 'risk-assessment': return lang === 'en' ? 'Risk Assessment neural' : lang === 'ar' ? 'تحليل المخاطر العصبية للمنافذ' : 'تۆڕی هەڵسەنگاندنی مەترسییەکان';
      case 'decision-support': return lang === 'en' ? 'Decision Support Agent' : lang === 'ar' ? 'وكيل دعم القرار الوزاري' : 'سیرڤسی هاوکاری بڕیاری وەزارەت';
      case 'predictive-corridors': return lang === 'en' ? 'Predictive Transit AI' : lang === 'ar' ? 'ذكاء مسارات الترانزيت التنبؤي' : 'زیرەکی پێشبینیکردنی ڕێڕەوەکانی ترانزیت';
      case 'economic-forecaster': return lang === 'en' ? 'Economic Intel Network' : lang === 'ar' ? 'الشبكة الاستخباراتية الاقتصادية' : 'تۆڕی زانیاریی ئابووری نیشتمانیی';
      default: return id;
    }
  };

  const translateModuleStatus = (id: string) => {
    switch (id) {
      case 'hs-classifier': return lang === 'en' ? 'Live & Recommending' : lang === 'ar' ? 'متصل ويقدم التوصيات' : 'چالاک و پێشنیارکەر';
      case 'customs-auditor': return lang === 'en' ? 'Backup Active' : lang === 'ar' ? 'خادم احتياطي نشط' : 'پاڵپشتی چالاک';
      case 'logistics-seq': return lang === 'en' ? 'Live & Active' : lang === 'ar' ? 'متصل ونشط' : 'ڕاستەوخۆ چالاک';
      case 'compliance-intercept': return lang === 'en' ? 'Strict Zero-Trust' : lang === 'ar' ? 'عديم الثقة النشطة' : 'سیستەمی چاودێری توند';
      case 'risk-assessment': return lang === 'en' ? 'Monitoring Stream' : lang === 'ar' ? 'يراقب تدفق البيانات' : 'مۆنیتۆرکردنی ڕاستەوخۆ';
      case 'decision-support': return lang === 'en' ? 'On-Standby' : lang === 'ar' ? 'في وضع الاستعداد' : 'لەسەر هێڵە';
      case 'predictive-corridors': return lang === 'en' ? 'Active' : lang === 'ar' ? 'نشط' : 'چالاکە';
      case 'economic-forecaster': return lang === 'en' ? 'Live' : lang === 'ar' ? 'مباشر' : 'چالاکی ڕاستەوخۆ';
      default: return '';
    }
  };

  return (
    <div id="sovereign-ai-brain-canvas" className="bg-[#111e2e]/95 rounded-xl border border-slate-800 p-5 lg:p-6 shadow-2xl flex flex-col gap-6 text-slate-100" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Sovereign AI Central Display Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="text-[10px] uppercase font-mono text-[#cca553] tracking-widest font-bold">
            {lang === 'en' ? 'REPUBLIC OF IRAQ • REVENUE SHIELD DIGITAL ASSETS' : lang === 'ar' ? 'جمهورية العراق - قصر حماية العائد المالي الوطني' : 'کۆماری عێراق - مۆری دیجیتاڵیی داهاتی نیشتمانیی'}
          </span>
          <h2 className="text-xl font-display font-semibold tracking-wide text-slate-50 uppercase flex items-center gap-2.5 mt-0.5">
            <span className="p-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
              <Cpu className="w-5 h-5 text-emerald-400" />
            </span>
            {lang === 'en' ? 'Sovereign AI Brain & Model Registry (IDG Cortex)' : lang === 'ar' ? 'العقل الاصطناعي السيادي وخادم سجلات النماذج العصبية' : 'مێشکی زیرەکی گومرگی فیدراڵی عێراق'}
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            {lang === 'en' ? 'Centralized strategic artificial intelligence network executing statecraft-grade customs categorization, currency-drain audits, biological quarantine filtering, and intercorridor logistics orchestration.' :
              lang === 'ar' ? 'الشبكة العصبية المركزية المشفرة لحماية الإيرادات ومراقبة قيم تداول البضائع واكتشاف محاولات تبييض وتهريب العملات الصعبة.' :
              'تۆڕی ناوەندی زیرەکی بەڕێوەبردنی گشتی دەروازە بازرگانییەکان بۆ لێکدانەوەی دەقی داتاکانی گشت خاڵە جومگەییەکان.'}
          </p>
        </div>

        {/* Neural general statistics tickers */}
        <div className="flex gap-4 bg-[#0b1420] border border-slate-800/80 p-3 rounded-lg text-xs font-mono">
          <div className="text-center border-r border-slate-850 pr-4">
            <span className="text-slate-500 text-[10px] block uppercase">
              {lang === 'en' ? 'Average Latency' : lang === 'ar' ? 'متوسط زمن الاستجابة' : 'تێکڕای کاتی وەڵامدانەوە'}
            </span>
            <span className="text-emerald-400 font-bold block mt-0.5">48ms</span>
          </div>
          <div className="text-center border-r border-slate-850 pr-4">
            <span className="text-slate-500 text-[10px] block uppercase">
              {lang === 'en' ? 'Precision score' : lang === 'ar' ? 'درجة الدقة المعيارية' : 'ڕێژەی وردی گشتی'}
            </span>
            <span className="text-[#cca553] font-bold block mt-0.5">99.14%</span>
          </div>
          <div className="text-center">
            <span className="text-slate-500 text-[10px] block uppercase">
              {lang === 'en' ? 'Model Nodes' : lang === 'ar' ? 'عقد النمذجة الرياضية' : 'گرێی مۆدێلەکان'}
            </span>
            <span className="text-cyan-400 font-bold block mt-0.5">
              {lang === 'en' ? '32 Clustered' : lang === 'ar' ? '٣٢ عقدة متصلة' : '٣٢ گرێی پەیوەستکراو'}
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
              {lang === 'en' ? 'Centralized AI Neural Cluster Map' : lang === 'ar' ? 'خارطة العناقيد العصبية الموحدة للذكاء الاصطناعي' : 'نەخشەی سەرەکی زیرەکی دەستکردی دەروازەکان'}
            </h3>
            <p className="text-xs text-slate-400">
              {lang === 'en' ? 'Interactive roster map of tactical-grade neural networks, pre-trained datasets, and sovereign statecraft APIs running across Iraq custom hubs.' : lang === 'ar' ? 'خريطة تفاعلية للشبكات العصبية، ومجموعات البيانات والاتصالات المبرمجة الجارية عبر منافذ العراق الاتحادية.' : 'نەخشەیەکی کارلێککارانەی تۆڕە دەمارییەکان، داتاکانی ڕاهێنراو، و فۆرمی بڕیاردانی نیشتمانیی بۆ دەروازەکانی عێراق.'}
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
                    <span className={`h-2.5 w-2.5 rounded-full ${activeModule === m.id ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-500/60'}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200 text-xs mt-1 leading-snug">{translateModuleName(m.id)}</h4>
                    <p className="text-[10px] font-mono text-slate-400 mt-1 capitalize">
                      {lang === 'en' ? 'Duty Grade: ' : lang === 'ar' ? 'فئة العمل: ' : 'پلەی ئەرک: '}{translateModuleStatus(m.id)}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-[9px] font-mono mt-1 pt-1 border-t border-slate-855 text-slate-500">
                    <span>{lang === 'en' ? 'Precision: ' : lang === 'ar' ? 'الدقة: ' : 'وردی: '}{m.accuracy}</span>
                    <span>{lang === 'en' ? 'Lat: ' : lang === 'ar' ? 'الاستجابة: ' : 'کاتی گواستنەوە: '}{m.latency}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Module Detail Panel */}
            <div className="bg-[#0b1420] p-4 rounded-lg border border-slate-850/80 flex flex-col gap-2 mt-2">
              <div className="flex justify-between items-center border-b border-slate-850/60 pb-2 mb-2">
                <span className="text-[10px] font-mono text-[#cca553] uppercase font-bold">
                  {lang === 'en' ? 'CLUSTER REPORT: ' : lang === 'ar' ? 'تقرير العنقود: ' : 'ڕاپۆرتی سەرەکی: '}{activeModule.toUpperCase()}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {lang === 'en' ? 'NODE HEALTH: OPTIMAL (100% SECURE)' : lang === 'ar' ? 'صحة العقدة: ممتازة (١٠٠٪ مؤمنة)' : 'تەندروستی گرێکان: بەرزترین ئاست (١٠٠٪ پارێزراو)'}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                {activeModule === 'hs-classifier' && 'Our HS Code Classifier parses multi-language manifests in Kurdish, Arabic, and Western scripts, matching declared item textures to global custom indices. This intercepts intentional misclassifications designed to hide toxic industrial chemicals or avoid tariffs.'}
                {activeModule === 'customs-auditor' && 'Under-invoicing analyzer. Examines container item valuations and correlates them against global market averages. Generates instant revenue protection warnings if cargo worth deviates sharply from trade averages.'}
                {activeModule === 'logistics-seq' && 'Autonomously sequences logistics backlogs. Correlates queue densities at Trebil, Ibrahim Khalil, and southern harbors to predict custom processing congestions and schedules automatic re-routes.'}
                {activeModule === 'compliance-intercept' && 'Sovereign compliance interlock. Matches high-frequency financial wire transfers matching CBI auction indices. Exposes capital evasion, currency manipulations, and phantom imports.'}
                {activeModule === 'risk-assessment' && 'Evaluates risk profiles on all inbound shipments. Cross-references shippers, shipping ports, transport fleets, and cargo descriptions to flag physical inspection priorities without impacting clean traders.'}
                {activeModule === 'decision-support' && 'Strategic statecraft advisor. Synthesizes fiscal outcomes, trade tax yields, and commodity flows to provide ministries with forecast summaries, tariff optimizations, and policy projections.'}
                {activeModule === 'predictive-corridors' && 'Monitors transit currents across active regional dry links. Tracks transshipments and verifies sealing integrity from initial seaport gates to regional egress terminals.'}
                {activeModule === 'economic-forecaster' && 'Consolidates trade balance data vectors across Iraq and Kurdistan borders. Assists the Ministry of Finance in predicting domestic market pricing and trade surplus developments.'}
              </p>
            </div>
          </div>

          {/* Section 2: Editable Prompt State Playground & Live Test Run */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
            <div className="border-b border-slate-900 pb-2 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">Prompt Registry & Sovereign Playground</h3>
                <p className="text-xs text-slate-400 mt-0.5">Edit system instructions directly inside the statecraft prompt register, then test-run inference simulation.</p>
              </div>
              <div className="flex gap-1.5 self-start">
                <button
                  onClick={() => loadPrompt('hs-prompt')}
                  className={`px-2 py-1 rounded font-mono text-[9px] uppercase border transition-all ${
                    activePromptId === 'hs-prompt'
                      ? 'bg-slate-900 border-[#cca553] text-[#cca553] font-bold'
                      : 'bg-[#0f1b29] border-slate-850 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  HS Code
                </button>
                <button
                  onClick={() => loadPrompt('eval-prompt')}
                  className={`px-2 py-1 rounded font-mono text-[9px] uppercase border transition-all ${
                    activePromptId === 'eval-prompt'
                      ? 'bg-slate-900 border-[#cca553] text-[#cca553] font-bold'
                      : 'bg-[#0f1b29] border-slate-850 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Underpricing
                </button>
                <button
                  onClick={() => loadPrompt('quarantine-prompt')}
                  className={`px-2 py-1 rounded font-mono text-[9px] uppercase border transition-all ${
                    activePromptId === 'quarantine-prompt'
                      ? 'bg-slate-900 border-[#cca553] text-[#cca553] font-bold'
                      : 'bg-[#0f1b29] border-slate-850 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Quarantine
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Left Column: Prompt Template input box */}
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-slate-500 uppercase font-mono tracking-wider font-semibold">Prompt Template System Instructions:</label>
                  <textarea
                    rows={8}
                    value={promptTemplate}
                    onChange={(e) => setPromptTemplate(e.target.value)}
                    className="w-full bg-[#0b1420] font-mono text-xs text-slate-300 border border-slate-800 rounded p-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 leading-relaxed"
                  />
                </div>

                <div className="bg-[#0b1420] p-3 rounded-lg border border-slate-855 flex flex-col gap-2.5">
                  <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider block font-bold">Dynamic Cargo Variables:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase font-mono">Description</span>
                      <input
                        type="text"
                        value={playDesc}
                        onChange={(e) => setPlayDesc(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded px-2 py-1 mt-0.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase font-mono">Origin</span>
                      <input
                        type="text"
                        value={playOrigin}
                        onChange={(e) => setPlayOrigin(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-850 rounded px-2 py-1 mt-0.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase font-mono">Cost Value</span>
                      <input
                        type="text"
                        value={playCost}
                        onChange={(e) => setPlayCost(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-855 rounded px-2 py-1 mt-0.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-1">
                    <button
                      onClick={runTestInference}
                      disabled={isInferencing}
                      className="px-4 py-1.5 bg-[#cca553] hover:bg-[#cca553]/90 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-semibold font-mono rounded text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow transition-all"
                    >
                      {isInferencing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                      {isInferencing ? 'Inference...' : 'Test Run Inference'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Simulated result viewer */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider font-semibold">Sovereign Compiler Inference Stream:</span>
                <div className="flex-1 bg-slate-950 border border-slate-850 p-4 rounded-lg font-mono text-[11px] leading-relaxed text-[#cca553] flex flex-col justify-between min-h-[220px]">
                  {inferenceResult ? (
                    <div className="whitespace-pre-wrap text-slate-300">
                      {inferenceResult}
                    </div>
                  ) : isInferencing ? (
                    <div className="flex flex-col items-center justify-center h-full gap-2 py-12 text-slate-404">
                      <Cpu className="w-8 h-8 text-emerald-400 animate-spin" />
                      <p className="animate-pulse">Accessing secure AI-Cluster Model UR-Cortex-V3...</p>
                      <p className="text-[10px] text-[#4a6381]">Resolving custom tariff index database matrices</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-2 py-12">
                      <Server className="w-8 h-8 text-slate-700" />
                      <p className="text-center italic">Waiting for prompt compilation sequence trigger...</p>
                      <p className="text-[10px] text-slate-600">Select any template and click "Test Run" above.</p>
                    </div>
                  )}
                  {inferenceResult && (
                    <div className="mt-4 pt-2 border-t border-slate-850/60 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                      <span>Response Token: JWT-ASS-0329</span>
                      <span>Latency: {(320 + Math.random() * 80).toFixed(0)}ms</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right column sidebar / 1/3 width */}
        <div className="flex flex-col gap-6">
          
          {/* Section 3: human in loop console */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
            <div className="border-b border-slate-900 pb-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="text-emerald-400 w-4.5 h-4.5" />
                Human-in-the-Loop Audit Console
              </h3>
              <p className="text-xs text-slate-400 mt-1">Audit low-confidence neural decisions and apply sovereign central government overrides.</p>
            </div>

            {hitlList.length === 0 ? (
              <div className="bg-emerald-950/20 border border-emerald-500/20 p-4 rounded text-center text-xs">
                <p className="text-emerald-400 font-bold mb-1">✓ HUMAN OVERRIDES EXPENDED</p>
                <p className="text-[10px] text-slate-400">All low-confidence classifier assessments have been securely audited by central agencies.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {hitlList.map((h) => (
                  <div key={h.id} className="bg-slate-900 p-3.5 rounded border border-slate-855 flex flex-col gap-2.5 text-xs text-slate-300">
                    <div className="flex justify-between items-center text-slate-400 font-mono text-[10px] border-b border-slate-850/60 pb-1.5">
                      <span>INCIDENT: <strong className="text-slate-200">{h.id}</strong></span>
                      <span className="text-amber-400 bg-amber-955 px-1 rounded font-semibold">Score: {h.score} Confidence</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-100">{h.cargo}</p>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">{h.checkpoint} Gateway Node</p>
                      <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed bg-slate-950/45 p-2 rounded border border-slate-850/60 italic">
                        "{h.anomaly}"
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <button
                        onClick={() => handleHITLResolve(h.id, 'APPROVED')}
                        className="py-1.5 bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 rounded font-semibold font-mono text-[10px] uppercase transition-all"
                      >
                        Accept Override
                      </button>
                      <button
                        onClick={() => handleHITLResolve(h.id, 'REJECTED')}
                        className="py-1.5 bg-red-955 hover:bg-red-900 border border-red-500/30 text-red-300 rounded font-semibold font-mono text-[10px] uppercase transition-all"
                      >
                        Reject & Hold
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Resolved human override records ledger list */}
            {hitlApprovals.length > 0 && (
              <div className="mt-2 bg-slate-900 p-3 rounded border border-slate-850">
                <span className="text-[10px] uppercase font-mono text-slate-500 block mb-2 font-bold">Secure Human Overrides Ledger:</span>
                <div className="flex flex-col gap-2 max-h-[140px] overflow-y-auto">
                  {hitlApprovals.map((r, idx) => (
                    <div key={idx} className="text-[10px] font-mono text-slate-400 border-b border-slate-850 last:border-0 pb-1.5 last:pb-0">
                      <div className="flex justify-between items-center text-[#cca553] font-bold">
                        <span>MITIGATED: {r.id}</span>
                        <span className="text-slate-500 text-[8px]">Secured</span>
                      </div>
                      <p className="text-slate-300 mt-0.5 leading-normal">Resolution Action: <span className={r.action === 'APPROVED' ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>{r.action}</span></p>
                      <p className="text-[9px] text-[#425870] mt-0.5">Authorizing Cert: CIPHER-JWT-SECURE3921</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 4: AI Governance Framework Section */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 border-b border-slate-900 pb-1.5 flex items-center gap-1.5">
              <Layers className="text-[#cca553] w-4.5 h-4.5" />
              Sovereign Governance Framework
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every artificial intelligence model deployed within the Iraq Digital Gateway ecosystem must strictly satisfy the <strong>Supreme Sovereign Auditing Accords of 2026</strong>.
            </p>
            <div className="flex flex-col gap-2.5 mt-1">
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-850 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-200 text-xs">No External Cloud Dependencies</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">AI models execute in secure local Baghdad micro-servers with offline fallback support.</p>
                </div>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-850 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-200 text-xs">Zero-Bias Multi-Lingual Accord</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">Kurdish, Arabic, and English trade entities are evaluated utilizing identical objective semantic parameters.</p>
                </div>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-850 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-200 text-xs">Auditable Prompt Registers</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-normal">All dynamic statecraft prompts require electronic signatures before deploying into live gateway channels.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

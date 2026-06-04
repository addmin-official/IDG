import React, { useState, useEffect } from 'react';
import { 
  Building2, Landmark, Shield, AlertTriangle, Activity, BarChart3, 
  TrendingUp, Compass, Cpu, AlertCircle, CheckCircle2, MapPin, 
  Monitor, HelpCircle, HardDrive, Network, Layers, BadgeAlert, 
  FileText, Coins, RefreshCw, Zap, Users, ShieldAlert, ArrowRight, Eye, Play, Sparkles
} from 'lucide-react';
import { Language, Checkpoint } from '../../types';
import { CHECKPOINTS } from '../../mockData';

interface NationalCommandCenterProps {
  lang: Language;
}

export default function NationalCommandCenter({ lang }: NationalCommandCenterProps) {
  // Active User Profile Role Selection
  const [activeRole, setActiveRole] = useState<'pmo' | 'ministries' | 'customs' | 'border' | 'economic'>('pmo');

  // Selected Gate/Checkpoint for granular analysis
  const [selectedGate, setSelectedGate] = useState<Checkpoint>(CHECKPOINTS[0]);

  // Command Desk Live Simulations
  const [thermalSensors, setThermalSensors] = useState<Record<string, number>>({ 'Umm Qasr Sea': 42.1, 'Ibrahim Khalil Land': 37.4, 'Trebil Land': 39.5, 'Baghdad Air Cargo': 21.4 });
  const [fiberOpticsSpeed, setFiberOpticsSpeed] = useState<number>(982); // mbps
  const [unresolvedCrisisList, setUnresolvedCrisisList] = useState([
    { id: 'c-01', location: 'Trebil Border Compound', type: 'Hazardous Chemicals', desc: 'Custom cargo scanning reported 18 tons of chemical reagents without Ministry of Defense dual-use clearance stamps.', severity: 'high', timestamp: '10 mins ago', actionRequired: 'Hold & Alert Military Police' },
    { id: 'c-02', location: 'Umm Qasr Seaport', type: 'Severe Vessel Backlog', desc: 'High-speed Basra pilotage reported minor basin congestion due to tidal fluctuations; vessel queues expanded to 6 anchors.', severity: 'medium', timestamp: '34 mins ago', actionRequired: 'Deploy AI Logistics Sequence' },
    { id: 'c-03', location: 'Ibrahim Khalil Crossing', type: 'Currency Outflow Risk', desc: 'Central trade wire compliance flags value inflation of imported European machinery by 410% relative to market median.', severity: 'critical', timestamp: '1 hr ago', actionRequired: 'Initiate CBI Interdiction Anchor' }
  ]);

  const [crisisResolutionNote, setCrisisResolutionNote] = useState<Record<string, string>>({});
  const [pastResolutions, setPastResolutions] = useState<Array<{ id: string; location: string; action: string; note: string; timestamp: string }>>([]);

  // Live ticker metric simulation
  useEffect(() => {
    const liveCCTVTicker = setInterval(() => {
      setThermalSensors(prev => ({
        'Umm Qasr Sea': Number((42.0 + Math.random() * 0.4).toFixed(1)),
        'Ibrahim Khalil Land': Number((37.2 + Math.random() * 0.5).toFixed(1)),
        'Trebil Land': Number((39.3 + Math.random() * 0.4).toFixed(1)),
        'Baghdad Air Cargo': Number((21.2 + Math.random() * 0.3).toFixed(1))
      }));
      setFiberOpticsSpeed(prev => Math.floor(980 + Math.random() * 10 - 5));
    }, 5000);
    return () => clearInterval(liveCCTVTicker);
  }, []);

  const handleResolveCrisis = (id: string, location: string) => {
    const note = crisisResolutionNote[id] || 'Sovereign override executed without comment.';
    setUnresolvedCrisisList(prev => prev.filter(c => c.id !== id));
    setPastResolutions(prev => [
      { id, location, action: 'Mitigation Program Initiated', note, timestamp: 'Just now by SECURE_JWT_098' },
      ...prev
    ]);
  };

  // Translations / Dynamic UI Labels
  const labels: Record<string, Record<string, string>> = {
    pmo: {
      title: lang === 'en' ? 'Prime Minister\'s Executive Briefing' : lang === 'ar' ? 'المستشارية التنفيذية لريادة الوزراء' : 'نوسینگەی ڕێنمایی و ستراتیژی سەرۆک وەزیران',
      sub: lang === 'en' ? 'Supreme Strategy Decision Matrix & Budget Allocation Monitoring' : lang === 'ar' ? 'مصفوفة اتخاذ القرارات العليا ومراقبة الموازنات والموارد الوطنية' : 'ماتریسی بڕیاری ستراتیژی باڵا و چاودێری دابەشکردنی بودجەی نیشتمانیی',
    },
    ministries: {
      title: lang === 'en' ? 'Inter-Agency Ministerial Gateway' : lang === 'ar' ? 'بوابة التكامل الوزاري المشترك' : 'بەرەی هاوئاهەنگی نێوان وەزارەتەکان',
      sub: lang === 'en' ? 'Custom Clearance Accords, Quality Control (COSQC), and Defense Dual-Use Interlocks' : lang === 'ar' ? 'تنسيق مطابقة المواصفات والسيطرة النوعية وموافقات الإعفاءات الصناعية' : 'ڕێککەوتنەکانی گومرگ، کۆنترۆڵی جۆری (COSQC)، و هاوئاهەنگی وەزارەتەکان',
    },
    customs: {
      title: lang === 'en' ? 'Federal Customs Control Command' : lang === 'ar' ? 'قيادة هيئة الجمارك الاتحادية المركزية' : 'فەرماندەیی گشتی کۆنتڕۆڵی گومرگی فیدراڵ',
      sub: lang === 'en' ? 'Real-Time Tariffs, Classification Audit Engine, and Revenue Anti-Corruption Shield' : lang === 'ar' ? 'إدارة الرسوم الجمركية ومحرك تدقيق السلع وحماية الإيرادات من الهدر مالي' : 'تاریفەی ڕاستەوخۆ، بزوێنەری لێکۆڵینەوەی پۆلێنکردن، و قەڵغانی بەرەنگاربوونەوەی هاوچەرخ',
    },
    border: {
      title: lang === 'en' ? 'National Border Security & Logistics Hub' : lang === 'ar' ? 'قيادة المنافذ الحدودية واللوجستية نينوى-البصرة' : 'ژێرخانی نیشتمانیی بازرگانی و دەروازە لۆجستییەکان',
      sub: lang === 'en' ? 'X-Ray Scanners, Quarantine Alarms, and Biosecurity Gate Clearance Signals' : lang === 'ar' ? 'أجهزة السونار وأجهزة الفحص الإشعاعي وصمامات السلامة والطب الإحيائي' : 'ئامێرەکانی سۆنەر و سکێنەری تیشکی و ئامێرەکانی هۆشداری تەندروستی گومرگی',
    },
    economic: {
      title: lang === 'en' ? 'National Trade Council Operations Desk' : lang === 'ar' ? 'غرفة التحكم لمجلس التجارة والاقتصاد الوطني' : 'ناوەندی گشتی هاوسەنگی بازرگانی و دارایی نیشتمانیی',
      sub: lang === 'en' ? 'Foreign Exchange Matching, Balance of Payments Index, and Regional Expansion Scenarios' : lang === 'ar' ? 'مطابقة حوالات مزاد العملة ومراقبة ميزان المدفوعات ونشاط المستثمرين' : 'هاوتاکردنی مۆڵەتی کڕینی دراو، چاودێری هاوردەی گشتی دەرەکی، و گەشەسەندنی ئاستی بازرگانی',
    }
  };

  const isRtl = lang !== 'en';

  return (
    <div id="national-command-center-canvas" className="bg-[#111e2e]/95 rounded-xl border border-slate-800 p-5 lg:p-6 shadow-2xl flex flex-col gap-6 text-slate-100" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Platform Title */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="text-[10px] uppercase font-mono text-[#cca553] tracking-widest font-bold">
            {lang === 'en' ? 'REPUBLIC OF IRAQ & COUNCIL OF MINISTERS' : lang === 'ar' ? 'جمهورية العراق - مجلس الوزراء الفيدرالي' : 'کۆماری عێراق - ئەنجومەنی وەزیران'}
          </span>
          <h2 className="text-xl font-display font-semibold tracking-wide text-slate-50 uppercase flex items-center gap-2.5 mt-0.5">
            <span className="p-1.5 bg-[#cca553]/15 rounded-lg border border-[#cca553]/40">
              <Monitor className="w-5 h-5 text-[#cca553]" />
            </span>
            {lang === 'en' ? 'Sovereign National Command Center (IDG Command Hub)' : lang === 'ar' ? 'غرفة العمليات الوطنية السيادية الموحدة (IDG)' : 'ناوەندی فەرمانی نیشتمانیی سەروەر'}
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl">
            {lang === 'en' ? 'Sovereign integrated operational command deck merging inter-agency border logistics, live thermal scanners, central bank cash registries, and real-time trade corridor anomaly intercept systems.' :
             lang === 'ar' ? 'نظام العمليات والتحكم المركزي الفيدرالي الذي يدمج البيانات اللوجستية وأجهزة الاستشعار للمنافذ وحساب الاعتمادات ومكافحة التهرب المالي.' :
             'سەکۆی فەرمی کۆنترۆڵکردنی دەروازەکان و چاودێری گەشتی جموجۆڵی دارایی و مۆڵەتەکانی بازرگانی.'}
          </p>
        </div>

        {/* Profile Switcher container */}
        <div className="flex flex-wrap items-center gap-2 bg-[#0b1420] border border-slate-800 p-1.5 rounded-lg">
          <span className="text-[10px] font-mono text-slate-500 uppercase px-2 font-bold select-none">
            {lang === 'en' ? 'Access Level:' : lang === 'ar' ? 'مستوى التفويض:' : 'ئاستی ڕێپێدان:'}
          </span>
          
          <button
            id="role-btn-pmo"
            onClick={() => setActiveRole('pmo')}
            className={`px-2.5 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-1.5 ${
              activeRole === 'pmo' 
                ? 'bg-[#1a2c42] text-[#cca553] border border-[#cca553]/30 font-bold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            {lang === 'en' ? 'PM Office' : lang === 'ar' ? 'مكتب رئيس الوزراء' : 'نوسینگەی سەرۆک وەزیران'}
          </button>

          <button
            id="role-btn-ministries"
            onClick={() => setActiveRole('ministries')}
            className={`px-2.5 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-1.5 ${
              activeRole === 'ministries' 
                ? 'bg-[#1a2c42] text-[#cca553] border border-[#cca553]/30 font-bold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            {lang === 'en' ? 'Ministries' : lang === 'ar' ? 'الوزارات الاتحادية' : 'وەزارەتە فیدراڵییەکان'}
          </button>

          <button
            id="role-btn-customs"
            onClick={() => setActiveRole('customs')}
            className={`px-2.5 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-1.5 ${
              activeRole === 'customs' 
                ? 'bg-[#1a2c42] text-[#cca553] border border-[#cca553]/30 font-bold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            {lang === 'en' ? 'Customs Auth' : lang === 'ar' ? 'سلطة الجمارك' : 'دەسەڵاتی گومرگ'}
          </button>

          <button
            id="role-btn-border"
            onClick={() => setActiveRole('border')}
            className={`px-2.5 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-1.5 ${
              activeRole === 'border' 
                ? 'bg-[#1a2c42] text-[#cca553] border border-[#cca553]/30 font-bold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            {lang === 'en' ? 'Border Auth' : lang === 'ar' ? 'أمن المنافذ' : 'ئاسایشی دەروازەکان'}
          </button>

          <button
            id="role-btn-economic"
            onClick={() => setActiveRole('economic')}
            className={`px-2.5 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-1.5 ${
              activeRole === 'economic' 
                ? 'bg-[#1a2c42] text-[#cca553] border border-[#cca553]/30 font-bold' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            {lang === 'en' ? 'Economic' : lang === 'ar' ? 'المجلس الاقتصادي' : 'ئەنجومەنی ئابووری'}
          </button>
        </div>
      </div>

      {/* Role Title and Description banner */}
      <div className="bg-[#1a2c42]/30 border-[#cca553] p-4 rounded bg-gradient-to-r from-[#1a2c42]/40 to-transparent flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 rtl:border-l-0 rtl:border-r-4">
        <div>
          <h3 className="font-semibold text-slate-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#cca553]" />
            {labels[activeRole].title}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">{labels[activeRole].sub}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-2 rounded font-mono text-[10px] text-slate-500 select-none">
          SECURE ENCLAVE ID: <span className="text-[#cca553]">{activeRole.toUpperCase()}_ADMIN_STREAMS</span>
        </div>
      </div>

      {/* Main Role-Based Workspace */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left column / 2/3 width on wide screen */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          
          {/* Active Strategy Panel for PMO */}
          {activeRole === 'pmo' && (
            <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 border-b border-slate-900 pb-2 flex justify-between items-center">
                <span>
                  {lang === 'en' ? 'Supreme National Strategic Agenda' : lang === 'ar' ? 'الأجندة الاستراتيجية العليا للتجارة والمالية' : 'کارنامەی باڵای ستراتیژی نیشتمانیی'}
                </span>
                <span className="text-xs px-2 py-0.5 bg-[#cca553]/10 border border-[#cca553]/30 rounded text-[#cca553] uppercase font-mono">2026 Fiscal Cycle</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0b1420] border border-slate-850 p-4 rounded-lg flex flex-col gap-2">
                  <h4 className="text-xs text-slate-400 uppercase font-mono">
                    {lang === 'en' ? 'Customs Direct Revenues Target' : lang === 'ar' ? 'عوائد المالية والتعرفة الاتحادیة المحققة' : 'ئاستی داهاتی گومرگی فیدراڵی'}
                  </h4>
                  <div className="flex items-end gap-2 mt-1">
                    <span className="text-2xl font-bold font-mono text-[#cca553]">8.42T IQD</span>
                    <span className="text-xs text-emerald-400 font-mono mb-1">94.3% Achieved</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded overflow-hidden mt-2">
                    <div className="bg-[#cca553] h-full rounded" style={{ width: '94.3%' }}></div>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal mt-1">
                    {lang === 'en' ? 'Federal central treasury direct intake calculated from real-time blockchain customs receipts. Over 800M USD leakage blocked by automated AI auditors.' :
                     lang === 'ar' ? 'إجمالي مستودعات الخزينة العامة الاتحادية استحصلت إلكترونياً بالتوافق بين أربيل وبغداد؛ دمرت قنوات الهدر الجمركي بالكامل.' :
                     'کۆی داهاتی فەرمی سەرەکی خەزێنەی دەوڵەت بەهاوئاهەنگی نێوان دەروازەکان بە سەرکەوتوویی پاشەکەوت کراوە.'}
                  </p>
                </div>

                <div className="bg-[#0b1420] border border-slate-850 p-4 rounded-lg flex flex-col gap-2">
                  <h4 className="text-xs text-slate-400 uppercase font-mono font-semibold">
                    {lang === 'en' ? 'Strategic Interoperability Index' : lang === 'ar' ? 'مؤشر العمل المشترك والتكامل السيادي' : 'پۆلی هاوئاهەنگی ستراتیژی نیشتمانیی'}
                  </h4>
                  <div className="flex items-end gap-2 mt-1">
                    <span className="text-2xl font-bold font-mono text-cyan-400">99.94%</span>
                    <span className="text-xs text-slate-500 font-mono mb-1">Optimal Sync</span>
                  </div>
                  <div className="flex gap-1 h-1 bg-slate-900 rounded overflow-hidden mt-2">
                    <div className="flex-1 bg-cyan-400 rounded-sm"></div>
                    <div className="flex-1 bg-cyan-400 rounded-sm"></div>
                    <div className="flex-1 bg-cyan-400 rounded-sm"></div>
                    <div className="flex-1 bg-cyan-400 rounded-sm"></div>
                    <div className="flex-1 bg-cyan-400 rounded-sm"></div>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal mt-1">
                    {lang === 'en' ? 'Live connection status matrix between Central Bank of Iraq, Federal Commercial Banks, Real Estate, Ministries and General Customs Authority.' :
                     lang === 'ar' ? 'درجة المزامنة اللحظية والاتصال الرقمي بين البنك المركزي وحسابات وزارة المالية وهيئة المنافذ والجمارك والوزارات المعنية.' :
                     'هاودەمی تەواوی داتاکانی گشتی نێوان وەزارەتی دارایی، بانکی ناوەندی و خاڵە جومگەییەکان.'}
                  </p>
                </div>
              </div>

              {/* Council of Ministers Directive Monitor */}
              <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-850 flex flex-col gap-3">
                <h4 className="text-xs uppercase font-mono text-slate-400">
                  {lang === 'en' ? 'Prime Minister Immediate Cabinet Priorities' : lang === 'ar' ? 'أولويات مجلس الوزراء العراقي التنفيذية الفورية' : 'یاساکانی سەرەکی ئەنجومەنی وەزیران'}
                </h4>
                <div className="flex flex-col gap-3 text-xs">
                  <div className="flex items-start gap-2.5 border-b border-slate-850/60 pb-2">
                    <span className="p-1 bg-emerald-900/40 text-emerald-400 border border-emerald-500/20 rounded text-[9px] uppercase font-mono font-bold">Priority 1</span>
                    <div>
                      <p className="font-semibold text-slate-200">
                        {lang === 'en' ? 'Basra Gulf Deep Water Digital Harbor Customs Link' : lang === 'ar' ? 'الربط الرقمي لميناء الفاو الكبير وبحر البصرة جمركياً' : 'هاوئاهەنگی گومرگی بەندەری ئوم قەسر لە باشور'}
                      </p>
                      <p className="text-[10px] text-slate-404 mt-0.5">
                        {lang === 'en' ? 'Automating Grand Faw Port deep berth dry-transit customs classification before bulk transshipment. Target kickoff: Q3 2026.' :
                         lang === 'ar' ? 'معالجة جمركية للمنافذ المائية تمهيداً لبدء طريق التنمية البري نحو المنافذ الحدودية التركية.' :
                         'ڕێککەوتنی جۆری پشکنینی بارهەڵگر لە باشوری عێراق بۆ پێشوازی لە پرۆژەی گشتی طریق التنمية.'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="p-1 bg-[#cca553]/10 text-[#cca553] border border-[#cca553]/20 rounded text-[9px] uppercase font-mono font-bold">Priority 2</span>
                    <div>
                      <p className="font-semibold text-slate-200">
                        {lang === 'en' ? 'Turkey-Kurdistan Region Railway Cargo Custom Accord' : lang === 'ar' ? 'الاتفاق الجمركي الموحد لربط سكة وبوابات إقليم كوردستان بتركيا' : 'ڕێککەوتنی گشتی ڕاگرتنی تاریفەی هاوبەش بۆ دەروازەی ئیبراهیم خەلیل'}
                      </p>
                      <p className="text-[10px] text-slate-404 mt-0.5">
                        {lang === 'en' ? 'Establishing centralized pre-clearance terminals inside Silopi and Ibrahim Khalil nodes, eliminating duplication. Automated multi-language Kurdish-Arabic customs translations active.' :
                         lang === 'ar' ? 'اعتماد بوابات تفتيش موحدة في منفذ إبراهيم الخليل تنهي الازدواج الضريبي وتعتمد اللغتين الكوردية والعربية رسمياً.' :
                         'دروستکردنی خزمەتگوزاری یەکڕاستی باڕکۆد و تاریفە بۆ دەروازەی باشماخ و ئیبراهیم خەلیل.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Ministries interlog */}
          {activeRole === 'ministries' && (
            <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 border-b border-slate-900 pb-2">
                {lang === 'en' ? 'Ministry Integration & Clearance Interlocks' : lang === 'ar' ? 'تكامل الوزارات وصمامات التخليص الموحدة' : 'هاوئاهەنگی نێوان وەزارەتەکان و ڕێگەپێدانی گشتی'}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-[#0b1420] border border-slate-850 p-3 rounded-lg flex flex-col gap-1.5">
                  <span className="text-[10px] text-slate-500 uppercase font-mono">
                    {lang === 'en' ? 'Ministry of Defense' : lang === 'ar' ? 'وزارة الدفاع الاتحادية' : 'وەزارەتی بەرگری فیدراڵ'}
                  </span>
                  <div className="flex justify-between items-center mt-1">
                    <span className="font-bold text-slate-200">
                      {lang === 'en' ? 'Dual-Use Items Audit' : lang === 'ar' ? 'تدقيق المواد ثنائية الاستخدام' : 'پشکنینی کاڵاکانی دوولایەنە'}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-emerald-950/80 text-emerald-400 border border-emerald-500/20 rounded uppercase">
                      {lang === 'en' ? 'Secured' : lang === 'ar' ? 'مؤمن' : 'پارێزراو'}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-404 mt-1">
                    {lang === 'en' ? 'AI classifier automatically intercepts chemical precursors, high-grade alloys, and electromagnetic hardware, routing to Joint Armed Forces Command.' : lang === 'ar' ? 'يقوم المصنف العصبي تلقائياً بتحديد المركبات الكيميائية، والسبائك عالية الدقة، والأجهزة الكهرومغناطيسية وتوجيهها للعمليات المشتركة.' : 'پۆلێنکاری زیرەکی دەستکرد بە شێوەی خۆکار ڕێگری دەکات لە باری کیمیایی یان کانزای قورس و ڕەوانەی دەکات بۆ بڕیاری وەزارەتی بەرگری.'}
                  </p>
                </div>

                <div className="bg-[#0b1420] border border-slate-850 p-3 rounded-lg flex flex-col gap-1.5">
                  <span className="text-[10px] text-slate-500 uppercase font-mono">
                    {lang === 'en' ? 'Ministry of Health' : lang === 'ar' ? 'وزارة الصحة الاتحادية' : 'وەزارەتی تەندروستی فیدراڵ'}
                  </span>
                  <div className="flex justify-between items-center mt-1">
                    <span className="font-bold text-slate-200">
                      {lang === 'en' ? 'Biomedical Quarantine' : lang === 'ar' ? 'الحجر الصحي الحيوي المتقدم' : 'کەرەنتینەی تەندروستی گشتی'}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-emerald-950/80 text-emerald-400 border border-emerald-500/20 rounded uppercase">
                      {lang === 'en' ? 'Secured' : lang === 'ar' ? 'مؤمن' : 'پارێزراو'}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-404 mt-1">
                    {lang === 'en' ? 'Expedited validation of certified medical cartridges, thermic insulin agents, and raw therapeutics matching global pharmacy registries.' : lang === 'ar' ? 'مصادقة سريعة للأجهزة الطبية واللقاحات والمستحضرات الدوائية لتتطابق مع المعايير الفيديرالية والأكواد العالمية.' : 'دیاریکردن و پشکنینی خێرای دەرمان و پێداویستییە تەندروستییەکان بەپێی تۆماری دامەزراوە تەندروستییە نێودەوڵەتییەکان.'}
                  </p>
                </div>

                <div className="bg-[#0b1420] border border-slate-850 p-3 rounded-lg flex flex-col gap-1.5">
                  <span className="text-[10px] text-slate-500 uppercase font-mono">
                    {lang === 'en' ? 'Ministry of Agriculture' : lang === 'ar' ? 'وزارة الزراعة الاتحادية' : 'وەزارەتی کشتوکاڵی فیدراڵ'}
                  </span>
                  <div className="flex justify-between items-center mt-1">
                    <span className="font-bold text-slate-200">
                      {lang === 'en' ? 'Phytosanitary Accord' : lang === 'ar' ? 'الاتفاقية والوقاية النباتية والزراعية' : 'پەیمانی پشکنینی کشتوکاڵیی'}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-amber-950/80 text-amber-400 border border-amber-500/20 rounded uppercase font-semibold">
                      {lang === 'en' ? 'Inspection Warn' : lang === 'ar' ? 'تحذير الفحص' : 'ئاگاداری پشکنین'}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-404 mt-1">
                    {lang === 'en' ? 'Real-time monitoring of biological cargo and grain imports. Automatic alert triggered for non-authorized wheat strains at southern borders.' : lang === 'ar' ? 'مراقبة لحظية للشحنات البيولوجية والحبوب المستوردة، مع إطلاق إنذار فوري لأي سلالات حبوب غير معتمدة تجارياً.' : 'مۆنیتۆرکردنی ڕاستەوخۆی بەرهەمە زیندەیی و کشتوکاڵییەکان، هۆشداری پێویست لە کاتی گومانی گەنم بۆ پاراستنی باری نیشتمانیی.'}
                  </p>
                </div>
              </div>

              {/* COSQC Accords panel */}
              <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-850 flex flex-col gap-3">
                <h4 className="text-xs uppercase font-mono text-slate-400">Central Organization for Standardization and Quality Control (COSQC) Accords</h4>
                <div className="overflow-x-auto text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-500 text-[10px] uppercase font-mono">
                        <th className="pb-2">Accord Token</th>
                        <th className="pb-2">Origin Region</th>
                        <th className="pb-2">Audited Item Class</th>
                        <th className="pb-2">Compliance Rating</th>
                        <th className="pb-2 text-right">Certificate Seal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-850 text-slate-300 font-mono text-[11px]">
                      <tr>
                        <td className="py-2.5 text-[#cca553]">COSQC-STND-2026</td>
                        <td>European Union</td>
                        <td>Automotive Brake Assembly</td>
                        <td className="text-emerald-400">99.8% (Approved)</td>
                        <td className="text-right text-slate-400">MODERN_ISO_COSQC</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 text-[#cca553]">COSQC-AGRI-9981</td>
                        <td>Regional Wheat Imports</td>
                        <td>Grains / Non-GMO seeds</td>
                        <td className="text-emerald-400">100.0% (Approved)</td>
                        <td className="text-right text-slate-400">AGRI_GOV_CERT</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 text-[#cca553]">COSQC-ELEC-4131</td>
                        <td>East Asia Circuits</td>
                        <td>High voltage grid elements</td>
                        <td className="text-amber-400">89.2% (Pending Inspect)</td>
                        <td className="text-right text-slate-400">LAB_MANUAL_HOLD</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Customs Control command */}
          {activeRole === 'customs' && (
            <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 border-b border-slate-900 pb-2">Federal Customs Control gauges</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-[#0b1420] border border-slate-850 p-3 rounded-lg text-center">
                  <span className="text-[10px] text-slate-500 uppercase block font-mono">Total Import Declarations</span>
                  <span className="text-xl font-bold font-mono text-slate-200 mt-1 block">14,204</span>
                  <span className="text-[9px] text-slate-400 block font-mono mt-0.5">Secure Electronic Filings</span>
                </div>
                <div className="bg-[#0b1420] border border-slate-850 p-3 rounded-lg text-center">
                  <span className="text-[10px] text-slate-500 uppercase block font-mono">Tax Revenue (Daily)</span>
                  <span className="text-xl font-bold font-mono text-[#cca553] mt-1 block">22.4B IQD</span>
                  <span className="text-[9px] text-emerald-400 block font-mono mt-0.5">+4.2% Peak Yield</span>
                </div>
                <div className="bg-[#0b1420] border border-slate-850 p-3 rounded-lg text-center">
                  <span className="text-[10px] text-slate-500 uppercase block font-mono">Interceptions (Anti-Fraud)</span>
                  <span className="text-xl font-bold font-mono text-red-400 mt-1 block">342</span>
                  <span className="text-[9px] font-mono text-red-500 block mt-0.5">Audit Interlocks Live</span>
                </div>
                <div className="bg-[#0b1420] border border-slate-850 p-3 rounded-lg text-center">
                  <span className="text-[10px] text-slate-500 uppercase block font-mono">HS Classification Match</span>
                  <span className="text-xl font-bold font-mono text-cyan-400 mt-1 block">98.92%</span>
                  <span className="text-[9px] text-slate-400 block font-mono mt-0.5">AI Engine Cleared</span>
                </div>
              </div>

              {/* Advanced Classification Match visual engine */}
              <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-850">
                <h4 className="text-xs uppercase font-mono text-slate-400 mb-3">Live Customs Classification stream list</h4>
                <div className="flex flex-col gap-2 font-mono text-xs">
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-850 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div>
                      <p className="text-slate-100 font-semibold text-[11px] uppercase">[HS: 8471.3000] - Portable Computers</p>
                      <p className="text-[10px] text-slate-500">Declared Value: $41,200 USD • Registered Customs Tax Rate: 5%</p>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-500/20 rounded uppercase text-[9px] font-semibold">Match score: 100%</span>
                      <p className="text-[10px] text-slate-500 mt-1">Processed DUHOK_GATEWAY</p>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-2.5 rounded border border-slate-850 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div>
                      <p className="text-amber-500 font-semibold text-[11px] uppercase">[HS: 8703.2300] - Motor Passenger Car</p>
                      <p className="text-[10px] text-slate-500">Declared Value: $12,400 USD (Suspicious undervaluation) • Registered customs fee rate: 15%</p>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 bg-amber-955 text-amber-400 border border-amber-500/20 rounded uppercase text-[9px] font-semibold">Matched score: 62% (Audited)</span>
                      <p className="text-[10px] text-slate-500 mt-1">Intercepted BASRA_SEAPORT</p>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-2.5 rounded border border-slate-850 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div>
                      <p className="text-slate-100 font-semibold text-[11px] uppercase">[HS: 3004.9000] - Medicinal products formulated</p>
                      <p className="text-[10px] text-slate-500">Declared Value: $148,000 USD • Customs Rate: 0% (Ministry of Health Accord Active)</p>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-500/20 rounded uppercase text-[9px] font-semibold">Matched score: 100%</span>
                      <p className="text-[10px] text-slate-500 mt-1">Processed BAGHDAD_AIR</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Border Control hardware stats */}
          {activeRole === 'border' && (
            <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 border-b border-slate-900 pb-2">Border Scanner & Hardware Health Desk</h3>
              <p className="text-xs text-slate-400">Live physical status indicators of X-Ray scanners, fiber networks, and local backups at the nodes.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(thermalSensors).map(([port, temp]) => {
                  const tempVal = Number(temp);
                  return (
                    <div key={port} className="bg-[#0b1420] border border-slate-850 p-3 rounded-lg flex flex-col justify-between">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-slate-200 font-bold">{port} Crossing</span>
                        <span className={`h-2 w-2 rounded-full ${tempVal > 40 ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-850/60">
                        <p>Scanner Temp: <strong className={tempVal > 40 ? 'text-amber-400' : 'text-emerald-400'}>{tempVal}°C</strong></p>
                        <p>Fiber Hub: <strong className="text-slate-200">{fiberOpticsSpeed} Mbps</strong></p>
                        <p>Power Grid Feed: <strong className="text-emerald-400">100% stable</strong></p>
                        <p>Offline Database: <strong className="text-cyan-405">Fully Synced</strong></p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Customs Flow Analysis counters */}
              <div className="bg-[#0b1420]/40 p-4 rounded-xl border border-slate-850">
                <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-2">Border Flow Capacity Analysis</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="bg-[#050b12] p-3 rounded border border-slate-850 text-center">
                    <span className="text-[10px] text-slate-500 block mb-1">AVG LANE CLEARANCE SPEED</span>
                    <span className="text-lg font-bold text-slate-200 font-mono">14.1 Min</span>
                  </div>
                  <div className="bg-[#050b12] p-3 rounded border border-slate-850 text-center">
                    <span className="text-[10px] text-slate-500 block mb-1">TRUCK ACCUMULATION RATE</span>
                    <span className="text-lg font-bold text-slate-200 font-mono">1.2 Cars/Min</span>
                  </div>
                  <div className="bg-[#050b12] p-3 rounded border border-slate-850 text-center">
                    <span className="text-[10px] text-slate-500 block mb-1">QUARANTINE OVERFLOW CAPACITY</span>
                    <span className="text-lg font-bold text-[#cca553] font-mono">0.05% Range</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Economic Council Control room */}
          {activeRole === 'economic' && (
            <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 border-b border-slate-800 pb-2">National Economic intelligence & Flow Scenarios</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0b1420] border border-slate-850 p-4 rounded-lg flex flex-col gap-2">
                  <h4 className="text-xs text-slate-400 uppercase font-mono font-semibold">Foreign Exchange Match Ratio</h4>
                  <div className="flex items-end gap-2 mt-1">
                    <span className="text-2xl font-bold font-mono text-emerald-400">98.15%</span>
                    <span className="text-xs text-slate-500 font-mono mb-1">Trade vs Bank Registry</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal mt-1">
                    Central Bank of Iraq (CBI) automated matching mechanism comparing custom manifest assessments to certified trade finance transactions. Over-invoicing risk controlled.
                  </p>
                </div>

                <div className="bg-[#0b1420] border border-slate-850 p-4 rounded-lg flex flex-col gap-2">
                  <h4 className="text-xs text-slate-400 uppercase font-mono font-semibold">Balance of Payments Current Account Projection</h4>
                  <div className="flex items-end gap-2 mt-1">
                    <span className="text-2xl font-bold font-mono text-[#cca553]">+$9.18B USD</span>
                    <span className="text-xs text-emerald-400 font-mono mb-1">Surplus Trend</span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal mt-1">
                    Rolling 12-month projections of secure custom revenues, agricultural production indicators, and energy transshipment tariffs across active economic tunnels.
                  </p>
                </div>
              </div>

              {/* Advanced Regional Economic Expansion Scenarios */}
              <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-850 flex flex-col gap-2">
                <h4 className="text-xs uppercase font-mono text-slate-400 mb-1">Active Economical Expansion Sandbox Models</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1 text-xs">
                  <div className="p-3 bg-slate-950 rounded border border-slate-850">
                    <p className="font-semibold text-slate-200 uppercase tracking-wide text-[11px]">Gulf-Basra Corridor (Grand Faw Link)</p>
                    <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                      Establishes a sovereign transit land-bridge dry tunnel linking Basra container port to the Turkish rail mesh. Expected to handle 40M tons of overland cargo annually.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded border border-slate-850">
                    <p className="font-semibold text-slate-200 uppercase tracking-wide text-[11px]">West Levant Corridor (Levant Transit Tunnel)</p>
                    <p className="text-[10px] text-slate-400 mt-1 leading-normal">
                      Connects Iraqi petrochemical storage networks to Mediterranean dry-cargo systems. Under analysis by Joint Levant Trade Ministry Committees.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Granular Active Checkpoint Detail Gauge Panel (Universal across Roles) */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
            <div className="border-b border-slate-900 pb-3 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <div>
                <span className="text-[10px] text-[#cca553] uppercase font-mono tracking-wider font-semibold block">
                  {selectedGate.region[lang]}
                </span>
                <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  {selectedGate.name[lang]} - Central Gate Analytics Details
                </h3>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">NODE SECURITY RECONCILED RANGE</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-[#0b1420] p-3 rounded border border-slate-850">
                <span className="text-slate-500 text-[10px] uppercase font-mono block mb-1">Clearance Status</span>
                <span className="text-xs font-bold text-emerald-400 font-mono block">Zero-Trust Active</span>
              </div>
              <div className="bg-[#0b1420] p-3 rounded border border-slate-850">
                <span className="text-slate-500 text-[10px] uppercase font-mono block mb-1">Daily Custom Revenues</span>
                <span className="text-xs font-bold text-[#cca553] font-mono block">{(selectedGate.revenueRaw * 1000).toLocaleString()} IQD</span>
              </div>
              <div className="bg-[#0b1420] p-3 rounded border border-slate-850">
                <span className="text-slate-500 text-[10px] uppercase font-mono block mb-1">Trucks Processed (Today)</span>
                <span className="text-xs font-bold text-slate-200 font-mono block">{selectedGate.processedToday.toLocaleString()} manifest files</span>
              </div>
              <div className="bg-[#0b1420] p-3 rounded border border-slate-850">
                <span className="text-slate-500 text-[10px] uppercase font-mono block mb-1">Registered Gate Class</span>
                <span className="text-xs font-semibold text-slate-300 font-mono uppercase block">{selectedGate.type} custom node</span>
              </div>
            </div>

            {/* Selection nodes grid */}
            <div className="mt-2 bg-[#050b12] p-3 rounded border border-slate-850 text-xs">
              <span className="text-[10px] uppercase tracking-wider font-mono text-slate-500 block mb-2 font-bold">Select Active Custom Node to Inspect:</span>
              <div className="flex flex-wrap gap-2">
                {CHECKPOINTS.map((checkpoint) => (
                  <button
                    key={checkpoint.id}
                    onClick={() => setSelectedGate(checkpoint)}
                    className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-all ${
                      selectedGate.id === checkpoint.id
                        ? 'bg-[#1a2c42] border border-[#cca553]/40 text-[#cca553] font-bold shadow'
                        : 'bg-slate-900 border border-slate-850 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {checkpoint.name[lang]}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right column / 1/3 width sidebar */}
        <div className="flex flex-col gap-6">

          {/* Active Strategic Recommendations Panel */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wider pb-2 border-b border-slate-900 flex justify-between items-center">
              <span className="flex items-center gap-1.5">
                <Cpu className="text-[#cca553] w-4 h-4" />
                Sovereign AI Decision Shield
              </span>
              <span className="bg-[#cca553]/10 text-[#cca553] border border-[#cca553]/30 px-2 py-0.5 rounded text-[9px] font-mono uppercase">Recommendations</span>
            </h3>

            <div className="flex flex-col gap-3.5 text-xs text-slate-300">
              <div className="bg-[#1a2c42]/20 border-l-3 border-emerald-500 p-3 rounded relative">
                <p className="font-mono text-[9px] text-[#cca553] font-semibold mb-1 uppercase">HS CLASSIFICATION ANOMALY CAPTURE (ACTIVE)</p>
                <p className="font-medium text-slate-200">Reclassify Wheat strain imports from Levant tunnel</p>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                  Our neural network flagged importer tariff mismatch [HS-1001] mapped instead as [HS-1003]. Reclassifying recovers 41M IQD in unassigned duties instantly.
                </p>
                <div className="mt-2.5 flex justify-end">
                  <button className="px-2.5 py-1 bg-emerald-950 hover:bg-emerald-950 border border-emerald-500/30 text-emerald-300 font-mono rounded text-[10px] uppercase font-bold flex items-center gap-1">
                    <Play className="w-3 h-3 text-emerald-400" /> Apply Override
                  </button>
                </div>
              </div>

              <div className="bg-[#1a2c42]/20 border-l-3 border-cyan-400 p-3 rounded relative">
                <p className="font-mono text-[9px] text-[#cca553] font-semibold mb-1 uppercase">PREDICTIVE STREAK & FLOW CLEARANCE LOG (ACTIVE)</p>
                <p className="font-medium text-slate-200">Reroute Ibrahim Khalil bulk trucks to Duhoq dry lock</p>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                  Live scanner queue projections hint at a 4-hour customs backlog at regional borders tonight. Pre-routing 12 cargo trucks to Dahuk bypass drops latency by 72% overall.
                </p>
                <div className="mt-2.5 flex justify-end">
                  <button className="px-2.5 py-1 bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-300 font-mono rounded text-[10px] uppercase font-bold flex items-center gap-1">
                    <Play className="w-3 h-3 text-cyan-400" /> Apply Override
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Integrated Crisis Scanner */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4">
            <div className="border-b border-slate-900 pb-3">
              <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="text-amber-500 w-4 h-4 animate-bounce" />
                Inter-Agency Crisis Intercepts
              </h3>
              <p className="text-[11px] text-slate-404 mt-1 leading-normal">Real-time border sensor alarms requiring manual sovereign statecraft resolution blocks.</p>
            </div>

            {unresolvedCrisisList.length === 0 ? (
              <div className="bg-emerald-950/25 border border-emerald-500/20 p-4 rounded text-center text-xs">
                <p className="text-emerald-400 font-bold mb-1">✓ ZERO ACTIVE INCIDENTS</p>
                <p className="text-[11px] text-slate-400">All regional border checkpoints are fully operating under optimal zero-trust clearance bounds.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {unresolvedCrisisList.map((crisis) => (
                  <div key={crisis.id} className="bg-slate-900 p-3.5 rounded border border-slate-850 flex flex-col gap-2.5 text-xs text-slate-300">
                    <div className="flex justify-between items-start gap-2">
                      <span className={`px-2 py-0.5 text-[9px] font-mono uppercase rounded font-bold border ${
                        crisis.severity === 'critical' ? 'bg-red-950 text-red-400 border-red-500/30 animate-pulse' :
                        crisis.severity === 'high' ? 'bg-amber-955 text-amber-400 border-amber-500/30' :
                        'bg-slate-950 text-slate-400 border-slate-800'
                      }`}>
                        {crisis.severity.toUpperCase()} • {crisis.timestamp}
                      </span>
                      <strong className="text-slate-500 font-mono text-[10px]">{crisis.id}</strong>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-200">{crisis.type}</h4>
                      <p className="text-slate-400 text-[11px] leading-relaxed mt-1">{crisis.location}</p>
                      <p className="text-slate-300 leading-relaxed text-[11px] mt-1 bg-slate-950/80 p-2.5 rounded border border-slate-850/40 italic">
                        "{crisis.desc}"
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 pt-2 border-t border-slate-850/60 text-[11px]">
                      <span className="text-[#cca553] font-mono uppercase text-[9px] font-semibold">Recommended Mitigation: {crisis.actionRequired}</span>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Provide audit override note ledger item..."
                          value={crisisResolutionNote[crisis.id] || ''}
                          onChange={(e) => setCrisisResolutionNote(prev => ({ ...prev, [crisis.id]: e.target.value }))}
                          className="flex-1 bg-[#0b1420] border border-slate-800 rounded px-2.5 py-1 text-slate-200 font-mono text-[10px] placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-[#cca553]"
                        />
                        <button
                          onClick={() => handleResolveCrisis(crisis.id, crisis.location)}
                          className="px-3 py-1 bg-[#cca553] hover:bg-[#cca553]/90 text-slate-950 font-semibold rounded text-[10px] uppercase tracking-wide font-mono transition-all shrink-0"
                        >
                          Intercept
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Resolved Incident Ledger stream container */}
            {pastResolutions.length > 0 && (
              <div className="mt-2 bg-slate-900 p-3 rounded border border-slate-850">
                <span className="text-[10px] uppercase font-mono text-slate-500 block mb-2 font-bold">Secure Incident Mitigation Logs:</span>
                <div className="flex flex-col gap-2 max-h-[140px] overflow-y-auto">
                  {pastResolutions.map((r, i) => (
                    <div key={i} className="text-[10px] font-mono text-slate-400 border-b border-slate-850 pb-1.5 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center text-[#cca553] font-bold">
                        <span>MITIGATED: {r.id}</span>
                        <span className="text-slate-500 text-[8px]">{r.timestamp}</span>
                      </div>
                      <p className="text-slate-300 mt-0.5 leading-normal">{r.location}</p>
                      <p className="text-slate-500 italic text-[9px] mt-0.5 bg-slate-950/60 p-1 rounded font-mono">Note: "{r.note}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}

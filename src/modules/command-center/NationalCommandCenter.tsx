import React, { useState, useEffect } from 'react';
import { 
  Building2, Landmark, Shield, AlertTriangle, Activity, BarChart3, 
  TrendingUp, Compass, Cpu, AlertCircle, CheckCircle2, MapPin, 
  Monitor, HelpCircle, HardDrive, Network, Layers, BadgeAlert, 
  FileText, Coins, RefreshCw, Zap, Users, ShieldAlert, ArrowRight, Eye, Play, Sparkles
} from 'lucide-react';
import { Language, Checkpoint } from '../../types';
import { CHECKPOINTS } from '../../mockData';

// Expose IDG Component Library and Icon Wrappers
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
  LineChart,
  BarChart,
  PieChart,
  Heatmap,
  Timeline,
  FlowDiagram
} from '../../ui';

import { colors } from '../../design-system/tokens/colors';
import { radius } from '../../design-system/tokens/radius';
import { spacing } from '../../design-system/tokens/spacing';

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

  const isRtl = lang !== 'en';

  const labels: Record<string, Record<string, string>> = {
    pmo: {
      title: lang === 'en' ? "Prime Minister's Executive Briefing" : lang === 'ar' ? 'المستشارية التنفيذية لريادة الوزراء' : 'نوسینگەی ڕێنمایی و ستراتیژی سەرۆک وەزیران',
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

  // Custom data models for visualizations
  const pmoRevenueData = [
    { label: 'Umm Qasr', value: 240 },
    { label: 'Ibrahim Khalil', value: 310 },
    { label: 'Trebil', value: 180 },
    { label: 'Baghdad Airport', value: 120 },
    { label: 'Bashmahh', value: 95 }
  ];

  const checkpointFlowNodes = [
    { id: '1', label: lang === 'en' ? 'Manifest Decrypt' : 'فك التشفير', status: 'passed' as const },
    { id: '2', label: lang === 'en' ? 'CBI Asset Match' : 'طوابق البنك', status: 'passed' as const },
    { id: '3', label: lang === 'en' ? 'Gemini Risk Audit' : 'تدقيق المخاطر', status: 'active' as const },
    { id: '4', label: lang === 'en' ? 'Ledger Write' : 'سلسلة الكتل', status: 'pending' as const },
    { id: '5', label: lang === 'en' ? 'State Clearance' : 'تخليص الجمرك', status: 'pending' as const }
  ];

  const hourlyTrafficData = [
    { label: '03:00Z', value: 32 },
    { label: '06:00Z', value: 55 },
    { label: '09:00Z', value: 92 },
    { label: '12:00Z', value: 81 },
    { label: '15:00Z', value: 44 },
    { label: '18:00Z', value: 15 }
  ];

  const scanningHeatmapData = [
    { name: lang === 'en' ? 'Lane 01 Scanners' : 'مفرزة السونار ١', densities: [0.2, 0.4, 0.9, 0.8, 0.3, 0.1] },
    { name: lang === 'en' ? 'Lane 02 Decryptors' : 'مفرزة التشفير ٢', densities: [0.1, 0.2, 0.5, 0.9, 0.6, 0.2] }
  ];

  const customsClassifications = [
    { hs: '8471.3000', label: 'Portable Computers', declared: '$41,200', taxRate: '5%', status: '100% Match', node: 'DUHOK_GATE' },
    { hs: '8703.2300', label: 'Motor Passenger Car', declared: '$12,400 (Low Valuation)', taxRate: '15%', status: '62% Check', node: 'BASRA_SEAPORT' },
    { hs: '3004.9000', label: 'Medicinal formulation', declared: '$148,000', taxRate: '0% (MOH Health Accord)', status: '100% Match', node: 'BAGHDAD_AIR' }
  ];

  return (
    <Card 
      id="national-command-center-canvas" 
      className="p-5 lg:p-6 pb-8 lg:pb-10 overflow-visible text-slate-100 border border-[#E0A96D]/15" 
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* 4K Unified Header with PageHeader component */}
      <PageHeader
        title={lang === 'en' ? 'Sovereign National Command Center' : lang === 'ar' ? 'غرفة العمليات الوطنية السيادية الموحدة (IDG)' : 'ناوەندی فەرمانی نیشتمانیی سەروەر'}
        subtitle={lang === 'en' ? 'Operational command deck integrating border logistics telemetry pipelines, automated tax registers, and real-time cargo compliance audits.' :
                  lang === 'ar' ? 'نظام العمليات والتحكم المركزي الموحد للجمهورية لدمج سونار المنافذ والتدفقات المالية للبنك المركزي.' :
                  'سەکۆی فەرمی نیشتمانیی بۆ چاودێریکردنی جموجۆڵی دارایی گومرگ و دەروازە سنوورییەکان.'}
        badge={
          <Badge variant="gold">
            {lang === 'en' ? 'Supreme Council' : 'المجلس الأعلى'}
          </Badge>
        }
        actions={
          <div className="flex flex-wrap items-center gap-2 bg-[#0b1420] border border-slate-800 p-1.5 rounded-lg">
            <span className="text-[10px] font-mono text-slate-500 uppercase px-2 font-bold select-none">
              {lang === 'en' ? 'Cabinet Role Selection:' : 'اختيار دور السلطة:'}
            </span>
            {[
              { id: 'pmo', label: lang === 'en' ? 'PM Office' : 'رئيس الوزراء' },
              { id: 'ministries', label: lang === 'en' ? 'Ministries' : 'الوزارات' },
              { id: 'customs', label: lang === 'en' ? 'Customs' : 'الجمارك' },
              { id: 'border', label: lang === 'en' ? 'Border' : 'المنافذ' },
              { id: 'economic', label: lang === 'en' ? 'Economic' : 'الاقتصاد' }
            ].map((role) => (
              <button
                key={role.id}
                onClick={() => setActiveRole(role.id as any)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeRole === role.id 
                    ? 'bg-[#1a2c42] text-[#E0A96D] border border-[#E0A96D]/30 font-bold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {role.label}
              </button>
            ))}
          </div>
        }
      />

      {/* Access description banner in gold parameters */}
      <div 
        className="p-4 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 rtl:border-l-0 rtl:border-r-4 mt-6"
        style={{
          borderLeftColor: colors.accent.gold,
          borderRightColor: isRtl ? colors.accent.gold : undefined,
          background: 'rgba(26, 44, 66, 0.25)'
        }}
      >
        <div>
          <h3 className="font-semibold text-slate-100 flex items-center gap-2 text-xs uppercase font-mono">
            <Sparkles className="w-4 h-4 text-[#E0A96D]" />
            {labels[activeRole].title}
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-normal">
            {labels[activeRole].sub}
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-2 rounded font-mono text-[10px] text-slate-400 select-none">
          JWT_PASS: <span className="text-[#E0A96D] font-bold">{activeRole.toUpperCase()}_GOV_ROOT_SECURE</span>
        </div>
      </div>

      {/* Main Grid: Telemetry Content left (2 cols), Command parameters right (1 col) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        
        {/* Left Column Areas */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          
          {/* PMO Dashboard View */}
          {activeRole === 'pmo' && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StatCard
                  title={lang === 'en' ? 'Direct Customs Revenues Yield' : 'العوائد الجمركية المحققة'}
                  value="8.42T IQD"
                  subtitle="94.3% of 2026 targeted national customs intake"
                  icon={<Coins className="w-5 h-5 text-[#E0A96D]" />}
                  trend={{ value: '14.2%', isPositive: true }}
                />
                
                <StatCard
                  title={lang === 'en' ? 'State Interoperability Rating' : 'مؤشر التكامل الحكومي'}
                  value="99.94%"
                  subtitle="Secure redundant fiber link networks synced"
                  icon={<Shield className="w-5 h-5 text-cyan-400" />}
                  trend={{ value: '0.04%', isPositive: true }}
                />
              </div>

              {/* Data Visualization inside PMO dashboard */}
              <ChartContainer 
                title={lang === 'en' ? 'Revenue Intake by Customs Terminal ($ USD / Day)' : "إيرادات المنافذ والحدود"}
                subtitle="Calculated and locked on SHA-256 state ledgers"
              >
                {({ width, height }) => (
                  <BarChart data={pmoRevenueData} width={width} height={height} />
                )}
              </ChartContainer>

              {/* Cabinet Directives */}
              <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl flex flex-col gap-3.5">
                <SectionHeader title={lang === 'en' ? 'Cabinet Immediate Directives' : 'التوجيهات الفورية لمجلس الوزراء'} />
                
                <Alert
                  variant="success"
                  title={lang === 'en' ? 'Faw Seaport Digital Harbor Integration' : 'ربط ميناء الفاو الكبير رقمياً'}
                  description={lang === 'en' ? 'Automating Deep Basin dry container customs classifications with dual-use defense clearance loops.' : 'ربط وميكنة الفاو بري وبحري ضمن طريق التنمية بقرارات الجمارك الاتحادية.'}
                  icon={<Shield className="w-4 h-4" />}
                />
                
                <Alert
                  variant="warning"
                  title={lang === 'en' ? 'Ibrahim Khalil Joint Accord Transshipment' : 'منفذ إبراهيم الخليل المشترك'}
                  description={lang === 'en' ? 'Harmonizing Baghdad Custom tariffs on Turkish rail transits with bilingual Sorani/Arabic documents.' : 'توحيد تفتيش وجمارك المنفذ بين الإقليم والمركز بمستندات عربية وكوردية.'}
                  icon={<AlertTriangle className="w-4 h-4" />}
                />
              </div>
            </div>
          )}

          {/* Ministries View */}
          {activeRole === 'ministries' && (
            <div className="flex flex-col gap-6">
              {/* Aligned Key-Value Pairs MetricCard replaces manual tables */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricCard 
                  title={lang === 'en' ? 'Ministry of Defense' : 'وزارة الدفاع'}
                  icon={<Shield className="w-4 h-4" />}
                  metrics={[
                    { label: 'Dual-Use Items', value: 'Cleared', status: 'secure' },
                    { label: 'Joint Armed Forces', value: 'Sync Active', status: 'secure' },
                    { label: 'Chemical Precursors', value: 'Zero Holds', status: 'secure' }
                  ]}
                />
                <MetricCard 
                  title={lang === 'en' ? 'Ministry of Health' : 'وزارة الصحة'}
                  icon={<Activity className="w-4 h-4" />}
                  metrics={[
                    { label: 'Biomedical Quarantine', value: 'Cleared', status: 'secure' },
                    { label: 'Thermic Insulin', value: '11 Batches', status: 'info' },
                    { label: 'Certified Cartridges', value: 'Approved', status: 'secure' }
                  ]}
                />
                <MetricCard 
                  title={lang === 'en' ? 'Ministry of Agriculture' : 'وزارة الزراعة'}
                  icon={<Landmark className="w-4 h-4" />}
                  metrics={[
                    { label: 'Phytosanitary Accord', value: '1 Alert Hold', status: 'warning' },
                    { label: 'Non-GMO Cereals', value: 'Verified', status: 'secure' },
                    { label: 'Biological Cargo', value: 'Inspection Req', status: 'warning' }
                  ]}
                />
              </div>

              {/* COSQC Accords Table utilizing standardized Table component */}
              <div className="bg-[#111e2e] p-5 pb-8 overflow-visible rounded-xl border border-slate-800 flex flex-col gap-4">
                <SectionHeader 
                  title="Central Organization for Standardization and Quality Control" 
                  description="Pre-clearance compliance verification index matching ISO standards"
                />
                
                <Table headers={['Accord Stamp', 'Origin', 'Item Subclass', 'Compliance rating', 'Certificate Seal']}>
                  <tr>
                    <td className="px-4 py-3 text-[#E0A96D] font-bold">COSQC-STND-2026</td>
                    <td className="px-4 py-3">European Union</td>
                    <td className="px-4 py-3 font-sans font-semibold text-slate-300">Automotive Brake assembly</td>
                    <td className="px-4 py-3 text-[#52B788] font-bold">99.8% (Approved)</td>
                    <td className="px-4 py-3 font-mono text-slate-400">EU_ISO_CERT_889</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-[#E0A96D] font-bold">COSQC-AGRI-9981</td>
                    <td className="px-4 py-3">Regional Imports</td>
                    <td className="px-4 py-3 font-sans font-semibold text-slate-300">Grains / Bare seed stock</td>
                    <td className="px-4 py-3 text-[#52B788] font-bold">100.0% (Approved)</td>
                    <td className="px-4 py-3 font-mono text-slate-400">AGRI_STATE_SEAL</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-[#E0A96D] font-bold">COSQC-ELEC-4131</td>
                    <td className="px-4 py-3">East Asia Circ</td>
                    <td className="px-4 py-3 font-sans font-semibold text-slate-300">High-voltage relay grid core</td>
                    <td className="px-4 py-3 text-amber-500 font-bold">89.2% (Pending Hold)</td>
                    <td className="px-4 py-3 font-mono text-slate-500">LAB_MANUAL_DECISION</td>
                  </tr>
                </Table>
              </div>
            </div>
          )}

          {/* Customs Control View */}
          {activeRole === 'customs' && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#0b1420] border border-slate-800 p-4 rounded-xl text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Import Filings</span>
                  <span className="text-xl font-bold font-mono text-white mt-1 block">14,204</span>
                </div>
                <div className="bg-[#0b1420] border border-slate-800 p-4 rounded-xl text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">Tax Stream (Daily)</span>
                  <span className="text-xl font-bold font-mono text-[#E0A96D] mt-1 block">22.4B IQD</span>
                </div>
                <div className="bg-[#0b1420] border border-slate-800 p-4 rounded-xl text-center animate-pulse">
                  <span className="text-[10px] text-red-400 uppercase font-mono block">Risk Holds Count</span>
                  <span className="text-xl font-bold font-mono text-red-500 mt-1 block">342</span>
                </div>
                <div className="bg-[#0b1420] border border-slate-800 p-4 rounded-xl text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-mono block">HS Classifier Match</span>
                  <span className="text-xl font-bold font-mono text-cyan-400 mt-1 block">98.92%</span>
                </div>
              </div>

              {/* Live Classification using structured elements */}
              <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl flex flex-col gap-4">
                <SectionHeader title="Live Customs Classification Stream" description="Cross-referencing global tariff indexes dynamically" />
                
                <div className="flex flex-col gap-3 font-mono text-xs">
                  {customsClassifications.map((item, index) => (
                    <div 
                      key={index} 
                      className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
                    >
                      <div>
                        <span className="text-[#E0A96D] font-bold block text-xs">[HS: {item.hs}] - {item.label}</span>
                        <span className="text-[10px] text-slate-400 mt-1 block">Declared Value: {item.declared} • Tariff Rate: {item.taxRate}</span>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <Badge variant={item.status.includes('100%') ? 'success' : 'warning'}>
                          {item.status}
                        </Badge>
                        <span className="text-[10px] text-slate-500">{item.node} sync active</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Border View */}
          {activeRole === 'border' && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(thermalSensors).map(([port, temp]) => {
                  const tempNum = temp as number;
                  const isHot = tempNum > 40;
                  return (
                    <div key={port} className="bg-[#0b1420] border border-slate-800 p-4 rounded-xl flex flex-col justify-between gap-3 text-start">
                      <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                        <span className="text-white font-bold text-xs uppercase tracking-wider">{port} Crossing</span>
                        <Badge variant={isHot ? 'warning' : 'success'}>
                          {isHot ? 'High load' : 'Secure'}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 font-mono">
                        <p>X-Ray Scanner TEMP: <span className={isHot ? 'text-amber-400 font-bold' : 'text-[#52B788] font-bold'}>{tempNum}°C</span></p>
                        <p>Fiber Uplink speed: <span className="text-white font-bold">{fiberOpticsSpeed} Mbps</span></p>
                        <p>Generators FEED: <span className="text-[#52B788] font-bold">100% Stable</span></p>
                        <p>Local Standby DB: <span className="text-cyan-400 font-bold">Fully Synced</span></p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Scanner Grid Heatmap integration */}
              <ChartContainer title="Live Checkpoint Scanning Frequency Heatmap" subtitle="Density index indicating lane traffic frequency hourly">
                {({ width, height }) => (
                  <Heatmap 
                    rows={scanningHeatmapData} 
                    labels={['00-04Z', '04-08Z', '08-12Z', '12-16Z', '16-20Z', '20-00Z']} 
                    width={width} 
                    height={height} 
                  />
                )}
              </ChartContainer>
            </div>
          )}

          {/* Economic View */}
          {activeRole === 'economic' && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0b1420] border border-slate-800 p-4.5 rounded-xl text-start flex flex-col gap-2">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Foreign Exchange Match ratio</span>
                  <span className="text-2xl font-bold text-[#52B788] font-mono leading-none">98.15%</span>
                  <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                    Automated CBI audit stream validation comparing trade finance ledger transactions to custom manifests, preventing over-invoicing evasion.
                  </p>
                </div>

                <div className="bg-[#0b1420] border border-slate-800 p-4.5 rounded-xl text-start flex flex-col gap-2">
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Current Account Balance Projection</span>
                  <span className="text-2xl font-bold text-[#E0A96D] font-mono leading-none">+$9.18B USD</span>
                  <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                    Surplus projections from consolidated national border revenues, oil transfer receipts, and active industrial corridors.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl flex flex-col gap-3.5 text-start">
                <SectionHeader title="Active Economic Expansion Corridors" description="Scenario planning models for state development pipelines" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 bg-slate-950 rounded-lg border border-slate-850">
                    <span className="text-[#E0A96D] font-mono uppercase font-bold text-[11px] block">Gulf-Basra Corridor</span>
                    <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                      Sovereign transit path linking Faw seaport with Turkish mesh railways. Estimated to process 40M tons of commercial bulk loads yearly.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-950 rounded-lg border border-slate-850">
                    <span className="text-[#E0A96D] font-mono uppercase font-bold text-[11px] block">Levant Transit Corridor</span>
                    <p className="text-[11px] text-slate-404 mt-1.5 leading-relaxed">
                      Connecting western chemical and agricultural dry hubs to Mediterranean ports, bypassing traditional maritime congestions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Granular Active Checkpoint Detail Gauge Panel (Universal across Roles) */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-5 text-start">
            <div className="border-b border-slate-900 pb-2.5 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <div>
                <span className="text-[10px] text-[#E0A96D] uppercase font-mono tracking-widest font-bold block">
                  {selectedGate.region[lang]}
                </span>
                <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2 mt-1 font-display">
                  <span className="w-2 h-2 rounded-full bg-[#52B788] animate-pulse"></span>
                  {selectedGate.name[lang]} - Custom Node Metrics
                </h3>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">NODE RECONCILED ACCURACY</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-start font-mono">
              <div className="bg-[#0b1420] p-3 rounded.5 border border-slate-850">
                <span className="text-slate-500 text-[9px] uppercase block mb-1">Tax Audit Rate</span>
                <span className="text-xs font-bold text-cyan-400 block">Zero-Trust LOCK</span>
              </div>
              <div className="bg-[#0b1420] p-3 rounded.5 border border-slate-850">
                <span className="text-slate-500 text-[9px] uppercase block mb-1">Intake Today</span>
                <span className="text-xs font-bold text-[#E0A96D] block">{(selectedGate.revenueRaw * 1000).toLocaleString()} IQD</span>
              </div>
              <div className="bg-[#0b1420] p-3 rounded.5 border border-slate-850">
                <span className="text-slate-500 text-[9px] uppercase block mb-1">Trucks Processed</span>
                <span className="text-xs font-bold text-slate-200 block">{selectedGate.processedToday} manifests</span>
              </div>
              <div className="bg-[#0b1420] p-3 rounded.5 border border-slate-850">
                <span className="text-slate-500 text-[9px] uppercase block mb-1">Scanner Grade</span>
                <span className="text-xs font-semibold text-slate-400 uppercase block">{selectedGate.type}</span>
              </div>
            </div>

            {/* Micro-visualization showing hourly flow sequence */}
            <ChartContainer title={lang === 'en' ? 'Node Hourly Cargo Queue Speed' : 'توقعات تدفق بارهەڵگرەكان'} subtitle="Live predictive queue flow rate per hour">
              {({ width, height }) => (
                <LineChart data={hourlyTrafficData} width={width} height={height} />
              )}
            </ChartContainer>

            {/* Selector Nodes Grid */}
            <div className="bg-[#0b1420] p-4.5 rounded-xl border border-slate-850 flex flex-col gap-2.5">
              <span className="text-[10px] uppercase tracking-wider font-mono text-slate-500 block font-bold">Select Active Custom Node to Inspect:</span>
              <div className="flex flex-wrap gap-2.5">
                {CHECKPOINTS.map((checkpoint) => (
                  <button
                    key={checkpoint.id}
                    onClick={() => setSelectedGate(checkpoint)}
                    className={`px-3.5 py-2.5 rounded text-xs font-mono font-medium transition-all cursor-pointer ${
                      selectedGate.id === checkpoint.id
                        ? 'bg-[#1a2c42] border border-[#E0A96D]/45 text-[#E0A96D] font-bold shadow'
                        : 'bg-slate-900 border border-slate-850 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                  >
                    {checkpoint.name[lang]}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column / Sidebar Area */}
        <div className="flex flex-col gap-6">

          {/* Sequence Workflows in single visual language */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 shadow-xl flex flex-col gap-4 text-start">
            <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wider pb-2 border-b border-slate-900 flex justify-between items-center">
              <span className="flex items-center gap-2">
                <Layers className="text-[#E0A96D] w-4.5 h-4.5" />
                {lang === 'en' ? 'Sovereign Manifest Loop' : 'دورة المستندات السيادية'}
              </span>
            </h3>

            {/* Connected node sequence viz */}
            <div className="bg-[#0b1420] p-4 rounded-xl border border-slate-850 flex items-center justify-center min-h-[140px]">
              <FlowDiagram nodes={checkpointFlowNodes} width={280} height={110} />
            </div>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800/80 flex flex-col gap-4 shadow-xl text-start">
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider pb-2 border-b border-slate-900 flex justify-between items-center">
              <span className="flex items-center gap-2">
                <Network className="text-[#E0A96D] w-4.5 h-4.5" />
                {lang === 'en' ? 'Sovereign Operations Directory' : 'دليل العمليات الفيدرالي'}
              </span>
            </h3>

            <div className="flex flex-col gap-2.5 text-xs">
              {[
                { icon: <Shield className="w-4 h-4 text-[#52B788]" />, label: lang === 'en' ? 'Federal Customs Interop' : 'الربط الموحد', status: lang === 'en' ? 'Active' : 'نشط' },
                { icon: <Landmark className="w-4 h-4 text-[#E0A96D]" />, label: lang === 'en' ? 'Central Financial Ledger' : 'دفتر حساب البنك', status: lang === 'en' ? 'Synced' : 'متزامن' },
                { icon: <Activity className="w-4 h-4 text-cyan-400" />, label: lang === 'en' ? 'Anti-Fraud System' : 'مكافحة الاحتيال', status: lang === 'en' ? 'Secured' : 'مؤمن' },
                { icon: <FileText className="w-4 h-4 text-amber-550" />, label: lang === 'en' ? 'KRG Boundary Node' : 'منافذ الإقليم', status: lang === 'en' ? 'Verify' : 'تدقيق' }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3 bg-[#102235]/40 p-3.5 border border-slate-800/80 hover:border-[#E0A96D]/35 rounded-lg select-none transition-all cursor-pointer"
                >
                  {item.icon}
                  <span className="font-bold text-slate-200">{item.label}</span>
                  <div className="flex-grow"></div>
                  <Badge variant={item.status === 'Active' || item.status === 'Synced' || item.status === 'Secured' ? 'success' : 'slate'}>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* AI Advisor Panel */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800/80 flex flex-col gap-4 text-start">
            <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wider pb-2 border-b border-slate-900 flex justify-between items-center">
              <span className="flex items-center gap-1.5">
                <Cpu className="text-[#E0A96D] w-4 h-4" />
                Sovereign AI Decision Shield
              </span>
            </h3>

            <div className="flex flex-col gap-3.5 text-xs text-slate-300">
              <div className="bg-[#1a2c42]/20 border-l-3 border-[#52B788] p-3.5 rounded">
                <span className="text-[9px] text-[#E0A96D] font-mono font-bold block mb-1">CLASSIFICATION AUDITING (ACTIVE)</span>
                <span className="font-bold text-slate-200 block">Correct Barley HS mismatch from southerly sea cargo</span>
                <p className="text-[11px] text-slate-400 mt-1 lines-normal">
                  Importers declared tariff class [HS-1002] representing feed grain, but physical density scan maps [HS-1003]. Auto override recovers 28M IQD duties.
                </p>
                <div className="mt-3 flex justify-end">
                  <Button size="sm" variant="outline" className="text-[10px] uppercase font-bold py-1">
                    <Play className="w-3 h-3 text-[#52B788]" /> Apply Override
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Inter-agency Crisis panel */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4 text-start">
            <div className="border-b border-slate-900 pb-2.5">
              <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wider flex items-center gap-2">
                <AlertTriangle className="text-amber-500 w-4 h-4 animate-bounce" />
                Inter-Agency Crisis Intercepts
              </h3>
              <p className="text-[11px] text-slate-400 mt-1 leading-normal">Active border sensor alarms requiring manual sovereign cabinet interdictions.</p>
            </div>

            {unresolvedCrisisList.length === 0 ? (
              <div className="bg-emerald-950/20 border border-[#52B788]/20 p-4 rounded text-center text-xs">
                <p className="text-[#52B788] font-bold mb-1">✓ ALL INCIDENTS RESOLVED</p>
                <p className="text-[11px] text-slate-404 leading-relaxed">Regional border checkpoints are functioning securely under optimal clearance configurations.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {unresolvedCrisisList.map((crisis) => (
                  <div key={crisis.id} className="bg-slate-900 p-4 rounded-lg border border-slate-850 flex flex-col gap-3 text-xs text-slate-300">
                    <div className="flex justify-between items-center">
                      <Badge variant={crisis.severity === 'critical' ? 'danger' : 'warning'}>
                        {crisis.severity} • {crisis.timestamp}
                      </Badge>
                      <strong className="text-slate-500 font-mono text-[9px]">{crisis.id}</strong>
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-200">{crisis.type}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">{crisis.location}</p>
                      <p className="text-slate-300 leading-relaxed text-[11px] mt-2 bg-slate-950/80 p-2.5 border border-slate-850/40 rounded italic">
                        "{crisis.desc}"
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 pt-2 border-t border-slate-850/50">
                      <span className="text-[#E0A96D] font-mono uppercase text-[9px] font-bold">Mitigation target: {crisis.actionRequired}</span>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Provide audit override note ledger item..."
                          value={crisisResolutionNote[crisis.id] || ''}
                          onChange={(e) => setCrisisResolutionNote(prev => ({ ...prev, [crisis.id]: e.target.value }))}
                          className="flex-1 bg-[#0b1420] border border-slate-800 rounded px-2.5 py-1 text-slate-200 font-mono text-[10px] placeholder-slate-650 focus:outline-none focus:ring-1 focus:ring-[#E0A96D]"
                        />
                        <button
                          onClick={() => handleResolveCrisis(crisis.id, crisis.location)}
                          className="px-3 py-1 bg-[#E0A96D] hover:bg-[#E0A96D]/90 text-slate-950 font-bold rounded text-[10px] uppercase tracking-wide font-mono transition-all shrink-0 cursor-pointer"
                        >
                          Intercept
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </Card>
  );
}

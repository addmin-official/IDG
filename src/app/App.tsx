import { useState } from 'react';
import { 
  Shield, Activity, Database, Cpu, TrendingUp, Layers, Landmark, Network, Lock, Brain, Users, RefreshCw, Coins, Building2
} from 'lucide-react';
import { DICTIONARY } from '../mockData';
import EcosystemWorkflows from '../modules/workflow/EcosystemWorkflows';
import SovereignAIBrain from '../modules/ai/SovereignAIBrain';
import NationalCommandCenter from '../modules/command-center/NationalCommandCenter';
import SecurityCommandCenter from '../modules/security/SecurityCommandCenter';
import NationalDataCommandCenter from '../modules/data-fabric/NationalDataCommandCenter';
import NationalIdentityCommandCenter from '../modules/digital-identity/NationalIdentityCommandCenter';
import { useI18n } from '../providers/I18nProvider';

// Modular Tab Panels
import SovereignAtlasPanel from './components/SovereignAtlasPanel';
import CargoAuditorPanel from './components/CargoAuditorPanel';
import PolicyAdvisorPanel from './components/PolicyAdvisorPanel';
import EconomicCorridorsPanel from './components/EconomicCorridorsPanel';
import { SovereignFiscalSystem } from './components/ssos/SovereignFiscalSystem';
import NationalAssetAuthorityDashboard from './components/assets/NationalAssetAuthorityDashboard';
import BorderCommandCenter from './components/border/BorderCommandCenter';

// Isolated Hooks
import { useManifestAudit } from '../hooks/useManifestAudit';
import { usePolicyAdvisor } from '../hooks/usePolicyAdvisor';
import { useEconomicCorridor } from '../hooks/useEconomicCorridor';
import { useNationalTelemetry } from '../hooks/useNationalTelemetry';

// Government Provider
import { GovernmentProvider, useGovernment } from '../providers/GovernmentProvider';
import { GovernmentFederationProvider } from '../services/federation/GovernmentFederationProvider';
import { SsosProvider } from '../providers/SsosProvider';

function AppContent() {
  const { locale: lang, setLocale: setLang, t } = useI18n();
  const { 
    activeContext, 
    setActiveContext, 
    userRole, 
    setUserRole, 
    availableRoles, 
    auditTrail 
  } = useGovernment();

  const d = DICTIONARY[lang];
  const [activeTab, setActiveTab] = useState<string>('command-center');

  const {
    selectedPreset, customManifest, setCustomManifest, isAuditing, auditResult,
    customManifestViewModel, auditResultViewModel,
    handlePresetSelect, handleInitiateAudit
  } = useManifestAudit();

  const {
    chatInput, setChatInput, chatHistory, isChatLoading, handleSendChat
  } = usePolicyAdvisor(d.policyWelcome);

  const {
    selectedCorridor, setSelectedCorridor, policyLevel, setPolicyLevel,
    cbiSurveillance, setCbiSurveillance, isPredicting, predictionResult, handleTriggerForecast
  } = useEconomicCorridor();

  const { uptime } = useNationalTelemetry();

  return (
    <div className="min-h-screen bg-[#0D1B2A] text-slate-100 flex flex-col font-sans antialiased text-sm" dir={lang !== 'en' ? 'rtl' : 'ltr'}>
      
      {/* 1. TOP-SHELF SOVEREIGN ADMINISTRATIVE JURISDICTION SWITCHER */}
      <section id="idg-sovereign-switcher" className="bg-[#08101a] border-b border-[#cca553]/15 text-xs py-2 px-4 shadow-inner relative z-[60]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase font-bold">
              {lang === 'en' ? 'SOVEREIGN GATEWAY ADMINISTRATION CORE' : lang === 'ar' ? 'نظام إدارة البوابة السيادية' : 'سیستمی بەڕێوەبردنی دەروازەی سەروەری'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-[#101b2b] rounded-xl border border-slate-800 shadow">
            
            <button
              id="switch-fed-iraq"
              onClick={() => setActiveContext('FEDERAL_IRAQ')}
              className={`px-3 py-1.5 rounded-lg text-xs font-[700] transition-all flex items-center gap-1.5 cursor-pointer ${
                activeContext === 'FEDERAL_IRAQ'
                  ? 'bg-gradient-to-r from-teal-900 to-slate-900 text-teal-300 border border-teal-500/30 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Landmark className="w-3.5 h-3.5 shrink-0" />
              <span>{lang === 'en' ? 'Federal Iraq' : lang === 'ar' ? 'حكومة العراق الفيدرالية' : 'عێراقی فیدراڵ'}</span>
            </button>

            <button
              id="switch-krg"
              onClick={() => setActiveContext('KURDISTAN_REGION')}
              className={`px-3 py-1.5 rounded-lg text-xs font-[700] transition-all flex items-center gap-1.5 cursor-pointer ${
                activeContext === 'KURDISTAN_REGION'
                  ? 'bg-gradient-to-r from-emerald-950 to-slate-900 text-emerald-400 border border-emerald-500/30 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span>{lang === 'en' ? 'Kurdistan Region (KRG)' : lang === 'ar' ? 'إقليم كوردستان (KRG)' : 'هەرێمی کوردستان (KRG)'}</span>
            </button>

            <button
              id="switch-joint"
              onClick={() => setActiveContext('JOINT_OPERATIONS')}
              className={`px-3 py-1.5 rounded-lg text-xs font-[700] transition-all flex items-center gap-1.5 cursor-pointer ${
                activeContext === 'JOINT_OPERATIONS'
                  ? 'bg-gradient-to-r from-amber-950 to-slate-900 text-[#E0A96D] border border-amber-500/30 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Network className="w-3.5 h-3.5 shrink-0" />
              <span>{lang === 'en' ? 'Joint Operations' : lang === 'ar' ? 'العمليات المشتركة' : 'ئۆپەراسیۆنە هاوبەشەکان'}</span>
            </button>

          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-500 uppercase font-mono tracking-wider font-semibold">
              {lang === 'en' ? 'ROLE' : lang === 'ar' ? 'الدور الناشط' : 'ڕۆڵی چالاک'}:
            </span>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="bg-slate-900 text-[#E0A96D] border border-slate-800 text-[11px] rounded-lg px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-[#cca553] font-semibold"
            >
              {availableRoles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

        </div>
      </section>

      <header id="idg-main-header" className="bg-[#111e2e] border-b border-[#E0A96D]/30 shadow-lg px-4 py-3.5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="bg-[#E0A96D]/10 p-2 rounded-lg border border-[#E0A96D]/45 flex items-center justify-center hover:scale-[1.02] transition-transform duration-200">
              <Shield className="w-8 h-8 text-[#E0A96D]" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-start">
                <h1 className="text-xl font-display font-bold tracking-wider text-white uppercase">{d.title}</h1>
                
                {/* DYNAMIC JURISDICTION BADGES */}
                {activeContext === 'FEDERAL_IRAQ' && (
                  <span className="text-xs bg-teal-950/90 text-teal-400 border border-teal-500/30 px-2 py-0.5 rounded font-mono uppercase tracking-widest flex items-center gap-1 font-extrabold shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                    {lang === 'en' ? 'FEDERAL JURISDICTION' : lang === 'ar' ? 'الولاية الاتحادية' : 'دەسەڵاتی فیدراڵ'}
                  </span>
                )}
                {activeContext === 'KURDISTAN_REGION' && (
                  <span className="text-xs bg-emerald-950/90 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono uppercase tracking-widest flex items-center gap-1 font-extrabold shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    {lang === 'en' ? 'KRG JURISDICTION' : lang === 'ar' ? 'ولاية الإقليم' : 'دەسەڵاتی هەرێم'}
                  </span>
                )}
                {activeContext === 'JOINT_OPERATIONS' && (
                  <span className="text-xs bg-amber-950/90 text-amber-500 border border-amber-500/30 px-2 py-0.5 rounded font-mono uppercase tracking-widest flex items-center gap-1 font-extrabold shadow-sm animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    {lang === 'en' ? 'JOINT OPERATIONS' : lang === 'ar' ? 'العمليات المشتركة' : 'ئۆپەراسیۆنی هاوبەش'}
                  </span>
                )}

              </div>
              <p className="text-xs text-[#E0A96D] font-mono tracking-widest mt-0.5 font-medium text-start">{d.subtitle}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="hidden lg:flex flex-col text-start md:text-right border-[#E0A96D]/20 pr-4 ltr:border-r rtl:border-l pl-4">
              <span className="text-slate-400 text-[10px] uppercase font-mono tracking-wider">{d.location}</span>
              <span className="text-[#E0A96D] font-semibold">{userRole}</span>
            </div>
            
            <div className="flex items-center bg-[#101b2b] p-1 rounded-xl border border-slate-800 shadow-inner gap-1">
              <button
                id="lang-selector-ku"
                onClick={() => setLang('ku')}
                className={`px-3 py-1.5 rounded-lg text-xs font-[700] transition-all cursor-pointer ${
                  lang === 'ku'
                    ? 'bg-gradient-to-r from-emerald-950 to-slate-900 text-emerald-400 border border-emerald-500/30 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                کوردی
              </button>
              <button
                id="lang-selector-ar"
                onClick={() => setLang('ar')}
                className={`px-3 py-1.5 rounded-lg text-xs font-[700] transition-all cursor-pointer ${
                  lang === 'ar'
                    ? 'bg-gradient-to-r from-teal-900 to-slate-900 text-teal-300 border border-teal-500/30 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                العربية
              </button>
              <button
                id="lang-selector-en"
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 rounded-lg text-xs font-[700] transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-amber-950 text-[#E0A96D] border border-amber-500/30 font-bold shadow'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>

      <nav id="idg-navigation" className="bg-[#122237] border-b border-slate-800 py-1.5 px-4 shadow">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2">
          {[
            { id: 'command-center', label: activeContext === 'FEDERAL_IRAQ' ? (lang === 'en' ? 'Federal PM Command' : lang === 'ar' ? 'قيادة رئيس الوزراء الاتحادي' : 'فەرماندەیی سەرۆک وەزیرانی فیدراڵ') : activeContext === 'KURDISTAN_REGION' ? (lang === 'en' ? 'KRG PM Command' : lang === 'ar' ? 'قيادة رئيس وزراء الإقليم' : 'فەرماندەیی سەرۆک وەزیرانی هەرێم') : (lang === 'en' ? 'Joint Command Room' : lang === 'ar' ? 'غرفة القيادة المشتركة' : 'ژووری فەرماندەیی هاوبەش'), icon: Landmark },
            { id: 'border-ops', label: lang === 'en' ? 'Sovereign Border Hub' : lang === 'ar' ? 'السيطرة على الحدود' : 'دەروازە سنوورییەکان', icon: Shield },
            { id: 'blueprints', label: t(lang, 'navigation.blueprints'), icon: Layers },
            { id: 'state-assets', label: lang === 'en' ? 'State Asset Authority' : lang === 'ar' ? 'سلطة ممتلكات الدولة' : 'رێکخراوی سامانی دەوڵەت', icon: Building2 },
            { id: 'sovereign-fiscal', label: lang === 'en' ? 'Sovereign Fiscal Registry' : lang === 'ar' ? 'الخزينة والمالية السيادية' : 'گەنجینە و دارایی نیشتمانی', icon: Coins },
            { id: 'ai-auditor', label: t(lang, 'navigation.analyzer'), icon: Cpu },
            { id: 'policy-advisor', label: t(lang, 'navigation.advisor'), icon: Landmark },
            { id: 'economic-corridors', label: t(lang, 'navigation.intelligence'), icon: TrendingUp },
            { id: 'ecosystem', label: t(lang, 'navigation.ecosystem'), icon: Network },
            { id: 'ai-brain', label: t(lang, 'navigation.aiBrain'), icon: Brain },
            { id: 'security', label: t(lang, 'navigation.security'), icon: Lock },
            { id: 'data-fabric', label: activeContext === 'FEDERAL_IRAQ' ? (lang === 'en' ? 'Federal Data Fabric' : lang === 'ar' ? 'نسيج البيانات الفيدرالي' : 'بونیادی داتای فیدراڵ') : activeContext === 'KURDISTAN_REGION' ? (lang === 'en' ? 'KRG Data Fabric' : lang === 'ar' ? 'نسيج بيانات الإقليم' : 'بونیادی داتای هەرێم') : (lang === 'en' ? 'Federated Hub' : lang === 'ar' ? 'مركز البيانات الاتحادي المشترك' : 'سەنتەری داتای هاوبەش'), icon: Database },
            { id: 'sovereign-trust', label: activeContext === 'FEDERAL_IRAQ' ? (lang === 'en' ? 'Federal Identity' : lang === 'ar' ? 'الهوية الفيدرالية' : 'ناسنامەی فیدراڵ') : activeContext === 'KURDISTAN_REGION' ? (lang === 'en' ? 'KRG Identity Authority' : lang === 'ar' ? 'سلطة هويات الإقليم' : 'دەسەڵاتی ناسنامەی هەرێم') : (lang === 'en' ? 'Federated Crypt' : lang === 'ar' ? 'التشفير الفيدرالي المشترك' : 'کلیلە هاوبەشەکان'), icon: Shield }
          ].map((tab) => (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded transition-all flex items-center gap-1.5 text-xs cursor-pointer ${
                activeTab === tab.id 
                  ? 'bg-[#1a2c42] text-white border-l-2 border-[#cca553] shadow-md font-[800]' 
                  : 'text-slate-400 hover:text-slate-200 font-[700]'
              }`}
            >
              <tab.icon className="w-3.5 h-3.5 text-[#cca553]" />
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <section id="idg-metrics-ticker" className="bg-[#0b1420] border-b border-slate-800/60 py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="flex items-center gap-1.5 bg-[#102235]/40 px-2.5 py-0.5 rounded border border-slate-800 text-[11px] whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-400 font-mono">
                {lang === 'en' ? 'CONTEXT' : lang === 'ar' ? 'السياق' : 'بوار'}: <b className="text-emerald-400">{activeContext === 'FEDERAL_IRAQ' ? (lang === 'en' ? 'FEDERAL' : lang === 'ar' ? 'اتحادي' : 'فیدراڵ') : activeContext === 'KURDISTAN_REGION' ? (lang === 'en' ? 'KRG' : lang === 'ar' ? 'الإقليم' : 'هەرێم') : (lang === 'en' ? 'JOINT' : lang === 'ar' ? 'مشترك' : 'هاوبەش')}</b>
              </span>
            </span>
            <span className="flex items-center gap-1.5 bg-[#102235]/40 px-2.5 py-0.5 rounded border border-slate-800 text-[11px] whitespace-nowrap">
              <Database className="w-3 h-3 text-[#E0A96D]" />
              <span className="text-slate-400 font-mono">
                {lang === 'en' ? 'STORAGE' : lang === 'ar' ? 'التخزين' : 'کۆگا'}: <b className="text-slate-200">{activeContext === 'FEDERAL_IRAQ' ? (lang === 'en' ? 'BAGHDAD_SECURE_NODE' : 'عقدة_بغداد_الآمنة') : activeContext === 'KURDISTAN_REGION' ? (lang === 'en' ? 'ERBIL_CLUSTER_DB' : 'عنقود_أربيل_لقواعد_البيانات') : (lang === 'en' ? 'FEDERATED_REPLICATED_RING' : 'الحلقة_الاتحادية_المكررة')}</b>
              </span>
            </span>
            <span className="flex items-center gap-1.5 bg-[#102235]/40 px-2.5 py-0.5 rounded border border-slate-800 text-[11px] whitespace-nowrap">
              <Shield className="w-3 h-3 text-slate-400" />
              <span className="text-slate-400 font-mono">
                {lang === 'en' ? 'UPTIME' : lang === 'ar' ? 'وقت التشغيل' : 'کاتی کارکردن'}: <b className="text-[#E0A96D]">{uptime}%</b>
              </span>
            </span>
          </div>
          <span className="text-[#E0A96D] font-bold text-[11px] uppercase font-mono text-center sm:text-end whitespace-nowrap">
            {activeContext === 'FEDERAL_IRAQ' 
              ? (lang === 'en' ? 'FEDERAL SOVEREIGN SECURED' : lang === 'ar' ? 'الأمن السيادي الاتحادي مؤمن' : 'دەسەڵاتی سەروەریی فیدراڵ پارێزراوە') 
              : activeContext === 'KURDISTAN_REGION' 
                ? (lang === 'en' ? 'KRG REGIONAL AUTHORITY INTEGRAL' : lang === 'ar' ? 'سلطة إقليم كوردستان كاملة الأهلية' : 'بارودۆخی دەسەڵاتی هەرێم تەواوە') 
                : (lang === 'en' ? 'INTER-FEDERATED INTEROPERABILITY NODE ACTIVE' : lang === 'ar' ? 'منفذ التشغيل البيني الفيدرالي نشط' : 'گرێی هاوبەشی فیدراڵی چالاکە')
            }
          </span>
        </div>
      </section>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 flex flex-col gap-6">
        {activeTab === 'command-center' && <NationalCommandCenter lang={lang} />}
        {activeTab === 'border-ops' && <BorderCommandCenter lang={lang} />}
        {activeTab === 'blueprints' && <SovereignAtlasPanel lang={lang} />}
        {activeTab === 'ai-auditor' && (
          <CargoAuditorPanel
            lang={lang} d={d} selectedPreset={selectedPreset} customManifest={customManifest}
            setCustomManifest={setCustomManifest} isAuditing={isAuditing} auditResult={auditResult}
            customManifestViewModel={customManifestViewModel} auditResultViewModel={auditResultViewModel}
            handlePresetSelect={handlePresetSelect} handleInitiateAudit={handleInitiateAudit}
          />
        )}
        {activeTab === 'policy-advisor' && (
          <PolicyAdvisorPanel
            lang={lang} d={d} chatInput={chatInput} setChatInput={setChatInput}
            chatHistory={chatHistory} isChatLoading={isChatLoading} handleSendChat={handleSendChat}
          />
        )}
        {activeTab === 'economic-corridors' && (
          <EconomicCorridorsPanel
            lang={lang} d={d} selectedCorridor={selectedCorridor} setSelectedCorridor={setSelectedCorridor}
            policyLevel={policyLevel} setPolicyLevel={setPolicyLevel} cbiSurveillance={cbiSurveillance}
            setCbiSurveillance={setCbiSurveillance} isPredicting={isPredicting} predictionResult={predictionResult}
            handleTriggerForecast={handleTriggerForecast}
          />
        )}
        {activeTab === 'ecosystem' && <EcosystemWorkflows lang={lang} />}
        {activeTab === 'ai-brain' && <SovereignAIBrain lang={lang} />}
        {activeTab === 'security' && <SecurityCommandCenter lang={lang} />}
        {activeTab === 'data-fabric' && <NationalDataCommandCenter lang={lang} />}
        {activeTab === 'sovereign-trust' && <NationalIdentityCommandCenter lang={lang} />}
        {activeTab === 'sovereign-fiscal' && <SovereignFiscalSystem lang={lang} />}
        {activeTab === 'state-assets' && <NationalAssetAuthorityDashboard lang={lang} />}
      </main>

      <footer className="bg-[#0a111a] border-t border-slate-800/80 py-4 mt-10 text-slate-400 text-xs text-start w-full">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#cca553] shrink-0" />
            <div className="min-w-0">
              <p className="text-slate-300 font-semibold font-mono uppercase text-xs break-words">
                {lang === 'en' ? 'IRAQ DIGITAL GATEWAY (IDG) • DUAL-ENGINE SOVEREIGN ADMINISTRATION' : lang === 'ar' ? 'البوابة الرقمية العراقية (IDG) • الإدارة السيادية ثنائية المحرك' : 'دەروازەی دیجیتاڵیی عێراق (IDG) • کارگێڕیی سەروەریی دوو بزوێنەر'}
              </p>
              <p className="text-[10px] text-slate-500 break-words mt-0.5 whitespace-normal">
                {lang === 'en' ? 'Council of Ministers Unified Custom Interoperability Infrastructure & Kurdistan Regional Government Executive Office Handshake' : lang === 'ar' ? 'البنية التحتية الجمركية الموحدة لمجلس الوزراء ومصادقة المكتب التنفيذي لحكومة إقليم كوردستان' : 'ژێرخانی جیاوازی یەکگرتووی ئەنجومەنی وەزیران و هەماهەنگیی نووسینگەی جێبەجێکاری حکومەتی هەرێمی کوردستان'}
              </p>
            </div>
          </div>
          <div className="flex gap-4 text-slate-500 font-mono text-[10px] shrink-0">
            <span>{lang === 'en' ? 'Baghdad Central • Erbil Regional • Umm Qasr Route' : lang === 'ar' ? 'بغداد المركزية • أربيل الإقليمية • مسار أم قصر' : 'بەغدادی ناوەندی • هەولێری هەرێمی • ڕێڕەوی ئوم قەسر'}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const { locale } = useI18n();
  return (
    <GovernmentProvider lang={locale}>
      <GovernmentFederationProvider>
        <SsosProvider lang={locale}>
          <AppContent />
        </SsosProvider>
      </GovernmentFederationProvider>
    </GovernmentProvider>
  );
}

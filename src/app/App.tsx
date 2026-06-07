import { useState } from 'react';
import { 
  Shield, Activity, Database, Cpu, TrendingUp, Layers, Landmark, Network, Lock, Brain
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

// Isolated Hooks
import { useManifestAudit } from '../hooks/useManifestAudit';
import { usePolicyAdvisor } from '../hooks/usePolicyAdvisor';
import { useEconomicCorridor } from '../hooks/useEconomicCorridor';
import { useNationalTelemetry } from '../hooks/useNationalTelemetry';

export default function App() {
  const { locale: lang, setLocale: setLang, t } = useI18n();
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
      <header id="idg-main-header" className="bg-[#111e2e] border-b border-[#E0A96D]/30 shadow-lg px-4 py-3.5 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="bg-[#E0A96D]/10 p-2 rounded-lg border border-[#E0A96D]/45 flex items-center justify-center hover:scale-[1.02] transition-transform duration-200">
              <Shield className="w-8 h-8 text-[#E0A96D]" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-start">
                <h1 className="text-xl font-display font-bold tracking-wider text-white uppercase">{d.title}</h1>
                <span className="text-xs bg-emerald-950/90 text-[#52B788] border border-emerald-500/30 px-2 py-0.5 rounded font-mono uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52B788] animate-pulse"></span> Sovereign Live
                </span>
              </div>
              <p className="text-xs text-[#E0A96D] font-mono tracking-widest mt-0.5 font-medium text-start">{d.subtitle}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="hidden lg:flex flex-col text-start md:text-right border-[#E0A96D]/20 pr-4 ltr:border-r rtl:border-l pl-4">
              <span className="text-slate-400 text-[10px] uppercase font-mono tracking-wider">{d.location}</span>
              <span className="text-[#E0A96D] font-semibold">{d.securityAccess}</span>
            </div>
            <div className="flex items-center bg-[#1a2c42] p-1 rounded-md border border-slate-700 shadow-lg" dir="ltr">
              <button id="lang-btn-en" onClick={() => setLang('en')} className={`cursor-pointer px-2.5 py-1 rounded text-xs font-[700] hover:text-white transition-colors duration-200 ${lang === 'en' ? 'bg-[#E0A96D] text-[#0D1B2A]' : 'text-slate-300'}`}>{t(lang, 'languages.en')}</button>
              <button id="lang-btn-ar" onClick={() => setLang('ar')} className={`cursor-pointer px-2.5 py-1 rounded text-xs font-[700] hover:text-white transition-colors duration-200 ${lang === 'ar' ? 'bg-[#E0A96D] text-[#0D1B2A]' : 'text-slate-300'}`}>{t(lang, 'languages.ar')}</button>
              <button id="lang-btn-ku" onClick={() => setLang('ku')} className={`cursor-pointer px-2.5 py-1 rounded text-xs font-[700] hover:text-white transition-colors duration-200 ${lang === 'ku' ? 'bg-[#E0A96D] text-[#0D1B2A]' : 'text-slate-300'}`}>{t(lang, 'languages.ku')}</button>
            </div>
          </div>
        </div>
      </header>

      <nav id="idg-navigation" className="bg-[#122237] border-b border-slate-800 py-1.5 px-4 shadow">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-2">
          {[
            { id: 'command-center', label: t(lang, 'navigation.dashboard'), icon: Activity },
            { id: 'blueprints', label: t(lang, 'navigation.blueprints'), icon: Layers },
            { id: 'ai-auditor', label: t(lang, 'navigation.analyzer'), icon: Cpu },
            { id: 'policy-advisor', label: t(lang, 'navigation.advisor'), icon: Landmark },
            { id: 'economic-corridors', label: t(lang, 'navigation.intelligence'), icon: TrendingUp },
            { id: 'ecosystem', label: t(lang, 'navigation.ecosystem'), icon: Network },
            { id: 'ai-brain', label: t(lang, 'navigation.aiBrain'), icon: Brain },
            { id: 'security', label: t(lang, 'navigation.security'), icon: Lock },
            { id: 'data-fabric', label: t(lang, 'navigation.dataFabric'), icon: Database },
            { id: 'sovereign-trust', label: t(lang, 'navigation.sovereignTrust'), icon: Shield }
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
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="flex items-center gap-1.5 bg-[#102235]/40 px-2.5 py-0.5 rounded border border-slate-800 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-400 font-mono">SYNC: <b className="text-emerald-400">100% SECURE</b></span>
            </span>
            <span className="flex items-center gap-1.5 bg-[#102235]/40 px-2.5 py-0.5 rounded border border-slate-800 text-[11px]">
              <Database className="w-3 h-3 text-[#E0A96D]" />
              <span className="text-slate-400 font-mono">BLOCKS: <b className="text-slate-200">#10,453</b></span>
            </span>
            <span className="flex items-center gap-1.5 bg-[#102235]/40 px-2.5 py-0.5 rounded border border-slate-800 text-[11px]">
              <Shield className="w-3 h-3 text-slate-400" />
              <span className="text-slate-400 font-mono">UPTIME: <b className="text-[#E0A96D]">{uptime}%</b></span>
            </span>
          </div>
          <span className="text-[#E0A96D] font-bold text-[11px] uppercase font-mono">{d.customStatus}</span>
        </div>
      </section>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 flex flex-col gap-6">
        {activeTab === 'command-center' && <NationalCommandCenter lang={lang} />}
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
      </main>

      <footer className="bg-[#0a111a] border-t border-slate-800/80 py-4 mt-10 text-slate-400 text-xs text-start">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#cca553]" />
            <div>
              <p className="text-slate-300 font-semibold font-mono">IRAQ DIGITAL GATEWAY (IDG) • SOVEREIGN NATIONAL SECURITY STREAMS</p>
              <p className="text-[10px] text-slate-500">Council of Ministers Unified Custom Interoperability Infrastructure</p>
            </div>
          </div>
          <div className="flex gap-4 text-slate-500 font-mono text-[10px]">
            <span>Baghdad Central • Erbil Regional • Umm Qasr Route</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

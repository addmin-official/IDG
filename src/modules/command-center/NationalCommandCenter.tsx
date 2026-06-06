import React from 'react';
import { 
  Shield, Landmark, Activity, Network, Layers, BadgeAlert, FileText, Cpu, AlertTriangle, Play 
} from 'lucide-react';
import { Language } from '../../types';

// Standardized UI wrappers
import { Card, Badge, PageHeader, FlowDiagram, Button } from '../../ui';

// National Command Center Refactored Core Elements
import { useNationalCommandCenter } from './hooks/useNationalCommandCenter';
import { t } from './localization/ccTranslations';
import { RoleSelectorPanel } from './components/RoleSelectorPanel';
import { GatesMonitorPanel } from './components/GatesMonitorPanel';
import { CrisisControlPanel } from './components/CrisisControlPanel';
import { VisualAnalyticsPanel } from './components/VisualAnalyticsPanel';

interface NationalCommandCenterProps {
  lang: Language;
}

export default function NationalCommandCenter({ lang }: NationalCommandCenterProps) {
  const model = useNationalCommandCenter(lang);
  const isRtl = lang !== 'en';

  const getLabel = (en: string, ar: string, ku: string) => {
    if (lang === 'en') return en;
    if (lang === 'ar') return ar;
    return ku;
  };

  const translateGateType = (type: string) => {
    if (type === 'land') return lang === 'en' ? 'land border' : lang === 'ar' ? 'منفذ بري' : 'سنووری وشکانی';
    if (type === 'sea') return lang === 'en' ? 'seaport deep' : lang === 'ar' ? 'منفذ بحري' : 'سنووری دەریایی';
    if (type === 'air') return lang === 'en' ? 'airport cargo' : lang === 'ar' ? 'شحن جوي' : 'بارهەڵگری ئاسمانی';
    return type;
  };

  return (
    <Card 
      id="national-command-center-canvas" 
      className="p-5 lg:p-6 pb-8 lg:pb-10 overflow-visible text-slate-100 border border-[#E0A96D]/15 text-start" 
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* 4K Unified Header with PageHeader component */}
      <PageHeader
        title={t(lang, 'header.title')}
        subtitle={t(lang, 'header.subtitle')}
        badge={
          <Badge variant="gold">
            {t(lang, 'header.badge')}
          </Badge>
        }
        actions={
          <div className="flex flex-wrap items-center gap-2 bg-[#0b1420] border border-slate-800 p-1.5 rounded-lg text-start">
            <span className="text-[10px] font-mono text-slate-500 uppercase px-2 font-bold select-none text-start">
              {t(lang, 'header.roleSelectionLabel')}
            </span>
            {[
              { id: 'pmo', label: t(lang, 'header.pmo') },
              { id: 'ministries', label: t(lang, 'header.ministries') },
              { id: 'customs', label: t(lang, 'header.customs') },
              { id: 'border', label: t(lang, 'header.border') },
              { id: 'economic', label: t(lang, 'header.economic') }
            ].map((role) => (
              <button
                key={role.id}
                onClick={() => model.setActiveRole(role.id as any)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                  model.activeRole === role.id 
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
      <RoleSelectorPanel
        lang={lang}
        activeRole={model.activeRole}
        setActiveRole={model.setActiveRole}
      />

      {/* Main Grid: Telemetry Content left (2 cols), Command parameters right (1 col) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6 text-start">
        
        {/* Left Column Areas */}
        <div className="xl:col-span-2 flex flex-col gap-6 text-start">
          
          {/* Active stats, lists, lines depending on Cabin Role selection */}
          <VisualAnalyticsPanel 
            lang={lang}
            activeRole={model.activeRole}
            pmoRevenueData={model.pmoRevenueData}
            customsClassifications={model.customsClassifications}
          />

          {/* Real-time Border thermal and metrics (When Role is set to Border Security) */}
          {model.activeRole === 'border' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-start">
              {Object.entries(model.thermalSensors).map(([port, temp]) => {
                const tempNum = temp as number;
                const isHot = tempNum > 40;
                return (
                  <div key={port} className="bg-[#0b1420] border border-slate-800 p-4 rounded-xl flex flex-col justify-between gap-3 text-start">
                    <div className="flex justify-between items-center border-b border-slate-900 pb-2 w-full">
                      <span className="white font-bold text-xs uppercase tracking-wider">{port} Crossing</span>
                      <Badge variant={isHot ? 'warning' : 'success'}>
                        {isHot ? 'High load' : 'Secure'}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-404 font-mono">
                      <p>X-Ray Scanner TEMP: <span className={isHot ? 'text-amber-400 font-bold' : 'text-[#52B788] font-bold'}>{tempNum}°C</span></p>
                      <p>Fiber Uplink speed: <span className="text-white font-bold">{model.fiberOpticsSpeed} Mbps</span></p>
                      <p>Generators FEED: <span className="text-[#52B788] font-bold">100% Stable</span></p>
                      <p>Local Standby DB: <span className="text-cyan-400 font-bold">Fully Synced</span></p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Granular Active Checkpoint Detail Gauge Panel (Universal across Roles) */}
          <GatesMonitorPanel 
            lang={lang}
            selectedGate={model.selectedGate}
            setSelectedGate={model.setSelectedGate}
            hourlyTrafficData={model.hourlyTrafficData}
          />

        </div>

        {/* Right Column / Sidebar Area */}
        <div className="flex flex-col gap-6 text-start">

          {/* Sequence Workflows in single visual language */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 shadow-xl flex flex-col gap-4 text-start">
            <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wider pb-2 border-b border-slate-900 flex justify-between items-center w-full">
              <span className="flex items-center gap-2">
                <Layers className="text-[#E0A96D] w-4.5 h-4.5 shrink-0" />
                {t(lang, 'sidebar.loopTitle')}
              </span>
            </h3>

            {/* Connected node sequence viz */}
            <div className="bg-[#0b1420] p-4 rounded-xl border border-slate-800 flex items-center justify-center min-h-[140px] w-full">
              <FlowDiagram nodes={model.checkpointFlowNodes} width={280} height={110} />
            </div>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4 shadow-xl text-start">
            <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider pb-2 border-b border-slate-900 flex justify-between items-center w-full">
              <span className="flex items-center gap-2">
                <Network className="text-[#E0A96D] w-4.5 h-4.5 shrink-0" />
                {t(lang, 'sidebar.directoryTitle')}
              </span>
            </h3>

            <div className="flex flex-col gap-2.5 text-xs text-start">
              {[
                { icon: <Shield className="w-4 h-4 text-[#52B788]" />, label: getLabel('Federal Customs Interop', 'الربط الموحد', 'یەکگرتنی گومرگی فیدراڵ'), status: getLabel('Active', 'نشط', 'چالاک') },
                { icon: <Landmark className="w-4 h-4 text-[#E0A96D]" />, label: getLabel('Central Financial Ledger', 'دفتر حساب البنك', 'دەفتەری سەرەکی دارایی'), status: getLabel('Synced', 'متزامن', 'هاوکاتکراو') },
                { icon: <Activity className="w-4 h-4 text-cyan-400" />, label: getLabel('Anti-Fraud System', 'مكافحة الاحتيال', 'سیستەمی دژە ساختەکاری'), status: getLabel('Secured', 'مؤمن', 'پارێزراو') },
                { icon: <FileText className="w-4 h-4 text-slate-500" />, label: getLabel('KRG Boundary Node', 'منافذ الإقليم', 'گرێی سنووری هەرێم'), status: getLabel('Verify', 'تدقيق', 'پشکنین') }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-3 bg-[#102235]/40 p-3.5 border border-slate-800 hover:border-[#E0A96D]/35 rounded-lg select-none transition-all cursor-pointer w-full text-start"
                >
                  {item.icon}
                  <span className="font-bold text-slate-205">{item.label}</span>
                  <div className="flex-grow"></div>
                  <Badge variant={item.status === 'Active' || item.status === 'Synced' || item.status === 'Secured' || item.status === 'چالاک' || item.status === 'هاوکاتکراو' || item.status === 'پارێزراو' ? 'success' : 'slate'}>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* AI Advisor Panel */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 flex flex-col gap-4 text-start shadow-xl">
            <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-wider pb-2 border-b border-slate-900 flex justify-between items-center w-full">
              <span className="flex items-center gap-1.5">
                <Cpu className="text-[#E0A96D] w-4 h-4 shrink-0" />
                {t(lang, 'sidebar.advisorTitle')}
              </span>
            </h3>

            <div className="flex flex-col gap-3.5 text-xs text-slate-300 text-start">
              <div className="bg-[#1a2c42]/20 border-l-3 border-[#52B788] p-3.5 rounded text-start">
                <span className="text-[9px] text-[#E0A96D] font-mono font-bold block mb-1 text-start">
                  {lang === 'en' ? 'CLASSIFICATION AUDITING (ACTIVE)' : lang === 'ar' ? 'تدقيق التصنيف (نشط)' : 'پشکنینی پۆلێنکردن (چالاک)'}
                </span>
                <span className="font-bold text-slate-200 block text-start">
                  {lang === 'en' ? 'Correct Barley HS mismatch from southerly sea cargo' : lang === 'ar' ? 'تصحيح عدم تطابق رمز النظام المنسق للشعير' : 'چاککردنەوەی هەڵەی کۆدی HS جۆ لە باری دەریایی باشوور'}
                </span>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal text-start">
                  {lang === 'en' ? 'Importers declared tariff class [HS-1002] representing feed grain, but physical density scan maps [HS-1003]. Auto override recovers 28M IQD duties.' :
                   lang === 'ar' ? 'صرح المستوردون بفئة التعرفة [HS-1002] التي تمثل علف الحبوب، لكن فحص الكثافة الفعلي أظهر [HS-1003]. تجاوز تلقائي يسترد 28 مليون دينار عراقي.' :
                   'هاوردەکاران پۆلی باجی [HS-1002] ی ئاژەڵیی خواردەمەنییان تۆمار کردووە بەڵام پشکنینی فیزیکی کۆدی ڕاستەقینەی [HS-1003] پیشان دەدات. چاکسازیی خۆکارانە ٢٨ ملیۆن دیناری باجی لەدەستچوو وەردەگرێتەوە.'}
                </p>
                <div className="mt-3 flex justify-end">
                  <Button size="sm" variant="outline" className="text-[10px] uppercase font-bold py-1">
                    <Play className="w-3 h-3 text-[#52B788]" /> {lang === 'en' ? 'Apply Override' : lang === 'ar' ? 'تطبيق التجاوز' : 'جێبەجێکردنی بڕیار لەسەر دەستکاریکردن'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Inter-agency Crisis panel */}
          <CrisisControlPanel 
            lang={lang}
            unresolvedCrisisList={model.unresolvedCrisisList}
            crisisResolutionNote={model.crisisResolutionNote}
            setCrisisResolutionNote={model.setCrisisResolutionNote}
            handleResolveCrisis={model.handleResolveCrisis}
          />

        </div>

      </div>

    </Card>
  );
}

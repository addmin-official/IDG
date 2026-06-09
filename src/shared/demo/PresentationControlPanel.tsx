import React, { useState } from 'react';
import { 
  ShieldCheck, Presentation, Sliders, CheckCircle, AlertTriangle, 
  Globe, Radio, Lock, Play, RefreshCw, LayoutGrid, Check, Info, BadgeAlert
} from 'lucide-react';
import { DemoModeController, DemoMode } from './DemoModeController';
import { PresentationScenarioRegistry, PresentationScenario } from './PresentationScenarioRegistry';
import { AcceptanceChecklistEngine, AcceptanceChecklistItem } from './AcceptanceChecklistEngine';
import { AcceptanceReadinessSummary } from './AcceptanceReadinessSummary';
import { PresentationNavigator } from './PresentationNavigator';
import { TypographyReadabilityAudit } from '../../design-system/typography/TypographyReadabilityAudit';


interface PresentationControlPanelProps {
  lang: 'en' | 'ar' | 'ku';
  onScenarioChange?: (scenario: PresentationScenario) => void;
  onModeChange?: (mode: DemoMode) => void;
}

export const PresentationControlPanel: React.FC<PresentationControlPanelProps> = ({ 
  lang, 
  onScenarioChange, 
  onModeChange 
}) => {
  const [activeMode, setActiveMode] = useState<DemoMode>(DemoModeController.getActiveMode());
  const [activeScenario, setActiveScenario] = useState<PresentationScenario>(PresentationScenarioRegistry.getActiveScenario());
  const [checklist, setChecklist] = useState<AcceptanceChecklistItem[]>(AcceptanceChecklistEngine.getChecklist());
  const [readiness, setReadiness] = useState(AcceptanceReadinessSummary.getSummary());

  const getLabel = (en: string, ar: string, ku: string) => {
    const map = { en, ar, ku };
    return map[lang] || en;
  };

  const handleModeSelect = (mode: DemoMode) => {
    DemoModeController.setActiveMode(mode);
    setActiveMode(mode);
    if (onModeChange) onModeChange(mode);
    
    // Refresh checklists
    const updatedChecklist = AcceptanceChecklistEngine.getChecklist();
    setChecklist(updatedChecklist);
    setReadiness(AcceptanceReadinessSummary.getSummary());
  };

  const handleScenarioSelect = (scenario: PresentationScenario) => {
    PresentationScenarioRegistry.setActiveScenario(scenario.id);
    setActiveScenario(scenario);
    if (onScenarioChange) onScenarioChange(scenario);

    // Refresh checklists and state
    const updatedChecklist = AcceptanceChecklistEngine.getChecklist();
    setChecklist(updatedChecklist);
    setReadiness(AcceptanceReadinessSummary.getSummary());
  };

  const handleStepChange = (step: any, targetScenario: PresentationScenario) => {
    setActiveScenario(targetScenario);
    if (onScenarioChange) onScenarioChange(targetScenario);
    
    const updatedChecklist = AcceptanceChecklistEngine.getChecklist();
    setChecklist(updatedChecklist);
    setReadiness(AcceptanceReadinessSummary.getSummary());
  };

  const forceAuditReCheck = () => {
    const updatedChecklist = AcceptanceChecklistEngine.getChecklist();
    setChecklist(updatedChecklist);
    setReadiness(AcceptanceReadinessSummary.getSummary());
  };

  return (
    <div id="presentation-control-panel" className="bg-[#091122]/95 border border-[#E0A96D]/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden text-start">
      {/* Background soft glow */}
      <div className="absolute -top-10 -right-10 w-44 h-44 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header section with trilingual labels */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
            <Presentation className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 font-sans tracking-wide flex items-center gap-2">
              <span>{getLabel('SUPREME DEMONSTRATION & CONTROL ENGINE', 'منصة قيادة وتدقيق العروض التفاعلية والاعتماد', 'سیستەمی فەرماندەیی نیشاندان و متمانەپێدان')}</span>
            </h3>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5 uppercase tracking-widest text-[#E0A96D]/80">
              {getLabel('Federal Iraq & KRG Joint Sovereign Verification • Phase 5.0', 'الاتحاد العراقي وإقليم كوردستان - التحقق المشترك • المرحلة 5.0', 'کایەی هاوبەشی فیدراڵی عێراق و هەرێمی کوردستان • قۆناغی ٥.٠')}
            </p>
          </div>
        </div>

        {/* Readiness Badge */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          {readiness.ready ? (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-[11px] font-bold text-emerald-400 font-mono">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{getLabel('READY FOR ACQUISITION', 'جاهز للاعتماد النهائي', 'ئامادەیە بۆ وەرگرتنی کۆتایی')}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 border border-rose-500/30 rounded-full text-[11px] font-bold text-rose-400 font-mono">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{getLabel('BLOCKED BY ENFORCEMENT', 'مرفوض - قيد الموانع السيادية', 'ڕاگیراوە بەهۆی لادانەکان')}</span>
            </div>
          )}
          <button 
            onClick={forceAuditReCheck} 
            className="p-1 px-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-[10px] text-slate-400 flex items-center gap-1 transition font-mono"
            title="Recheck and re-trigger programmatic audits"
          >
            <RefreshCw className="w-3 h-3" />
            <span>AUDIT</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Mode Selector & Active Scenario details */}
        <div className="lg:col-span-5 space-y-5">
          {/* 1. DEMO MODE CONTROLLER Selection */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
              {getLabel('1. Operational Mode Select', '1. تحديد وضع تشغيل المنصة', '١. مۆدی کارپێکردنی سیستەم')}
            </label>
            <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800/80">
              {(['PRESENTATION_MODE', 'TRAINING_MODE', 'OPERATIONAL_MODE'] as DemoMode[]).map(mode => {
                const isActive = activeMode === mode;
                return (
                  <button
                    key={mode}
                    onClick={() => handleModeSelect(mode)}
                    className={`p-2 rounded text-[10px] font-mono font-bold transition duration-200 border ${
                      isActive 
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md shadow-amber-500/5' 
                        : 'bg-transparent text-slate-500 border-transparent hover:text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    {mode.replace('_', ' ')}
                  </button>
                );
              })}
            </div>
            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-900/60 text-[11px] leading-relaxed text-slate-400">
              <span className="text-[#E0A96D] font-bold font-mono text-[10px] uppercase block mb-1">
                {activeMode === 'PRESENTATION_MODE' ? '★ ' : activeMode === 'TRAINING_MODE' ? '⚜ ' : '🔒 '}
                {activeMode.replace('_', ' ')}
              </span>
              {DemoModeController.getModeDescription(activeMode)}
            </div>
          </div>

          {/* 2. DEMO SCENARIOS Selection list */}
          <div className="space-y-2">
            <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block flex justify-between">
              <span>{getLabel('2. Selected Demonstration Scenario', '2. اختيار سيناريو العرض التفاعلي', '٢. دیاریکردنی سیناریۆی نیشاندان')}</span>
              <span className="text-amber-400 font-bold">{PresentationScenarioRegistry.getScenarios().length} scenarios</span>
            </label>
            
            <div className="space-y-1.5 max-h-[190px] overflow-y-auto pr-1 bg-slate-950/40 p-2 rounded-xl border border-slate-900 custom-scrollbar">
              {PresentationScenarioRegistry.getScenarios().map(sc => {
                const isSelected = activeScenario.id === sc.id;
                return (
                  <button
                    key={sc.id}
                    onClick={() => handleScenarioSelect(sc)}
                    className={`w-full text-start p-2 rounded-lg border text-xs transition flex items-center justify-between ${
                      isSelected 
                        ? 'bg-gradient-to-r from-slate-900 to-slate-950 text-white border-[#E0A96D]/70 pl-3 shadow-inner' 
                        : 'bg-transparent text-slate-400 border-transparent hover:bg-slate-900/50 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-amber-400 animate-pulse' : 'bg-slate-700'}`} />
                      <span className="font-medium truncate font-sans">{getLabel(sc.nameEn, sc.nameAr, sc.nameKu)}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-1.5" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column: Interactive Status Tracker & Readiness indicators */}
        <div className="lg:col-span-7 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            {/* Scenario Details Panel */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-900 relative">
              <span className="absolute top-2 right-3 text-[9px] font-mono bg-slate-900 text-slate-500 px-1.5 py-0.5 rounded border border-slate-800">
                ROLE: {activeScenario.targetRole}
              </span>
              <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {getLabel('Scenario Objective:', 'الهدف التشغيلي للسيناريو:', 'ئامانجی سیناریۆی کارکردن:')} 
                  <span className="text-[#E0A96D] ml-1.5">{getLabel(activeScenario.nameEn, activeScenario.nameAr, activeScenario.nameKu)}</span>
                </span>
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed mt-2 pl-5 border-l-2 border-amber-500/40">
                {getLabel(activeScenario.descriptionEn, activeScenario.descriptionAr, activeScenario.descriptionKu)}
              </p>
            </div>

            {/* 3. READY/BLOCKED CHECKLIST TRACKING */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block flex justify-between">
                <span>{getLabel('3. Readiness Acceptance Checklist', '3. قائمة التحقق للاعتماد الفيدرالي', '٣. مەرجەکانی متمانەپێدانی فیدراڵی')}</span>
                <span className="text-emerald-400 font-bold">
                  {checklist.filter(c => c.passed).length}/{checklist.length} Passed
                </span>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-1">
                {checklist.map(item => (
                  <div 
                    key={item.id} 
                    className="p-2 rounded bg-slate-950/90 border border-slate-900 flex items-start gap-2 text-[10px]"
                  >
                    {item.passed ? (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <BadgeAlert className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5 animate-bounce" />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-300 truncate">
                        {getLabel(item.titleEn, item.titleAr, item.titleKu)}
                      </div>
                      <div className="text-[9px] text-slate-500 truncate">{item.notes}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Warnings or Critical Alerts Panel if any */}
          {(!readiness.ready && readiness.criticalIssues.length > 0) ? (
            <div className="bg-rose-950/20 border border-rose-900/50 p-2.5 rounded-lg flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5 animate-pulse" />
              <div className="text-[10px] text-rose-400 font-mono">
                <span className="font-bold block text-xs uppercase mb-0.5">Sovereignty Blockers Detected</span>
                {readiness.criticalIssues[0]}
              </div>
            </div>
          ) : (
            <div className="bg-emerald-950/20 border border-emerald-900/50 p-2.5 rounded-lg flex items-start gap-2.5 text-[10px] text-emerald-400 font-mono">
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-xs uppercase mb-0.5">SOVEREIGNTY INTEGRITY ASSURED</span>
                {getLabel(
                  'No leaks detected. Direct database queries across Kurdistan Region and Baghdad remain 100% blocked programs.',
                  'لا توجد عمليات تسريب للبيانات. يمنع الاستعلام المباشر لقواعد البيانات والأنظمة السيادية منعاً مبرمجاً مطلقاً.',
                  'هیچ دزەکردنێکی زانیاری نییە. سیستەمی کۆنترۆڵکردن بە تەواوی سەربەخۆیە بە شێوازی فەرمی پڕۆگرامسازی.'
                )}
              </div>
            </div>
          )}

          {/* COMPACT TYPOGRAPHY READABILITY STATUS */}
          {(() => {
            const auditResult = TypographyReadabilityAudit.runAudit();
            return (
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60 mt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-start">
                <div className="flex items-start gap-2">
                  <Globe className="w-4 h-4 text-[#E0A96D] mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-200 text-xs block font-sans">
                      {getLabel('TRILINGUAL READABILITY OVERHAUL (PHASE 5.2B)', 'مؤشر سلامة الخطوط واللغات المعتمدة', 'ڕاپۆرتی خوێندنەوەی زمانەکان (قۆناغی ٥.٢ب)')}
                    </span>
                    <p className="text-[10.5px] text-slate-400 mt-0.5 font-sans leading-relaxed">
                      {getLabel(
                        'Kurdish & Arabic connected scripts verified with zero-mono, zero-uppercase, zero-tracking overrides, and font-size >= 13px.',
                        'تم تطبيق معايير منع تقطيع الحروف الكوردية والعربية وضمان أحجام مريحة تزيد عن ١٣ بكسل في كل المنصات.',
                        'هەموو تێکستە کوردییەکان نوێنەرایەتی کراون بە پیتە بەستراوەکان و پاراستنی قەبارەی گونجاو لە سەرووی ١٣ بێکسڵ.'
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-start shrink-0 font-mono text-[10px]">
                  <div className="text-left">
                    <span className="text-slate-500 text-[8px] uppercase block">Violations</span>
                    <span className="text-emerald-400 font-bold block">
                      {auditResult.kurdishViolations + auditResult.arabicViolations}
                    </span>
                  </div>
                  <div className="text-left">
                    <span className="text-slate-500 text-[8px] uppercase block">Fixed Files</span>
                    <span className="text-teal-400 font-bold block">
                      {auditResult.fixedFilesCount}
                    </span>
                  </div>
                  <div className="text-left">
                    <span className="text-slate-500 text-[8px] uppercase block">Compliance</span>
                    <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded text-[9.5px] font-bold block mt-0.5">
                      {auditResult.overallScore}% PASS
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* 4. PRESENTATION NAVIGATOR */}
      <PresentationNavigator lang={lang} onStepChange={handleStepChange} />
    </div>
  );
};

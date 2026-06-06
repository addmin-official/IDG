import React from 'react';
import { Cpu } from 'lucide-react';
import { Language } from '../../types';

// Import local refactored elements
import { useSovereignAI } from './hooks/useSovereignAI';
import { t } from './localization/aiTranslations';
import { ServiceMapPanel } from './components/ServiceMapPanel';
import { PlaygroundPanel } from './components/PlaygroundPanel';
import { HitlReviewPanel } from './components/HitlReviewPanel';
import { GovernanceAccordsPanel } from './components/GovernanceAccordsPanel';

interface SovereignAIBrainProps {
  lang: Language;
}

export default function SovereignAIBrain({ lang }: SovereignAIBrainProps) {
  const model = useSovereignAI(lang);
  const isRtl = lang !== 'en';

  return (
    <div id="sovereign-ai-brain-canvas" className="bg-[#111e2e]/95 rounded-xl border border-slate-800 p-5 lg:p-6 shadow-2xl flex flex-col gap-6 text-slate-100 text-start" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Sovereign AI Central Display Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-slate-800 pb-5 text-start">
        <div className="text-start">
          <span className="text-[10px] uppercase font-mono text-[#E0A96D] tracking-widest font-bold block text-start">
            {t(lang, 'header.overwatch')}
          </span>
          <h2 className="text-xl font-display font-semibold tracking-wide text-slate-50 uppercase flex items-center gap-2.5 mt-0.5 text-start">
            <span className="p-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/30 shrink-0">
              <Cpu className="w-5 h-5 text-emerald-400" />
            </span>
            {t(lang, 'header.title')}
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed text-start">
            {t(lang, 'header.subtitle')}
          </p>
        </div>

        {/* Neural general statistics tickers */}
        <div className="flex gap-4 bg-[#0b1420] border border-slate-800/80 p-3 rounded-lg text-xs font-mono shrink-0 justify-between self-start">
          <div className="text-center border-r border-slate-800 pr-4 rtl:border-r-0 rtl:border-l rtl:pl-4">
            <span className="text-slate-500 text-[10px] block uppercase text-center">
              {t(lang, 'header.latencyLabel')}
            </span>
            <span className="text-[#52B788] font-bold block mt-0.5 text-center">48ms</span>
          </div>
          <div className="text-center border-r border-slate-800 pr-4 rtl:border-r-0 rtl:border-l rtl:pl-4">
            <span className="text-slate-500 text-[10px] block uppercase text-center">
              {t(lang, 'header.precisionLabel')}
            </span>
            <span className="text-[#E0A96D] font-bold block mt-0.5 text-center">99.14%</span>
          </div>
          <div className="text-center">
            <span className="text-slate-500 text-[10px] block uppercase text-center">
              {t(lang, 'header.nodesLabel')}
            </span>
            <span className="text-cyan-400 font-bold block mt-0.5 text-center">
              {t(lang, 'header.nodesValue')}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-start">
        
        {/* Left column / 2/3 width */}
        <div className="xl:col-span-2 flex flex-col gap-6 text-start">
          
          {/* Section 1: Dynamic neural models service map */}
          <ServiceMapPanel 
            lang={lang}
            activeModule={model.activeModule}
            setActiveModule={model.setActiveModule}
            aiModules={model.aiModules}
          />

          {/* Section 2: Editable Prompt State Playground & Live Test Run */}
          <PlaygroundPanel 
            lang={lang}
            activePromptId={model.activePromptId}
            promptTemplate={model.promptTemplate}
            setPromptTemplate={model.setPromptTemplate}
            playDesc={model.playDesc}
            setPlayDesc={model.setPlayDesc}
            playOrigin={model.playOrigin}
            setPlayOrigin={model.setPlayOrigin}
            playCost={model.playCost}
            setPlayCost={model.setPlayCost}
            isInferencing={model.isInferencing}
            inferenceResult={model.inferenceResult}
            runTestInference={model.runTestInference}
            loadPrompt={model.loadPrompt}
          />

        </div>

        {/* Right column sidebar / 1/3 width */}
        <div className="flex flex-col gap-6 text-start">
          
          {/* Section 3: human in loop console */}
          <HitlReviewPanel 
            lang={lang}
            hitlList={model.hitlList}
            hitlApprovals={model.hitlApprovals}
            handleHITLResolve={model.handleHITLResolve}
          />

          {/* Section 4: AI Governance Framework Section */}
          <GovernanceAccordsPanel 
            lang={lang}
          />

        </div>

      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { Layers, BookOpen, Shield, Activity, Database, Cpu, Server } from 'lucide-react';
import { BLUEPRINT_METADATA } from '../../constants/blueprintMetadata';
import { PageHeader, Badge } from '../../ui';

export interface SovereignAtlasPanelProps {
  lang: 'en' | 'ar' | 'ku';
}

export const SovereignAtlasPanel: React.FC<SovereignAtlasPanelProps> = ({ lang }) => {
  const [activeBlueprintId, setActiveBlueprintId] = useState<string>('system-context');

  return (
    <div className="bg-[#111e2e]/90 p-5 lg:p-6 rounded-xl border border-slate-800/80 shadow-lg animate-fade-in flex flex-col gap-6">
      
      <PageHeader
        icon={<Layers />}
        title={lang === 'en' ? 'Sovereign Digital Infrastructure - Master Architect Blueprint Suite' : lang === 'ar' ? 'البنية التحتية القيادية الرقمية - مخططات المكتَب الهندسي الاستراتيجي العيادي' : 'ژێرخانی دیجیتاڵیی هەمەلایەن - نەخشەسازی سەرەکی ئەندازیاری نیشتمانیی'}
        description={lang === 'en' ? 'Explore the formal enterprise-grade system diagrams prepared by the Chief enterprise and systems architects for the Republic of Iraq Trade & Customs Ecosystem.' : lang === 'ar' ? 'استطلع مخططات النمذجة التقنية لجمهورية العراق المعدة من قبل المهندسين والمستشارين الفنيين لبوابة المنافذ الموحدة والمكوس.' : 'سەیری نەخشەسازی فەرمیی نیشتمانیی بکە کە لە لایەن گەورە ئەندازیارانی عێراق ئامادەکراوە بۆ هەمەجۆریی سیستەمی دەروازەی سنووری نیشتمانیی.'}
        status={<Badge variant="gold">{lang === 'en' ? "Architecture Atlas" : lang === 'ar' ? "أطلس المعمارية" : "ئەتڵەسی تەلارسازی"}</Badge>}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left sidebar directory selector */}
        <div className="lg:col-span-1 flex flex-col gap-1">
          <h3 className="text-xs uppercase tracking-wider text-slate-400 font-mono mb-2 px-2 font-bold">
            {lang === 'en' ? 'Cabinet Blueprints (A-Z)' : lang === 'ar' ? 'مخططات مجلس الوزراء (أ-ي)' : 'نەخشەکانی کابینەی حکومەت'}
          </h3>
          {BLUEPRINT_METADATA.map((bp) => (
            <button
              key={bp.id}
              onClick={() => setActiveBlueprintId(bp.id)}
              className={`w-full text-start px-3 py-2.5 rounded-lg text-xs font-[650] transition-all cursor-pointer ${
                activeBlueprintId === bp.id 
                  ? 'bg-[#1a2c42] text-white border-l-4 border-[#cca553] shadow' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#0c1521]'
              }`}
            >
              {bp.title[lang]}
            </button>
          ))}
        </div>

        {/* Right column view area for Selected Blueprint */}
        <div className="lg:col-span-3 bg-slate-950/85 rounded-xl border border-slate-800/80 p-5 md:p-6 flex flex-col gap-6">
          
          {/* Meta details */}
          <div>
            <h3 className="text-base font-display font-semibold text-[#cca553] flex items-center gap-2">
              <BookOpen className="w-4.5 h-4.5" />
              {BLUEPRINT_METADATA.find(b => b.id === activeBlueprintId)?.title[lang]}
            </h3>
            <p className="text-slate-300 text-xs leading-relaxed mt-2 p-3 bg-slate-900/60 rounded border-l-2 border-[#cca553]/60 italic font-mono">
              "{BLUEPRINT_METADATA.find(b => b.id === activeBlueprintId)?.desc[lang]}"
            </p>
          </div>

          {/* SVG Visualizations Render */}
          <div className="bg-[#0c1421] rounded-xl p-4 md:p-6 border border-slate-800 shadow-inner flex items-center justify-center min-h-[300px]">
            
            {activeBlueprintId === 'system-context' && (
              <svg viewBox="0 0 800 400" className="w-full max-w-[650px] h-auto font-mono text-[10px] text-slate-300">
                <rect width="800" height="400" fill="none" stroke="rgba(207, 168, 94, 0.04)" strokeWidth="1" rx="8"/>

                {/* CORE IDG GATEWAY SYSTEM */}
                <g transform="translate(300, 150)">
                  <rect x="0" y="0" width="200" height="100" rx="6" fill="#111e2e" stroke="#cca553" strokeWidth="2" />
                  <text x="100" y="35" textAnchor="middle" fill="#cca553" fontWeight="bold" fontSize="12">IDG DIGITAL GATEWAY</text>
                  <text x="100" y="55" textAnchor="middle" fill="#94a3b8" fontSize="9">Iraq Core Sovereign Core</text>
                  <text x="100" y="75" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold">● ACTIVE & SECURED</text>
                </g>

                {/* EXTERNAL Actor 1: Importer Systems */}
                <g transform="translate(40, 60)">
                  <rect x="0" y="0" width="160" height="50" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1"/>
                  <text x="80" y="22" textAnchor="middle" fill="#f8fafc" fontWeight="medium">Importers & Carrier Fleets</text>
                  <text x="80" y="38" textAnchor="middle" fill="#64748b">Digital Manifest submission</text>
                </g>

                {/* EXTERNAL Actor 2: CBI */}
                <g transform="translate(600, 60)">
                  <rect x="0" y="0" width="160" height="50" rx="4" fill="#1e293b" stroke="#eab308" strokeWidth="1"/>
                  <text x="80" y="22" textAnchor="middle" fill="#f8fafc" fontWeight="medium">Central Bank of Iraq (CBI)</text>
                  <text x="80" y="38" textAnchor="middle" fill="#eab308">Wire compliance verification</text>
                </g>

                {/* EXTERNAL Actor 3: KRG & Baghdad Min of Finance */}
                <g transform="translate(600, 290)">
                  <rect x="0" y="0" width="160" height="50" rx="4" fill="#1e293b" stroke="#cca553" strokeWidth="1"/>
                  <text x="80" y="22" textAnchor="middle" fill="#f8fafc" fontWeight="medium">Federal Ministry of Finance</text>
                  <text x="80" y="38" textAnchor="middle" fill="#cca553">Erbil-Baghdad unified sync</text>
                </g>

                {/* EXTERNAL Actor 4: Physical Ports Checkpoint Nodes */}
                <g transform="translate(40, 290)">
                  <rect x="0" y="0" width="160" height="50" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="1"/>
                  <text x="80" y="22" textAnchor="middle" fill="#f8fafc" fontWeight="medium">Custom Checkpoints</text>
                  <text x="80" y="38" textAnchor="middle" fill="#10b981">Thermal Scanners & Gateways</text>
                </g>

                {/* CONNECTIONS & LINES */}
                <path d="M 200 85 L 250 85 L 250 170 L 300 170" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4"/>
                <circle cx="300" cy="170" r="3" fill="#64748b"/>
                <text x="235" y="115" fill="#94a3b8" fontSize="8">Secure REST API</text>

                {/* IDG Core -> CBI */}
                <path d="M 500 180 L 550 180 L 550 85 L 600 85" fill="none" stroke="#eab308" strokeWidth="1.5"/>
                <circle cx="600" cy="85" r="3" fill="#eab308"/>
                <text x="540" y="145" fill="#eab308" fontSize="8">AML Check</text>

                {/* IDG Core -> Federal Ministry */}
                <path d="M 500 220 L 550 220 L 550 315 L 600 315" fill="none" stroke="#cca553" strokeWidth="1.5"/>
                <circle cx="600" cy="315" r="3" fill="#cca553"/>
                <text x="540" y="270" fill="#cca553" fontSize="8">Tariff sync</text>

                {/* Checkpoint Nodes <-> IDG Core */}
                <path d="M 200 315 L 250 315 L 250 220 L 300 220" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4"/>
                <circle cx="300" cy="220" r="3" fill="#10b981"/>
                <text x="215" y="270" fill="#10b981" fontSize="8">gRPC stream</text>
              </svg>
            )}

            {activeBlueprintId === 'business-capabilities' && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[650px] font-sans">
                <div className="bg-[#112235] p-4 rounded-lg border border-[#cca553]/30">
                  <h4 className="font-semibold text-slate-100 flex items-center gap-1.5 text-xs mb-2 text-[#cca553]">
                    <Shield className="w-4 h-4 text-[#cca553]" /> Customs Clearance Layer
                  </h4>
                  <ul className="text-xs text-slate-300 flex flex-col gap-1.5 font-mono">
                    <li>• Unified Tariff Computation (Decree 1984)</li>
                    <li>• Digitized Manifest Registry Management</li>
                    <li>• 8-digit HS Code Auto-Matching engine</li>
                    <li>• Instant Dual-Use licensing checks</li>
                  </ul>
                </div>
                <div className="bg-[#112235] p-4 rounded-lg border border-[#cca553]/30">
                  <h4 className="font-semibold text-slate-100 flex items-center gap-1.5 text-xs mb-2 text-[#cca553]">
                    <Activity className="w-4 h-4 text-[#cca553]" /> Legal Harmonization Portal
                  </h4>
                  <ul className="text-xs text-slate-300 flex flex-col gap-1.5 font-mono">
                    <li>• Erbil-Baghdad dynamic treaty compliance</li>
                    <li>• Central Sovereign Revenue Integration</li>
                    <li>• Customs Clearance mutual recognition</li>
                    <li>• Inter-provincial bypass auditing</li>
                  </ul>
                </div>
                <div className="bg-[#112235] p-4 rounded-lg border border-[#cca553]/30">
                  <h4 className="font-semibold text-slate-100 flex items-center gap-1.5 text-xs mb-2 text-[#cca553]">
                    <Database className="w-4 h-4 text-[#cca553]" /> Anti-Fraud & Compliance (AML)
                  </h4>
                  <ul className="text-xs text-slate-300 flex flex-col gap-1.5 font-mono">
                    <li>• Central Bank of Iraq trade wire validation</li>
                    <li>• Unit valuation comparison (fraud check)</li>
                    <li>• High-risk carrier & importer matching</li>
                    <li>• Anomaly alarm triggers</li>
                  </ul>
                </div>
                <div className="bg-[#112235] p-4 rounded-lg border border-[#cca553]/30">
                  <h4 className="font-semibold text-slate-100 flex items-center gap-1.5 text-xs mb-2 text-[#cca553]">
                    <Cpu className="w-4 h-4 text-[#cca553]" /> Forecasting & Economic Intelligence
                  </h4>
                  <ul className="text-xs text-slate-300 flex flex-col gap-1.5 font-mono">
                    <li>• Strategic transit corridor modeling</li>
                    <li>• Dynamic tax revenue projections</li>
                    <li>• Trade volume forecasting with Gemini</li>
                    <li>• Regional logistics corridor telemetry</li>
                  </ul>
                </div>
              </div>
            )}

            {activeBlueprintId === 'ddd-boundaries' && (
              <svg viewBox="0 0 800 400" className="w-full max-w-[650px] h-auto font-mono text-[10px] text-slate-300">
                <rect width="800" height="400" fill="none" stroke="rgba(207, 168, 94, 0.04)" strokeWidth="1" rx="8"/>
                
                {/* Bounded Context 1: Core Manifest Evaluation */}
                <g transform="translate(50, 60)">
                  <rect width="320" height="135" rx="6" fill="#131e2d" stroke="#1d4ed8" strokeWidth="2.5" strokeDasharray="3 3"/>
                  <rect width="180" height="25" rx="4" fill="#1d4ed8" x="10" y="-12"/>
                  <text x="100" y="5" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10">Core Manifest Context</text>
                  <text x="20" y="40" fill="#94a3b8">• Manifest aggregation entity</text>
                  <text x="20" y="65" fill="#94a3b8">• Validates cargo descriptions</text>
                  <text x="20" y="90" fill="#94a3b8">• Formulates digital customs clearance files</text>
                </g>

                {/* Bounded Context 2: Financial Integrity Core */}
                <g transform="translate(420, 60)">
                  <rect width="320" height="135" rx="6" fill="#131e2d" stroke="#b45309" strokeWidth="2.5"/>
                  <rect width="180" height="25" rx="4" fill="#b45309" x="10" y="-12"/>
                  <text x="100" y="5" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10">Financial Settlement Sync</text>
                  <text x="20" y="40" fill="#f59e0b">• Central Bank wire validation value checks</text>
                  <text x="20" y="65" fill="#f59e0b">• Dynamic tariff calculation rules</text>
                  <text x="20" y="90" fill="#f59e0b">• Anti-money laundering tracking records</text>
                </g>

                {/* Bounded Context 3: Risk Intelligence & Ledgers */}
                <g transform="translate(230, 230)">
                  <rect width="340" height="130" rx="6" fill="#131e2d" stroke="#10b981" strokeWidth="2.5"/>
                  <rect width="190" height="25" rx="4" fill="#10b981" x="10" y="-12"/>
                  <text x="105" y="5" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10">Risk Intelligence & Ledger</text>
                  <text x="20" y="40" fill="#a7f3d0">• Gemini-3.5 cognitive analysis and risks scores</text>
                  <text x="20" y="65" fill="#a7f3d0">• Iraqi Sovereign Ledger (Decentralized logs)</text>
                  <text x="20" y="90" fill="#a7f3d0">• Operational checkpoint route command hub</text>
                </g>

                {/* Inter-domain Shared kernel bridge */}
                <path d="M 370 120 L 420 120" stroke="#cca553" strokeWidth="2"/>
                <text x="395" y="110" textAnchor="middle" fill="#cca553" fontSize="8" fontWeight="bold">Shared SDK</text>
              </svg>
            )}

            {activeBlueprintId === 'event-architecture' && (
              <svg viewBox="0 0 800 400" className="w-full max-w-[650px] h-auto font-mono text-[10px] text-slate-300">
                <rect width="800" height="400" fill="none" stroke="rgba(207, 168, 94, 0.04)" strokeWidth="1" rx="8"/>
                
                {/* Event Bus center stream */}
                <rect x="50" y="180" width="700" height="40" rx="4" fill="#111e2e" stroke="#cca553" strokeWidth="2" />
                <text x="400" y="205" textAnchor="middle" fill="#cca553" fontWeight="bold" fontSize="11" letterSpacing="0.2em">
                  APACHE KAFKA SOVEREIGN EVENT CONGO • MULTI-REGION HIGHWAY
                </text>

                {/* Event Producers/Publishers */}
                <g transform="translate(80, 50)">
                  <rect width="180" height="60" rx="4" fill="#1e293b" stroke="#3b82f6" strokeWidth="1"/>
                  <text x="90" y="22" textAnchor="middle" fill="#ffffff" fontWeight="semibold">Manifest Portal</text>
                  <text x="90" y="42" textAnchor="middle" fill="#3b82f6">Publishes: ManifestSubmitted</text>
                  <path d="M 90 60 L 90 130" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3"/>
                </g>

                <g transform="translate(310, 50)">
                  <rect width="180" height="60" rx="4" fill="#1e293b" stroke="#eab308" strokeWidth="1"/>
                  <text x="90" y="22" textAnchor="middle" fill="#ffffff" fontWeight="semibold">CBI Gateway Portal</text>
                  <text x="90" y="42" textAnchor="middle" fill="#eab308">Publishes: CBTWireVerified</text>
                  <path d="M 90 60 L 90 130" stroke="#eab308" strokeWidth="1.5" strokeDasharray="3 3"/>
                </g>

                <g transform="translate(540, 50)">
                  <rect width="180" height="60" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="1"/>
                  <text x="90" y="22" textAnchor="middle" fill="#ffffff" fontWeight="semibold">Gemini Risk Engine</text>
                  <text x="90" y="42" textAnchor="middle" fill="#10b981">Publishes: RiskAudited</text>
                  <path d="M 90 60 L 90 130" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3"/>
                </g>

                {/* Consumers */}
                <g transform="translate(200, 290)">
                  <rect width="180" height="60" rx="4" fill="#0f172a" stroke="#cca553" strokeWidth="1"/>
                  <text x="90" y="25" textAnchor="middle" fill="#cca553" fontWeight="bold">Sovereign Ledger Worker</text>
                  <text x="90" y="43" textAnchor="middle" fill="#94a3b8">Writes block log to Spanner</text>
                  <path d="M 90 0 L 90 -70" stroke="#cca553" strokeWidth="1.5"/>
                </g>

                <g transform="translate(440, 290)">
                  <rect width="180" height="60" rx="4" fill="#0f172a" stroke="#cca553" strokeWidth="1"/>
                  <text x="90" y="25" textAnchor="middle" fill="#cca553" fontWeight="bold">Notification System</text>
                  <text x="90" y="43" textAnchor="middle" fill="#94a3b8">Issues gateway release pass</text>
                  <path d="M 90 0 L 90 -70" stroke="#cca553" strokeWidth="1.5"/>
                </g>
              </svg>
            )}

            {/* Fallback for remaining blueprints */}
            {!['system-context', 'business-capabilities', 'ddd-boundaries', 'event-architecture'].includes(activeBlueprintId) && (
              <div className="text-center py-6 px-4">
                <div className="w-16 h-16 rounded-full bg-[#111e2e] border border-[#cca553] flex items-center justify-center mx-auto mb-4 shadow ">
                  <Server className="w-7 h-7 text-[#cca553]" />
                </div>
                <h4 className="font-semibold text-slate-200 uppercase tracking-widest text-sm mb-1">
                  {lang === 'en' ? 'Sovereign Specification Detail' : lang === 'ar' ? 'تفاصيل المواصفات الفنية السيادية' : 'فۆرمی ووردەکارییەکانی ڕێبەرنامەی فەرمی'}
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
                  {lang === 'en' ? 'Full implementation blueprints, API specifications, database parameters, and server configurations are optimized as decoupled service structures below.' : lang === 'ar' ? 'مخططات التنفيذ الكاملة، ومواصفات واجهة برمجة التطبيقات (API)، ومعلمات قاعدة البيانات، وتكوينات الخادم مُحسَّنة كبنى خدمات منفصلة أدناه.' : 'نەخشەکانی جێبەجێکردنی تەواو، فۆرم و چوارچێوەی API، داتابەیسەکان، و ڕێکخستنی سێرڤەرەکان وەکو سێرڤسی سەربەخۆ دانراون.'}
                </p>
                <div className="inline-block bg-[#1a2c42] border border-slate-700/60 rounded px-3 py-1.5 text-xs text-slate-300 font-mono">
                  {lang === 'en' ? 'Security Clearance Certified • Zero-Trust Interoperability Handled' : lang === 'ar' ? 'مصادق عليه أمنياً • جرت صياغة التوافقية وفق مبدأ صفر ثقة' : 'مۆری ڕێگەپێدانی ئاسایش • پارێزراو بە متمانەی گشتی سفر'}
                </div>
              </div>
            )}

          </div>

          {/* Key architectural requirements specifications lists */}
          <div className="mt-2">
            <h4 className="text-sm font-semibold text-slate-100 uppercase tracking-wider mb-3">
              {lang === 'en' ? 'Architectural Integrity Rules' : lang === 'ar' ? 'ضوابط السلامة والنزاهة الهندسية' : 'یاساکانی سەلامەتی و یەکپارچەیی ژێرخان'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BLUEPRINT_METADATA.find(b => b.id === activeBlueprintId)?.points[lang].map((pt, idx) => (
                <div key={idx} className="bg-slate-900/40 p-3.5 rounded-lg border border-slate-800/80 flex items-start gap-2.5">
                  <span className="bg-[#cca553]/15 text-[#cca553] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono">{pt}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default SovereignAtlasPanel;

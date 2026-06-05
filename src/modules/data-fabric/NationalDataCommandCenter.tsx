import React, { useState, useEffect } from 'react';
import { 
  Database, Layers, HelpCircle, Search, Activity, Shuffle, 
  CheckSquare, Shield, AlertTriangle, Play, CheckCircle, 
  Trash2, RefreshCw, Layers3, FileText, BarChart3, Users, 
  ShieldAlert, Clock, ArrowRight, HelpCircle as HelpIcon, ArrowLeftRight
} from 'lucide-react';
import { Language } from '../../types';

// Import UI Library Components
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
  BarChart,
  LineChart,
  PieChart
} from '../../ui';

// Import Sovereign Data Fabric Managers
import { 
  NationalDataCatalog,
  MasterDataManagement,
  DataLineageEngine,
  SovereignEventBus,
  NationalDataQualityFramework,
  NationalDataGovernance,
  CatalogDataset,
  GoldenRecord,
  MasterCitizen,
  MasterBusiness,
  SovereignDomainEvent,
  DatasetQualityReport,
  AccessRequestWorkflow
} from '../../data-fabric';

import { colors } from '../../design-system/tokens/colors';

interface NationalDataCommandCenterProps {
  lang: Language;
}

export default function NationalDataCommandCenter({ lang }: NationalDataCommandCenterProps) {
  // Engines
  const catalog = NationalDataCatalog.getInstance();
  const mdm = MasterDataManagement.getInstance();
  const lineageEngine = DataLineageEngine.getInstance();
  const eventBus = SovereignEventBus.getInstance();
  const qualityFramework = NationalDataQualityFramework.getInstance();
  const governance = NationalDataGovernance.getInstance();

  // Dynamic state
  const [datasets, setDatasets] = useState<CatalogDataset[]>([]);
  const [qualityReports, setQualityReports] = useState<DatasetQualityReport[]>([]);
  const [activeEvents, setActiveEvents] = useState<SovereignDomainEvent[]>([]);
  const [workflows, setWorkflows] = useState<AccessRequestWorkflow[]>([]);
  const [duplicates, setDuplicates] = useState<any[]>([]);

  // Search/Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDatasetId, setSelectedDatasetId] = useState('ds-national-citizens-01');

  // Impact simulation
  const [impactSourceNode, setImpactSourceNode] = useState('src-moi-civil-db');
  const [impactResult, setImpactResult] = useState<any[]>([]);

  // Event dispatch simulator values
  const [simTopic, setSimTopic] = useState<any>('customs.manifest.declared');
  const [simSourceSystem, setSimSourceSystem] = useState('General Authority for Customs');
  const [simPayloadKey, setSimPayloadKey] = useState('declaredWeightTons');
  const [simPayloadValue, setSimPayloadValue] = useState('120.4');

  // Load state
  useEffect(() => {
    setDatasets(catalog.getAllDatasets());
    setQualityReports(qualityFramework.getReports());
    setActiveEvents(eventBus.getEventHistory());
    setWorkflows(governance.getWorkflows());
    setDuplicates(mdm.getPendingDuplicates());
    triggerImpactSimulation('src-moi-civil-db');
  }, []);

  const triggerImpactSimulation = (nodeId: string) => {
    setImpactSourceNode(nodeId);
    const affected = lineageEngine.executeImpactSimulation(nodeId);
    setImpactResult(affected);
  };

  const dispatchCustomSimulatorEvent = () => {
    const payloadObj: Record<string, string> = {};
    payloadObj[simPayloadKey || 'metadata'] = simPayloadValue || '42.0';
    payloadObj['reconciledBy'] = 'Sovereign Automated Orchestrator';

    eventBus.publish(simTopic, simSourceSystem, payloadObj);
    setActiveEvents(eventBus.getEventHistory());

    // Record dynamic shift in target dataset score
    let targetDs = '';
    if (simTopic === 'customs.manifest.declared') targetDs = 'ds-port-cargo-manifests-04';
    else if (simTopic === 'identity.citizen.unified') targetDs = 'ds-national-citizens-01';
    else if (simTopic === 'financial.wire.flagged') targetDs = 'ds-currency-reserves-03';

    if (targetDs) {
      // Re-trigger slightly positive quality shift representing automated reconciliations
      const currentRep = qualityFramework.getReport(targetDs);
      if (currentRep) {
        const nextCompleteness = Math.min(100, currentRep.metrics.completeness + 0.1);
        qualityFramework.triggerLiveRecalculationAssessment(targetDs, { completeness: nextCompleteness });
        setQualityReports(qualityFramework.getReports());
      }
    }
  };

  const executeApprovalSignoff = (wfId: string, approverRole: string, approverName: string) => {
    governance.signWorkflowApprovalStep(wfId, approverRole, approverName);
    setWorkflows([...governance.getWorkflows()]);
  };

  const resolveMdmDuplicate = (dupId: string, action: 'MERGE' | 'REJECT_OUTLIER') => {
    mdm.resolveDuplicate(dupId, action);
    setDuplicates([...mdm.getPendingDuplicates()]);
  };

  const isRtl = lang !== 'en';

  const datasetList = searchQuery ? catalog.searchDatasets(searchQuery) : datasets;
  const selectedDatasetDetails = catalog.getDataset(selectedDatasetId);
  const selectedDatasetQuality = qualityFramework.getReport(selectedDatasetId);
  const nationalDataQualityScore = qualityFramework.computeNationalQualityScore();

  // Pie chart variables mapping dataset classification proportions
  const classificationsCount = datasets.reduce((acc: Record<string, number>, curr) => {
    acc[curr.classification] = (acc[curr.classification] || 0) + 1;
    return acc;
  }, {});

  const classificationPieData = Object.entries(classificationsCount).map(([label, value]) => {
    let color: string = colors.status.info;
    if (label === 'TOP_SECRET') color = '#E0A96D'; // Standard high contrast gold
    else if (label === 'SECRET') color = colors.status.danger;
    else if (label === 'CONFIDENTIAL') color = colors.status.warning;
    else if (label === 'INTERNAL') color = '#3b82f6';
    return { label, value, color };
  });

  // Flow Lineage nodes
  const lineageGraph = lineageEngine.getLineageGraph();

  return (
    <div id="national-data-fabric-command-center" className="flex flex-col gap-6 text-start" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Dynamic Page Header */}
      <PageHeader
        title={isRtl ? 'منصة ونسيج البيانات الوطني السيادي (Data Fabric)' : 'Sovereign National Data Fabric Architecture'}
        subtitle={isRtl ? 'محور التحكم ببيانات الدولة العراقية لربط الوزارات وتدقيق جودة السجلات وحوكمة المصادر.' : 
                  'Unified multi-tenant federal data assets discovery registry, Master Data resolution, end-to-end data lineage, and event-driven data quality orchestrations.'}
        badge={
          <Badge variant="gold">
            {isRtl ? 'حوكمة البيانات الفيدرالية' : 'FABRIC GOVERNANCE CLASS L5'}
          </Badge>
        }
        actions={
          <div className="flex gap-2">
            <Button 
              onClick={() => {
                setDatasets(catalog.getAllDatasets());
                setQualityReports(qualityFramework.getReports());
                setActiveEvents(eventBus.getEventHistory());
              }}
              variant="outline"
              className="text-white border-slate-700 hover:border-[#E0A96D]/50 text-xs flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {isRtl ? 'تحديث الفهرس الوطني' : 'Refresh Fabric Ledger'}
            </Button>
          </div>
        }
      />

      {/* Sovereign National Data Readiness Index Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <StatCard
          title={isRtl ? 'مؤشر جودة البيانات الوطني الموحد' : 'National Data Quality Index'}
          value={`${nationalDataQualityScore}%`}
          subtitle="Precision Score across 6 Core Dimensions"
          icon={<CheckSquare className="w-5 h-5 text-[#52B788]" />}
          trend={{ value: '0.04% Live Recalc', isPositive: true }}
        />

        <StatCard
          title={isRtl ? 'مجموع السجلات المشفرة الفدرالية' : 'Sovereign Master Records'}
          value="48.5M+"
          subtitle="Enveleoped under Triple Language Key"
          icon={<Layers3 className="w-5 h-5 text-[#E0A96D]" />}
          trend={{ value: 'Citizens & Businesses verified', isPositive: true }}
        />

        <StatCard
          title={isRtl ? 'مجموعات البيانات الخاضعة للحوكمة' : 'Governed National Datasets'}
          value={datasets.length.toString()}
          subtitle="Distributed across 4 Federal Ministries"
          icon={<Database className="w-5 h-5 text-cyan-400" />}
          trend={{ value: 'Fully Mapped', isPositive: true }}
        />

        <StatCard
          title={isRtl ? 'الأحداث اللامركزية الموزعة حياً' : 'Decoupled Domain Event Bus'}
          value={`Broker Active`}
          subtitle={`Buffered ${activeEvents.length} recent system streams`}
          icon={<Activity className="w-5 h-5 text-purple-400" />}
          trend={{ value: 'Zero Packet Drops', isPositive: true }}
        />

      </div>

      {/* Main Grid Columns Area (2 Left, 1 Right layout) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Side (Two Column Width Span) */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          
          {/* Section 1: Data Catalog Registry Navigator */}
          <div className="bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800 shadow-xl flex flex-col gap-4">
            <div className="border-b border-slate-900 pb-3 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <SectionHeader 
                  title={isRtl ? 'دليل ومستودع مجموعات البيانات السيادية (Data Catalog)' : 'National Governed Dataset Discovery Registry'}
                  description={isRtl ? 'قائمة تفصيلية بمجموعات البيانات الوطنية مع تحديد الوزارة المالكة ومستشعرات جودة البيانات.' : 'Searchable and audit-proof catalog of federal master datasets, custodians, and classification tiers.'}
                />
              </div>

              {/* Dynamic Search Box */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute ltr:left-3 rtl:right-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder={isRtl ? 'بحث في البيانات المترابطة...' : 'Search datasets, owners...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#0b1420] border border-slate-800 text-xs rounded-md w-full ltr:pl-9 rtl:pr-9 py-2 text-white focus:outline-none focus:border-[#E0A96D] focus:ring-1 focus:ring-[#E0A96D]"
                />
              </div>
            </div>

            {/* Catalog Master Table */}
            <div className="overflow-x-auto">
              <Table headers={['Dataset Name / Identification', 'Sovereign Custodian Ministry', 'Data Steward Agent', 'Classification Tier', 'Quality Index', 'Master Record Count']}>
                {datasetList.map((ds) => {
                  const isSelected = ds.id === selectedDatasetId;
                  return (
                    <tr 
                      key={ds.id} 
                      onClick={() => setSelectedDatasetId(ds.id)}
                      className={`cursor-pointer transition-all text-xs font-mono hover:bg-slate-900/35 ${
                        isSelected ? 'bg-slate-900 border-l-4 border-[#E0A96D] text-white' : 'text-slate-300'
                      }`}
                    >
                      <td className="px-4 py-3.5">
                        <strong className="text-white block font-sans text-xs">{lang === 'en' ? ds.name.en : lang === 'ar' ? ds.name.ar : ds.name.ku}</strong>
                        <span className="text-[10px] text-slate-500 block mt-0.5">{ds.id}</span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-200 uppercase tracking-wide">{ds.ownerMinistry}</td>
                      <td className="px-4 py-3.5">
                        <span className="text-slate-300 block">{ds.dataSteward}</span>
                        <span className="text-[9px] text-slate-500 block font-normal">{ds.stewardEmail}</span>
                      </td>
                      <td className="px-4 py-3.5">
                        <Badge variant={
                          ds.classification === 'TOP_SECRET' ? 'gold' :
                          ds.classification === 'SECRET' ? 'danger' :
                          ds.classification === 'CONFIDENTIAL' ? 'warning' : 'slate'
                        }>
                          {ds.classification}
                        </Badge>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className={`font-bold text-xs ${ds.qualityScore > 95 ? 'text-[#52B788]' : 'text-amber-400'}`}>
                          {ds.qualityScore}%
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-right font-bold text-slate-200">
                        {ds.recordCount.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </Table>
            </div>

            {/* Nested Detail Panel for Selected Dataset containing Cross-Ministry mappings & Data quality metrics breakdown */}
            {selectedDatasetDetails && (
              <div className="bg-[#0b1420]/80 p-4.5 rounded-xl border border-slate-850 mt-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Column 1: Details & Cross-ministry Lineage points */}
                <div className="flex flex-col gap-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#E0A96D] flex items-center gap-1.5 border-b border-slate-900 pb-1.5">
                    <Shuffle className="w-3.5 h-3.5" />
                    Cross-Ministry Relational Interlock Mapping
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-normal font-sans italic">
                    "{lang === 'en' ? selectedDatasetDetails.description.en : lang === 'ar' ? selectedDatasetDetails.description.ar : selectedDatasetDetails.description.ku}"
                  </p>

                  <div className="flex flex-col gap-2.5 mt-1 font-mono text-[10px]">
                    {selectedDatasetDetails.mappings.map((m, idx) => (
                      <div key={idx} className="bg-[#111e2e]/60 p-2.5 rounded border border-slate-850 flex flex-col gap-1.5">
                        <div className="flex justify-between items-center text-[#E0A96D] font-bold">
                          <span>Map [{m.sourceField}] → [{m.targetField}]</span>
                          <span className="text-[9px] bg-slate-950 px-1.5 py-0.5 rounded text-white tracking-widest">{m.syncMechanism}</span>
                        </div>
                        <p className="text-slate-400">
                          Destination Target: <strong className="text-slate-200">{m.targetMinistry}</strong> ({m.targetDatasetId})
                        </p>
                        {m.transformationRule && (
                          <div className="text-[9px] text-slate-500 font-bold bg-slate-950 p-1.5 border border-slate-900 rounded italic">
                            Rule: {m.transformationRule}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2: Data Quality 6-way Dimensions Breakdown */}
                {selectedDatasetQuality && (
                  <div className="flex flex-col gap-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#52B788] flex items-center gap-1.5 border-b border-slate-900 pb-1.5">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Dataset 6-Dimension Quality Assurance
                    </h4>

                    {/* Quality Rules Radar Mock Bar Grid */}
                    <div className="grid grid-cols-2 gap-3.5 font-mono text-xs pt-1">
                      {[
                        { label: 'Completeness', val: selectedDatasetQuality.metrics.completeness },
                        { label: 'Accuracy', val: selectedDatasetQuality.metrics.accuracy },
                        { label: 'Consistency', val: selectedDatasetQuality.metrics.consistency },
                        { label: 'Timeliness', val: selectedDatasetQuality.metrics.timeliness },
                        { label: 'Uniqueness', val: selectedDatasetQuality.metrics.uniqueness },
                        { label: 'Validity', val: selectedDatasetQuality.metrics.validity }
                      ].map((dim) => (
                        <div key={dim.label} className="bg-slate-950/60 p-2 px-3 rounded border border-slate-900 flex flex-col gap-1">
                          <div className="flex justify-between items-center text-[10px] text-slate-400">
                            <span>{dim.label}</span>
                            <span className="text-[#52B788] font-bold">{dim.val}%</span>
                          </div>
                          <div className="w-full bg-slate-900 h-1 rounded overflow-hidden">
                            <div className="bg-[#52B788] h-full" style={{ width: `${dim.val}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Critical Anomalies Alerts inside quality rules */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider font-mono">Platform Flagged Quality Alerts</span>
                      {selectedDatasetQuality.criticalAnomalies.length === 0 ? (
                        <span className="text-[10px] text-emerald-400 bg-emerald-950/20 p-2 px-3 rounded border border-emerald-900/40 inline-block font-mono">
                          ✓ Dual verification check complete. 0 structural integrity errors present on master golden fields.
                        </span>
                      ) : (
                        <div className="flex flex-col gap-1.5">
                          {selectedDatasetQuality.criticalAnomalies.map((a, i) => (
                            <div key={i} className="bg-red-950/20 border border-red-500/20 text-red-100 text-[10.5px] p-2 rounded-md font-sans font-semibold flex items-start gap-2 leading-relaxed">
                              <AlertTriangle className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                              <span>{a}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                )}

              </div>
            )}
          </div>

          {/* Section 2: Interactive National Data Lineage, Dependency Trace Engine */}
          <div className="bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800 shadow-xl flex flex-col gap-4 text-start">
            <SectionHeader 
              title={isRtl ? 'تتبع مسار سلاسل تداول البيانات والاعتمادية (Data Lineage Engine)' : 'End-to-End Dynamic Data Lineage Graph'}
              description={isRtl ? 'تتبع مصادر البيانات، المسارات، والتحويلات الرياضية وصولاً إلى التقارير واللوحات الحكومية مع تحليل الأثر حياً.' : 
                            'Comprehensive visualization of physical database systems mapped through dynamic middleware pipelines.'}
            />

            {/* Lineage Visual Simulator layout */}
            <div className="bg-[#0b1420] p-4.5 rounded-xl border border-slate-850 grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Selector area */}
              <div className="flex flex-col gap-2.5">
                <label className="text-[11px] font-mono text-[#E0A96D] uppercase font-bold">1. Select Lineage Source Entity</label>
                <select
                  value={impactSourceNode}
                  onChange={(e) => triggerImpactSimulation(e.target.value)}
                  className="bg-[#111e2e] border border-slate-800 rounded p-2 text-xs font-mono text-white focus:outline-none"
                >
                  <option value="src-moi-civil-db">MoI Civil Registration (Raw Citizen DB)</option>
                  <option value="src-mot-companies-db">MoTrade Registry System (Raw Corporate DB)</option>
                  <option value="src-[#E0A96D]">Central Bank Interbanking Ledger (Raw Forex DB)</option>
                  <option value="pipe-idg-etl-processor">IDG Resolution Node (Transformation Pipeline)</option>
                  <option value="core-datalake-isolated">Unified Data Ocean (Central Golden Registry)</option>
                </select>
                <p className="text-[10px] text-slate-500 font-sans leading-normal">
                  Failsafe telemetry tracks data element transformations down to downstream executive decision platforms automatically.
                </p>
              </div>

              {/* Data Provenance & Impact Simulation Result table */}
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-[11px] font-mono text-[#52B788] uppercase font-bold flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                  Live Downstream Dependency Impact Assessment
                </label>

                {impactResult.length === 0 ? (
                  <div className="p-4 bg-slate-900 border border-slate-850 rounded-lg text-xs italic text-slate-500">
                    No downstream components impacted by this node. Isolated perimeter.
                  </div>
                ) : (
                  <div className="overflow-y-auto max-h-[160px] border border-slate-850 rounded">
                    <Table headers={['Impacted Node / Service System', 'Classification Type', 'Criticality Rating', 'Affected Role Affiliations']}>
                      {impactResult.map((node, i) => (
                        <tr key={i} className="text-[10.5px] font-mono hover:bg-slate-900/30">
                          <td className="px-3 py-2 font-semibold text-white">{node.label}</td>
                          <td className="px-3 py-2 text-slate-400">{node.type}</td>
                          <td className="px-3 py-2">
                            <Badge variant={node.impactLevel === 'CRITICAL' ? 'danger' : 'warning'}>
                              {node.impactLevel}
                            </Badge>
                          </td>
                          <td className="px-3 py-2 text-slate-300">{node.roleAffected}</td>
                        </tr>
                      ))}
                    </Table>
                  </div>
                )}
              </div>

            </div>

            {/* Static high-fidelity diagram detailing trace flows in key layout */}
            <div className="border border-slate-850 p-4 rounded-xl bg-slate-950/40" dir="ltr">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-3 font-mono">System Visual Pathway Route Map</span>
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center text-xs font-mono">
                
                <div className="bg-[#111e2e] border border-slate-800 p-3 rounded-lg w-full md:w-36">
                  <strong className="text-white block text-[11px]">Primary DBs</strong>
                  <span className="text-[9px] text-[#E0A96D] block mt-0.5">Raw Encrypted Sources</span>
                </div>

                <div className="text-slate-600 font-extrabold text-[15px]">⇄</div>

                <div className="bg-[#111e2e] border border-emerald-900 w-full md:w-36 p-3 rounded-lg relative">
                  <strong className="text-white block text-[11px]">IDG ETL Node</strong>
                  <span className="text-[9px] text-[#52B788] block mt-0.5">Resolution Engine</span>
                </div>

                <div className="text-slate-600 font-extrabold text-[15px]">⇄</div>

                <div className="bg-[#111e2e] border border-slate-800 p-3 rounded-lg w-full md:w-36">
                  <strong className="text-white block text-[11px]">Secure Datalake</strong>
                  <span className="text-[9px] text-cyan-400 block mt-0.5">Gold Master Index</span>
                </div>

                <div className="text-slate-600 font-extrabold text-[15px]">⇄</div>

                <div className="bg-[#111e2e] border border-purple-900 p-3 rounded-lg w-full md:w-36">
                  <strong className="text-white block text-[11px]">Secure API / Auth</strong>
                  <span className="text-[9px] text-purple-400 block mt-0.5">Dual Signature Gate</span>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Right Area Column */}
        <div className="flex flex-col gap-6">
          
          {/* Section 3: Live Decoupled Event Bus streams watcher */}
          <div className="bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800 shadow-xl flex flex-col gap-4 text-start">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-widest pb-2 border-b border-slate-900 flex justify-between items-center">
              <span className="flex items-center gap-1.5 font-sans">
                <Activity className="text-[#E0A96D] w-4.5 h-4.5" />
                Live Federated Event Streams
              </span>
            </h3>

            {/* Simulated Event Trigger Sandbox */}
            <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-900 flex flex-col gap-3 font-mono text-xs">
              <span className="text-[10px] text-[#E0A96D] font-bold uppercase block border-b border-slate-900 pb-1">Event Broker Simulator Sandbox</span>
              
              <div className="flex flex-col gap-2">
                <label className="text-[10px] text-slate-400">Select Core Event Topic</label>
                <select
                  value={simTopic}
                  onChange={(e) => setSimTopic(e.target.value as any)}
                  className="bg-[#111e2e] border border-slate-800 text-[11px] p-1.5 rounded focus:outline-none text-white"
                >
                  <option value="customs.manifest.declared">customs.manifest.declared</option>
                  <option value="identity.citizen.unified">identity.citizen.unified</option>
                  <option value="financial.wire.flagged">financial.wire.flagged</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] text-slate-400">Custom Payload Data Keys Structure</label>
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="text" 
                    placeholder="Key (e.g. weight)" 
                    value={simPayloadKey} 
                    onChange={(e) => setSimPayloadKey(e.target.value)}
                    className="bg-[#111e2e] border border-slate-800 text-[10.5px] p-1.5 rounded text-white focus:outline-none"
                  />
                  <input 
                    type="text" 
                    placeholder="Value (e.g. 52.8)" 
                    value={simPayloadValue} 
                    onChange={(e) => setSimPayloadValue(e.target.value)}
                    className="bg-[#111e2e] border border-slate-800 text-[10.5px] p-1.5 rounded text-white focus:outline-none"
                  />
                </div>
              </div>

              <Button
                size="sm"
                variant="default"
                onClick={dispatchCustomSimulatorEvent}
                className="bg-[#E0A96D] hover:bg-[#E0A96D]/90 text-slate-950 font-bold text-[11px] w-full mt-1.5 py-1.5"
              >
                Publish Decoupled Event
              </Button>
            </div>

            {/* List Chronological events from Bus */}
            <div className="flex flex-col gap-2.5 max-h-[300px] overflow-y-auto pr-1">
              {activeEvents.map((evt) => {
                const isAlarm = evt.topic.includes('alarm') || evt.topic.includes('flagged');
                return (
                  <div 
                    key={evt.eventId}
                    className={`p-3 rounded border text-xs font-mono flex flex-col gap-1.5 leading-normal ${
                      isAlarm ? 'bg-red-950/20 border-red-500/30' : 'bg-slate-900 border-slate-850'
                    }`}
                  >
                    <div className="flex justify-between items-center border-b border-slate-950 pb-1">
                      <span className="text-[#E0A96D] font-bold text-[10px]">{evt.eventId}</span>
                      <span className="text-slate-500 text-[9px]">{evt.timestamp.slice(11, 19)}Z</span>
                    </div>

                    <div className="flex justify-between text-[11px]">
                      <span className="text-white font-semibold">{evt.topic}</span>
                      <Badge variant={isAlarm ? 'danger' : 'slate'}>
                        {evt.sourceSystem.split(' ')[0]}
                      </Badge>
                    </div>

                    {/* Compacted payload rendering */}
                    <div className="bg-slate-950 p-2 border border-slate-950 text-[10px] text-slate-400 capitalize max-h-16 overflow-y-auto">
                      {Object.entries(evt.payload).map(([k, v]: any) => (
                        <div key={k} className="flex justify-between items-center">
                          <span>{k}:</span>
                          <strong className="text-slate-300 font-bold">{v}</strong>
                        </div>
                      ))}
                    </div>

                    <span className="text-[9px] text-slate-500 break-all leading-none italic font-normal">
                      HMAC Sig: {evt.securitySignature}
                    </span>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Section 4: MDM Duplicate Resolution Entity resolution */}
          <div className="bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800 shadow-xl flex flex-col gap-4 text-start">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-widest pb-2 border-b border-slate-900 flex justify-between items-center font-sans">
              <span className="flex items-center gap-1.5">
                <ArrowLeftRight className="text-[#E0A96D] w-4.5 h-4.5" />
                Golden Master Entity Resolution
              </span>
            </h3>

            {duplicates.length === 0 ? (
              <span className="text-[11px] text-emerald-400 bg-emerald-950/20 p-3 rounded border border-emerald-900 font-mono">
                ✓ 100% Resolved: All citizen and business identities reconciled successfully inside the Golden Record ledger.
              </span>
            ) : (
              <div className="flex flex-col gap-3 font-mono text-xs">
                {duplicates.map((dup) => (
                  <div key={dup.id} className="p-3 bg-slate-900 border border-slate-850 rounded flex flex-col gap-2">
                    <div className="flex justify-between border-b border-slate-950 pb-1 text-[10px] text-slate-400">
                      <span>Conflict ID: {dup.id}</span>
                      <span className="text-amber-400 font-bold">{Math.round(dup.similarityRatio * 100)}% Match Similarity</span>
                    </div>

                    <p className="text-slate-200 font-sans text-[11px] leading-relaxed">
                      Similarity resolution flagged potential company conflict details: <strong className="text-white block font-mono">Babylon Food Imports vs {dup.conflictingSourceId.split('-').slice(-1)}</strong>.
                    </p>

                    <div className="text-[10px] text-slate-500">
                      Unresolved attributes: {dup.unresolvedFields.join(', ')}
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <Button
                        size="sm"
                        variant="default"
                        onClick={() => resolveMdmDuplicate(dup.id, 'MERGE')}
                        className="bg-[#52B788] hover:bg-[#52B788]/90 text-slate-950 font-bold text-[10px] py-1"
                      >
                        Merge Golden Record
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => resolveMdmDuplicate(dup.id, 'REJECT_OUTLIER')}
                        className="border-slate-800 text-slate-350 hover:bg-slate-950 font-bold text-[10px] py-1"
                      >
                        Keep Segregated
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 5: Data Governance multi-tenant approvals */}
          <div className="bg-[#111e2e]/90 p-5 rounded-xl border border-slate-800 shadow-xl flex flex-col gap-4 text-start">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-widest pb-2 border-b border-slate-900 flex justify-between items-center font-sans">
              <span className="flex items-center gap-1.5">
                <ShieldAlert className="text-[#E0A96D] w-4.5 h-4.5" />
                Active Governance Workflows
              </span>
            </h3>

            <div className="flex flex-col gap-3 font-mono text-xs">
              {workflows.map((wf) => {
                const allApproved = wf.status === 'APPROVED_AND_KEY_GRANTED';
                return (
                  <div key={wf.id} className="p-3 bg-slate-900 border border-slate-850 rounded flex flex-col gap-2 leading-normal">
                    <div className="flex justify-between items-center border-b border-slate-950 pb-1">
                      <span className="text-[#E0A96D] font-bold">{wf.id}</span>
                      <Badge variant={allApproved ? 'success' : 'warning'}>
                        {wf.status.replace(/_/g, ' ')}
                      </Badge>
                    </div>

                    <p className="text-slate-200 font-sans text-[11px] leading-snug">
                      Requestor: <strong className="text-white block font-mono">{wf.requestorUsername} ({wf.requestorRole})</strong>
                      Targeting: <strong className="text-cyan-400 font-mono block">{wf.targetDatasetId} ({wf.requiredClassification})</strong>
                    </p>

                    <p className="text-[10px] text-slate-400 italic bg-slate-950/70 p-1.5 rounded border border-slate-950">
                      "{wf.justification}"
                    </p>

                    <div className="flex flex-col gap-1.5 mt-1 border-t border-slate-950 pt-2 text-[10px]">
                      <span className="text-[9px] uppercase font-bold text-slate-500 block">Ministry Chain Sign-offs</span>
                      {wf.approversChain.map((step, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-slate-950 p-1.5 px-2.5 rounded text-[10px]">
                          <span className="text-slate-400">{step.role}</span>
                          {step.signed ? (
                            <span className="text-[#52B788] font-bold">✓ Signed ({step.name})</span>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => executeApprovalSignoff(wf.id, step.role, 'Dr. Tariq Al-Jamil')}
                              className="text-[9px] font-bold px-1.5 py-0.5"
                            >
                              Sign Approval
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

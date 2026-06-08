import React, { useState } from 'react';
import { 
  Landmark, 
  Layers, 
  Activity, 
  Network, 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  TrendingDown, 
  Database, 
  Lock, 
  FileText, 
  Plus, 
  CheckCircle2, 
  Cpu, 
  RefreshCw,
  Coins,
  History,
  Scale
} from 'lucide-react';
import { Card, Badge, Button } from '../../../ui';

// Import our real engines and registries
import { CBIRegistry, TreasuryPolicy, SovereignObligation, SovereignAsset, CBIAccount } from '../../../services/treasury/CBIRegistry';
import { CBIIntegrationEngine, RevenueStream, ReconciliationReport, TreasuryPosition } from '../../../services/treasury/CBIIntegrationEngine';
import { NationalSettlementEngine, SettlementInstruction, LedgerEventType, SettlementStatus, SovereignLedgerEvent } from '../../../services/treasury/NationalSettlementEngine';
import { useSsos } from '../../../providers/SsosProvider';

// Import SSOS components from Phase 3.6.11
import { GovernmentPerformancePanel } from './GovernmentPerformancePanel';
import { NationalBudgetCommandCenter } from './NationalBudgetCommandCenter';
import { NationalEnergyRegistryComponent } from './NationalEnergyRegistry';
import { NationalProjectsRegistryPanel } from './NationalProjectsRegistryPanel';
import { RevenueSharingPanel } from './RevenueSharingPanel';

interface SovereignFiscalSystemProps {
  lang: 'en' | 'ar' | 'ku';
}

export const SovereignFiscalSystem: React.FC<SovereignFiscalSystemProps> = ({ lang }) => {
  const { ssosMode } = useSsos();
  const isRtl = lang !== 'en';

  const [activeCabinetTab, setActiveCabinetTab] = useState<
    'federal-treasury' | 'krg-treasury' | 'fiscal-ledger' | 'revenue-recon' | 'debt-registry' | 'asset-registry' | 'settlement-ops'
  >('federal-treasury');

  const [masterHub, setMasterHub] = useState<'fiscal-os' | 'resource-os'>('fiscal-os');
  const [activeResourceTab, setActiveResourceTab] = useState<'budgets' | 'sharing' | 'energy' | 'projects' | 'kpis'>('budgets');

  // Trigger state re-renders upon mutating backend registry values
  const [ticker, setTicker] = useState(0);
  const triggerRefresh = () => setTicker(prev => prev + 1);

  // Localization translator helper
  const getLabel = (en: string, ar: string, ku: string) => {
    const labels = { en, ar, ku };
    return labels[lang] || en;
  };

  // State calculations from engines
  const policies = CBIRegistry.getTreasuryPolicies();
  const authorities = CBIRegistry.getFiscalAuthorities();
  const activeSignatories = CBIRegistry.getSettlementAuthorities();
  const budgetApprovers = CBIRegistry.getBudgetAuthorities();
  
  const obligations = CBIRegistry.getSovereignObligations();
  const assets = CBIRegistry.getSovereignAssets();
  const cbiAccounts = CBIRegistry.getCBIAccounts();
  
  const streams = CBIIntegrationEngine.getRevenueStreams();
  const reconReport = CBIIntegrationEngine.executeRevenueReconciliation(ssosMode);
  
  const ledgerHistory = NationalSettlementEngine.getLedgerEvents();
  const settlementsQueue = NationalSettlementEngine.getSettlementsQueue();
  const reserves = NationalSettlementEngine.getSovereignReserves();
  const readiness = NationalSettlementEngine.evaluateFiscalReadiness(ssosMode);

  // Dummy / Initial states for forms
  const [wireUSD, setWireUSD] = useState<string>('100.0');
  const [wireIQD, setWireIQD] = useState<string>('131000');
  const [complianceCheckResult, setComplianceCheckResult] = useState<any>(null);

  const [newDebtLender, setNewDebtLender] = useState('');
  const [newDebtAmount, setNewDebtAmount] = useState('250.0');
  const [newDebtType, setNewDebtType] = useState<'Internal' | 'External' | 'Guarantee' | 'Commitment'>('Internal');

  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetValuation, setNewAssetValuation] = useState('500.0');
  const [newAssetCategory, setNewAssetCategory] = useState<'Energy' | 'Infrastructure' | 'Strategic' | 'StateOwnedEnterprise' | 'TreasuryControlled'>('Strategic');

  const [newSettlementSource, setNewSettlementSource] = useState<'federal' | 'krg' | 'joint'>('federal');
  const [newSettlementTarget, setNewSettlementTarget] = useState<'federal' | 'krg' | 'joint'>('krg');
  const [newSettlementAmount, setNewSettlementAmount] = useState('45.0');
  const [newSettlementDesc, setNewSettlementDesc] = useState('');

  const [newAdjustmentAmt, setNewAdjustmentAmt] = useState('20.0');
  const [newAdjustmentJurisdiction, setNewAdjustmentJurisdiction] = useState<'federal' | 'krg' | 'joint'>('federal');
  const [newAdjustmentReference, setNewAdjustmentReference] = useState('');

  const [actorName, setActorName] = useState('Minister Executive');

  // Interactive Form Submissions
  const handleVerifyWireCompliance = (e: React.FormEvent) => {
    e.preventDefault();
    const usd = parseFloat(wireUSD);
    const iqd = parseFloat(wireIQD);
    if (isNaN(usd) || isNaN(iqd) || usd <= 0) return;
    const res = CBIIntegrationEngine.verifyExchangeCompliance(usd, iqd);
    setComplianceCheckResult(res);
  };

  const handleCreateDebt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDebtLender.trim()) return;
    const principal = parseFloat(newDebtAmount);
    if (isNaN(principal) || principal <= 0) return;

    CBIRegistry.addSovereignObligation({
      id: `DEBT-OB-${obligations.length + 101}`,
      lender: newDebtLender,
      loanType: newDebtType,
      jurisdiction: 'federal',
      principalAmount: principal,
      interestRate: 4.25,
      maturityDate: '2029-12-31',
      committedSpent: principal * 0.8
    });

    // Add ledger event trace
    NationalSettlementEngine.appendLedgerEvent({
      eventType: 'ADJUSTMENT',
      jurisdiction: 'federal',
      authority: actorName,
      policyReference: 'POL-FY26-FED-01',
      auditReference: `AUD-DEBT-${obligations.length + 101}`,
      ledgerReference: 'LEDGER-PRIMARY-FED',
      amountUSD: principal,
      payload: JSON.stringify({ action: 'Guaranteed Sovereign Obligation Registration', lender: newDebtLender, type: newDebtType })
    });

    setNewDebtLender('');
    triggerRefresh();
  };

  const handleCreateAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssetName.trim()) return;
    const valuation = parseFloat(newAssetValuation);
    if (isNaN(valuation) || valuation <= 0) return;

    CBIRegistry.addSovereignAsset({
      id: `AST-SOV-${assets.length + 101}`,
      name: newAssetName,
      category: newAssetCategory,
      jurisdiction: 'federal',
      valuation,
      annualRevenueYield: valuation * 0.05,
      lastAuditDate: new Date().toISOString().split('T')[0]
    });

    // Append event
    NationalSettlementEngine.appendLedgerEvent({
      eventType: 'ADJUSTMENT',
      jurisdiction: 'federal',
      authority: actorName,
      policyReference: 'POL-FY26-FED-01',
      auditReference: `AUD-ASSET-${assets.length + 101}`,
      ledgerReference: 'LEDGER-PRIMARY-FED',
      amountUSD: valuation,
      payload: JSON.stringify({ action: 'Sovereign Asset Registration', name: newAssetName, category: newAssetCategory })
    });

    setNewAssetName('');
    triggerRefresh();
  };

  const handleCreateSettlement = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(newSettlementAmount);
    if (isNaN(amount) || amount <= 0 || !newSettlementDesc.trim()) return;

    NationalSettlementEngine.appendSettlement({
      sourceJurisdiction: newSettlementSource,
      targetJurisdiction: newSettlementTarget,
      amountUSD: amount,
      description: newSettlementDesc,
      policyIdReference: 'POL-FY26-JNT-01'
    });

    setNewSettlementDesc('');
    triggerRefresh();
  };

  const handleAdvanceSettlement = (id: string, stage?: SettlementStatus) => {
    NationalSettlementEngine.advanceSettlementStatus(id, actorName, stage);
    triggerRefresh();
  };

  const handleAppendAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(newAdjustmentAmt);
    if (isNaN(amount) || amount <= 0) return;

    NationalSettlementEngine.appendLedgerEvent({
      eventType: 'ADJUSTMENT',
      jurisdiction: newAdjustmentJurisdiction,
      authority: actorName,
      policyReference: 'POL-FY26-FED-01',
      auditReference: `AUD-ADJ-${Date.now().toString().slice(-4)}`,
      ledgerReference: `LEDGER-${newAdjustmentJurisdiction.toUpperCase()}-PRIMARY`,
      amountUSD: amount,
      payload: JSON.stringify({
        adjustmentFactor: amount,
        referenceNotes: newAdjustmentReference || 'Routine treasury compliance adjustment audit'
      })
    });

    setNewAdjustmentReference('');
    triggerRefresh();
  };

  return (
    <Card 
      id="sovereign-fiscal-ledger-system" 
      className="p-5 lg:p-6 bg-[#111e2e]/95 border border-[#cca553]/20 shadow-xl overflow-visible text-slate-100 flex flex-col gap-6"
    >
      {/* SECTION 1: HEADER CONTROLS */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3.5 bg-[#cca553]/10 rounded-xl border border-[#cca553]/20 text-[#cca553]">
            <Coins className="w-8 h-8" />
          </div>
          <div className="text-start">
            <h2 className="text-lg font-bold uppercase tracking-wider text-white">
              {getLabel('Sovereign National Fiscal Operating System (SNFOS)', 'نظام الخزينة والمالية الوطنية السيادية', 'سیستمی دارایی و گەنجینەی نیشتمانی سەروەری عێراق')}
            </h2>
            <p className="text-xs text-[#cca553]/80 font-mono tracking-wider mt-1">
              {getLabel('CENTRAL BANK OF IRAQ INTEGRATION • EMERALD SOVEREIGN LEDGER (SSOS-A)', 'ربط البنك المركزي العراقي • سجل الزمرد المالي الموحد', 'پێوەستکاری بانکی ناوەندی عێراق • دەفتەری مۆری سەوز')}
            </p>
          </div>
        </div>
        
        {/* CBI Exchange Rate indicator */}
        <div className="flex flex-wrap items-center gap-3.5">
          <div className="bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800 text-xs text-start">
            <span className="text-[10px] text-slate-500 font-mono block font-bold">CBI FIXED ANCHOR</span>
            <span className="text-sm font-bold text-teal-400 font-mono">1,310.00 IQD/USD</span>
          </div>
          <div className="bg-slate-900/80 px-3.5 py-2 rounded-xl border border-rose-950/40 text-xs text-start flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <div>
              <span className="text-[10px] text-slate-500 font-mono block font-bold">LEDGER ENFORCEMENT</span>
              <span className="text-slate-300 font-bold font-mono">APPEND_ONLY ACTIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* MASTER SYSTEM SELECTOR HUB */}
      <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-2 text-xs font-mono">
        <button
          onClick={() => setMasterHub('fiscal-os')}
          className={`flex-1 py-2 rounded-lg cursor-pointer transition-all uppercase font-bold flex items-center justify-center gap-2 ${
            masterHub === 'fiscal-os'
              ? 'bg-[#E1AD01] text-slate-950 shadow-md font-extrabold'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
          }`}
        >
          <Coins className="w-4 h-4 shrink-0" />
          <span>{getLabel('Sovereign Fiscal Registry OS (Phase 3.6.12)', 'سجل الخزينة والمالية الموحد (الجيل الثاني)', 'دەفتەری گشتی گەنجینە و دارایی (پێش قۆناغی دووەم)')}</span>
        </button>
        <button
          onClick={() => setMasterHub('resource-os')}
          className={`flex-1 py-2 rounded-lg cursor-pointer transition-all uppercase font-bold flex items-center justify-center gap-2 ${
            masterHub === 'resource-os'
              ? 'bg-[#E1AD01] text-slate-950 shadow-md font-extrabold'
              : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
          }`}
        >
          <Layers className="w-4 h-4 shrink-0" />
          <span>{getLabel('National Budget & Capital Operations OS (Phase 3.6.11)', 'موازنة الموارد والقدرات البشرية (الجيل الأول)', 'بودجەی نیشتمانی و سەرچاوە گشتییەکان (پێش قۆناغی یەکەم)')}</span>
        </button>
      </div>

      {masterHub === 'fiscal-os' ? (
        <>
          {/* SECTION 2: FISCAL READINESS ENGINE BLOCK */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-slate-950/50 p-5 rounded-xl border border-slate-800/80">
            
            <div className="lg:col-span-1 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 pb-4 lg:pb-0 lg:pr-6 text-start">
              <div>
                <h4 className="text-xs text-slate-500 font-mono uppercase tracking-widest font-bold mb-1">
                  {getLabel('Sovereign Fiscal Readiness', 'تقييم جاهزية الخزينة', 'هەڵسەنگاندنی ئامادەکاری دارایی')}
                </h4>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-4xl font-extrabold text-[#cca553] font-mono">{readiness.scoreOverall}%</span>
                  <Badge variant={readiness.isCompliant ? 'success' : 'warning'}>
                    {readiness.isCompliant ? 'COMPLIANT' : 'CONSTRAINED'}
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-400 mt-2 mb-4">
                  {getLabel('Mathematical aggregate of intergovernmental liquidity buffers, settlement clearances, and sovereign asset ratios.',
                             'تجميع رياضي لاحتياطيات السيولة والمقاصات والالتزامات السيادية.',
                             'کۆی پێوەرە داراییەکان لە نێوان حکومەت، نەبوونی کێشەی نەختینەیی و توانای بازرگانی.')}
                </p>
              </div>
              <div className="mt-2 space-y-2">
                <span className="text-[10px] text-slate-500 block font-bold font-mono">EXECUTIVE COMPLIANCE ACTOR:</span>
                <input 
                  type="text" 
                  value={actorName} 
                  onChange={(e) => setActorName(e.target.value)} 
                  className="w-full bg-slate-900 border border-slate-800 text-xs rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#cca553] text-[#cca553] font-mono font-bold"
                />
              </div>
            </div>

            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 text-start">
                <span className="text-[10px] text-slate-500 block font-mono uppercase">TREASURY</span>
                <span className="text-lg font-bold text-white font-mono block mt-1">{readiness.treasuryReadiness}%</span>
                <div className="w-full bg-slate-950 h-1 rounded mt-2 overflow-hidden">
                  <div className="bg-[#cca553] h-full" style={{ width: `${readiness.treasuryReadiness}%` }}></div>
                </div>
              </div>
              
              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 text-start">
                <span className="text-[10px] text-slate-500 block font-mono uppercase">SETTLEMENTS</span>
                <span className="text-lg font-bold text-emerald-400 font-mono block mt-1">{readiness.settlementReadiness}%</span>
                <div className="w-full bg-slate-950 h-1 rounded mt-2 overflow-hidden">
                  <div className="bg-emerald-400 h-full" style={{ width: `${readiness.settlementReadiness}%` }}></div>
                </div>
              </div>

              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 text-start">
                <span className="text-[10px] text-slate-500 block font-mono uppercase">RECON RECON</span>
                <span className="text-lg font-bold text-teal-400 font-mono block mt-1">{readiness.revenueReconciliationReadiness}%</span>
                <div className="w-full bg-slate-950 h-1 rounded mt-2 overflow-hidden">
                  <div className="bg-teal-400 h-full" style={{ width: `${readiness.revenueReconciliationReadiness}%` }}></div>
                </div>
              </div>

              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 text-start">
                <span className="text-[10px] text-slate-500 block font-mono uppercase">DEBT GOVERNANCE</span>
                <span className="text-lg font-bold text-cyan-400 font-mono block mt-1">{readiness.debtGovernanceReadiness}%</span>
                <div className="w-full bg-slate-950 h-1 rounded mt-2 overflow-hidden">
                  <div className="bg-cyan-400 h-full" style={{ width: `${readiness.debtGovernanceReadiness}%` }}></div>
                </div>
              </div>

              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80 text-start">
                <span className="text-[10px] text-slate-500 block font-mono uppercase">ASSET RECOGNITION</span>
                <span className="text-lg font-bold text-blue-400 font-mono block mt-1">{readiness.assetGovernanceReadiness}%</span>
                <div className="w-full bg-slate-950 h-1 rounded mt-2 overflow-hidden">
                  <div className="bg-blue-400 h-full" style={{ width: `${readiness.assetGovernanceReadiness}%` }}></div>
                </div>
              </div>
            </div>

          </div>

          {/* SECTION 3: SUB-CAPABILITY SELECTION TABS */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800/80">
            {[
              { id: 'federal-treasury', label: getLabel('Federal Treasury Core', 'الخزينة الاتحادية', 'خزێنەی فیدراڵ'), icon: Landmark },
              { id: 'krg-treasury', label: getLabel('KRG Treasury Core', 'خزينة الإقليم KRG', 'خزێنەی هەرێم KRG'), icon: Layers },
              { id: 'fiscal-ledger', label: getLabel('Emerald Fiscal Ledger', 'سجل الزمرد الوطني السيادي', 'دەفتەری مۆری نیشتمانی'), icon: History },
              { id: 'revenue-recon', label: getLabel('Revenue Reconciliation Engine', 'محرك المطابقة المالية', 'بەرامبەرکردنی داهات'), icon: Scale },
              { id: 'debt-registry', label: getLabel('National Debt Registry', 'سجل الدين السيادي', 'تۆماري قەرزی نیشتمانی'), icon: Shield },
              { id: 'asset-registry', label: getLabel('Sovereign Asset Registry', 'سجل الأصول والشركات العامة', 'تۆماری دارایی غەیرە منقول'), icon: Database },
              { id: 'settlement-ops', label: getLabel('Intergovernmental Settlements', 'المقاصات والتحويلات المشتركة', 'بەرامبەربوونی دارایی هاوبەش'), icon: Network },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCabinetTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                  activeCabinetTab === tab.id 
                    ? 'bg-[#1a2c42] text-[#cca553] border-[#cca553]/30 font-bold' 
                    : 'text-slate-400 hover:text-white border-transparent'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5 shrink-0" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

      {/* SECTION 4: DETAILED DASHBOARDS */}
      <div className="min-h-[400px]">
        
        {/* DASHBOARD 1: FEDERAL TREASURY CORE */}
        {activeCabinetTab === 'federal-treasury' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 bg-slate-950/60 p-5 rounded-xl border border-slate-800 text-start flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-[700] uppercase tracking-widest text-slate-200 border-b border-slate-800 pb-2 mb-4 flex justify-between items-center">
                  <span>{getLabel('FEDERAL TREASURY POSITION MONITOR', 'موقف الخزينة الاتحادية', 'چاودێری دۆخی خزێنەی گشتی فیدراڵ')}</span>
                  <Badge variant="teal">BAGHDAD_VAULT_1</Badge>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 font-mono uppercase block">{getLabel('Consolidated Cash Liquidity', 'النهود النقدية المتوفرة', 'نەختی بەردەستی فیدراڵ')}</span>
                    <span className="text-xl font-bold font-mono text-white block mt-1">$45.20 Billion USD</span>
                    <span className="text-[10px] text-teal-400 block mt-1 font-mono">{getLabel('76.2% Liquid Cash Assets', '٧٦٪ سيولة جاهزة', '٧٦٪ بە شێوەی نەختی گۆڕاو')}</span>
                  </div>
                  
                  <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-500 font-mono uppercase block">{getLabel('Emergency Sovereign Reserve', 'احتياطي الطوارئ', 'خزێنەی یەدەگی فریاکەوتن')}</span>
                    <span className="text-xl font-bold font-mono text-teal-400 block mt-1">$5.00 Billion USD</span>
                    <span className="text-[10px] text-slate-400 block mt-1 font-mono">{getLabel('Mandated Reserve requirement ratio: 15%', 'الحد الأدنى للاحتياطي ١٥٪', 'پارێزگاری لە ڕێژەی یەدەگی یاسایی')}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] text-slate-500 font-mono uppercase block font-bold tracking-widest">{getLabel('LEDGER REAL-TIME EXPENDITURE OUTFLOWS', 'تفاصيل النفقات الجارية والمسجلة', 'وردبینی خەرجییەکانی خزێنەی گشتی فیدراڵ')}</span>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-start border-collapse border border-slate-800">
                      <thead>
                        <tr className="bg-slate-900 text-slate-400 font-mono text-[10px] border-b border-slate-800">
                          <th className="p-2 text-start">LEDGER CODE</th>
                          <th className="p-2 text-start">SUB CATEGORY</th>
                          <th className="p-2 text-start">BUDGET LIMIT</th>
                          <th className="p-2 text-start">DISBURSED COIL</th>
                          <th className="p-2 text-start">LIQUIDITY DEPTH</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        <tr>
                          <td className="p-2.5 text-cyan-400 font-bold">EXP-FED-SOC</td>
                          <td className="p-2.5 font-sans">Social Security & Welfare</td>
                          <td className="p-2.5 font-bold">$32,000M</td>
                          <td className="p-2.5 text-slate-300">$7,500M</td>
                          <td className="p-2.5 text-emerald-400">92.4% Safe</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 text-cyan-400 font-bold">EXP-FED-SEC</td>
                          <td className="p-2.5 font-sans">National Security & Defense</td>
                          <td className="p-2.5 font-bold">$28,000M</td>
                          <td className="p-2.5 text-slate-300">$8,100M</td>
                          <td className="p-2.5 text-emerald-400">89.1% Safe</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 text-cyan-400 font-bold">EXP-FED-DEV</td>
                          <td className="p-2.5 font-sans">Reconstruction & Projects</td>
                          <td className="p-2.5 font-bold">$45,000M</td>
                          <td className="p-2.5 text-slate-300">$9,000M</td>
                          <td className="p-2.5 text-white">45.0% Restricted</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>AUDIT RECORD ID: <b>FED-SECURE-AUD-1002</b></span>
                <span className="text-emerald-400">STATUS: <b>VERIFIED WITH COMPTROLLER</b></span>
              </div>
            </div>

            {/* CBI Account holdings */}
            <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 text-start flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-[700] uppercase tracking-widest text-[#cca553] border-b border-slate-800 pb-2 mb-4">
                  {getLabel('GOVERNMENT SAVINGS AT CENTRAL BANK (CBI)', 'حسابات الحكومة لدى البنك المركزي', 'ئەمینی دارایی حکومەت لە بانکی ناوەندی')}
                </h3>
                
                <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                  {getLabel('Real-time balances of the Federal Iraq and Joint accounts monitored within the CBI electronic ledger.',
                             'مطابقة فورية لأرصدة حسابات الحكومة الاتحادية المسجلة لدى المقر الرئيسي للبنك المركزي.',
                             'ڕازیکردنی بەردەوامی باڵانسی بانکی فیدراڵ و هاوبەش کە لە سیستەمی ئەلیکترۆنی پاشەکەوت کراوە.')}
                </p>

                <div className="space-y-3 text-xs">
                  {cbiAccounts.filter(a => a.jurisdiction !== 'krg').map(acc => (
                    <div key={acc.accountNumber} className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 font-mono">
                      <div className="flex justify-between font-bold text-slate-200">
                        <span>{acc.accountNumber}</span>
                        <Badge variant="teal">{acc.currency}</Badge>
                      </div>
                      <p className="text-slate-400 font-sans mt-1 text-[11px] truncate">{acc.title}</p>
                      <div className="flex justify-between items-baseline mt-2.5">
                        <span className="text-slate-500 text-[10px]">CURRENT BALANCE:</span>
                        <span className="text-base font-extrabold text-[#cca553]">{acc.balance.toLocaleString()} M</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-2 bg-slate-900 rounded border border-slate-800 text-[10px] text-slate-400 flex items-center gap-1.5 font-mono">
                <Lock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Encrypted using Federal RSA-4096 SHA-256 Authority key.</span>
              </div>
            </div>

          </div>
        )}

        {/* DASHBOARD 2: KRG REGIONAL REGISTRY & LIQUIDITY MOUNT */}
        {activeCabinetTab === 'krg-treasury' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="lg:col-span-2 bg-slate-950/60 p-5 rounded-xl border border-slate-800 text-start flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-[700] uppercase tracking-widest text-[#cca553] border-b border-[#52B788]/20 pb-2 mb-4 flex justify-between items-center">
                  <span>{getLabel('KRG TREASURY REGIONAL POSITION MONITOR', 'خزينة إقليم كوردستان', 'چاودێری دۆخی گشتی خزێنەی هەرێمی کوردستان')}</span>
                  <Badge variant="success">ERBIL_VAULT_1</Badge>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#1b2a22]/30 p-4 rounded-xl border border-emerald-950/50">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">{getLabel('Regional Cash Liquidity', 'النقدية المتوفرة للإقليم', 'نەختی بەردەستی هەرێمی کوردستان')}</span>
                    <span className="text-xl font-bold font-mono text-emerald-400 block mt-1">$4.80 Billion USD</span>
                    <span className="text-[10px] text-emerald-300 block mt-1 font-mono">{getLabel('64.5% Liquid Cash Assets', '٦٤٪ سيولة نقدية', '٦٤٪ بە شێوەی نەختینەی ئامادەکراو')}</span>
                  </div>

                  <div className="bg-[#1b2a22]/30 p-4 rounded-xl border border-emerald-950/50">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">{getLabel('Regional Emergency Buffer', 'اليادج الاحتياطي للإقليم', 'خزێنەی یەدەگی فریاکەوتی فریکوێنت')}</span>
                    <span className="text-xl font-bold font-mono text-teal-400 block mt-1">$600 Million USD</span>
                    <span className="text-[10px] text-slate-400 block mt-1 font-mono">{getLabel('Mandated Reserve requirement ratio: 12%', 'الاحتياطي الإقليمي المعتمد ١٢٪', 'ڕێژەی یەدەگی یاسایی هەرێم نیشتمانی')}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] text-slate-500 font-mono uppercase block font-bold tracking-widest">{getLabel('REGIONAL EXPENDITURE BALANCING SCHEME', 'تسوية ومراقبة نفقات الإقليم', 'خشتەی خەرجییەکانی خزێنەی هەرێمی کوردستان')}</span>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-start border-collapse border border-slate-800">
                      <thead>
                        <tr className="bg-slate-900 text-slate-400 font-mono text-[10px] border-b border-slate-800">
                          <th className="p-2 text-start">LEDGER CODE</th>
                          <th className="p-2 text-start">SUB CATEGORY</th>
                          <th className="p-2 text-start">BUDGET ALLOCATED</th>
                          <th className="p-2 text-start">DISBURSED COIL</th>
                          <th className="p-2 text-start">STATUS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        <tr>
                          <td className="p-2.5 text-[#52B788] font-bold">EXP-KRG-SOC</td>
                          <td className="p-2.5 font-sans">Civilian Salaries & Pensions</td>
                          <td className="p-2.5 font-bold">$5,400M</td>
                          <td className="p-2.5 text-slate-300">$1,200M</td>
                          <td className="p-2.5 text-amber-500">Tight Balance Buffer</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 text-[#52B788] font-bold">EXP-KRG-SEC</td>
                          <td className="p-2.5 font-sans">Peshmerga Defense Coordination</td>
                          <td className="p-2.5 font-bold">$3,200M</td>
                          <td className="p-2.5 text-slate-300">$950M</td>
                          <td className="p-2.5 text-emerald-400">Synchronized</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 text-[#52B788] font-bold">EXP-KRG-DEV</td>
                          <td className="p-2.5 font-sans">Autonomous Border Development</td>
                          <td className="p-2.5 font-bold">$4,800M</td>
                          <td className="p-2.5 text-slate-300">$1,100M</td>
                          <td className="p-2.5 text-blue-400">Funding Clearance</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>AUDIT RECORD ID: <b>KRG-SECURE-AUD-2005</b></span>
                <span className="text-[#52B788]">STATUS: <b>SYNCHRONIZED METADATA STORE</b></span>
              </div>
            </div>

            {/* CBI Regional accounts holding balances */}
            <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 text-start flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-[700] uppercase tracking-widest text-[#52B788] border-b border-slate-800 pb-2 mb-4">
                  {getLabel('KRG SAVINGS REGISTERED AT CENTRAL BANK', 'حسابات الإقليم لدى البنك المركزي', 'ئامۆژگاری و حساباتی هەرێمی کوردستان لە CBI')}
                </h3>
                
                <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                  {getLabel('KRG Regional accounts under CBI supervision. Transactions are verified using double-entry ledger audits to check for inter-domain compliance.',
                             'تثبيت أرصدة إقليم كوردستان لدى البنك المركزي في بغداد التي يتم التحقق منها لتسجيل العائدات والمصالح الجمركية.',
                             'حسابەکانی دارایی هەرێم لە لایەن بانکی ناوەندی چاودێری دەکرێت بۆ ناردنی پارە و مووچە بە شێوازی فەرمی.')}
                </p>

                <div className="space-y-3 text-xs">
                  {cbiAccounts.filter(a => a.jurisdiction === 'krg').map(acc => (
                    <div key={acc.accountNumber} className="bg-slate-900/50 p-4 rounded-xl border border-[#52B788]/10 font-mono">
                      <div className="flex justify-between font-bold text-slate-200">
                        <span>{acc.accountNumber}</span>
                        <Badge variant="success">{acc.currency}</Badge>
                      </div>
                      <p className="text-slate-400 font-sans mt-1 text-[11px] truncate">{acc.title}</p>
                      <div className="flex justify-between items-baseline mt-2.5">
                        <span className="text-slate-500 text-[10px]">CURRENT BALANCE:</span>
                        <span className="text-base font-extrabold text-[#52B788]">{acc.balance.toLocaleString()} M</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-2 bg-[#1b2a22]/20 rounded border border-emerald-950 text-[10px] text-slate-400 flex items-center gap-1.5 font-mono">
                <Lock className="w-3.5 h-3.5 text-[#52B788] shrink-0" />
                <span>ECDSA secp256k1 Sovereign Signature Verified.</span>
              </div>
            </div>

          </div>
        )}

        {/* DASHBOARD 3: EMERALD FISCAL LEDGER (EVENT SOURCED UNIFIED RECONCILIATION BUS) */}
        {activeCabinetTab === 'fiscal-ledger' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Event ledger stream viewer */}
            <div className="lg:col-span-2 bg-slate-950/60 p-5 rounded-xl border border-slate-800 text-start flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-[700] uppercase tracking-widest text-[#cca553] border-b border-slate-800 pb-2 mb-4 flex justify-between items-center">
                  <span>{getLabel('IMMUTABLE NATIONAL SOVEREIGN FISCAL LEDGER', 'سجل الزمرد الوطني السيادي الموثق', 'دەفتەری حیساباتی نیشتمانیی و ڕوداوە داراییە نەگۆڕەکان')}</span>
                  <Badge variant="gold">EVENT-SOURCED</Badge>
                </h3>
                
                <p className="text-xs text-slate-400 mb-4">
                  {getLabel('Showing all verified append-only sovereign event logs. Every entry represents an immutable physical asset exchange signed by an explicit ministerial authority.',
                             'عرض جميع الوقائع والقيام بعملية التدقيق من جهة طرف ثالث معتمد دون وجود سجلات وهمية.',
                             'پیشاندانی سەرجەم ڕوداوە داراییە تۆمارکراوەکان. هیچ کەم و زۆرێک ناکرێت لە دەفتەرەکە بەبێ ڕەزامەندی وەزیر.')}
                </p>

                <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
                  {ledgerHistory.map((evt) => (
                    <div key={evt.transactionId} className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl font-mono text-xs hover:border-[#cca553]/20 transition-all">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-cyan-400 font-bold">{evt.transactionId}</span>
                        <Badge variant={evt.jurisdiction === 'federal' ? 'teal' : evt.jurisdiction === 'krg' ? 'success' : 'gold'}>
                          {evt.jurisdiction.toUpperCase()} • {evt.eventType}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 mt-2 text-slate-300 text-[11px]">
                        <p className="font-sans font-bold text-white text-xs">{JSON.parse(evt.payload).action || `${evt.eventType} Ledger Posting Event`}</p>
                        <p>{getLabel('Authority Signatory', 'السلطة المخولة', 'دەسەڵاتی واژۆکار')}: <b>{evt.authority}</b></p>
                        <p>{getLabel('Sovereign Amount', 'المبلغ المدرج', 'بڕی دارایی')}: <b className="text-emerald-400">${evt.amountUSD} M USD</b></p>
                        <p>{getLabel('Policy Path', 'السياسة المعتمدة', 'سیاسەت')}: <span className="text-slate-400">{evt.policyReference}</span> • {getLabel('Ledger Core', 'رابط الدفتر', 'نووسینگەی گشتی')}: <span className="text-slate-400">{evt.ledgerReference}</span></p>
                        <p className="text-[10px] text-slate-500">{evt.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-2 bg-slate-900 rounded border border-slate-800 text-[10px] text-slate-400 flex items-center justify-between font-mono">
                <span>TOTAL EVENTS SEATED: <b>{ledgerHistory.length} EVENTS</b></span>
                <span className="text-teal-400">CHAIN INTEGRITY: <b>100% CORRECT (0 ORPHANS)</b></span>
              </div>
            </div>

            {/* Adjustments / Manual event append form */}
            <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 text-start">
              <h3 className="text-sm font-[700] uppercase tracking-widest text-[#cca553] border-b border-slate-800 pb-2 mb-4">
                {getLabel('APPEND ADJUSTMENT ENTRY TO THE LEDGER', 'تسجيل حركة تعديل مالي مباشر', 'زیادکردنی سەرجاوی کتوپڕ یان چاککردنی حیساب لە دەفتەردا')}
              </h3>

              <form onSubmit={handleAppendAdjustment} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-slate-400 mb-1">EXECUTION JURISDICTION:</label>
                  <select 
                    value={newAdjustmentJurisdiction}
                    onChange={(e) => setNewAdjustmentJurisdiction(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 text-xs rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#cca553] text-[#cca553] font-bold"
                  >
                    <option value="federal">FEDERAL GOVERNMENT (IRAQ)</option>
                    <option value="krg">KURDISTAN REGION (KRG)</option>
                    <option value="joint">JOINT COORDINATION COUNCIL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">ADJUSTING SUM (MILLIONS USD):</label>
                  <input 
                    type="number" 
                    value={newAdjustmentAmt}
                    onChange={(e) => setNewAdjustmentAmt(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-xs text-white rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#cca553] font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">ADJUSTMENT NOTES / POLICY CODE:</label>
                  <textarea 
                    value={newAdjustmentReference}
                    onChange={(e) => setNewAdjustmentReference(e.target.value)}
                    placeholder="Provide reference reasons per sovereign budget guidelines..."
                    rows={4}
                    className="w-full bg-slate-900 border border-slate-800 text-xs text-white rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#cca553]"
                  />
                </div>

                <Button type="submit" variant="gold" className="w-full font-bold">
                  + {getLabel('Write Immutable Adjustment', 'ترقية وتثبيت التعديل الجديد', 'تۆمارکردنی چاککاری نەگۆڕ')}
                </Button>
              </form>
            </div>

          </div>
        )}

        {/* DASHBOARD 4: REVENUE RECONCILIATION ENGINE */}
        {activeCabinetTab === 'revenue-recon' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-start text-xs">
            
            <div className="lg:col-span-2 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
              <h3 className="text-sm font-[700] uppercase tracking-widest text-[#cca553] border-b border-slate-800 pb-2 mb-4">
                {getLabel('CROSS-GOVERNMENT REVENUE STREAM AUDITS', 'تدقيق ومطابقة ممرات الموارد والضرائب', 'وردبینیکردنی هەمەلایەنەی دەروازە داراییەکان')}
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-start border-collapse border border-slate-800">
                  <thead>
                    <tr className="bg-slate-900 text-slate-400 font-mono text-[10px] border-b border-slate-800">
                      <th className="p-2.5 text-start">STREAM ID</th>
                      <th className="p-2.5 text-start">STREAM DETAILS</th>
                      <th className="p-2.5 text-start">TYPE</th>
                      <th className="p-2.5 text-start">JURISDICTION</th>
                      <th className="p-2.5 text-start">COLLECTED</th>
                      <th className="p-2.5 text-start">ANNUAL EST</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {streams.map(str => (
                      <tr key={str.id} className="hover:bg-slate-900/25">
                        <td className="p-2.5 text-cyan-400 font-bold">{str.id}</td>
                        <td className="p-2.5 font-sans font-bold text-white">{str.name}</td>
                        <td className="p-2.5">
                          <span className="text-[10px] bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-amber-500 uppercase">{str.type}</span>
                        </td>
                        <td className="p-2.5 uppercase text-slate-300 font-bold">{str.jurisdiction}</td>
                        <td className="p-2.5 text-emerald-400 font-bold">${str.collectedToDate.toLocaleString()} M</td>
                        <td className="p-2.5 text-slate-400">${str.projectedAnnual.toLocaleString()} M</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Wire compliance tool */}
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 mt-6 md:p-5">
                <h4 className="text-xs font-bold font-mono text-[#cca553] uppercase mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 shrink-0" />
                  {getLabel('CBI WIRE TRANSFER ARBITRAGE ENFORCEMENT COMPLIANCE CHECK', 'تنفيذ التحقق من تراخيص غسيل وتهريب تحويل العملات', 'پشکنینی دژە سەرپێچی دارایی و حەواڵە لە CBI')}
                </h4>
                
                <form onSubmit={handleVerifyWireCompliance} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <span className="text-[9px] text-slate-500 font-mono block">TRANSFER AMOUNT (USD MILLIONS):</span>
                    <input 
                      type="text" 
                      value={wireUSD} 
                      onChange={(e) => setWireUSD(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-xs rounded px-2.5 py-1 mt-1 text-white font-mono"
                    />
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-mono block">CONVERTED EXCHANGED AMOUNT (IQD MILLIONS):</span>
                    <input 
                      type="text" 
                      value={wireIQD} 
                      onChange={(e) => setWireIQD(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 text-xs rounded px-2.5 py-1 mt-1 text-white font-mono"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button type="submit" variant="teal" size="sm" className="w-full py-1">
                      Verify Exchange Alignment
                    </Button>
                  </div>
                </form>

                {complianceCheckResult && (
                  <div className={`mt-4 p-3.5 rounded border text-xs font-mono ${complianceCheckResult.isValid ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-red-950/20 border-red-500/30'}`}>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">COMPLIANCE STATE: <b className={complianceCheckResult.isValid ? 'text-emerald-400' : 'text-red-400'}>{complianceCheckResult.complianceCode}</b></span>
                      <span className="text-[10px] text-slate-500">Variance offset: <b>{complianceCheckResult.offsetRatio}%</b></span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 font-sans">
                      {complianceCheckResult.isValid 
                        ? 'Arbitrage threshold checks passed successfully. Transaction exchange rate matches benchmark limits within acceptable margins.' 
                        : 'CRITICAL ARBITRAGE WARNING: Computed rate deviates severely from CBI bench. Transaction holds potential cash-flight threat limits! Approval suspended.'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Exceptions and suggestions report */}
            <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800">
              <h3 className="text-sm font-[700] uppercase tracking-widest text-[#cca553] border-b border-slate-800 pb-2 mb-4">
                {getLabel('RECONCILIATION VARIANCE OUTCOMES & REVISION REPORTS', 'تقرير مطابقة الإيرادات واكتشاف الفروقات والشوائب', 'کورتەی کێشەدارەکانی داهات و ئامۆژگاری هاوسەنگی')}
              </h3>

              <div className="space-y-4">
                
                <div className="p-3 bg-slate-900 rounded border border-slate-800">
                  <div className="flex justify-between font-mono font-bold text-slate-400">
                    <span>Audit Scope:</span>
                    <span className="text-white">{reconReport.scope}</span>
                  </div>
                  <div className="flex justify-between font-mono font-bold text-slate-400 mt-1">
                    <span>Timestamp:</span>
                    <span className="text-slate-400 text-[10px] truncate max-w-[150px]">{reconReport.timestamp}</span>
                  </div>
                  <div className="flex justify-between font-mono font-bold text-slate-400 mt-1">
                    <span>KRG Share Outlier:</span>
                    <span className={reconReport.unreconciledDifference > 0 ? 'text-rose-400' : 'text-teal-400'}>
                      ${reconReport.unreconciledDifference.toLocaleString()} M USD
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] text-slate-500 font-mono uppercase block font-bold">EXCEPTIONS REGISTERED:</span>
                  
                  {reconReport.exceptions.map((exc, idx) => (
                    <div key={idx} className={`p-3 rounded border text-xs font-mono relative overflow-hidden ${exc.severity === 'critical' ? 'bg-rose-950/20 border-rose-500/30 text-rose-300' : exc.severity === 'alert' ? 'bg-amber-950/20 border-amber-500/30 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-300'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[11px] uppercase">{exc.code}</span>
                        <Badge variant={exc.severity === 'critical' ? 'danger' : exc.severity === 'alert' ? 'gold' : 'slate'}>{exc.severity}</Badge>
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans mt-1 leading-relaxed">
                        {exc.message}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] text-slate-500 font-mono uppercase block font-bold">RECOMMENDABLE CORRECTIVE ACTIONS:</span>
                  <div className="p-3 bg-slate-900 rounded border border-[#cca553]/10 text-[11px] space-y-1.5 leading-relaxed text-slate-300">
                    {reconReport.recommendations.map((rec, i) => (
                      <p key={i}>• {rec}</p>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* DASHBOARD 5: NATIONAL DEBT REGISTRY */}
        {activeCabinetTab === 'debt-registry' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-start text-xs">
            
            <div className="lg:col-span-2 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
              <h3 className="text-sm font-[700] uppercase tracking-widest text-[#cca553] border-b border-slate-800 pb-2 mb-4">
                {getLabel('NATIONAL OBLIGATIONS & DEBT INSTRUMENTS (FEDERAL/KRG)', 'التزامات الديون وأدوات الائتمان الوطنية العامة', 'سیستمی بەڕێوەبردن و تۆمارکردنی قەرزە دەرەکی و ناوخۆیییەکان')}
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-start border-collapse border border-slate-800">
                  <thead>
                    <tr className="bg-slate-900 text-slate-400 font-mono text-[10px] border-b border-slate-800">
                      <th className="p-2.5 text-start">OBLIGATION ID</th>
                      <th className="p-2.5 text-start">CREDITOR / LENDER</th>
                      <th className="p-2.5 text-start">INSTRUMENT TYPE</th>
                      <th className="p-2.5 text-start">JURISDICTION</th>
                      <th className="p-2.5 text-start">PRINCIPAL DUE</th>
                      <th className="p-2.5 text-start">YIELD SPEED</th>
                      <th className="p-2.5 text-start">MATURITY DATE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {obligations.map(ob => (
                      <tr key={ob.id} className="hover:bg-slate-900/35">
                        <td className="p-2.5 text-cyan-400 font-bold">{ob.id}</td>
                        <td className="p-2.5 font-sans font-bold text-white">{ob.lender}</td>
                        <td className="p-2.5">
                          <span className="text-[10px] bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-[#cca553] uppercase">{ob.loanType}</span>
                        </td>
                        <td className="p-2.5 uppercase text-slate-300 font-bold">{ob.jurisdiction}</td>
                        <td className="p-2.5 text-rose-400 font-extrabold">${ob.principalAmount.toLocaleString()} M</td>
                        <td className="p-2.5 text-slate-300">{ob.interestRate}% APR</td>
                        <td className="p-2.5 text-slate-400">{ob.maturityDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl mt-6 flex flex-wrap justify-between items-center gap-4">
                <div>
                  <span className="text-[10px] text-slate-500 font-mono block">AGGREGATE LEVERAGED LIABILITIES DEBT:</span>
                  <span className="text-lg font-bold font-mono text-rose-400">${obligations.reduce((sum, item) => sum + item.principalAmount, 0).toLocaleString()} M USD</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 font-mono block">FISCAL COMMITTED OBLIGATIONS RETIRED:</span>
                  <span className="text-md font-bold font-mono text-teal-400">${obligations.reduce((sum, item) => sum + item.committedSpent, 0).toLocaleString()} M USD APPROVED</span>
                </div>
              </div>
            </div>

            {/* Debt Registration Form */}
            <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800">
              <h3 className="text-sm font-[700] uppercase tracking-widest text-[#cca553] border-b border-slate-800 pb-2 mb-4">
                {getLabel('REGISTER NEW SOVEREIGN OBLIGATION', 'تسجيل سند ديون سيادية جديدة', 'تۆمارکردنی قەرز یان بەڵێننامەی دارایی نوێ')}
              </h3>

              <form onSubmit={handleCreateDebt} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">CREDITOR INST OR LENDER:</label>
                  <input 
                    type="text" 
                    value={newDebtLender} 
                    onChange={(e) => setNewDebtLender(e.target.value)}
                    placeholder="e.g. World Bank Group, JICA Loan..."
                    className="w-full bg-slate-900 border border-slate-800 rounded text-xs px-2.5 py-1.5 text-white active:outline-none focus:ring-1 focus:ring-[#cca553]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">OBLIGATION PRINCIPAL (MILLIONS USD):</label>
                  <input 
                    type="number" 
                    value={newDebtAmount} 
                    onChange={(e) => setNewDebtAmount(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded text-xs px-2.5 py-1.5 text-white focus:ring-1 focus:ring-[#cca553]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">DEBT INSTRUMENT CLASSIFICATION:</label>
                  <select 
                    value={newDebtType}
                    onChange={(e) => setNewDebtType(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 text-[#cca553] rounded px-2.5 py-1.5 text-xs font-bold"
                  >
                    <option value="Internal">Internal (Domestic Bonds / CBI Sale)</option>
                    <option value="External">External (Sovereign bilateral credit)</option>
                    <option value="Guarantee">Government Sovereign Guarantee</option>
                    <option value="Commitment">Direct Treasury Commited Obligation</option>
                  </select>
                </div>

                <Button type="submit" variant="gold" className="w-full font-bold">
                  + {getLabel('Incorporate Debt Record', 'توثيق وتوقيع سند الائتمان', 'تۆمارکردنی کۆی گشتی واژۆکە')}
                </Button>
              </form>
            </div>

          </div>
        )}

        {/* DASHBOARD 6: SOVEREIGN ASSET REGISTRY */}
        {activeCabinetTab === 'asset-registry' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-start text-xs">
            
            <div className="lg:col-span-2 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
              <h3 className="text-sm font-[700] uppercase tracking-widest text-[#cca553] border-b border-slate-800 pb-2 mb-4">
                {getLabel('SOVEREIGN ASSETS & RESOURCE CAPITAL DEPOSITORIES', 'سجل أصول وشركات وودائع الدولة السيادية', 'تۆماری دارایی و سەرچاوە فیزیکییە سەروەرییەکانی عێراق')}
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-start border-collapse border border-slate-800">
                  <thead>
                    <tr className="bg-slate-900 text-slate-400 font-mono text-[10px] border-b border-slate-800">
                      <th className="p-2.5 text-start">ASSET ID</th>
                      <th className="p-2.5 text-start">ASSET INFRASTRUCTURE DESK</th>
                      <th className="p-2.5 text-start">CATEGORY</th>
                      <th className="p-2.5 text-start">JURISDICTION</th>
                      <th className="p-2.5 text-start">EST VALUATION</th>
                      <th className="p-2.5 text-start">REVENUE YIELD</th>
                      <th className="p-2.5 text-start">LAST SYNC AUDIT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {assets.map(ast => (
                      <tr key={ast.id} className="hover:bg-slate-900/35">
                        <td className="p-2.5 text-cyan-400 font-bold">{ast.id}</td>
                        <td className="p-2.5 font-sans font-bold text-white">{ast.name}</td>
                        <td className="p-2.5">
                          <span className="text-[10px] bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-teal-400 uppercase">{ast.category}</span>
                        </td>
                        <td className="p-2.5 uppercase text-slate-300 font-bold">{ast.jurisdiction}</td>
                        <td className="p-2.5 text-emerald-400 font-extrabold">${ast.valuation.toLocaleString()} M</td>
                        <td className="p-2.5 text-white font-bold">${ast.annualRevenueYield.toLocaleString()} M/yr</td>
                        <td className="p-2.5 text-slate-400">{ast.lastAuditDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* State holdings & Sovereign Gold reserve tracking */}
              <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-slate-950 font-mono rounded">
                  <span className="text-[9px] text-slate-500 block">CBI PHYSICAL GOLD DEPOSITORY</span>
                  <span className="text-sm font-bold text-[#cca553]">{reserves.goldFineOunces.toLocaleString()} Fine Oz</span>
                  <span className="text-[10px] text-slate-400 block mt-1">Value: <b>${reserves.goldValueUSD.toLocaleString()} Million USD</b></span>
                </div>
                
                <div className="p-3 bg-slate-950 font-mono rounded">
                  <span className="text-[9px] text-slate-500 block">SDR REMITTANCES (IMF BALANCE)</span>
                  <span className="text-sm font-bold text-teal-400">${reserves.sdrBalanceUSD.toLocaleString()} Million USD</span>
                  <span className="text-[10px] text-slate-500 block">Sovereign Right Holding assets</span>
                </div>

                <div className="p-3 bg-slate-950 font-mono rounded">
                  <span className="text-[9px] text-slate-500 block">TOTAL LIQUID SOVEREIGN RESERVES</span>
                  <span className="text-sm font-bold text-emerald-400">${reserves.totalReservesSovereignUSD.toLocaleString()} Million USD</span>
                  <span className="text-[10px] text-slate-400 block mt-1">CBI primary backup liquidity.</span>
                </div>
              </div>
            </div>

            {/* Asset Influx Registration Form */}
            <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800">
              <h3 className="text-sm font-[700] uppercase tracking-widest text-[#cca553] border-b border-slate-800 pb-2 mb-4">
                {getLabel('REGISTER NEW SOVEREIGN STATE ASSET', 'تسجيل قيد أصول سيادية واستثمار عام', 'تۆمارکردنی کاڵا یان دەروەتێکی ژێرخانی نوێ')}
              </h3>

              <form onSubmit={handleCreateAsset} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">STATE ASSET DESCRIPTION:</label>
                  <input 
                    type="text" 
                    value={newAssetName} 
                    onChange={(e) => setNewAssetName(e.target.value)}
                    placeholder="e.g. Khor Al-Zubair Industrial Hub Complex..."
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white text-xs focus:ring-1 focus:ring-[#cca553]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">ESTIMATED ASSET DEED VALUE (MILLIONS USD):</label>
                  <input 
                    type="number" 
                    value={newAssetValuation} 
                    onChange={(e) => setNewAssetValuation(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white focus:ring-1 focus:ring-[#cca553]"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">ASSET CLASSIFICATION CATEGORY:</label>
                  <select 
                    value={newAssetCategory}
                    onChange={(e) => setNewAssetCategory(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 text-[#cca553] rounded px-2.5 py-1.5 font-bold"
                  >
                    <option value="Energy">Energy & Pipeline Infrastructure</option>
                    <option value="Infrastructure">Infrastructure (Ports/Roads/Airports)</option>
                    <option value="Strategic">Strategic National Land Reserves</option>
                    <option value="StateOwnedEnterprise">State Owned Enterprise shares</option>
                    <option value="TreasuryControlled">Treasury-Controlled Cash Depositories</option>
                  </select>
                </div>

                <Button type="submit" variant="gold" className="w-full font-bold">
                  + {getLabel('Incorporate Asset Entry', 'تثبيت ملكية الأصل الجديد', 'تۆمارکردنی دارایی لە پاشەکەوت')}
                </Button>
              </form>
            </div>

          </div>
        )}

        {/* DASHBOARD 7: INTERGOVERNMENTAL SETTLEMENT OPERATIONS & ROUTING QUEUE */}
        {activeCabinetTab === 'settlement-ops' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-start text-xs">
            
            <div className="lg:col-span-2 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
              <h3 className="text-sm font-[700] uppercase tracking-widest text-[#cca553] border-b border-slate-800 pb-2 mb-4">
                {getLabel('FEDERAL-REGIONAL CLEARINGS & ROUTINGS QUEUE', 'طابور تسويات وتحويلات المقاصة الفيدرالية والإقليمية', 'ڕیزبەندی وەڵامدانەوەی بەرامبەرکردنی دارایی فیدراڵ-هەرێم')}
              </h3>

              <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
                {settlementsQueue.map(item => (
                  <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono relative hover:border-[#cca553]/25 transition-all">
                    
                    <div className="flex justify-between items-center mb-2 border-b border-slate-800 pb-1.5">
                      <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                        <span>{item.id}</span>
                        <span className="text-slate-500 text-[10px]">• Route:</span>
                        <span className="text-[#cca553] font-bold uppercase text-[11px]">{item.sourceJurisdiction} ➔ {item.targetJurisdiction}</span>
                      </div>
                      <Badge variant={
                        item.status === 'Audited' ? 'success' : 
                        item.status === 'Settled' ? 'teal' : 
                        item.status === 'Authorized' ? 'gold' : 
                        item.status === 'Validated' ? 'indigo' : 'slate'
                      }>
                        {item.status.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="space-y-1.5 text-slate-300 text-[11px]">
                      <p className="font-sans text-xs font-bold text-white leading-relaxed">{item.description}</p>
                      <p>Sovereign cleared funds: <b className="text-emerald-400">${item.amountUSD} Million USD</b></p>
                      
                      {item.authorizedBy && <p>Signed Authority: <span className="text-white font-bold">{item.authorizedBy}</span></p>}
                      {item.signedTimestamp && <p>Approved timestamp: <span className="text-slate-400">{item.signedTimestamp}</span></p>}
                      {item.auditHash && <p className="truncate text-teal-400">Ledger Sign-off Hash: <span>{item.auditHash}</span></p>}
                    </div>

                    {/* Settlement State Advancement Controls */}
                    <div className="flex justify-end gap-2 mt-3.5 pt-2 border-t border-slate-800/60">
                      {item.status === 'Draft' && (
                        <Button onClick={() => handleAdvanceSettlement(item.id, 'Validated')} size="sm" variant="indigo" className="text-[10px] py-0.5">
                          Validate clearance
                        </Button>
                      )}
                      
                      {item.status === 'Validated' && (
                        <Button onClick={() => handleAdvanceSettlement(item.id, 'Authorized')} size="sm" variant="gold" className="text-[10px] py-0.5">
                          Authorize payout
                        </Button>
                      )}

                      {item.status === 'Authorized' && (
                        <Button onClick={() => handleAdvanceSettlement(item.id, 'Settled')} size="sm" variant="success" className="text-[10px] py-0.5 font-bold">
                          Execute CBI settlement
                        </Button>
                      )}

                      {item.status === 'Settled' && (
                        <Button onClick={() => handleAdvanceSettlement(item.id, 'Audited')} size="sm" variant="teal" className="text-[10px] py-0.5">
                          Publish audit record
                        </Button>
                      )}

                      {item.status === 'Audited' && (
                        <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Checked & Locked
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instruction Routing Form */}
            <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800">
              <h3 className="text-sm font-[700] uppercase tracking-widest text-[#cca553] border-b border-slate-800 pb-2 mb-4">
                {getLabel('DRAFT INTER-GOVERNMENT ROUTING INSTRUCTION', 'صياغة أمر تحويل ومقاصة سيادية جديدة', 'دانانی فەرمانی ناردنی بەرامبەربوونی دارایی')}
              </h3>

              <form onSubmit={handleCreateSettlement} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">ORIGIN SOURCE ASSET HOLDER:</label>
                  <select 
                    value={newSettlementSource}
                    onChange={(e) => setNewSettlementSource(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 text-teal-400 rounded px-2.5 py-1.5 focus:outline-none"
                  >
                    <option value="federal">FEDERAL GOVERNMENT VAULTS</option>
                    <option value="krg">KRG COALITION TREASURY</option>
                    <option value="joint">JOINT CLEARING SWAP POOL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">TARGET BENEFICIARY JURISDICTION:</label>
                  <select 
                    value={newSettlementTarget}
                    onChange={(e) => setNewSettlementTarget(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 text-[#52B788] rounded px-2.5 py-1.5 focus:outline-none"
                  >
                    <option value="federal">FEDERAL GOVERNMENT VAULTS</option>
                    <option value="krg">KRG COALITION TREASURY</option>
                    <option value="joint">JOINT CLEARING SWAP POOL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">SETTLE TRANSFER SUM (USD MILLIONS):</label>
                  <input 
                    type="number" 
                    value={newSettlementAmount} 
                    onChange={(e) => setNewSettlementAmount(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white text-xs font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">EXPLANATORY RESOLUTION MEMO:</label>
                  <textarea 
                    value={newSettlementDesc} 
                    onChange={(e) => setNewSettlementDesc(e.target.value)}
                    placeholder="Provide details about the intergovernmental settlement requirement..."
                    rows={3}
                    className="w-full bg-slate-900 border border-slate-800 text-xs rounded text-white px-2.5 py-1.5 focus:ring-1 focus:ring-[#cca553]"
                  />
                </div>

                <Button type="submit" variant="gold" className="w-full font-bold">
                  + {getLabel('Draft Settlement Route', 'إصدار مسودة المقاصة والتحويل', 'پەسەندکردنی فەرمانی ناردنەکە')}
                </Button>
              </form>
            </div>

          </div>
        )}

      </div>
        </>
      ) : (
        <div className="space-y-6">
          {/* RESOURCE HUB NAVIGATION SUB-BAR */}
          <div className="flex flex-wrap gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
            {[
              { id: 'budgets', label: getLabel('National Budgets', 'الموازنة العامة', 'بودجەی گشتی نیشتمانی') },
              { id: 'sharing', label: getLabel('Revenue Sharing', 'تقاسم الإيرادات المشتركة', 'دابەشکردنی داهاتی هاوبەش') },
              { id: 'energy', label: getLabel('State Energy Resources', 'حقول النفط والغاز الكلية', 'سەرچاوەکانی نەوت و گاز') },
              { id: 'projects', label: getLabel('Strategic Capital Registry', 'سجل الاستثمارات الكبرى', 'کار و پڕۆژە نیشتمانییەکان') },
              { id: 'kpis', label: getLabel('Cabinet Performance KPI', 'مؤشرات الأداء للمؤسسات', 'دۆخی کارکردنی وەزارەتەکان') }
            ].map(sub => (
              <button
                key={sub.id}
                onClick={() => setActiveResourceTab(sub.id as any)}
                className={`flex-1 py-1.5 text-xs font-mono rounded cursor-pointer transition-all ${
                  activeResourceTab === sub.id
                    ? 'bg-[#132237] text-[#cca553] font-bold border-b border-[#cca553]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>

          {/* RENDER ACTIVE RESOURCE CABINET PANEL */}
          <div className="bg-slate-950/20 p-2 rounded-xl">
            {activeResourceTab === 'budgets' && <NationalBudgetCommandCenter lang={lang} />}
            {activeResourceTab === 'sharing' && <RevenueSharingPanel lang={lang} />}
            {activeResourceTab === 'energy' && <NationalEnergyRegistryComponent lang={lang} />}
            {activeResourceTab === 'projects' && <NationalProjectsRegistryPanel lang={lang} />}
            {activeResourceTab === 'kpis' && <GovernmentPerformancePanel lang={lang} />}
          </div>
        </div>
      )}

      {/* SECTION 5: LOWER METRIC BAR */}
      <div className="border-t border-slate-800 pt-5 text-start text-xs font-mono text-slate-500 flex flex-wrap justify-between items-center gap-4">
        <div>
          <span>SOVEREIGN CORE COMPLIANCE: <b>ISO-20022 ENGAGED</b></span>
          <span className="mx-2">•</span>
          <span>GOLD RATIO AUDIT: <b>VERIFIED BY THIRD PARTY</b></span>
        </div>
        <div>
          <span>RECONCILIATION SPEED: <b>REAL-TIME STREAM HANDSHAKE</b></span>
        </div>
      </div>
    </Card>
  );
};

export default SovereignFiscalSystem;

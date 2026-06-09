import React, { useState } from 'react';
import { 
  Landmark, Cpu, Coins, TrendingUp, AlertTriangle, 
  CheckCircle2, FileText, Lock, RefreshCw, BarChart2, ShieldCheck, Activity, Database
} from 'lucide-react';
import { Card, Badge, Button } from '../../ui';

// Import our Shared Reconciliation Engine
import { RevenueReconciliationEngine, JointReconciliationReport } from './RevenueReconciliationEngine';

export default function JointRevenueDashboard() {
  const [ticker, setTicker] = useState(0);
  const [reconReport, setReconReport] = useState<JointReconciliationReport>(() => 
    RevenueReconciliationEngine.reconcileRevenue()
  );

  const handleReconcile = () => {
    // Run the secure hashed reconciliation
    const report = RevenueReconciliationEngine.reconcileRevenue();
    setReconReport(report);
    setTicker(prev => prev + 1);
  };

  const fedReport = reconReport.federalHashedReport;
  const krgReport = reconReport.krgHashedReport;

  // Joint total aggregated secure receipts
  const jointAggregatedCustomsUSD = fedReport.customsTotalUSD + krgReport.customsTotalUSD;
  const jointAggregatedBorderFeesUSD = fedReport.borderFeeTotalUSD + krgReport.borderFeeTotalUSD;
  const jointAggregatedTaxUSD = fedReport.taxTotalUSD + krgReport.taxTotalUSD;
  const jointCombinedTotalUSD = fedReport.totalCollectedUSD + krgReport.totalCollectedUSD;

  return (
    <div className="space-y-6 text-right">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-[#0b1528] p-6 rounded-2xl border border-amber-500/30 shadow-xl gap-4">
        <div className="flex items-center gap-3 justify-end md:order-2">
          <Button variant="gold" size="sm" onClick={handleReconcile} className="bg-amber-600 hover:bg-amber-700 text-slate-900 font-bold">
            <RefreshCw className="w-4 h-4 mr-2 animate-spin-hover" />
            جێبەجێکردنی هاوتاکردن و چاودێری
          </Button>
          <div className="bg-slate-950 px-4 py-2 rounded-xl text-center border border-slate-800">
            <span className="text-[10px] text-slate-500 block uppercase font-mono">Proof Hash</span>
            <span className="text-amber-400 text-xs font-bold font-mono">{reconReport.reconciliationProofHash.substring(0, 16)}...</span>
          </div>
        </div>
        <div className="text-right md:order-1">
          <div className="flex items-center gap-2 justify-end">
            <Badge variant="gold">لێژنەی هەماهەنگی هاوبەشی داهات</Badge>
            <span className="text-[10px] uppercase font-mono text-amber-500 font-bold block">JOINT RECONCILIATION LAYER ONLY (RESTRICTED)</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">سەنتەری یەکگرتنەوە و هاوڕێکی داهاتە نیشتمانییەکان</h2>
          <p className="text-xs text-slate-400 mt-1">
            لێکۆڵینەوە لە هاوتاکردنی داهاتی عێراقی فیدراڵ و هەرێمی کوردستان تەنها لە ڕێگەی کلیلە دیجیتاڵییە هاکراوەکانەوە (بی دۆشینی داتای خاو)
          </p>
        </div>
      </div>

      {/* Aggregated Secure Receipts Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-right">
        <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-xs font-bold">کۆی داهاتی یەکگرتووی نیشتمانی</span>
            <Coins className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 font-mono">${jointCombinedTotalUSD.toLocaleString()}</div>
          <p className="text-[10px] text-slate-500 mt-2">کۆکراوەی سەرجەم داهاتە بەراوردکراوەکان</p>
        </Card>

        <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-3 font-sans">
            <span className="text-slate-400 text-xs font-bold">کۆی داهاتی گومرگەکان</span>
            <Database className="w-5 h-5 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 font-mono">${jointAggregatedCustomsUSD.toLocaleString()}</div>
          <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
            <span>KRG: ${krgReport.customsTotalUSD.toLocaleString()}</span>
            <span>FED: ${fedReport.customsTotalUSD.toLocaleString()}</span>
          </div>
        </Card>

        <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-xs font-bold">کۆی باجە نیشتمانییەکان</span>
            <Landmark className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100 font-mono">${jointAggregatedTaxUSD.toLocaleString()}</div>
          <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
            <span>KRG: ${krgReport.taxTotalUSD.toLocaleString()}</span>
            <span>FED: ${fedReport.taxTotalUSD.toLocaleString()}</span>
          </div>
        </Card>

        <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400 text-xs font-bold">جیاوازی و هاوسەنگی بودجە</span>
            <Activity className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">
            ${reconReport.discrepancies.sharingMismatchUSD.toLocaleString()}
          </div>
          <p className="text-[10px] text-slate-500 mt-2">بەپێی بنەمای ١٢.٦٧%ی دەستووری</p>
        </Card>
      </div>

      {/* Main Grid: Reconciliation Results and Secure Hashed Summaries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-right">
        
        {/* Left Column: Reconciliation Reports & Audit Flag Alerts */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Status & Audit Flags Banner */}
          <Card className="bg-[#0b1329]/90 border-slate-800 p-6 rounded-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                {reconReport.reconciliationStatus === 'HARMONIZED' ? (
                  <Badge variant="teal" className="bg-emerald-950 text-emerald-400">یەکگرتوو و دروست</Badge>
                ) : reconReport.reconciliationStatus === 'MISMATCH_DETECTED' ? (
                  <Badge variant="orange" className="bg-amber-950 text-amber-500">جیاوازی دیاریکراوە</Badge>
                ) : (
                  <Badge variant="destructive" className="bg-red-950 text-red-500">پێویستی بە وردبینی بەپەلە هەیە</Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-100">ئەنجامی پرۆتۆکۆلی هاوڕێکی (National Alignment Protocol)</h3>
                <ShieldCheck className="w-4 h-4 text-amber-500" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <h4 className="text-xs font-bold text-slate-300 mb-2">شیکردنەوەی میکانیزمی پشکەکان و دەستووری گشتی عێراق</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  گواستنەوەی فەرمیی پشکی بودجەی هەرێم پێویستی بە هاوسەنگی لێکتێگەیشتنی داهاتەکانی گۆمڕگی و سنووری هەیە. 
                  ڕێژەی کۆکراوەی گومرگی هەرێم بەرامبەر بە فیدراڵ لەم ساتەدا یەکسانە بە:{' '}
                  <span className="text-amber-400 font-bold font-mono">
                    {Math.round(reconReport.discrepancies.customsRatioDelta * 100)}%
                  </span>.
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] text-slate-500 font-mono font-bold uppercase block">لیستی وریاکردنەوەکانی وردبینی گواستنەوە (Audit Flags)</span>
                {reconReport.discrepancies.auditFlags.length === 0 ? (
                  <div className="bg-slate-950/30 p-3 rounded-lg text-emerald-400 text-xs border border-emerald-950 text-center">
                    هیچ جیاوازییەکی کێشەدار نەدۆزرایەوە لەنێوان تۆمارە فەرمییەکاندا.
                  </div>
                ) : (
                  reconReport.discrepancies.auditFlags.map((flag, idx) => (
                    <div key={idx} className="bg-slate-950/50 border border-amber-950/60 p-3 rounded-xl flex items-start gap-2 justify-end">
                      <span className="text-xs text-slate-300 leading-relaxed">{flag}</span>
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    </div>
                  ))
                )}
              </div>
            </div>
          </Card>

          {/* Secure Hashed Summaries side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Federal isolated payload representation */}
            <Card className="bg-[#0b1329]/95 border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-850 pb-2 mb-3">
                  <Badge variant="teal">FEDERAL CRYPTO_RECON</Badge>
                  <span className="text-[11px] font-bold text-white">کورتەی ڕاپۆرتی فیدراڵی عێراق</span>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-white">${fedReport.totalCollectedUSD.toLocaleString()}</span>
                    <span className="text-slate-500">کۆی گشت کۆکراوە:</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-white">${fedReport.customsTotalUSD.toLocaleString()}</span>
                    <span className="text-slate-500">گومرگی فیدراڵ:</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-white">${fedReport.borderFeeTotalUSD.toLocaleString()}</span>
                    <span className="text-slate-500">رسوماتی سنوور:</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-white">${fedReport.taxTotalUSD.toLocaleString()}</span>
                    <span className="text-slate-500">باجی فیدراڵ:</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-900 text-left">
                <span className="text-[9px] text-slate-500 uppercase block font-mono">Verification Validation Checksum</span>
                <span className="text-teal-400 text-[10px] font-mono block truncate">{fedReport.reportVerificationHash}</span>
              </div>
            </Card>

            {/* KRG isolated payload representation */}
            <Card className="bg-[#0b1329]/95 border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-850 pb-2 mb-3">
                  <Badge variant="blue">KRG CRYPTO_RECON</Badge>
                  <span className="text-[11px] font-bold text-white">کورتەی ڕاپۆرتی هەرێمی کوردستان</span>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-white">${krgReport.totalCollectedUSD.toLocaleString()}</span>
                    <span className="text-slate-500">کۆی گشت کۆکراوە:</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-white">${krgReport.customsTotalUSD.toLocaleString()}</span>
                    <span className="text-slate-500">گومرگی ناوخۆیی:</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-white">${krgReport.borderFeeTotalUSD.toLocaleString()}</span>
                    <span className="text-slate-500">رسوماتی سنوور:</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-white">${krgReport.taxTotalUSD.toLocaleString()}</span>
                    <span className="text-slate-500">باجی هەرێمی:</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-900 text-left">
                <span className="text-[9px] text-slate-500 uppercase block font-mono">Verification Validation Checksum</span>
                <span className="text-blue-400 text-[10px] font-mono block truncate">{krgReport.reportVerificationHash}</span>
              </div>
            </Card>

          </div>

        </div>

        {/* Right Sidebar: Security, Rules, Legislation context */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-[#0b1329]/90 border-slate-800 p-6 rounded-2xl">
            <h3 className="text-sm font-bold text-slate-100 mb-4 border-b border-slate-800 pb-3 flex items-center gap-2 justify-end">
              زنجیرەی بەڵگەی ساختە (Reconciliation Proof Structure)
              <Lock className="w-4 h-4 text-amber-500" />
            </h3>
            <div className="text-xs text-slate-400 leading-relaxed space-y-3">
              <p>بۆ پاراستنی پەیماننامەکانی نێوان حکومەتی فیدراڵ و حکومەتی هەرێم لە پێشێلکردنی داتای پاراستنی هێمن و زانیارییە نهێنییەکان، ڕێککەوتنی گشتی ڕێگە نادات هیچ گۆشتنەوەیەکی ڕاستەوخۆ بەسەر تۆماری وردەکارییەکاندا بکرێت.</p>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-900 font-mono text-[9px] text-amber-400 text-left">
                SECURE_PROOF_CHAIN: TRUE<br />
                RECONCILIATION_ID: {reconReport.id}<br />
                ALGORITHM: HOMOMORPHIC_HASH_SUM<br />
                FED_BLOCK_HASH: {fedReport.ledgerIntegrityHash.substring(0, 24)}...<br />
                KRG_BLOCK_HASH: {krgReport.ledgerIntegrityHash.substring(0, 24)}...
              </div>
            </div>
          </Card>

          {/* Guidelines Box */}
          <Card className="bg-[#0b1329]/90 border-slate-800 p-5 rounded-2xl space-y-3">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">یاسا بەڕێوەبەرایەتییەکان</h4>
            <ul className="text-xs text-slate-500 space-y-2 list-none">
              <li className="flex items-center gap-2 justify-end">
                <span>بەراوردکاری ڕێژەیی دەروازە بازرگانییەکان بە ڕاستەوخۆ</span>
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
              </li>
              <li className="flex items-center gap-2 justify-end">
                <span>بەرهەمهێنانی واژۆی کریپتۆگرافی بە سەرکەوتوویی</span>
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
              </li>
              <li className="flex items-center gap-2 justify-end">
                <span>پشکدارییە گشتییەکان لە دەفتەری نیشتمانی نوێدراوە</span>
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
              </li>
            </ul>
          </Card>
        </div>

      </div>
    </div>
  );
}

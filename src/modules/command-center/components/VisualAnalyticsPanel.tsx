import React from 'react';
import { Coins, Shield, Activity } from 'lucide-react';
import { Language } from '../../../types';
import { t } from '../localization/ccTranslations';
import { 
  Alert, StatCard, ChartContainer, BarChart, SectionHeader, Table, MetricCard, Badge
} from '../../../ui';

interface VisualAnalyticsPanelProps {
  lang: Language;
  activeRole: 'pmo' | 'ministries' | 'customs' | 'border' | 'economic';
  pmoRevenueData: Array<{ label: string; value: number }>;
  customsClassifications: Array<{
    hs: string;
    label: string;
    declared: string;
    taxRate: string;
    status: string;
    node: string;
  }>;
}

export const VisualAnalyticsPanel: React.FC<VisualAnalyticsPanelProps> = React.memo(({
  lang,
  activeRole,
  pmoRevenueData,
  customsClassifications
}) => {
  return (
    <div className="text-start flex flex-col gap-6">
      
      {/* PMO Dashboard View */}
      {activeRole === 'pmo' && (
        <div className="flex flex-col gap-6 text-start">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-start">
            <StatCard
              title={t(lang, 'pmo.revenueCardTitle')}
              value="8.42T IQD"
              subtitle={t(lang, 'pmo.revenueCardSub')}
              icon={<Coins className="w-5 h-5 text-[#E0A96D]" />}
              trend={{ value: '14.2%', isPositive: true }}
            />
            
            <StatCard
              title={t(lang, 'pmo.interopCardTitle')}
              value="99.94%"
              subtitle={t(lang, 'pmo.interopCardSub')}
              icon={<Shield className="w-5 h-5 text-cyan-400" />}
              trend={{ value: '0.04%', isPositive: true }}
            />
          </div>

          {/* Data Visualization inside PMO dashboard */}
          <ChartContainer 
            title={t(lang, 'pmo.chartTitle')}
            subtitle={t(lang, 'pmo.chartSub')}
          >
            {({ width, height }) => (
              <BarChart data={pmoRevenueData} width={width} height={height} />
            )}
          </ChartContainer>

          {/* Cabinet Directives */}
          <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl flex flex-col gap-3.5 text-start">
            <SectionHeader title={t(lang, 'pmo.directiveHeader')} />
            
            <Alert
              variant="success"
              title={t(lang, 'pmo.alert1Title')}
              description={t(lang, 'pmo.alert1Desc')}
              icon={<Shield className="w-4 h-4" />}
            />
            
            <Alert
              variant="warning"
              title={t(lang, 'pmo.alert2Title')}
              description={t(lang, 'pmo.alert2Desc')}
              icon={<Activity className="w-4 h-4" />}
            />
          </div>
        </div>
      )}

      {/* Ministries View */}
      {activeRole === 'ministries' && (
        <div className="flex flex-col gap-6 text-start">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-start">
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
              icon={<Activity className="w-4 h-4" />}
              metrics={[
                { label: 'Phytosanitary Accord', value: '1 Alert Hold', status: 'warning' },
                { label: 'Non-GMO Cereals', value: 'Verified', status: 'secure' },
                { label: 'Biological Cargo', value: 'Inspection Req', status: 'warning' }
              ]}
            />
          </div>

          {/* COSQC Accords Table */}
          <div className="bg-[#111e2e] p-5 pb-8 overflow-visible rounded-xl border border-slate-800 flex flex-col gap-4 text-start">
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
        <div className="flex flex-col gap-6 text-start">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-start">
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

          {/* Live Classification Stream */}
          <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl flex flex-col gap-4 text-start">
            <SectionHeader title="Live Customs Classification Stream" description="Cross-referencing global tariff indexes dynamically" />
            
            <div className="flex flex-col gap-3 font-mono text-xs text-start">
              {customsClassifications.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-slate-950 p-4 rounded-lg border border-slate-800/80 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-start"
                >
                  <div className="text-start">
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

      {/* Economic Council View */}
      {activeRole === 'economic' && (
        <div className="flex flex-col gap-6 text-start">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-start">
            <div className="bg-[#0b1420] border border-slate-800 p-4.5 rounded-xl text-start flex flex-col gap-2">
              <span className="text-[10px] text-slate-400 uppercase font-mono text-start">Foreign Exchange Match ratio</span>
              <span className="text-2xl font-bold text-[#52B788] font-mono leading-none text-start">98.15%</span>
              <p className="text-[10px] text-slate-500 mt-1 leading-relaxed text-start">
                Automated CBI audit stream validation comparing trade finance ledger transactions to custom manifests, preventing over-invoicing evasion.
              </p>
            </div>

            <div className="bg-[#0b1420] border border-slate-800 p-4.5 rounded-xl text-start flex flex-col gap-2">
              <span className="text-[10px] text-slate-400 uppercase font-mono text-start">Current Account Balance Projection</span>
              <span className="text-2xl font-bold text-[#E0A96D] font-mono leading-none text-start">+$9.18B USD</span>
              <p className="text-[10px] text-slate-500 mt-1 leading-relaxed text-start">
                Surplus projections from consolidated national border revenues, oil transfer receipts, and active industrial corridors.
              </p>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 p-5 rounded-xl flex flex-col gap-3.5 text-start">
            <SectionHeader title="Active Economic Expansion Corridors" description="Scenario planning models for state development pipelines" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-start">
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-start">
                <span className="text-[#E0A96D] font-mono uppercase font-bold text-[11px] block text-start">Gulf-Basra Corridor</span>
                <p className="text-[11px] text-slate-404 mt-1.5 leading-relaxed text-start">
                  Sovereign transit path linking Faw seaport with Turkish mesh railways. Estimated to process 40M tons of commercial bulk loads yearly.
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-start">
                <span className="text-[#E0A96D] font-mono uppercase font-bold text-[11px] block text-start">Levant Transit Corridor</span>
                <p className="text-[11px] text-slate-404 mt-1.5 leading-relaxed text-start">
                  Connecting western chemical and agricultural dry hubs to Mediterranean ports, bypassing traditional maritime congestions.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

VisualAnalyticsPanel.displayName = 'VisualAnalyticsPanel';

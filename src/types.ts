export type Language = 'en' | 'ar' | 'ku';

export interface Checkpoint {
  id: string;
  name: {
    en: string;
    ar: string;
    ku: string;
  };
  region: {
    en: string;
    ar: string;
    ku: string;
  };
  type: 'land' | 'sea' | 'air';
  status: 'active' | 'warning' | 'alert';
  throughputRaw: number; // Tons per hour
  revenueRaw: number; // IQD Millions-daily
  processedToday: number;
  latitude: number;
  longitude: number;
}

export interface TradeAlert {
  id: string;
  timestamp: string;
  checkpointId: string;
  checkpointName: { en: string; ar: string; ku: string };
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: { en: string; ar: string; ku: string };
  description: { en: string; ar: string; ku: string };
  status: 'investigating' | 'resolved' | 'escalated';
}

export interface CargoManifest {
  manifestId: string;
  importerName: string;
  exporterName: string;
  originCountry: string;
  destinationCity: string;
  hsCodeDeclared: string;
  declaredValueUSD: number;
  weightTons: number;
  description: string;
  goodsCategory: string;
  carrierInfo: string;
}

export interface SystemService {
  name: { en: string; ar: string; ku: string };
  type: string;
  status: 'healthy' | 'degraded' | 'offline';
  latency: number;
  version: string;
}

export interface AIAnalysisResult {
  status: 'APPROVED' | 'FLAGGED' | 'REJECTED';
  tariffCalculatedIQD: number;
  tariffPercentage: number;
  hsCodeVerification: {
    isMatch: boolean;
    suggestedHSCode: string;
    explanation: string;
  };
  riskScore: number; // 0 to 100
  riskAnalysis: string[];
  complianceProtocolUsed: string;
  routingRecommendation: string;
  arabicSummary?: string;
  kurdishSummary?: string;
}

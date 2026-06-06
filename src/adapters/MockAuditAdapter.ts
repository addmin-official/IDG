import { TRADE_ALERTS } from '../mockData';
import { AuditLogDTO } from '../contracts/AuditContract';

export interface AuditAdapter {
  fetchLogs(): Promise<AuditLogDTO[]>;
}

export const MockAuditAdapter: AuditAdapter = {
  fetchLogs: async () => TRADE_ALERTS.map(alert => ({
      id: alert.id,
      timestamp: alert.timestamp,
      actor: alert.checkpointName.en, // Mapping checkpoint as actor
      action: alert.title.en,
      status: alert.status === 'resolved' ? 'success' : 'failure',
      details: alert.description.en
  })),
};

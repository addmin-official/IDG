import { AuditLogDTO } from '../contracts/AuditContract';
import { AuditRepository } from '../contracts/AuditContract';
import { MockAuditAdapter } from '../adapters/MockAuditAdapter';

export class AuditRepositoryImpl implements AuditRepository {
  async getLogs(): Promise<AuditLogDTO[]> {
    return MockAuditAdapter.fetchLogs();
  }
}

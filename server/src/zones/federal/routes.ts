import { Router, Request, Response } from 'express';
import { jurisdictionGuard } from '../../security/jurisdictionGuard.js';
import { AuditLogger } from '../../security/auditLogger.js';
import settlementRoutes from './settlementRoutes.js';
import borderSettlementRoutes from './borderSettlementRoutes.js';

const router = Router();
router.use(jurisdictionGuard('FEDERAL_IRAQ'));
router.use('/', settlementRoutes);
router.use('/', borderSettlementRoutes);

const federalPaths = [
  '/health',
  '/readiness',
  '/metadata',
  '/audit-events',
  '/sync-status',
  '/border/gates',
  '/border/events',
  '/customs/declarations',
  '/revenue/ledger',
  '/trade/licenses',
  '/integrity/cases',
  '/identity/records',
  '/workforce/roster',
  '/security/sessions',
  '/intelligence/threats'
];

federalPaths.forEach(path => {
  router.get(path, (req: Request, res: Response) => {
    AuditLogger.log({
      jurisdiction: 'FEDERAL_IRAQ',
      route: req.baseUrl + path,
      providerState: 'NOT_CONFIGURED',
      decision: 'PROVIDER_NOT_CONNECTED_FALLBACK'
    }, req.id || '');

    res.status(200).json({
      status: "PROVIDER_NOT_CONNECTED",
      providerState: "NOT_CONFIGURED",
      jurisdiction: "FEDERAL_IRAQ",
      message: "Provider database required"
    });
  });
});

export default router;

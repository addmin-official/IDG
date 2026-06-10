import { Router, Request, Response } from 'express';
import { jurisdictionGuard } from '../../security/jurisdictionGuard.js';
import { AuditLogger } from '../../security/auditLogger.js';
import krdpassRoutes from './krdpassRoutes.js';
import brsRoutes from './brsRoutes.js';

const router = Router();
router.use(jurisdictionGuard('KURDISTAN_REGION'));

router.use('/krdpass', krdpassRoutes);
router.use('/brs', brsRoutes);

const krgPaths = [
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

krgPaths.forEach(path => {
  router.get(path, (req: Request, res: Response) => {
    AuditLogger.log({
      jurisdiction: 'KURDISTAN_REGION',
      route: req.baseUrl + path,
      providerState: 'NOT_CONFIGURED',
      decision: 'PROVIDER_NOT_CONNECTED_FALLBACK'
    }, req.id || '');

    res.status(200).json({
      status: "PROVIDER_NOT_CONNECTED",
      providerState: "NOT_CONFIGURED",
      jurisdiction: "KURDISTAN_REGION",
      message: "Provider database required"
    });
  });
});

export default router;

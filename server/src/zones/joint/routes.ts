import { Router, Request, Response } from 'express';
import { jurisdictionGuard } from '../../security/jurisdictionGuard.js';
import { AuditLogger } from '../../security/auditLogger.js';
import settlementRoutes from './settlementRoutes.js';
import borderSettlementRoutes from './borderSettlementRoutes.js';

const router = Router();
router.use(jurisdictionGuard('JOINT_OPERATIONS'));
router.use('/', settlementRoutes);
router.use('/', borderSettlementRoutes);

const jointPaths = [
  '/health',
  '/readiness',
  '/metadata',
  '/audit-events',
  '/sync-status',
  '/joint/reconciliation',
  '/joint/hash-verification',
  '/joint/settlement-status',
  '/joint/metadata-exchange',
  '/joint/audit-verification'
];

jointPaths.forEach(path => {
  // Use post matching for verification checks under joint if necessary
  const handler = (req: Request, res: Response) => {
    AuditLogger.log({
      jurisdiction: 'JOINT_OPERATIONS',
      route: req.baseUrl + path,
      providerState: 'NOT_CONFIGURED',
      decision: 'JOINT_PROVIDER_NOT_CONNECTED_FALLBACK'
    }, req.id || '');

    res.status(200).json({
      status: "METADATA_PROVIDER_NOT_CONNECTED",
      providerState: "NOT_CONFIGURED",
      jurisdiction: "JOINT_OPERATIONS",
      metadataOnly: true
    });
  };

  if (path === '/joint/hash-verification') {
    router.post(path, handler);
  } else {
    router.get(path, handler);
  }
});

export default router;

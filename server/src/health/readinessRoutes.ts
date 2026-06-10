import { Router, Request, Response } from 'express';

const router = Router();

router.get('/readiness', (req: Request, res: Response) => {
  res.status(200).json({ status: 'READY' });
});

export default router;

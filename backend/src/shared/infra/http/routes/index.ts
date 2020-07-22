import { Router } from 'express';

import callTexsRouter from '@modules/callTexs/infra/http/routes/callTexs.routes';

const routes = Router();

routes.use('/consults', callTexsRouter);

export default routes;

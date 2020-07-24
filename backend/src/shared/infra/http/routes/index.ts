import { Router } from 'express';

import callTexsRouter from '@modules/callTexs/infra/http/routes/callTexs.routes';

const routes = Router();

routes.use('/call_texs', callTexsRouter);

export default routes;

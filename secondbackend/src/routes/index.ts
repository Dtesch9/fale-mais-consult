import { Router } from 'express';

import callTexsRouter from './callTexs.routes';

const routes = Router();

routes.use('/consults', callTexsRouter);

export default routes;

import { Router } from 'express';

import callTexsRouter from './callTexs.routes';
import originsRouter from './origins.routes';
import destinationsRouter from './destinations.routes';

const routes = Router();

routes.use('/call_texs', callTexsRouter);
routes.use('/origins', originsRouter);
routes.use('/destinations', destinationsRouter);

export default routes;

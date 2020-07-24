import { Router } from 'express';

import callTexsRouter from '@modules/callTexs/infra/http/routes/callTexs.routes';
import originsRouter from '@modules/callTexs/infra/http/routes/origins.routes';
import destinationsRouter from '@modules/callTexs/infra/http/routes/destinations.routes';

const routes = Router();

routes.use('/call_texs', callTexsRouter);
routes.use('/origins', originsRouter);
routes.use('/destinations', destinationsRouter);

export default routes;

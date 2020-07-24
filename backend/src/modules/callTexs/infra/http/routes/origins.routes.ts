import { Router } from 'express';

import OriginsController from '../controllers/OriginsController';

const callTexsRouter = Router();
const originsController = new OriginsController();

callTexsRouter.get('/', originsController.index);

export default callTexsRouter;

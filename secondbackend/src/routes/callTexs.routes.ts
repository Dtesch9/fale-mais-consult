import { Router } from 'express';

import CallTexsController from '../controllers/CallTexsController';

const callTexsRouter = Router();
const callTexsController = new CallTexsController();

callTexsRouter.get('/', callTexsController.index);

export default callTexsRouter;

import { Router } from 'express';

import CallTexsController from '../controllers/CallTexsController';
import consultsRouteValidation from '../validations/consultsRoute';

const callTexsRouter = Router();
const callTexsController = new CallTexsController();

callTexsRouter.get('/', consultsRouteValidation, callTexsController.index);

export default callTexsRouter;

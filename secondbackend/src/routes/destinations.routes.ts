import { Router } from 'express';

import DestinationsController from '../controllers/DestinationsController';

const callTexsRouter = Router();
const destinationsController = new DestinationsController();

callTexsRouter.get('/', destinationsController.index);

export default callTexsRouter;

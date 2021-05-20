// src/routes/index.ts
import { Router } from 'express';
import usersRouter from './users.routes';
import scheduleRouter from './schedule.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/schedule', scheduleRouter);
routes.use('/sessions', sessionsRouter);

export default routes;

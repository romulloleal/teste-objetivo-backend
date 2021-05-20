import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { login, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      login,
      password,
    });

    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

sessionsRouter.post('/checkSession', ensureAuthenticated, async (request, response) => {
  return response.json({ msg: "Bom te ver de novo, " });
});

export default sessionsRouter;

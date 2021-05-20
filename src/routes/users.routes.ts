import { Router } from 'express';

import GetAllUsers from '../services/users/GetAllUsers';
import CreateUserService from '../services/users/CreateUserService';
import UpdatePasswordService from '../services/users/UpdatePasswordService';

const usersRouter = Router();

usersRouter.post('/getUsers', async (request, response) => {
  try {
    const { type } = request.body;

    const criarUsuario = new GetAllUsers();

    const user = await criarUsuario.execute(type);

    delete (user as any).password;

    return response.json({ success: user });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.post('/newUser', async (request, response) => {
  try {
    const { name, login, password, registry, type } = request.body;

    const criarUsuario = new CreateUserService();

    const user = await criarUsuario.execute({
      name,
      login,
      password,
      registry,
      type,
    });

    delete (user as any).password;

    return response.json({ success: 'Usuário criado com sucesso' });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch('/updatePassword', async (request, response) => {
  try {
    const { id, oldPassword, newPassword, confirmPassword } = request.body;

    const criarUsuario = new UpdatePasswordService();

    const user = await criarUsuario.execute({
      id,
      oldPassword,
      newPassword,
      confirmPassword,
    });

    return response.json({ success: 'Senha alterada com sucesso' });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;

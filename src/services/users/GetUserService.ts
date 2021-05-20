import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../../models/User';

class GetUserService {
  public async execute(id: string): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    delete (user as any).password;

    return user;
  }
}

export default GetUserService;

import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../../models/User';

class GetAllUsers {
  public async execute(type: number): Promise<User[]> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.find({
      where: { type },
    });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    delete (user as any).password;

    return user;
  }
}

export default GetAllUsers;

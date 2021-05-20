import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../../models/User';

interface Request {
  name: string;
  login: string;
  password: string;
  registry?: string;
  type: number;
}

class CreateUserService {
  public async execute({ name, login, password, registry, type }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { login },
    });

    if (checkUserExists) {
      throw new Error('Nome de usuário já está em uso.');
    }

    if (type == 2) {

      if (registry === "" || registry === undefined || registry === null ) {
        throw new Error('Informe a matricula');
      }

      const checkRegistryExists = await usersRepository.findOne({
        where: { registry },
      });

      if (checkRegistryExists) {
        throw new Error('Matricula já está em uso.');
      }
    }

    if (type === undefined || type === null) {
      throw new Error('Informe o tipo de usuário');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      login,
      password: hashedPassword,
      registry,
      type
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;

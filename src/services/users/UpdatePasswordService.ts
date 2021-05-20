import { getRepository } from 'typeorm';
import { hash, compare } from 'bcryptjs';

import User from '../../models/User';

interface Request {
  id: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

class UpdatePasswordService {
  public async execute({
    id,
    oldPassword,
    newPassword,
    confirmPassword
  }: Request) {
    const usersRepository = getRepository(User);

    const findUser = await usersRepository.findOne({
      where: { id },
    });

    if (!findUser) {
      throw new Error('Usuário não encontrado.');
    }

    if(oldPassword === '' || newPassword === '' || confirmPassword === ''){
      throw new Error('Preencha todos os campos');
    }

    const passwordMatch = await compare(oldPassword, findUser.password);

    if (!passwordMatch) {
      throw new Error('Senha antiga não confere');
    }

    if (newPassword !== confirmPassword) {
      throw new Error('Nova senha não confere com a confirmação');
    }

    const hashedPassword = await hash(confirmPassword, 8);

    await usersRepository
      .createQueryBuilder()
      .update()
      .set({
        password: hashedPassword,
      })
      .where({ id })
      .returning('*')
      .execute();
  }
}

export default UpdatePasswordService;

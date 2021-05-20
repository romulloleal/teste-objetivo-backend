import { getRepository } from 'typeorm';

import Schedule from '../../models/Schedule';
import CreateLogService from '../CreateLogService';
import GetUserService from '../users/GetUserService';

class UpdateScheduleService {
  public async execute(id: string, date: Date, description: string, studentId: string, coordinatorId: string): Promise<Schedule> {
    const scheduleRepository = getRepository(Schedule);

    if (date === undefined || date === null) {
      throw new Error('Por favor informe uma data para atividade!');
    }

    if (description === undefined || description === null || description === '') {
      throw new Error('Descrição da atividade não pode estar em branco!');
    }

    const schedule = await scheduleRepository
      .createQueryBuilder()
      .update()
      .set({ date, description, studentId, coordinatorId })
      .where({ id })
      .returning('*')
      .execute();

    // registrar log
    const logService = new CreateLogService();

    const student = await new GetUserService().execute(studentId);
    const coordinator = await new GetUserService().execute(coordinatorId);

    const logDescription = "O coordenador "+ coordinator.name +
    " atualizou uma atividade do aluno " + student.name +
    "\nId da atividade: " + id +
    "\nDescrição da atividade: " + description;

    await logService.execute(logDescription);

    return schedule.raw[0];
  }
}

export default UpdateScheduleService;

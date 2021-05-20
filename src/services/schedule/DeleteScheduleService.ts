import { getRepository } from 'typeorm';

import Schedule from '../../models/Schedule';
import CreateLogService from '../CreateLogService';
import GetUserService from '../users/GetUserService';

class DeleteScheduleService {
  public async execute(id: string): Promise<Schedule> {
    const scheduleRepository = getRepository(Schedule);

    const schedule = await scheduleRepository
      .createQueryBuilder()
      .delete()
      .where({ id })
      .returning('*')
      .execute();

    // registrar log
    // const logService = new CreateLogService();

    // const student = await new GetUserService().execute(studentId);
    // const coordinator = await new GetUserService().execute(coordinatorId);

    // const logDescription = "O coordenador "+ coordinator.name +
    // " registrou uma nova atividade para o aluno " +
    // student.name + "\nDescrição da atividade: " + description;

    // await logService.execute(logDescription);

    return schedule.raw[0];
  }
}

export default DeleteScheduleService;

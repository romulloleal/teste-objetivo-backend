import { getRepository } from 'typeorm';

import Schedule from '../../models/Schedule';
import CreateLogService from '../CreateLogService';
import GetUserService from '../users/GetUserService';

class CreateScheduleService {
  public async execute(
    date: Date,
    description: string,
    studentId: string,
    coordinatorId: string,
  ): Promise<Schedule> {
    const scheduleRepository = getRepository(Schedule);

    if (date === undefined || date === null) {
      throw new Error('Por favor informe uma data para atividade!');
    }

    if (
      description === undefined ||
      description === null ||
      description === ''
    ) {
      throw new Error('Descrição da atividade não pode estar em branco!');
    }

    if (
      studentId === undefined ||
      studentId === null ||
      studentId === ''
    ) {
      throw new Error('Escolha um aluno válido!');
    }

    const schedule = scheduleRepository.create({
      date,
      description,
      studentId,
      coordinatorId,
    });

    await scheduleRepository.save(schedule);

    // registrar log
    const logService = new CreateLogService();

    const student = await new GetUserService().execute(studentId);
    const coordinator = await new GetUserService().execute(coordinatorId);

    const logDescription = "O coordenador "+ coordinator.name +
    " registrou uma nova atividade para o aluno " + student.name +
    "\nId da atividade: " + schedule.id +
    "\nDescrição da atividade: " + description;

    await logService.execute(logDescription);

    return schedule;
  }
}

export default CreateScheduleService;

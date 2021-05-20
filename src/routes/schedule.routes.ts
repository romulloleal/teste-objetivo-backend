import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import ScheduleRepository from '../repositories/ScheduleRepository';

const scheduleRouter = Router();

scheduleRouter.post('/listSchedules', ensureAuthenticated, async (request, response) => {
  try {
    const { studentId, date } = request.body;

    const scheduleRepository = new ScheduleRepository()

    const schedules = await scheduleRepository.listSchedules(studentId, date)

    return response.json({success: schedules});
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

scheduleRouter.post('/newSchedule', ensureAuthenticated, async (request, response) => {
  try {
    const { date, description, studentId, coordinatorId } = request.body;

    const scheduleRepository = new ScheduleRepository()

    await scheduleRepository.createSchedule(date, description, studentId, coordinatorId)

    return response.json({success: "Atividade cadastrada com sucesso"});
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

scheduleRouter.patch('/updateSchedule', ensureAuthenticated, async (request, response) => {
  try {
    const {id, date, description, studentId, coordinatorId } = request.body;

    const scheduleRepository = new ScheduleRepository()

    await scheduleRepository.updateSchedule(id, date, description, studentId, coordinatorId)

    return response.json({success: "Atividade atualizada com sucesso"});
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

scheduleRouter.delete('/deleteSchedule', ensureAuthenticated, async (request, response) => {
  try {
    const {id } = request.body;

    const scheduleRepository = new ScheduleRepository()

    await scheduleRepository.deleteSchedule(id)

    return response.json({success: "Atividade deletada com sucesso"});
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default scheduleRouter;

import { EntityRepository, Repository, getRepository } from 'typeorm';

import Schedule from '../models/Schedule';

import CreateScheduleService from '../services/schedule/CreateScheduleService';
import UpdateScheduleService from '../services/schedule/UpdateScheduleService';
import DeleteScheduleService from '../services/schedule/DeleteScheduleService';
import GetUserService from '../services/users/GetUserService';

@EntityRepository(Schedule)
class ScheduleRepository extends Repository<Schedule> {
  public async listSchedules(
    studentId?: string,
    date?: Date,
  ): Promise<any[] | null> {
    const listSchedules = getRepository(Schedule);

    const schedules = await listSchedules.find({
      where: {
        ...(studentId ? { studentId } : {}),
        ...(date ? { date } : {}),
      },
      order: { date: 'ASC' },
    });

    return schedules || null;
  }

  public async createSchedule(
    date: Date,
    description: string,
    studentId: string,
    coordinatorId: string,
  ): Promise<Schedule> {
    const createSchedule = new CreateScheduleService();

    const schedule = await createSchedule.execute(
      date,
      description,
      studentId,
      coordinatorId,
    );

    return schedule;
  }

  public async updateSchedule(
    id: string,
    date: Date,
    description: string,
    studentId: string,
    coordinatorId: string,
  ): Promise<Schedule | null> {
    const updateSchedule = new UpdateScheduleService();

    const schedule = await updateSchedule.execute(
      id,
      date,
      description,
      studentId,
      coordinatorId,
    );

    return schedule || null;
  }

  public async deleteSchedule(id: string): Promise<Schedule | null> {
    const deleteSchedule = new DeleteScheduleService();

    const category = await deleteSchedule.execute(id);

    return category || null;
  }
}

export default ScheduleRepository;

import { getRepository } from 'typeorm';

import Log from '../models/Log';

class CreateLogService {
  public async execute(description: string): Promise<Log> {
    const logRepository = getRepository(Log);

    const log = logRepository.create({
      description
    });

    await logRepository.save(log);

    return log;
  }
}

export default CreateLogService;

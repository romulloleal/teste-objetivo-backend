import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('log')
class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;
}

export default Schedule;

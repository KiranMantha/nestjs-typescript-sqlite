import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  JoinTable
} from 'typeorm';
import { Profile } from './profile';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  name: string;

  @Column()
  gender: string;

  @Column()
  email: string;

  @Column()
  phone: number;

  @ManyToOne(() => Profile)
  profile: Profile;

  @CreateDateColumn()
  createdDate: Date;
}

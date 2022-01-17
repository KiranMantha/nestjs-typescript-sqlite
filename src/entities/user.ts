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

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  email: string;

  @Column()
  phone: number;

  @ManyToOne(() => Profile, (profile) => profile.users, {
    cascade: true
  })
  @JoinColumn({
    name: 'profile_id'
  })
  profile: Profile;

  @CreateDateColumn()
  createdDate: Date;
}

export class UserEntity {}
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 25 })
  firstName: string;

  @Column({ length: 25 })
  lastName: string;

  @Column({ length: 25 })
  email: string;
}

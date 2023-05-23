export class ParticipantEntity {}
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Participant {
  @PrimaryGeneratedColumn()
  id: string;

  //user_id
  @Column({ length: 50 })
  id_user: string;

  //expense_id
  @Column({ length: 50 })
  id_expense: string;
}

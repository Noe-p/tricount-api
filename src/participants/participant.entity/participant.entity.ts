export class ParticipantEntity {}
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Cette entité est un model qui va nous permettre de manipuler les données de la table participants
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

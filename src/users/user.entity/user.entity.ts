export class UserEntity {}
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// Cette classe est un model qui va nous permettre de manipuler les données de la table users
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

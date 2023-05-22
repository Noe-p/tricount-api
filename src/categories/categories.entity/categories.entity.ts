export class CategoriesEntity {}
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 50 })
  label: string;
}

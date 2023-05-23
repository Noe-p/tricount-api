export class ExpenseEntity {}
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 40 })
  label: string;

  @Column('decimal')
  amount: number;

  @Column({ length: 50 })
  id_user: string;

  @Column({ length: 50 })
  id_category?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}

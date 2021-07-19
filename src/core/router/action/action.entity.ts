import { BaseEntity } from 'src/utils/base.entity';
import { Entity, Column } from 'typeorm';
@Entity('actions')
export class Action extends BaseEntity {
  @Column({
    unique: true,
  })
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true, default: true })
  is_active: boolean;
}

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  content!: string
}

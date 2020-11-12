import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { Profile } from './profile'

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  currentTime: Date

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  password: string

}
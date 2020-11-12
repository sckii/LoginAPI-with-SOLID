import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('logged')
export default class Logged {
  @PrimaryGeneratedColumn('increment')
  id: number
  
  @Column()
  currentTime: Date

  @Column()
  userId: number

  @Column()
  profileId: number

  @Column()
  token: string

}
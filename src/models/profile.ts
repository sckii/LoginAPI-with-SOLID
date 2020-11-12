import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from "typeorm";
import User from "./users";

@Entity('profiles')
export class Profile {

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  currentTime: Date

  @Column()
  description: string

  @Column()
  userId: number
}
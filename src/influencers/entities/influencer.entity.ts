import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Influencer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  platform: string;

  @Column()
  followers: number;
}

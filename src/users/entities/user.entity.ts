import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '../../auth/enums/role.enum';  // Asegúrate de que el enum Role esté en la misma carpeta o ajusta la ruta

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER, // Por defecto, asigna el rol 'user'
  })
  role: Role;
}

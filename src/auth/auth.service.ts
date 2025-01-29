import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from '../users/entities/user.entity'; // Asegúrate de que la entidad User esté importada

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>, // Inyecta el repositorio de User
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: username },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario o contraseña inválidos');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const { password, ...result } = user; // Eliminamos la contraseña del resultado
      return result;
    } else {
      throw new UnauthorizedException('Usuario o contraseña inválidos');
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id }; // puedes agregar más datos si lo necesitas
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
      user: {
        name: user.name,
        email: user.email, // Agregar los datos necesarios
      },
    };
  }

  async register(createUserDto: CreateUserDto): Promise<any> {
    // Verificar si el correo ya existe
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('El correo ya está registrado');
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Crear un nuevo usuario
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // Guardar en la base de datos
    await this.userRepository.save(newUser);

    // Retornar información del usuario sin la contraseña
    const { password, ...result } = newUser;
    return result;
  }
}

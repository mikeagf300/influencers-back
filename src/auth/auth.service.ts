import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    // Aquí puedes realizar la validación contra tu base de datos
    const user = { username: 'admin', password: await bcrypt.hash('admin123', 10) }; // Simulación
    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('Usuario o contraseña inválidos');
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard'; // Guard para verificar rol
import { Role } from './decorators/role.decorator'; // Decorador para asignar roles

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.authService.validateUser(body.username, body.password).then(user => {
      return this.authService.login(user);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    // El usuario autenticado es accesible a través de req.user
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role('admin')  // Asegura que el rol sea 'admin'
  @Get('admin-dashboard')
  getAdminDashboard(@Request() req) {
    return { message: 'Bienvenido al panel de administración', user: req.user };
  }

}

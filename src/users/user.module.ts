import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { AuthController } from '../auth/auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],  // Asegúrate de importar User aquí
  exports: [TypeOrmModule],  // Exportamos TypeOrmModule para que AuthModule pueda acceder a él
})
export class UserModule {}

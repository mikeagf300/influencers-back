import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InfluencersModule } from './influencers/influencers.module';
import { AuthModule } from './auth/auth.module';
import { TwitterController } from './twitter/twitter.controller';
import { TwitterService } from './twitter/twitter.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, AuthModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true, // Cambiar a "false" en producción
      }),
      inject: [ConfigService],
    }),
    InfluencersModule,
  ],
  controllers: [AppController, TwitterController],
  providers: [AppService, TwitterService],
})
export class AppModule {}

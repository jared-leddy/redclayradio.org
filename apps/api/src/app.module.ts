// NPM Modules
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

// Custom Modules
import ArtistModule from './artist/artist.module';
import Artist from './database/artist.entity';
import LoggerModule from './logger/logger.module';
import SpotifyModule from './spotify/spotify.module';
import TypeORMExceptionFilter from './utils/filters/TypeORMException.filter';
import APIKeyGuard from './utils/guards/APIKey.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Artist],
      ssl:
        process.env.DB_SSL === 'true'
          ? {
              rejectUnauthorized: false
            }
          : false,
      synchronize: true
    }),
    ArtistModule,
    LoggerModule,
    SpotifyModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: TypeORMExceptionFilter
    },
    {
      provide: APP_GUARD,
      useClass: APIKeyGuard
    }
  ]
})
export class AppModule {}

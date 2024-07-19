import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from './config/dbConfig';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { TodoModule } from './modules/todo/todo.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ['.env'],
    load: [dbConfig],
    cache: false,
  }),
  TypeOrmModule.forRootAsync({
    useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
      return {
        type: 'postgres',
        host: configService.get('database.pg.host'),
        port: configService.get('database.pg.port'),
        username: configService.get('database.pg.username'),
        password: configService.get('database.pg.password'),
        database: configService.get('database.pg.database'),
        entities: [],
        synchronize: true,
        autoLoadEntities: true,
      }
    }
    ,
    inject: [ConfigService],
  }),
    UserModule,
    TodoModule],

})
export class AppModule { }

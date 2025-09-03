import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventosModule } from './eventos/eventos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.18.22',
      port: 5432,
      username: 'postgresql', 
      password: '1234',  
      database: 'eventosdb', 
      autoLoadEntities: true,
      synchronize: true,
    }),
    EventosModule,
  ],
})
export class AppModule {}

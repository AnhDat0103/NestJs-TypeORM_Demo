import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './modules/customer/customer.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '0389618799D',
    database: 'testdb',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }), CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource){}
}

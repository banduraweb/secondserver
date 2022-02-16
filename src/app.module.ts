import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import ormconfig from './ormPgConfig';
@Module({
  imports: [TypeOrmModule.forRoot(ormconfig),ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

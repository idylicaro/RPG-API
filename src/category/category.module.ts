import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoryController } from './category.controller';

@Module({
  controllers: [CategoryController],
  providers: [PrismaService],
})
export class CategoryModule {}

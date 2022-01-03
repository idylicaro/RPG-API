import { Module } from '@nestjs/common';
import { CharactersService } from './shared/characters.service';
import { CharactersController } from './characters.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CharactersController],
  providers: [CharactersService, PrismaService],
  exports: [CharactersService]
})
export class CharactersModule {}

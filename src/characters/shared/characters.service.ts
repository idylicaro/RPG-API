import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Character as CharacterModel } from '@prisma/client';
import { CreateCharacterDto } from '../dto/create-character.dto';
import { UpdateCharacterDto } from '../dto/update-character.dto';

@Injectable()
export class CharactersService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  findAll() {
    return this.prisma.character.findMany();
  }

  async create(data: CreateCharacterDto): Promise<CharacterModel> {
    return this.prisma.character.create({ data })
  }

  async findOne(id: number): Promise<CharacterModel> {
    const character = this.prisma.character.findUnique({ where: { id } });
    if (!character)
      throw new HttpException(`Character ID${id} not found.`, HttpStatus.NOT_FOUND);
    return character;
  }

  async findByUser(user_id: string): Promise<CharacterModel[] | []> {
    const character = this.prisma.character.findMany({ where: { user_id } });
    if (!character)
      throw new HttpException(
        `Characters by user not found.`,
        HttpStatus.NOT_FOUND,
      );
      console.log('Here')
    return character;
  }

  async update(id: number, data: UpdateCharacterDto): Promise<CharacterModel> {
    return this.prisma.character.update({
      data,
      where: { id },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} character`;
  }
}

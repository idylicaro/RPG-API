import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CharactersService } from './shared/characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { UpdateCharacterLevelDto } from './dto/update-character-level.dto';
import { UpdateCharacterXpDto } from './dto/update-character-xp.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.charactersService.create(createCharacterDto);
  }

  @Get()
  findAll() {
    return this.charactersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.charactersService.findOne(+id);
  }

  @Get('/findByUser/:user_id')
  findByUser(@Param('user_id') user_id: string) {
    return this.charactersService.findByUser(user_id);
  }

  @Patch('/updateName/:id')
  updateName(
    @Param('id') id: number,
    @Body() updateCharacterDto: UpdateCharacterDto,
  ) {
    return this.charactersService.updateName(+id, updateCharacterDto);
  }

  @Patch('/updateLevel/:id')
  updateLevel(
    @Param('id') id: number,
    @Body() updateCharacterLevelDto: UpdateCharacterLevelDto,
  ) {
    return this.charactersService.updateLevel(+id, updateCharacterLevelDto);
  }

  @Patch('/updateXp/:id')
  updateXp(
    @Param('id') id: number,
    @Body() updateCharacterXpDto: UpdateCharacterXpDto,
  ) {
    return this.charactersService.updateExperience(+id, updateCharacterXpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.charactersService.remove(+id);
  }
}

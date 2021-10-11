import { Character } from '../entities/character.entity';
import { IsString, IsNumber } from 'class-validator';

export class CreateCharacterDto extends Character {
  @IsString()
  readonly name: string;

  @IsNumber()
  readonly category_id: number;
}

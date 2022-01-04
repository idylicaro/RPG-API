import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsString, Max, Min } from 'class-validator';
import { CreateCharacterDto } from './create-character.dto';

export class UpdateCharacterXpDto extends PartialType(CreateCharacterDto) {
    @IsInt()
    experience?: number;
}



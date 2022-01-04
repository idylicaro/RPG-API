import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsString, Max, Min } from 'class-validator';
import { CreateCharacterDto } from './create-character.dto';

export class UpdateCharacterDto extends PartialType(CreateCharacterDto) {
    @IsString()
    name?: string;
}



import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsString, Max, Min } from 'class-validator';
import { CreateCharacterDto } from './create-character.dto';

export class UpdateCharacterLevelDto extends PartialType(CreateCharacterDto) {
    @IsInt()
    @Min(0)
    @Max(99)
    level?: number;
}



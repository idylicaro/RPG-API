import { Prisma } from '@prisma/client';

export class Character implements Prisma.CharacterUncheckedCreateInput {
  id?: number;
  user_id: string;
  name: string;
  category_id: number;
  hp: number;
  strength: number;
  defense: number;
  agility: number;
  intelligence: number;
}

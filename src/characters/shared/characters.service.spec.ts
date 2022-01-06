import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import { CharactersService } from './characters.service';

describe('CharactersService', () => {
  let service: CharactersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharactersService, PrismaService],
    }).compile();

    service = module.get<CharactersService>(CharactersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be return all characters', async () => {
    prisma.character.findMany = jest.fn().mockReturnValueOnce([
      { id: 1, user_id: 't3st3', name: 'testUser', category_id: 2, level: 1, experience: 0, hp: 200, strength: 5, defense: 5, agility: 5, intelligence: 5 },
      { id: 2, user_id: 't3st1', name: 'testUser2', category_id: 2, level: 2, experience: 500, hp: 500, strength: 50, defense: 50, agility: 50, intelligence: 50 },
    ]);
    const characters = await service.findAll()
    expect(characters[0].id).toBe(1)
    expect(characters[0].user_id).toBe('t3st3')
    expect(characters).toHaveLength(2)
  });

});

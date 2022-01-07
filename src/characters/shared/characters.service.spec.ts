import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma.service';
import { Character } from '../entities/character.entity';
import { CharactersService } from './characters.service';
import { CreateCharacterDto} from '../dto/create-character.dto'

const makeFakeCharacterData = (): Character => ({
  id: 1, user_id: 't3st3', name: 'testUser', category_id: 2, level: 1, experience: 0, hp: 200, strength: 5, defense: 5, agility: 5, intelligence: 5
})
const makeFakeCreateCharacterDtoData = (): CreateCharacterDto => ({
  id: null, user_id: 't3st3', name: 'testUser', category_id: 2, level: null, experience: null, hp: null, strength: null, defense: null, agility: null, intelligence: null
})

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

  it('should returns character if create successful', async () => {
    prisma.character.create = jest.fn().mockReturnValueOnce(makeFakeCharacterData());
    const createSpy = jest.spyOn(prisma.character, 'create')
    const data = makeFakeCreateCharacterDtoData()
    const promiseResult = await service.create(data)
    expect(createSpy).toHaveBeenCalled()
    expect(createSpy).toHaveBeenCalledWith({data})
    expect(promiseResult).toEqual(makeFakeCharacterData())
  });

});

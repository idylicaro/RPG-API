import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Character } from '../entities/character.entity';
import { CharactersService } from './characters.service';
import { CreateCharacterDto} from '../dto/create-character.dto'
import { UpdateCharacterDto} from '../dto/update-character.dto'

const makeFakeOnceCharacterData = (): Character => ({
  id: 1, user_id: 't3st3', name: 'testUser', category_id: 2, level: 1, experience: 0, hp: 200, strength: 5, defense: 5, agility: 5, intelligence: 5
})
const makeFakeCharacterUpdatedNameData = (): Character => ({
  id: 1, user_id: 't3st3', name: 'newtestUser', category_id: 2, level: 1, experience: 0, hp: 200, strength: 5, defense: 5, agility: 5, intelligence: 5
})

const makeFakeCharacterUpdatedLevelData = (): Character => ({
  id: 1, user_id: 't3st3', name: 'testUser', category_id: 2, level: 5, experience: 0, hp: 200, strength: 5, defense: 5, agility: 5, intelligence: 5
})

const makeFakeCharacterUpdatedExperienceData = (): Character => ({
  id: 1, user_id: 't3st3', name: 'testUser', category_id: 2, level: 1, experience: 0, hp: 200, strength: 5, defense: 5, agility: 5, intelligence: 5
})

const makeFakeManyCharacterData = (): Character[] => ([
  { id: 1, user_id: 't3st3', name: 'testUser', category_id: 2, level: 1, experience: 0, hp: 200, strength: 5, defense: 5, agility: 5, intelligence: 5 },
  { id: 2, user_id: 't3st1', name: 'testUser2', category_id: 2, level: 2, experience: 500, hp: 500, strength: 50, defense: 50, agility: 50, intelligence: 50 },
])

const makeFakeCreateCharacterDtoData = (): CreateCharacterDto => ({
  id: null, user_id: 't3st3', name: 'testUser', category_id: 2, level: null, experience: null, hp: null, strength: null, defense: null, agility: null, intelligence: null
})

const makeFakeUpdateCharacterNameDtoData = (): UpdateCharacterDto => ({
  id: null, user_id: null, name: 'newtestUser', category_id: null, level: null, experience: null, hp: null, strength: null, defense: null, agility: null, intelligence: null
})
const makeFakeUpdateCharacterLevelDtoData = (): UpdateCharacterDto => ({
  id: null, user_id: null, name: null, category_id: null, level: 5, experience: null, hp: null, strength: null, defense: null, agility: null, intelligence: null
})

const makeFakeUpdateCharacterExperienceDtoData = (): UpdateCharacterDto => ({
  id: null, user_id: null, name: null, category_id: null, level: null, experience: 500, hp: null, strength: null, defense: null, agility: null, intelligence: null
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

  it('should be return all characters if findAll successful ', async () => {
    prisma.character.findMany = jest.fn().mockReturnValueOnce(makeFakeManyCharacterData());
    const characters = await service.findAll()
    expect(characters[0].id).toBe(1)
    expect(characters[0].user_id).toBe('t3st3')
    expect(characters).toHaveLength(2)
  });

  it('should calls correctly and returns character if create successful', async () => {
    prisma.character.create = jest.fn().mockReturnValueOnce(makeFakeOnceCharacterData());
    const createSpy = jest.spyOn(prisma.character, 'create')
    const data = makeFakeCreateCharacterDtoData()
    const promiseResult = await service.create(data)
    expect(createSpy).toHaveBeenCalled()
    expect(createSpy).toHaveBeenCalledWith({data})
    expect(promiseResult).toEqual(makeFakeOnceCharacterData())
  });

  it('should calls correctly and returns character if findOne successful', async () => {
    prisma.character.findUnique = jest.fn().mockReturnValueOnce(makeFakeOnceCharacterData());
    const findOneSpy = jest.spyOn(prisma.character, 'findUnique')
    const data = 1
    const promiseResult = await service.findOne(data)
    expect(findOneSpy).toHaveBeenCalled()
    expect(findOneSpy).toHaveBeenCalledWith({where: {id: data}})
    expect(promiseResult).toEqual(makeFakeOnceCharacterData())
  })

  it('should throw HttpException if findOne not successful', async () => {
    const fakeError = new HttpException(`Character ID 1 not found.`, HttpStatus.NOT_FOUND);
    prisma.character.findUnique = jest.fn().mockResolvedValue(null);
    try {
      await service.findOne(1)
    } catch (error) {
      await expect(error).toThrow(fakeError)
    }
  })

  it('should calls correctly and returns characters if findByUser successful', async () => {
    prisma.character.findMany = jest.fn().mockReturnValueOnce([makeFakeOnceCharacterData()]);
    const findByUserSpy = jest.spyOn(prisma.character, 'findMany')
    const userId = 't3st3'
    const promiseResult = await service.findByUser(userId)
    expect(findByUserSpy).toHaveBeenCalled()
    expect(findByUserSpy).toHaveBeenCalledWith({where: {user_id: userId}})
    expect(promiseResult[0]).toEqual(makeFakeOnceCharacterData())
  });

  it('should calls correctly and returns character if updateName successful', async () => {
    prisma.character.update = jest.fn().mockReturnValueOnce(makeFakeCharacterUpdatedNameData());
    const updateSpy = jest.spyOn(prisma.character, 'update')
    const id = 1
    const promiseResult = await service.updateName(id, makeFakeUpdateCharacterNameDtoData())
    expect(updateSpy).toHaveBeenCalled()
    expect(updateSpy).toHaveBeenCalledWith({data: makeFakeUpdateCharacterNameDtoData(), where: {id: id}})
    expect(promiseResult).toEqual(makeFakeCharacterUpdatedNameData())
  })

  it('should calls correctly and returns character if updateLevel successful', async () => {
    prisma.character.update = jest.fn().mockReturnValueOnce(makeFakeCharacterUpdatedLevelData());
    const updateSpy = jest.spyOn(prisma.character, 'update')
    const id = 1
    const promiseResult = await service.updateLevel(id, makeFakeUpdateCharacterLevelDtoData())
    expect(updateSpy).toHaveBeenCalled()
    expect(updateSpy).toHaveBeenCalledWith({data: makeFakeUpdateCharacterLevelDtoData(), where: {id: id}})
    expect(promiseResult).toEqual(makeFakeCharacterUpdatedLevelData())
  })

  it('should calls correctly and returns character if updateExperience successful', async () => {
    prisma.character.update = jest.fn().mockReturnValueOnce(makeFakeCharacterUpdatedExperienceData());
    const updateSpy = jest.spyOn(prisma.character, 'update')
    const id = 1
    const promiseResult = await service.updateExperience(id, makeFakeUpdateCharacterExperienceDtoData())
    expect(updateSpy).toHaveBeenCalled()
    expect(updateSpy).toHaveBeenCalledWith({data: makeFakeUpdateCharacterExperienceDtoData(), where: {id: id}})
    expect(promiseResult).toEqual(makeFakeCharacterUpdatedExperienceData())
  })

  it('should calls correctly and returns character if remove successful', async () => {
    prisma.character.delete = jest.fn().mockReturnValueOnce(makeFakeOnceCharacterData());
    const deleteSpy = jest.spyOn(prisma.character, 'delete')
    const id = 1
    const promiseResult = await service.remove(id)
    expect(deleteSpy).toHaveBeenCalled()
    expect(deleteSpy).toHaveBeenCalledWith({where: {id: id}})
    expect(promiseResult).toEqual(makeFakeOnceCharacterData())
  })

});

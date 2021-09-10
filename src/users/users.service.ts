import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User as UserModel } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<UserModel[] | []> {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<UserModel> {
    const user = this.prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user)
      throw new HttpException(`User ID${id} not found.`, HttpStatus.NOT_FOUND);
    return user;
  }

  async create(data: CreateUserDto): Promise<UserModel> {
    return this.prisma.user.create({ data });
  }

  async update(id: string, data: UpdateUserDto): Promise<UserModel> {
    return this.prisma.user.update({
      data,
      where: { id: Number(id) },
    });
  }
}

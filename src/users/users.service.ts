import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User as UserModel } from '@prisma/client';

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

  async create(createUserDto: any): Promise<UserModel> {
    return this.prisma.user.create({ data: createUserDto });
  }

  async update(id: string, updateUserDto: any): Promise<UserModel> {
    return this.prisma.user.update({
      data: updateUserDto,
      where: { id: Number(id) },
    });
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { User as UserModel } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { BcryptService } from 'src/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcrypt: BcryptService,
  ) {}

  async findAll(): Promise<UserModel[] | []> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<UserModel> {
    const user = this.prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user)
      throw new HttpException(`User ID${id} not found.`, HttpStatus.NOT_FOUND);
    return user;
  }

  async findByUsername(username: string): Promise<UserModel> {
    const user = this.prisma.user.findUnique({ where: { username } });
    if (!user)
      throw new HttpException(
        `User Username${username} not found.`,
        HttpStatus.NOT_FOUND,
      );
    return user;
  }

  async create(data: CreateUserDto): Promise<UserModel> {
    const hashedPassword = await this.bcrypt.hashPassword(data.password);
    return this.prisma.user.create({
      data: {
        username: data.username,
        password: hashedPassword,
      },
    });
  }

  async update(id: string, data: UpdateUserDto): Promise<UserModel> {
    return this.prisma.user.update({
      data,
      where: { id: Number(id) },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}

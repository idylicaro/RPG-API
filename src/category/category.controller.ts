import { Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    @Post()
    async seedCategories(): Promise<any> {
        await this.prisma.category.create({ data: { name: 'Fighter' } })
        await this.prisma.category.create({ data: { name: 'Mage' } })
        await this.prisma.category.create({ data: { name: 'Archer' } })
        await this.prisma.category.create({ data: { name: 'Warrior' } })
        await this.prisma.category.create({ data: { name: 'Assassin' } })
        return {'message':'Okay'}
    }

    @Get()
    findAll() {
        return this.prisma.category.findMany();
    }
}

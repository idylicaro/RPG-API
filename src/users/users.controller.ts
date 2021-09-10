import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}
    
    @Get()
    findAll() {
        return this.usersService.findAll()
    }
    @Get(':id')
    findById(@Param() params) {
        return this.usersService.findById(params.id)
    }

    // @Post()
    // @HttpCode(HttpStatus.NO_CONTENT)
    // create(@Body() body) {
    //     return body
    // }

    @Post()
    create(@Res() res, @Body() createUserDto : CreateUserDto) {
        return this.usersService.create(createUserDto)
    }

    @Put(':id')
    updatePassword(@Param() params, @Body() updateUserDto: UpdateUserDto){
        return this.usersService.update(params.id, updateUserDto)
    }
    
    //@Patch
    //@Delete
}
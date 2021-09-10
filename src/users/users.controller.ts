import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Res } from '@nestjs/common';
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
    create(@Res() response, @Body() body) {
        return this.usersService.create(body)
    }

    @Put(':id')
    updatePassword(@Param() params, @Body() body){
        return this.usersService.update(params.id, body)
    }
    
    //@Patch
    //@Delete
}

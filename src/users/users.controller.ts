import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    findAll() {
        return 'All users'
    }
    @Get(':id')
    findById(@Param() params) {
        return `user #${params.id}`
    }

    // @Post()
    // @HttpCode(HttpStatus.NO_CONTENT)
    // create(@Body() body) {
    //     return body
    // }

    @Post()
    create(@Res() response, @Body() body) {
        return response.status(HttpStatus.CREATED).send(body)
    }

    @Patch(':id')
    updatePassword(@Param() params, @Body() body){
        return `user #${params.id} change password to: ${body.password}`
    }
    //@Update
    //@Delete
}

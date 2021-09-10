import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    private users: User[] = [
        {
            id: '1',
            username: 'idylicaro',
            password:'123456'
        }
    ];

    findAll(){
        return this.users
    }

    findById(id: string){
        const user = this.users.find((user) => user.id === id)
        if (!user) throw new HttpException(`User ID${id} not found.`, HttpStatus.NOT_FOUND)
        return user
    }

    create(createUserDto: any){
        this.users.push(createUserDto)
    }

    update(id:string, updateUserDto:any){
        const indexUser = this.users.findIndex((user: User) => user.id === id)
        this.users[indexUser] = updateUserDto
    }
}

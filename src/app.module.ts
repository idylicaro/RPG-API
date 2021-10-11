import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CharactersModule } from './characters/characters.module';

@Module({
  imports: [UsersModule, AuthModule, CharactersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CharactersModule } from './characters/characters.module';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [UsersModule, AuthModule, CharactersModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

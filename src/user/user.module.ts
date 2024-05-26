import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Major } from 'src/major/entities/major.entity';
import { Friendship } from './entities/friendship.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Friendship]),
    TypeOrmModule.forFeature([Major]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

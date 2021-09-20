import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { PrismaService } from 'src/prisma.service';
import { PasswordService } from 'src/security/services';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PasswordService, PrismaService],
  exports: [UsersService],
})
export class UsersModule {}

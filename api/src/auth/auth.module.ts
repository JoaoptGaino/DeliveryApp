import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SecurityModule } from 'src/security/security.module';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controller/auth.controller';
import { UsersService } from 'src/users/services/users.service';

@Module({
  imports: [UsersModule, SecurityModule],
  providers: [AuthService, PrismaService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}

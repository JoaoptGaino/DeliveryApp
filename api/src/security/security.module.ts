import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/auth/services/auth.service';
import { UsersService } from 'src/users/services/users.service';
import { PrismaService } from '../prisma.service';
import { UsersModule } from '../users/users.module';
import { JwtAuthGuard, LocalAuthGuard } from './guards';
import { PasswordService } from './services/password.service';
import { SecurityService } from './services/security.service';
import { JwtStrategy, LocalStrategy } from './strategies';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({
      session: true,
    }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: 'ase13213asdj1io232190',
        signOptions: { expiresIn: '1d' },
      }),
    }),
  ],
  providers: [
    AuthService,
    SecurityService,
    LocalStrategy,
    JwtStrategy,
    LocalAuthGuard,
    PrismaService,
    PasswordService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [
    SecurityService,
    PasswordService,
    LocalStrategy,
    JwtStrategy,
    LocalAuthGuard,
  ],
})
export class SecurityModule {}

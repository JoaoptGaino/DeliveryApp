import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/services/users.service';
import { IAuthenticatedUser, IUserSession } from '../context/models';
import { PasswordService } from './password.service';

@Injectable()
export class SecurityService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(
    email: string,
    password: string,
  ): Promise<IAuthenticatedUser> {
    const user = await this.usersService.findUserByEmail(email);
    const isPassword = await this.passwordService.comparePassword(
      password,
      user.password,
    );
    if (user && isPassword) {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        phone: user.phone,
      };
    }
    return null;
  }

  async login(user: IUserSession) {
    const payload = { email: user.email, sub: user.userId };
    const token = this.jwtService.sign(payload);
    const userAuthenticated = await this.usersService.findUserByEmail(
      payload.email,
    );
    return {
      user: {
        id: userAuthenticated.id,
        username: userAuthenticated.username,
        token,
        phone: userAuthenticated.phone,
      },
    };
  }
  async loggedProfile(userId: number): Promise<User | null> {
    if (userId) {
      return this.usersService.findOne(userId);
    }
    return null;
  }
}

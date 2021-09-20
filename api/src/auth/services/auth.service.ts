import { Injectable, Logger } from '@nestjs/common';
import { IAuthenticatedUser } from 'src/security/context/models';
import { SecurityService } from 'src/security/services';

@Injectable()
export class AuthService {
  constructor(private readonly securityService: SecurityService) {}
  private readonly logger = new Logger();
  async login({ id, email }: IAuthenticatedUser) {
    return this.securityService.login({
      userId: id,
      email: email,
    });
  }
  async profile(user: IAuthenticatedUser) {
    return this.securityService.loggedProfile(user.id);
  }
}

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { SecurityService } from '../services/security.service';
import { IAuthenticatedUser } from '../context/models';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private moduleRef: ModuleRef) {
    super({
      passReqToCallback: true,
      usernameField: 'email',
    });
  }
  async validate(
    request: Request,
    username: string,
    password: string,
  ): Promise<IAuthenticatedUser> {
    const contextId = ContextIdFactory.getByRequest(request);
    const securityService = await this.moduleRef.resolve(
      SecurityService,
      contextId,
    );
    const user = await securityService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

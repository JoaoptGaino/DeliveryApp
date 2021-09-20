import { compare, genSalt, hash } from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordService {
  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(password, salt);
  }
  async comparePassword(
    providedPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    return compare(providedPassword, storedPassword);
  }
}

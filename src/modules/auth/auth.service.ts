
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { sha1 } from 'object-hash';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const encryptedPass = sha1(pass);
    const user = await this.userService.findByEmailAndPassword({email, password: encryptedPass});
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
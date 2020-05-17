
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const encryptedPass = await bcrypt.hash(pass, 10);
    console.log(encryptedPass);
    const user = await this.userService.findByEmailAndPassword({email, password: encryptedPass});
    if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
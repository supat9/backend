import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService, ValidatedUser } from '../user/user.service';
import { RegisterDto } from '../user/dto/register.dto';

export type AuthUser = ValidatedUser;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  register(registerDto: RegisterDto) {
    return this.userService.create(registerDto);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthUser | null> {
    return this.userService.validateUser(email, password);
  }

  login(user: AuthUser) {
    const payload = { email: user.email, role: user.role, userId: user.userId };
    return {
      userId: user.userId,
      email: user.email,
      role: user.role,
      accessToken: this.jwtService.sign(payload),
    };
  }
}

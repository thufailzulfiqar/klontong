import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';

class RegisterUserDto {
  name: string;
  email: string;
  password: string;
}

class LoginUserDto {
  email: string;
  password: string;
}

@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(@Body() dto: RegisterUserDto, @Res() res: Response) {
    const user = await this.userService.register(dto);
    const { password, ...userData } = user;
    res.status(HttpStatus.CREATED).json({
      message: 'register successful',
      user: userData
    });
  }

  @Post('/login')
  async login(@Body() dto: LoginUserDto, @Res() res: Response) {
    try {
      const result = await this.userService.login(dto);

      res.cookie('jwt', result.token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'strict'
      });

      res.status(HttpStatus.OK).json({
        message: 'Login successful',
        user: result.user,
        token: result.token
      });
    } catch (err) {
      res.status(HttpStatus.UNAUTHORIZED).json({ message: err.message });
    }
  }
}
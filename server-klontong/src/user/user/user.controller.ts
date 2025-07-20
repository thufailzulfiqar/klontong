import { Controller, Post, Body, Res, HttpStatus, UsePipes, ValidationPipe, Get, Req, UseGuards, Put, Param } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserService } from './user.service';
import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsString } from 'class-validator';
import { AuthGuard } from '@nestjs/passport';

declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}

class RegisterUserDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  role?: string;
}

class LoginUserDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}

class EditUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  role?: string;
}

@Controller('/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async register(@Body() dto: RegisterUserDto, @Res() res: Response) {
    const user = await this.userService.register(dto);
    const { password, ...userData } = user;
    res.status(HttpStatus.CREATED).json({
      message: 'register successful',
      user: userData
    });
  }

  @Post('/login')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
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

  @Post('/logout')
  async logout(@Res() res: Response) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'strict'
    });
    res.clearCookie('user', {
      httpOnly: true,
      sameSite: 'strict'
    });
    res.status(HttpStatus.OK).json({
      message: 'Logout successful'
    });
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Req() req: Request) {
    return { user: req.user };
  }

  @Put('/edit/:id')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async editUser(@Param('id') id: string, @Body() dto: EditUserDto, @Req() req: Request, @Res() res: Response) {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Forbidden: Only admin can edit user' });
    }
    try {
      const user = await this.userService.editUser(Number(id), dto);
      const { password, ...userData } = user;
      res.status(HttpStatus.OK).json({
        message: 'User updated successfully',
        user: userData
      });
    } catch (err) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAll(@Req() req: Request, @Res() res: Response) {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(HttpStatus.FORBIDDEN).json({ message: 'Forbidden: Only admin can access user list' });
    }
    const users = await this.userService.getAll();
    res.status(HttpStatus.OK).json(users);
  }
}
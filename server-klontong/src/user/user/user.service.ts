import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

interface RegisterUserDto {
  name: string;
  email: string;
  password: string;
}

interface LoginUserDto {
  email: string;
  password: string;
}

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async register(dto: RegisterUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
      },
    });
  }

  async login(dto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email }
    });
    if (!user) throw new UnauthorizedException('Email atau password salah');
    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Email atau password salah');
    const { password, ...userData } = user;

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      name: user.name
    });

    return { user: userData, token };
  }
}
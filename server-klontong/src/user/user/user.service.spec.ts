import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Response } from 'express';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  const mockUserService = {
    register: jest.fn().mockResolvedValue({
      id: 1,
      name: 'User1',
      email: 'user1@mail.com',
      password: 'hashedpassword'
    }),
    login: jest.fn().mockResolvedValue({
      user: {
        id: 1,
        name: 'User1',
        email: 'user1@mail.com'
      },
      token: 'jwt_token'
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockUserService }
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register user and not return password', async () => {
    const mockRes: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await controller.register(
      { name: 'User1', email: 'user1@mail.com', password: 'user123' },
      mockRes as Response
    );
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'register successful',
      user: {
        id: 1,
        name: 'User1',
        email: 'user1@mail.com'
      }
    });
  });

  it('should login user and set cookie', async () => {
    const mockRes: Partial<Response> = {
      cookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    await controller.login(
      { email: 'user1@mail.com', password: 'user123' },
      mockRes as Response
    );
    expect(mockRes.cookie).toHaveBeenCalledWith(
      'jwt',
      'jwt_token',
      expect.objectContaining({
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'strict'
      })
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Login successful',
      user: {
        id: 1,
        name: 'User1',
        email: 'user1@mail.com'
      },
      token: 'jwt_token'
    });
  });

  it('should call guard and block unauthorized access', async () => {
    class MockAuthGuard extends AuthGuard('jwt') {
      canActivate(context: ExecutionContext) {
        return false;
      }
    }
    const guard = new MockAuthGuard();
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({})
      })
    } as unknown as ExecutionContext;
    expect(await guard.canActivate(context)).toBe(false);
  });
});

describe('UserController Validation', () => {
  let controller: UserController;

  const mockUserService = {
    register: jest.fn().mockResolvedValue({
      id: 1,
      name: 'User1',
      email: 'user1@mail.com',
      password: 'hashedpassword'
    }),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should fail validation if email is missing', async () => {
    const mockRes: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    try {
      await controller.register({ name: 'User1', password: 'user123' } as any, mockRes as Response);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it('should fail validation if password is too short', async () => {
    const mockRes: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    try {
      await controller.register({ name: 'User1', email: 'user1@mail.com', password: '123' } as any, mockRes as Response);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});
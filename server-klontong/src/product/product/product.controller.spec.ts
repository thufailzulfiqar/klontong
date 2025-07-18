import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Response } from 'express';

describe('ProductController', () => {
  let controller: ProductController;
  let productService: ProductService;

  const mockProductService = {
    getAll: jest.fn().mockResolvedValue([
      { id: 1, name: 'Produk1' },
      { id: 2, name: 'Produk2' },
    ]),
    getById: jest.fn().mockResolvedValue({ id: 1, name: 'Produk1' }),
    create: jest.fn().mockResolvedValue({ id: 3, name: 'Produk3' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{ provide: ProductService, useValue: mockProductService }],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all products', async () => {
    const result = await controller.getAll();
    expect(result).toEqual([
      { id: 1, name: 'Produk1' },
      { id: 2, name: 'Produk2' },
    ]);
    expect(productService.getAll).toHaveBeenCalled();
  });

  it('should get product by id', async () => {
    const mockRes: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await controller.getById('1', mockRes as Response);
    expect(productService.getById).toHaveBeenCalledWith(1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ id: 1, name: 'Produk1' });
  });

  it('should create product and return response', async () => {
    const mockRes: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const dto = { name: 'Produk3' };
    await controller.create(dto as any, mockRes as Response);
    expect(productService.create).toHaveBeenCalledWith(dto);
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Product created successfully',
      product: { id: 3, name: 'Produk3' },
    });
  });
});

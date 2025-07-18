import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from '../../prisma/prisma/prisma.service';

describe('ProductService', () => {
  let service: ProductService;
  let prisma: PrismaService;

  const mockPrismaService = {
    product: {
      findMany: jest.fn().mockResolvedValue([
        { id: 1, name: 'Produk1' },
        { id: 2, name: 'Produk2' },
      ]),
      findUnique: jest.fn().mockResolvedValue({ id: 1, name: 'Produk1' }),
      create: jest.fn().mockResolvedValue({ id: 3, name: 'Produk3' }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all products', async () => {
    const result = await service.getAll();
    expect(result).toEqual([
      { id: 1, name: 'Produk1' },
      { id: 2, name: 'Produk2' },
    ]);
    expect(prisma.product.findMany).toHaveBeenCalled();
  });

  it('should get product by id', async () => {
    const result = await service.getById(1);
    expect(result).toEqual({ id: 1, name: 'Produk1' });
    expect(prisma.product.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should create product', async () => {
    const dto = { name: 'Produk3' };
    const result = await service.create(dto);
    expect(result).toEqual({ id: 3, name: 'Produk3' });
    expect(prisma.product.create).toHaveBeenCalledWith({ data: dto });
  });
});

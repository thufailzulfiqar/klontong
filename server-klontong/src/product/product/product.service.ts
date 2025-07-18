import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return this.prisma.product.findMany();
  }

  async getById(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  async create(dto: any) {
    const { id, ...data } = dto;
    return this.prisma.product.create({
      data,
    });
  }

  async getPaginated(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        skip,
        take: limit,
        orderBy: { id: 'asc' },
      }),
      this.prisma.product.count(),
    ]);
    return {
      data: products,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async getByCategory(categoryId: number) {
    return this.prisma.product.findMany({
      where: { CategoryId: categoryId },
      orderBy: { id: 'asc' },
    });
  }

  async search(query: string) {
    return this.prisma.product.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive'
        }
      },
      orderBy: { id: 'asc' }
    });
  }
}
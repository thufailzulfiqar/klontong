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
}
import { Controller, Get, Param, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ProductService } from './product.service';

class CreateProductDto {
  CategoryId: number;
  categoryName: string;
  sku: string;
  name: string;
  description: string;
  weight: number;
  width: number;
  length: number;
  height: number;
  image: string;
  price: number;
}

@Controller('/api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll() {
    return this.productService.getAll();
  }

  @Post('/add')
  async create(@Body() dto: CreateProductDto, @Res() res: Response) {
    const product = await this.productService.create(dto);
    res.status(HttpStatus.CREATED).json({
      message: 'Product created successfully',
      product,
    });
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    return this.productService.getById(Number(id));
  }
}
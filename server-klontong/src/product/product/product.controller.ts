import { Controller, Get, Param, Post, Body, Res, HttpStatus, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { Response } from 'express';
import { ProductService } from './product.service';
import { IsInt, IsNotEmpty, IsString, IsNumber, Min, MinLength, IsUrl } from 'class-validator';

export class CreateProductDto {
  @IsInt()
  CategoryId: number;

  @IsString()
  @IsNotEmpty()
  categoryName: string;

  @IsString()
  @MinLength(3)
  sku: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @Min(1)
  weight: number;

  @IsInt()
  @Min(1)
  width: number;

  @IsInt()
  @Min(1)
  length: number;

  @IsInt()
  @Min(1)
  height: number;

  @IsString()
  @IsUrl()
  image: string;

  @IsNumber()
  @Min(1)
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
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async create(@Body() dto: CreateProductDto, @Res() res: Response) {
    const product = await this.productService.create(dto);
    res.status(HttpStatus.CREATED).json({
      message: 'Product created successfully',
      product,
    });
  }

  @Get('/page')
  async getPaginated(
    @Query('page') page: string = '1',
    @Res() res: Response
  ) {
    const pageNum = Number(page) > 0 ? Number(page) : 1;
    const limit = 10;
    const result = await this.productService.getPaginated(pageNum, limit);
    res.status(HttpStatus.OK).json(result);
  }
  
  @Get('/:id')
  async getById(@Param('id') id: string, @Res() res: Response) {
    const product = await this.productService.getById(Number(id));
    if (!product) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: `Product with id ${id} not found`,
      });
    }
    return res.status(HttpStatus.OK).json(product);
  }

}
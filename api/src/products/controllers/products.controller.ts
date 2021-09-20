import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: Prisma.ProductsCreateInput) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(
    @Query('skip') skip?: string,
    @Query('limit') limit?: string,
    @Query('take') take?: string,
    @Query('name') name?: string,
    @Query('description') description?: string,
    @Query('price') price?: Decimal,
    @Query('categoryId') categoryId?: number,
    @Query('cursor') cursor?: string,
    @Query('sort') sort?: Prisma.ProductsOrderByInput,
  ) {
    const products = await this.productsService.findAll({
      take: limit || take ? Number(limit ?? take) : undefined,
      orderBy: sort,
      skip: skip && Number(skip),
      cursor: cursor && {
        id: Number(cursor),
      },
      where: {
        name: { startsWith: name },
        description: { startsWith: description },
        price: price && Number(price),
        categoryId: categoryId && Number(categoryId),
      },
    });
    return {
      totalCount: products.length,
      products,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}

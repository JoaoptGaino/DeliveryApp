import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async create(data: Prisma.ProductsCreateInput): Promise<Product> {
    const product = await this.prisma.products.create({ data });
    return product;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductsWhereUniqueInput;
    where?: Prisma.ProductsWhereInput;
    orderBy?: Prisma.ProductsOrderByInput;
  }): Promise<Product[]> {
    const { cursor, orderBy, skip, take, where } = params;
    const allProducts = await this.prisma.products.findMany({
      skip,
      cursor,
      orderBy,
      take,
      where,
      include: { categoryFK: true },
    });
    return allProducts;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

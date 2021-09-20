import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  async create(data: Prisma.CategoriesCreateInput): Promise<Category> {
    const category = await this.prisma.categories.create({ data });
    return category;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CategoriesWhereUniqueInput;
    where?: Prisma.CategoriesWhereInput;
    orderBy?: Prisma.CategoriesOrderByInput;
  }): Promise<Category[]> {
    const { cursor, orderBy, skip, take, where } = params;
    const allCategories = await this.prisma.categories.findMany({
      skip,
      cursor,
      orderBy,
      take,
      where,
    });
    return allCategories;
  }

  async findOne(id: number) {
    const category = await this.prisma.categories.findUnique({ where: { id } });
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const updatedCategory = await this.prisma.categories.update({
      where: { id },
      data: updateCategoryDto,
    });
    return updatedCategory;
  }

  async remove(id: number) {
    const removedCategory = await this.prisma.categories.delete({
      where: { id },
    });
    return removedCategory;
  }
}

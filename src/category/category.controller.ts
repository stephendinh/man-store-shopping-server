import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateSubCategoryDto } from './dto/create-subCategory.dto';

@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post('sub-category')
  async createSubCategory(@Body() createSubCategory: CreateSubCategoryDto) {
    return this.categoryService.createSubCategory(createSubCategory);
  }

  @Post()
  async createCategory(@Body() createCategory: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategory);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number) {
    console.log('id', id);
    return this.categoryService.deleteCategory(id);
  }

  @Get()
  async findAllCategory() {
    console.log('runhere');
    return this.categoryService.findAll();
  }
}

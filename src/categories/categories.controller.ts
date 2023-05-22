import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Category } from './categories.entity/categories.entity';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private service: CategoriesService) {}

  @Get()
  getAll() {
    return this.service.getCategories();
  }

  @Get(':id')
  get(@Param() params) {
    return this.service.getCategory(params.id);
  }

  @Post()
  create(@Body() category: Category) {
    return this.service.createCategory(category);
  }

  @Put(':id')
  update(@Param() params, @Body() category: Category) {
    return this.service.updateCategory(params.id, category);
  }

  @Delete(':id')
  deleteCategory(@Param() params) {
    return this.service.deleteCategory(params.id);
  }
}

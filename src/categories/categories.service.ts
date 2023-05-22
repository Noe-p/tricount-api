import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Category } from './categories.entity/categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categorysRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return await this.categorysRepository.find();
  }

  async getCategory(_id: string): Promise<Category[]> {
    return await this.categorysRepository.find({
      select: ['label', 'id'],
      where: [{ id: _id }],
    });
  }

  async createCategory(category: Category) {
    const id = uuidv4();
    this.categorysRepository.save({ ...category, id: id });
  }

  async updateCategory(id: number, category: Category) {
    this.categorysRepository.update(id, category);
  }

  async deleteCategory(category: Category) {
    this.categorysRepository.delete(category);
  }
}

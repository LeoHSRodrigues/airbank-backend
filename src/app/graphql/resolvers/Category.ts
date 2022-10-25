import { CategoryRepository } from '@/app/repositories/Category';
import { CategoryService } from '@/app/services/category';

const categoryRepository = new CategoryRepository()
const categoryService = new CategoryService()

export default {
  Query: {
    allCategories: (_parent, args) => categoryRepository.find(args),
    category: (_parent, args) => categoryRepository.findOne(args)
  },
  Mutation: {
    newCategory: (_parent, args) => categoryService.save(args)
  }
}
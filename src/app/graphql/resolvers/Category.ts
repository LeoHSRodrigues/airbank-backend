import { CategoryRepository } from '@/app/repositories/Category';

const categoryRepository = new CategoryRepository()

export default {
  Query: {
    allCategories: (_parent, args) => categoryRepository.find(args),
    category: (_parent, args) => categoryRepository.findOne(args)
  }
}
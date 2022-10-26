import { CategoryService } from '@/app/services/category';

const categoryService = new CategoryService()

export default {
  Query: {
    allCategories: (_parent, args) => categoryService.find(args),
    category: (_parent, args) => categoryService.findOne(args)
  },
  Mutation: {
    newCategory: (_parent, args) => categoryService.save(args)
  }
}
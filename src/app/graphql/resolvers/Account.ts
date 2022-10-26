import { CategoryService } from '@/app/services/category';

const categoryService = new CategoryService()

export default {
  Query: {
    allAccounts: (_parent, args) => categoryService.find(args),
    account: (_parent, args) => categoryService.findOne(args)
  }
}
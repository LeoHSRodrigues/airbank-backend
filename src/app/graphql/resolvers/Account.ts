import { AccountService } from '@/app/services/account';

const accountService = new AccountService()

export default {
  Query: {
    allAccounts: (_parent, args) => accountService.find(args),
    account: (_parent, args) => accountService.findOne(args)
  }
}
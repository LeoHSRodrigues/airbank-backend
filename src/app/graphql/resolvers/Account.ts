import { AccountRepository } from '@/app/repositories/Account';

const accountRepository = new AccountRepository()

export default {
  Query: {
    allAccounts: (_parent, args) => accountRepository.find(args),
    account: (_parent, args) => accountRepository.findOne(args)
  }
}
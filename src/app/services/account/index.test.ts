import { AccountRepository } from "@/app/repositories/Account";
import { Account } from "@prisma/client";
import { AccountService } from ".";

describe('given AccountService', () => {
    const accountService = new AccountService()

    const mockAccount: Account = {
        bank: 'testBank',
        id: 'AccountId',
        name: 'test'
    }

    jest.spyOn(AccountRepository.prototype, 'find').mockResolvedValue([mockAccount])
    jest.spyOn(AccountRepository.prototype, 'findOne').mockResolvedValue(mockAccount)

    it('should find all accounts', async () => {
        const transactions = await accountService.find({})
        expect(transactions).toStrictEqual([mockAccount])
    });

    it('should find one account', async () => {
        const transaction = await accountService.findOne({})
        
        expect(transaction).toStrictEqual(mockAccount)
    });
});

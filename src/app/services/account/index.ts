import { IAccountSearchOptions } from "@/app/interfaces/Accounts";
import { AccountRepository } from "@/app/repositories/Account";

export class AccountService {
    private accountRepository: AccountRepository

    constructor() {
        this.accountRepository = new AccountRepository()
    }

    public async find(options: IAccountSearchOptions) {

        return await this.accountRepository.find(options)
    }

    public async findOne(identifier) {
        return await this.accountRepository.findOne(identifier)
    }
}
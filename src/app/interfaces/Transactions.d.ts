export interface ITransactionSearchOptions {
    initialDate: Date;
    endingDate: Date;
    search: String;
    bankId: String;
    categoryId: String;
    limit: number;
    offset: number;
}
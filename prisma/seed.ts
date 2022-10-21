import { PrismaClient, Prisma } from '@prisma/client'
import * as csv from '@fast-csv/parse';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient()
let totalTransactionsCreated = 0;
async function createCategory(category) {
    await prisma.category.upsert({
        create: category,
        update: category,
        where: {
            id: category.id
        }
    })
}

async function createAccounts(account) {
    await prisma.account.upsert({
        create: account,
        update: account,
        where: {
            id: account.id
        }
    })
}

async function createTransactions(transaction) {
    try {
        const formattedTransaction = {
            ...transaction,
            date: transaction.date ? new Date(transaction.date) : null,
        }
    
        await prisma.transaction.upsert({
            create: formattedTransaction,
            update: formattedTransaction,
            where: {
                id: transaction.id
            }
        })
        totalTransactionsCreated += 1
    } catch (error) {
        console.log(error)
    }
}

async function seedCategories() {
    console.log('------------------')
    console.log('Starting to create categories')
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.resolve('prisma', 'categories.csv'))
            .pipe(csv.parse({ headers: true }))
            .on('error', error => {
                console.error(error)
                reject()
            })
            .on('data', async row => await createCategory(row))
            .on('end', (rowCount: number) => {
                console.log(`Finished creating categories, total of ${rowCount} categories created`)
                resolve(true)
            });
    })
}

async function seedAccounts() {
    console.log('------------------')
    console.log('Starting to create accounts')
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.resolve('prisma', 'accounts.csv'))
            .pipe(csv.parse({ headers: true }))
            .on('error', error => {
                console.error(error)
                reject()
            })
            .on('data', async row => await createAccounts(row))
            .on('end', (rowCount: number) => {
                console.log(`Finished creating accounts, total of ${rowCount} accounts created`)
                resolve(true)
            });
    })
}

async function seedTransactions() {
    console.log('------------------')
    console.log('Starting to create transactions')
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.resolve('prisma', 'transactions.csv'))
            .pipe(csv.parse({ headers: true }))
            .on('error', error => {
                console.error('aaaaa', error)
                reject()
            })
            .on('data', async row => await createTransactions(row))
            .on('end', (rowCount: number) => {
                console.log(`Finished creating transactions, total of ${totalTransactionsCreated} transactions created of ${rowCount}`)
                resolve(true)
            }
            );
    })

}

async function main() {
    try {
        await seedCategories()
        await seedAccounts()
        await seedTransactions()
        await prisma.$disconnect()
        process.exit(0)
    } catch (error) {
        console.error(error)
        await prisma.$disconnect()
        process.exit(1)
    }
}

main()
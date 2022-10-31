const { PrismaClient } = require('@prisma/client')
const csv = require('@fast-csv/parse')
const fs = require('fs')
const path = require('path');

const prisma = new PrismaClient()
let totalTransactionsCreated = 0;

async function createCategory(category) {
    try {
        await prisma.category.upsert({
            create: category,
            update: {},
            where: {
                id: category.id
            }
        })
    } catch (error) {
        console.log(error)
    }
}

async function createAccounts(account) {
    try {
        await prisma.account.upsert({
            create: account,
            update: {},
            where: {
                id: account.id
            }
        })
    } catch (error) {
        console.log(error)
    }
}

async function createTransactions(transaction) {
    try {
        const formattedTransaction = {
            ...transaction,
            date: transaction.date ? new Date(transaction.date) : null,
        }

        await prisma.transaction.upsert({
            create: formattedTransaction,
            update: {},
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
                reject(error)
            })
            .on('data', async row => await createCategory(row))
            .on('end', (rowCount) => {
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
                reject(error)
            })
            .on('data', async row => await createAccounts(row))
            .on('end', (rowCount) => {
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
                reject(error)
            })
            .on('data', async row => await createTransactions(row))
            .on('end', (rowCount) => {
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
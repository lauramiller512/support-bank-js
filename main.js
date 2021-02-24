const csv = require('csv-parser');
const fs = require('fs');

const Transaction = require('./Transaction');
const Banker = require('./Banker');
const Person = require('./Person');

// import Transaction from "./Transaction.js";
const banker = new Banker();

console.log('Loading transaction file...');
fs.createReadStream('Transactions2014.csv')
    .pipe(csv())
    .on('data', (row) => {
        // Do something with each bit of data
        csvRowToProcess(row);
    })
    .on('end', () => {
        // console.log('CSV file successfully processed');
        showMainMenu();
    });

function csvRowToProcess(row) {
    // Save transaction to variable
    let transaction = new Transaction(row.Date, row.From, row.To, row.Narrative, row.Amount);

    // Check if To person exists
    let toPerson = new Person();
    let personFound = false;
    for (let i = 0; i < banker.accounts.length; i++) {
        if (banker.accounts[i].name === "row.To") {
            // They exist
            toPerson = banker.accounts[i];
            personFound = true;
            break;
        }
    }

    if (!personFound) {
        // If they don't exist, create them
        newPerson = new Person(row.To);
        banker.accounts.push(newPerson);
        toPerson = newPerson;

    }

    // Then add to existing or newly created person
    toPerson.transactions.push(transaction);
    // Check if From person exists
    // I
    // console.log(transaction);

}
function showMainMenu() {


    banker.accounts.forEach(account => {
        console.log(account.transactions.length);

    });

    console.log('Transaction file loaded');
    console.log('1) Show all');
    console.log('2) Show for a specific person');
    console.log('Enter choice:');
}

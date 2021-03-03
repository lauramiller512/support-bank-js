const csv = require('csv-parser');
const fs = require('fs');
const readlineSync = require('readline-sync');


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
        // Calculate all accounts once
        banker.calculateAllAccounts();
        showMainMenu();
    });

function csvRowToProcess(row) {
    // Save transaction to variable
    let transaction = new Transaction(row.Date, row.From, row.To, row.Narrative, row.Amount);
    banker.allTransactions.push(transaction);

    // Check if To person exists
    let toPerson = new Person();
    let personFound = false;
    for (let i = 0; i < banker.accounts.length; i++) {
        if (banker.accounts[i].name === row.To) {
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
    let fromPerson = new Person();
    let fromPersonFound = false;
    for (let i = 0; i < banker.accounts.length; i++) {
        if (banker.accounts[i].name === row.From) {
            // They exist
            fromPerson = banker.accounts[i];
            fromPersonFound = true;
            break;
        }
    }

    if (!fromPersonFound) {
        // If they don't exist, create them
        newPerson = new Person(row.From);
        banker.accounts.push(newPerson);
        fromPerson = newPerson;

    }

    // Then add to existing or newly created person
    fromPerson.transactions.push(transaction);


}
function showMainMenu() {




    console.log('Transaction file loaded');
    console.log('Choose a command from the following list:');
    console.log('List All - List each person along with how much they should receive');
    console.log('List [Account] - List every transaction for a specific person');
    console.log('Quit');


    // Prompt user for a valid choice
    while (true) {

        // Wait for user's response.
        var choice = readlineSync.question('Enter your choice: ');
        // Check if inputted choice is valid
        if (choice === 'Quit' || choice.startsWith("List ")) {
            handleChoice(choice);
            break;
        }
    }


}

function handleChoice(choice) {
    // If choice is quit, quit
    if (choice === 'Quit') {
        return;
    }
    // If choice is List All, list all
    else if (choice == 'List All') {
        // List All should output the names of each person, and the total amount of money they should receive from the bank. 
        // (It could be a negative number, if they owe the bank money!)

        // for each account, print out their name and account.balance
        banker.listAllAccountBalances();

    } else {
        // else their choice is to check a specific person

        // Get the person's name
        let personToCheck = choice.slice(5);
        banker.listTransactionsForAccount(personToCheck);


    }



}

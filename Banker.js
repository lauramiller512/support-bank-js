class Banker{
    constructor(){
        this.accounts = [];
        this.allTransactions = [];
    }

    calculateAllAccounts(){
        this.accounts.forEach(account => {
            account.calculateMoneyOwed();
            account.balance = account.moneyOwedToThisPerson - account.moneyOwedToOthers;
    
        });

    }

    listAllAccountBalances(){
        // for each account, print out their name and account.balance
        this.accounts.forEach(account => {
            // Check if account.balance >= 0 
            if (account.balance >= 0) {
                console.log(account.name + " is owed £" + account.balance.toFixed(2));
            } else {
                console.log(account.name + " owes the bank £" + account.balance.toFixed(2).substring(1));
            }

        });

    }

    listTransactionsForAccount(person){

        let personExists = false;

        // Check in the accounts array to see if they exist
        this.accounts.forEach(account => {
            if (account.name === person) {
                personExists = true;
                // Print a header thing
                console.log("   DATE    \t| AMOUNT \t| NARRATIVE ");
                console.log("----------------------------------------------------");
                // If yes, print out all their transactions
                account.transactions.forEach(transaction => {
                    console.log(transaction.date + " \t| " + (account.name === transaction.to? "-£":" £") + parseFloat(transaction.amount).toFixed(2) + "\t| " + transaction.narrative);
                });
                
            }

        });
        if (!personExists) {
            console.log("No account held for " + person);
        }

    }
}

module.exports = Banker;

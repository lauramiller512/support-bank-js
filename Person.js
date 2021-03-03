class Person{
    constructor(name){
        this.name = name;
        this.moneyOwedToOthers = 0;
        this.moneyOwedToThisPerson = 0;
        this.transactions = [];
    }

    calculateMoneyOwed(){
        // Loop through this.transactions
        // if transaction.to is this.name then add transaction.value to moneyowedtoothers
        this.transactions.forEach(transaction => {
            // check if this.name === trans.to 
            if (this.name === transaction.to) {
                // Add transaction.value to moneyOwedToOthers
                this.moneyOwedToOthers += parseFloat(transaction.amount);
                this.moneyOwedToOthers = Math.round(this.moneyOwedToOthers * 100) / 100

            } else if (this.name === transaction.from) {
                // Add to money owed to this person
                this.moneyOwedToThisPerson += parseFloat(transaction.amount);
                this.moneyOwedToThisPerson = Math.round(this.moneyOwedToThisPerson * 100) / 100

            }
        });
    }
}

module.exports = Person;

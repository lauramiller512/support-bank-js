class Person{
    constructor(name){
        this.name = name;
        this.moneyOwedToOthers = 0;
        this.moneyOwedToThisPerson = 0;
        this.transactions = [];
    }
}

module.exports = Person;

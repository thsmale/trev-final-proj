function Bill(tab) {
	this.eventName = '';
	this.owner = '';
	this.date = '';
	this.description = '';
	if (tab === undefined || tab === null)
		this.tabs = [];
	else
		this.tabs = [tab]
}

function Tab({ name, item, price }) {
	this.name = name;
	this.item = item;
	this.price = price;
}

// Calculate what each person is owed
// Group each persons expenditures
const calculateDues = (bills) => {
    const expenditures = [];
	for (const bill of bills) {
		for (const tab of bill.tabs) {
            for (let i = 0; i < expenditures; ++i) {
                if (expenditures[i].name === tab.name) {
                    expenditures.push({
                        sponsor: bill.owner,
                        ...tab  
                    })
                }
            }
		}
	}
	return expenditures; 
}

// Calculate how much each person fronted
const calculateSponsorSum = (bills) => {
    let sums = {}
    for (const bill of bills) {
        if (sums[bill.owner] === undefined) 
            sums[bill.owner] = 0
        for (const tab of bill.tabs) {
            sums[bill.owner] += tab.price
        }
    }
    return sums;
}

// Calculate the sum of how much each person spent 
const calculateSum = (bills) => {
    let totals = {}
    for (const bill of bills) {
        for (const tab of bill.tabs) {
            const name = tab.name.toLowerCase();
			if (totals[name] === undefined || totals[name] === null)
				totals[name] = Number(tab.price)
			else 
				totals[name] += Number(tab.price)
        }
    }
}

const coldStones = new Bill();
coldStones.eventName = 'cold stones';
coldStones.owner = 'tommy';
coldStones.tabs = [
    new Tab({
        name: 'tommy',
        item: 'cotton candy ice cream',
        price: 6.32
    }),
    new Tab({
        name: 'arthur',
        item: 'twix ice cream',
        price: 9
    }),
    new Tab({
        name: 'trevor',
        item: 'oreo ice cream',
        price: 4
    })
]

const joeInTheJuice = new Bill();
joeInTheJuice.eventName = 'joe in the juice';
joeInTheJuice.owner = 'will';
joeInTheJuice.tabs = [
    new Tab({
        name: 'will',
        item: 'turkey sandwhich',
        price: 10.0
    }),
    new Tab({
        name: 'tommy',
        item: 'strawberry shake',
        price: 8.72
    }),
    new Tab({
        name: 'trevor',
        item: 'drip coffee',
        price: 4.32
    })
]

const blueBottle = new Bill();
blueBottle.eventName = 'blue bottle';
blueBottle.owner = 'corinne';
blueBottle.tabs = [
    new Tab({
        name: 'corinne',
        item: 'mocha',
        price: 5.32
    }),
    new Tab({
        name: 'trevor',
        item: 'chai latte',
        price: 5.1
    }),
    new Tab({
        name: 'tommy',
        item: 'drip coffee',
        price: 2.32
    })
]

const jambaJuice = new Bill();
jambaJuice.eventName = 'jamba juice';
jambaJuice.owner = 'arthur';
jambaJuice.tabs = [
    new Tab({
        name: 'arthur',
        item: 'strawberry surf rider',
        price: 3
    }),
    new Tab({
        name: 'tommy',
        item: 'sour patch gummy',
        price: 8
    }),
    new Tab({
        name: 'trevor',
        item: 'green grass shake',
        price: 12
    }),
    new Tab({
        name: 'corinne',
        item: 'aloha pineapple',
        price: '6.9'
    })
]

const bills = [coldStones, blueBottle, joeInTheJuice, jambaJuice]
console.log(calculateDues(bills));
console.log(calculateSponsorSum(bills));
console.log(calculateSum(bills))

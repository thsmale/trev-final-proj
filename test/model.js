function Bill(row) {
	this.eventName = '';
	this.date = new Date().toISOString();
	if (row === undefined || row === null) {
		this.tabs = [];
	} else {
		this.tabs = [row]
	}
}

function Row() {
	this.name = '';
	this.item = '';
	this.price = '';
}

console.log(new Row());
console.log( new Bill(new Row()) )

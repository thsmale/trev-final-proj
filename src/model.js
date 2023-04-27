export function Bill() {
	this.eventName = '';
	this.date = new Date().toISOString();
	this.tabs = [];
}

export function Row() {
	this.name = '';
	this.item = '';
	this.price = '';
}

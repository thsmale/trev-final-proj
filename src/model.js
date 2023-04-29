export function Bill(row) {
	this.eventName = '';
	this.date = new Date().toISOString();
	if (row === undefined || row === null)
		this.tabs = [];
	else
		this.tabs = [ row ]
}

export function Row() {
	this.name = '';
	this.item = '';
	this.price = '';
}

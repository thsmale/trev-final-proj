import { v4 as uuidv4 } from 'uuid';

export function Bill(row) {
	this.id = uuidv4();
	this.eventName = '';
	this.owner = '';
	this.date = new Date().toISOString();
	if (row === undefined || row === null)
		this.tabs = [];
	else
		this.tabs = [ row ]
}

export function Row() {
	this.id = uuidv4();
	this.name = '';
	this.item = '';
	this.price = '';
}

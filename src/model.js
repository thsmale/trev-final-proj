import { v4 as uuidv4 } from 'uuid';

export function Bill(tab) {
	this.id = uuidv4();
	this.eventName = '';
	this.owner = '';
	this.date = new Date().toISOString();
	if (tab === undefined || tab === null)
		this.tabs = [];
	else
		this.tabs = [tab]
}

export function Row() {
	this.id = uuidv4();
	this.name = '';
	this.item = '';
	this.price = '';
}

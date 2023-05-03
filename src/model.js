import { v4 as uuidv4 } from 'uuid';

/**
 * 
 * @param {Object} tab optional parameter of type Row 
 */
export function Bill(tab) {
	this.id = uuidv4();
	this.eventName = '';
	this.owner = '';
	this.date = '';
	this.description = '';
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

/**
 * Functions that helped me debug
 */

import {
    Button
} from 'grommet';

export const PrintBill = ({ bill }) => {
	return (
		<Button
			label='Print bill'
			onClick={() => {
				console.log('PRINT BILL\n\n\n')
				console.log(bill)
				console.log(`Tab length: ${bill.tabs.length}`)
				bill.tabs.map(bill => console.log(bill))
				console.log('--------------')
			}}
		/>
	)
}

export const PrintTabs = ({ tabs }) => {
	return (
		<Button
			label='Print Tabs'
			onClick={() => {
				console.log('PRINT tabs\n\n\n')
				console.log(`Tab length: ${tabs.length}`)
				tabs.map(tab => console.log(tab))
				console.log('--------------')
			}}
		/>
	)
}
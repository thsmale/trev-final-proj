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
				console.log(bill)
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
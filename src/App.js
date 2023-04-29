import React, { useState } from 'react'
import {
	Accordion,
	AccordionPanel,
	Box,
	Button,
	DateInput,
	Grid,
	Grommet,
	Page,
	PageContent,
	PageHeader,
	Tabs,
	Tab,
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
	Text,
	TextInput,
} from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { subtitle } from './data.js';
import { Bill, Row } from './model.js';

/**
 * 
 * @param {Object} props 
 *   {
 *		bill: "the bill reactive state object see model.js" 
		setBill: "a reactive way to update the parent state bill from this child component"
		index: "the row or index in tabs we are modifying i.e name"
 *   }
 * @returns 
 */
const TabInputUserInterface = (props) => {
	const [tab, setTab] = useState(props.bill.tabs[props.index])
	return (
		<Grid columns="medium" gap="small" pad={{ bottom: "small" }}>
			<TextInput
				placeholder="Name i.e trevor"
				onChange={(event) => {
					setTab({
						...tab,
						name: event.target.value,
					})
					props.setBill({
						...props.bill,
						tabs: [{
							...props.bill.tabs,
							...tab
						}]
					})
				}}
			/>
			<TextInput
				placeholder="Item i.e pizza"
				onChange={(event) => {
					setTab({
						...tab,
						item: event.target.value
					})
					props.setBill({
						...props.bill,
						tabs: [{
							...props.bill.tabs,
							...tab
						}]
					})
				}}
			/>
			<TextInput
				placeholder="Price 0.00"
				textAlign='$'
				onChange={(event) => {
					setTab({
						...tab,
						price: event.target.value
					})
					props.setBill({
						...props.bill,
						tabs: [{
							...props.bill.tabs,
							...tab
						}]
					})
				}}
			/>
		</Grid>
	);
}

const TabTableRow = (props) => {
	return (
		<TableRow>
			<TableCell scope="row">
				{props.tab.name}
			</TableCell>
			<TableCell>{props.tab.item}</TableCell>
			<TableCell>{props.tab.price}</TableCell>
		</TableRow>
	)
}

const generateTableBody = (bill) => {
	const tableRowsUserInterface = []
	for (let i = 0; i < bill.tabs; ++i) {
		tableRowsUserInterface.push(
			<TabTableRow tab={bill.tabs[i]}/>	
		)
	}
	return tableRowsUserInterface;
}

const BillOutput = (props) => {
	return (
	<Table>
		<TableHeader>
			<TableRow>
				<TableCell scope="col" border="bottom">
					Name
				</TableCell>
				<TableCell scope="col" border="bottom">
					Item
				</TableCell>
				<TableCell scope="col" border="bottom">
					Price
				</TableCell>
			</TableRow>
		</TableHeader>
		<TableBody>
			{props.showBill}
		</TableBody>
	</Table>
	);
}
const BillUserInterface = (props) => {
	const [bill, setBill] = useState(new Bill(new Row()));
	const [userInterfaceTabs, setUserInterfaceTabs] = useState([
		<TabInputUserInterface
			index={0}
			bill={bill}
			setBill={setBill}
		/>
	]);
	const [showBill, setShowBill] = useState(
		bill.tabs.map(tab => <TabTableRow tab={tab}/>)
	)
	return (
		<Tab title={bill.eventName !== '' ? bill.eventName : 'Create Bill'}>
			<Grid columns='medium' gap='small' pad={{ top: 'small' }}>
				<Box>
					<Text>Event</Text>
					<TextInput
						placeholder="Event i.e. restaurant, game, bar"
						onChange={(event) => {
							setBill({
								...bill,
								eventName: event.target.value
							})
						}}
					/>
				</Box>
				<Box>
					<Text>Owner name</Text>
					<TextInput
						placeholder='Owner i.e Trevor'
					/>
				</Box>
				<Box>
					<Text>Date</Text>
					<DateInput
						format="mm/dd/yyyy"
						onChange={({ value }) => {
							setBill({
								...bill,
								date: value,
							})
						}}
					/>
				</Box>
			</Grid>
			<Grid columns='medium' pad={{ top: 'medium' }}>
				<Box alignContent='center' align='center'>
					<Text>Event</Text>
				</Box>
				<Box align='center'>
					<Text>Item</Text>
				</Box>
				<Box align='center'>
					<Text>Price</Text>
				</Box>
			</Grid>
			{userInterfaceTabs}
			<Button label='Add row' onClick={() => {
				bill.tabs.push(new Row())
				for (let i = 0; i < bill.tabs.length; ++i) {
					setUserInterfaceTabs([
						...userInterfaceTabs,
						<TabInputUserInterface
							bill={bill}
							setBill={setBill}
							index={i}
						/>
					])
				}
			}} />
			<Button label='Print bill' onClick={() => {
				console.log('\n\n\n')
				console.log(bill)
				console.log(`Tab length: ${bill.tabs.length}`)
				bill.tabs.map(bill => console.log(bill))
				console.log('--------------')
			}} />
			<Accordion onActive={ (index) => {
					console.log(`accordian tab length: ${bill.tabs.length}`)
					setShowBill(bill.tabs.map(tab => <TabTableRow tab={tab}/>))
					 /*
				 	console.log(generateTableBody(bill).length)
					setShowBill(generateTableBody(bill))
					*/
			}}>
				<AccordionPanel label='Data table' onActive={ (index) => {
				}}>
					<BillOutput showBill={showBill}/>
				</AccordionPanel>
			</Accordion>
		</Tab>
	)
}

const App = () => {
	let tabIndex = 0;
	return (
		<Grommet theme={hpe} full themeMode='dark'>
			<Page>
				<PageContent>
					<PageHeader
						title="Trevor Final Project"
						subtitle={
							<Box>{subtitle}</Box>
						}
					/>
					<Tabs onActive={(index) => { tabIndex = index }}>
						<BillUserInterface />
					</Tabs>
					<Box>
						<Button label='Create Event' onClick={() => console.log('Create event')} />
						<Button label='Submit' onClick={() => {
							console.log('Submit!!!')
						}} />
					</Box>
				</PageContent>
			</Page>
		</Grommet>
	);
}

export default App;

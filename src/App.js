import React, { useState } from 'react'
import {
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
	Text,
	TextInput,
} from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { Add } from 'grommet-icons';
import { subtitle } from './data.js';
import { Bill, Row } from './model.js';
import { PrintBill, PrintTabs } from './debug.js';

/**
 * The eventName is used to identify an event such as going to Rileys bar 
 * @param {Object} props 
 * 		updateBill will lift the state up and set the bill object
 * @returns Text input which is one of three columns in a row  
 */
const EventNameUserInterface = ({ updateBill }) => {
	return (
		<Box>
			<Text>Event</Text>
			<TextInput
				placeholder="Event i.e. restaurant, game, bar"
				onChange={(event) => {
					updateBill('eventName', event.target.value)
				}}
			/>
		</Box>
	)
}

/**
 * 
 * The owner is who paid the bill
 * @param {Object} props 
 * 		updateBill sets the state of stateful object Bill
 * @returns Text input to type in the owner name
 */
const BillOwnerUserInterface = ({ updateBill }) => {
	return (
		<Box>
			<Text>Owner name</Text>
			<TextInput
				placeholder='Owner i.e Trevor'
				onChange={(event) => {
					updateBill('owner', event.target.value)
				}}
			/>
		</Box>
	)
}

/**
 * Date is an optional field to record the day of the event 
 * TODO: Add time as option
 * @param {Object} props 
 * 		updateBill lifts the state up and sets the stateful Bill object
 * @returns A calander to select the date or formatted input
 */
const DateUserInterface = ({ updateBill }) => {
	return (
		<Box>
			<Text>Date</Text>
			<DateInput
				format="mm/dd/yyyy"
				onChange={({ value }) => {
					updateBill('date', value)
				}}
			/>
		</Box>
	)
}

const LabelDataTable = (props) => {
	return (
		<Grid columns='medium' pad={{ top: 'medium' }} gap='small'>
			<Box>
				<Text>Name</Text>
			</Box>
			<Box>
				<Text>Item</Text>
			</Box>
			<Box>
				<Text>Price</Text>
			</Box>
		</Grid>
	);
}

/**
 * 
 * @param {Object} props 
 * 		updateTabs a function that iterates over the tabs and mutates the respective tab
 * 		id how handleTab identifies which tab to modify
 * @returns 3 columns that accept input for the Row object
 */
const TabInputUserInterface = ({ updateTabs, id }) => {
	return (
		<Grid columns="medium" gap="small" pad={{ bottom: "small" }}>
			<TextInput
				placeholder="arthur"
				onChange={(event) => {
					updateTabs('name', event.target.value, id)
				}}
			/>
			<TextInput
				placeholder="pizza"
				onChange={(event) => {
					updateTabs('item', event.target.value, id)
				}}
			/>
			<TextInput
				placeholder="0.00"
				onChange={(event) => {
					updateTabs('price', event.target.value, id)
				}}
			/>
		</Grid>
	);
}

/**
 * 
 * @param {Object} props 
 * 		tabs a stateful array of object type Rows  
 * 		setTabs sets the state of the tabs array
 * @returns A 3 by X matrix where users can control number of rows X
 */
const TabUserInterface = ({ tabs, updateTabs, addTab }) => {
	/*
	const handleTab = (property, value, id) => {
		const updatedTabs = tabs.map(tab => {
			if (tab.id === id)
				tab[property] = value
			return tab
		})
		setTabs(updatedTabs)
	}
	*/
	return (
		<Grid>
			<LabelDataTable />
			{
				tabs.map(tab => (
					<TabInputUserInterface
						key={tab.id}
						id={tab.id}
						updateTabs={updateTabs}
					/>
				))
			}
			<Button
				label='Add row'
				onClick={() => addTab()}
			/>
		</Grid>
	)
}

/**
 * TODO: Add description input and add mark required fields w/ red *
 * @param {*} props 
 * @returns 
 */
const BillUserInterface = (props) => {
	const [bill, setBill] = useState(new Bill());
	const [tabs, setTabs] = useState([new Row()]);
	const updateBill = (property, value) => {
		setBill({
			...bill,
			[property]: value
		})
	}
	const updateTabs = (property, value, id) => {
		setTabs(tabs.map(tab => {
			if (tab.id === id)
				tab[property] = value
			return tab
		}))
	}
	const addTab = () => setTabs([...tabs, new Row()])

	return (
		//<Tab title={bill.eventName !== '' ? bill.eventName : 'Create Bill'}>
		<Grid>
			<Grid columns='medium' gap='small' pad={{ top: 'small' }}>
				<EventNameUserInterface updateBill={updateBill} />
				<BillOwnerUserInterface updateBill={updateBill} />
				<DateUserInterface updateBill={updateBill} />
			</Grid>
			<TabUserInterface
				tabs={tabs}
				updateTabs={updateTabs}
				addTab={addTab}
			/>
			<PrintTabs tabs={tabs} />
			<PrintBill bill={bill} />
		</Grid>
	)
}

const App = () => {
	const [bills, setBills] = useState([new Bill()])
	const updateBills = (property, value, id) => {
		const update = bills.tab.map(bill => {

		})
		setBills(update)
	}
	const [activeIndex, setActiveIndex] = useState(0);
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
					<Tabs
						activeIndex={activeIndex}
						onActive={(index) => {
							console.log(index)
							if (index === bills.length) {
								// Create new tab
								// Do not open this tab
								setActiveIndex(activeIndex)
								console.log("New Event!")
							}
						}}
					>
						<Tab title='Bill name'>
							<BillUserInterface />
						</Tab>
						<Tab icon={<Add />}>

						</Tab>
					</Tabs>
					<Box pad={{ top: 'large' }}>
						<Button primary label='Submit' onClick={() => {
							console.log('Submit!!!')
						}}
						/>
					</Box>
				</PageContent>
			</Page>
		</Grommet>
	);
}

export default App;

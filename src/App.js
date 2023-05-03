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
	TextArea,
	TextInput,
} from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { Add } from 'grommet-icons';
import { subtitle } from './data.js';
import { Bill, Row } from './model.js';
import { PrintBill } from './debug.js';

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
				placeholder='Owner i.e Trevor paid this bill'
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
 * Provide feedback if date invalid i.e they type 12
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
					// If input not typed correctly value will be undefined
					updateBill('date', value || '')
				}}
			/>
		</Box>
	)
}

/**
 * A text area to type in a description of the bill
 * @param {Object}  props
 * 		updateBill lifts the Bill state up and updates the description property
 * @returns 
 */
const DescriptionUserInterface = ({ updateBill }) => {
	return (
		<Box>
			<Text>Description</Text>
			<TextArea
				placeholder="Remember when arthur yaked"
				onChange={(event) => updateBill('description', event.target.value)}
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
const TabInputUserInterface = ({ updateBill, id }) => {
	return (
		<Grid columns="medium" gap="small" pad={{ bottom: "small" }}>
			<TextInput
				placeholder="arthur"
				onChange={(event) => {
					updateBill('name', event.target.value, id)
				}}
			/>
			<TextInput
				placeholder="pizza"
				onChange={(event) => {
					updateBill('item', event.target.value, id)
				}}
			/>
			<TextInput
				placeholder="0.00"
				onChange={(event) => {
					updateBill('price', event.target.value, id)
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
const TabUserInterface = ({ tabs, updateBill, addTab }) => {
	return (
		<Grid>
			<LabelDataTable />
			{
				tabs.map(tab => (
					<TabInputUserInterface
						key={tab.id}
						id={tab.id}
						updateBill={updateBill}
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
	const [bill, setBill] = useState(new Bill(new Row()));
	const updateBillMetaData = (property, value) => setBill({
		...bill,
		[property]: value
	})
	const updateTabs = (property, value, id) => setBill({
		...bill,
		tabs: bill.tabs.map(tab => {
			if (tab.id === id)
				tab[property] = value
			return tab
		})
	})
	const addTab = () => setBill({
		...bill,
		tabs: [...bill.tabs, new Row()]
	})

	return (
		//<Tab title={bill.eventName !== '' ? bill.eventName : 'Create Bill'}>
		<Grid>
			<Grid columns='medium' gap='small' pad={{ top: 'small' }}>
				<EventNameUserInterface updateBill={updateBillMetaData} />
				<BillOwnerUserInterface updateBill={updateBillMetaData} />
				<DateUserInterface updateBill={updateBillMetaData} />
			</Grid>
			<Box pad={{ top: 'small' }}>
				<DescriptionUserInterface updateBill={updateBillMetaData} />
			</Box>
			<TabUserInterface
				tabs={bill.tabs}
				updateBill={updateTabs}
				addTab={addTab}
			/>
			<PrintBill bill={bill} />
		</Grid>
	)
}

const BillsUserInterface = () => {
	const [bills, setBills] = useState([new Bill()])
	const updateBills = (property, value, id) => {
		const update = bills.tab.map(bill => {

		})
		setBills(update)
	}
	const [activeIndex, setActiveIndex] = useState(0);
	return (
		<Tabs
			activeIndex={activeIndex}
			onActive={(index) => {
				if (index === bills.length) {
					// Create a new tab
					// Do not open this tab as plus tab has no body
					// Should maybe open newly created tab
					setActiveIndex(activeIndex)
					setBills([ ...bills, new Bill() ])
				} else {
					setActiveIndex(index)
				}
			}}
		>
		{
			bills.map(bill => (
				<Tab key={bill.id} title={bill.eventName === '' ? 'Create Event' : bill.eventName}>
					<BillUserInterface key={bill.id}/>
				</Tab>
			))
		}	
		<Tab icon={<Add />}Tab/>
		</Tabs>
	)
}

const App = () => {

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
					<BillsUserInterface />
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

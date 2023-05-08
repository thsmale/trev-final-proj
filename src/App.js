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
 * 		eventName is there so as user switches between tabs values persist
 * 		updateBill will lift the state up and set the bill object
 * @returns Text input which is one of three columns in a row  
 */
const EventNameUserInterface = ({ eventName, updateBill }) => {
	return (
		<Box>
			<Text>Event</Text>
			<TextInput
				placeholder="Event i.e. restaurant, game, bar"
				value={eventName}
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
 * 		owner so if user switches tab and returns the value will be there in the UI
 * 		updateBill sets the state of stateful object Bill
 * @returns Text input to type in the owner name
 */
const BillOwnerUserInterface = ({ owner, updateBill }) => {
	return (
		<Box>
			<Text>Owner name</Text>
			<TextInput
				placeholder='Owner i.e Trevor paid this bill'
				value={owner}
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
 * 		date the current value of the date in the stateful Bill object
 * 		updateBill lifts the state up and sets the stateful Bill object
 * @returns A calander to select the date or formatted input
 */
const DateUserInterface = ({ date, updateBill }) => {
	return (
		<Box>
			<Text>Date</Text>
			<DateInput
				format="mm/dd/yyyy"
				value={date}
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
 * 		description the current value in the Bill stateful object
 * 		updateBill lifts the Bill state up and updates the description property
 * @returns 
 */
const DescriptionUserInterface = ({ description, updateBill }) => {
	return (
		<Box>
			<Text>Description</Text>
			<TextArea
				placeholder="Remember when arthur yaked"
				value={description}
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
 * 		tab the Row object in the array which is in the stateful object Bill
 * 		updateTabs a function that iterates over the tabs and mutates the respective tab
 * 		id how handleTab identifies which tab to modify
 * @returns 3 columns that accept input for the Row object
 */
const TabInputUserInterface = ({ tab, updateBill, id }) => {
	return (
		<Grid columns="medium" gap="small" pad={{ bottom: "small" }}>
			<TextInput
				placeholder="arthur"
				value={tab.name}
				onChange={(event) => {
					updateBill('name', event.target.value, id)
				}}
			/>
			<TextInput
				placeholder="pizza"
				value={tab.item}
				onChange={(event) => {
					updateBill('item', event.target.value, id)
				}}
			/>
			<TextInput
				placeholder="0.00"
				value={tab.price}
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
						tab={tab}
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
const BillUserInterface = ({ bill, updateBills }) => {
	const updateBillMetaData = (property, value) => updateBills({
		...bill,
		[property]: value
	})
	const updateTabs = (property, value, id) => {
		updateBills({
			...bill,
			tabs: bill.tabs.map(tab => {
				if (tab.id === id)
					tab[property] = value
				return tab
			})
		})
	}
	const addTab = () => updateBills({
		...bill,
		tabs: [...bill.tabs, new Row()]
	})

	return (
		<Grid>
			<Grid columns='medium' gap='small' pad={{ top: 'small' }}>
				<EventNameUserInterface 
					eventName={bill.eventName}
					updateBill={updateBillMetaData} 
				/>
				<BillOwnerUserInterface 
					owner={bill.owner}
					updateBill={updateBillMetaData} 
				/>
				<DateUserInterface 
					date={bill.date}
					updateBill={updateBillMetaData} 
				/>
			</Grid>
			<Box pad={{ top: 'small' }}>
				<DescriptionUserInterface 
					description={bill.description}
					updateBill={updateBillMetaData} 
				/>
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
	const [bills, setBills] = useState([new Bill(new Row())])
	const updateBill = (newBill) => {
		const update = bills.map(bill => {
			if (bill.id === newBill.id) 
				return newBill
			return bill
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
					setBills([ ...bills, new Bill(new Row()) ])
				} else {
					setActiveIndex(index)
				}
			}}
		>
		{
			bills.map(bill => (
				<Tab key={bill.id} title={bill.eventName === '' ? 'New bill' : bill.eventName}>
					<BillUserInterface 
						key={bill.id}
						bill={bill}
						updateBills={updateBill}
					/>
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

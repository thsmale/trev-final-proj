import React, { useState } from 'react'
import {
	Box,
	Button,
	DateInput,
	Form,
	FormField,
	Grid,
	Grommet,
	Page,
	PageContent,
	PageHeader,
	Spinner,
	Tabs,
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
	Tab,
	Text,
	TextArea,
	TextInput,
} from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { Add } from 'grommet-icons';
import { subtitle } from './data.js';
import { Bill, Row } from './model.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * The eventName is used to identify an event such as going to Rileys bar 
 * @param {Object} props 
 * 		eventName is there so as user switches between tabs values persist
 * 		updateBill will lift the state up and set the bill object
 * @returns Text input which is one of three columns in a row  
 */
const EventFormField = ({ eventName, updateBill }) => {
	return (
		 <FormField name="event" htmlFor="event-id" label="Event">
			<TextInput
				id="event-id"
				name="event"
				placeholder="Event i.e. restaurant, game, bar"
				value={eventName}
				onChange={(event) => {
					updateBill('eventName', event.target.value)
				}}
			/>
		</FormField>
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
const OwnerFormField = ({ owner, updateBill }) => {
	return (
		<Box>
			<Text>Owner name</Text>
			<TextInput
				placeholder='Owner i.e Trevor'
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
 * Date is an optional field to record the day of the event 
 * TODO: Add time as option
 * Provide feedback if date invalid i.e they type 12
 * @param {Object} props 
 * 		date the current value of the date in the stateful Bill object
 * 		updateBill lifts the state up and sets the stateful Bill object
 * @returns A calander to select the date or formatted input
 */
const DateFormField = ({ date, updateBill }) => {
	return (
		<FormField name="date" htmlFor="date-id" label="Date">
			<DateInput
				id="date-id"
				name="date"
				format="mm/dd/yyyy"
				value={date}
				onChange={({ value }) => {
					// If input not typed correctly value will be undefined
					updateBill('date', value || '')
				}}
			/>
		</FormField>
	)
}

/**
 * A text area to type in a description of the bill
 * @param {Object}  props
 * 		description the current value in the Bill stateful object
 * 		updateBill lifts the Bill state up and updates the description property
 * @returns 
 */
const DescriptionFormField = ({ description, updateBill }) => {
	return (
		<FormField name="description" htmlFor="description-id" label="Description">
			<TextArea
				id="description-id"
				name="description"
				placeholder="Remember when arthur yaked"
				value={description}
				onChange={(event) => updateBill('description', event.target.value)}
			/>
		</FormField>
	)
}

const LabelDataTable = (props) => {
	return (
		<Grid>
			<Text 
				size="large" 
				margin={{ top: "small", bottom: "small" }}
				textAlign='center'
			>Data Entry</Text>
		</Grid>
	);
}

const TabFormInputUserInterface = ({ tab, updateBill, id }) => {
	return (
		<>
		<FormField name="name" htmlFor="name-input-id" label="Name">
			<TextInput
				id="name-input-id"
				name="name"
				placeholder="Name i.e Arthur"
				value={tab.name}
				onChange={(event) => {
					updateBill('name', event.target.value, id)
				}}
			/>
		</FormField>
		<FormField name="item" htmlFor="item-input-id" label="Item">
			<TextInput
				id = "item-input-id"
				name="item"
				placeholder="Item i.e pizza"
				value={tab.item}
				onChange={(event) => {
					updateBill('item', event.target.value, id)
				}}
			/>
		</FormField>
		<FormField name="price" htmlFor="price-input-id" label="Price">
			<TextInput
				id="price-input-id"
				name="price"
				placeholder="Price i.e 0.00"
				value={tab.price}
				onChange={(event) => {
					updateBill('price', event.target.value, id)
				}}
			/>
		</FormField>
		</>
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
			<LabelDataTable/>
			{
				tabs.map(tab => (
					<TabFormInputUserInterface
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

const TaxUserInterface = ({ tax, updateBill }) => {
	return (
		<FormField name="tax" htmlFor="tax-id" label="Tax">
			<TextInput
				id="tax-id"
				name="tax"
				placeholder='The tax on the bill. Not % percentages.'
				value={tax}
				onChange={(event) => {
					updateBill('tax', event.target.value)
				}}
			/>
		</FormField>
	)
}

const TipUserInterface = ({ tip, updateBill }) => {
	return (
		<FormField name="tip" htmlFor="tip-id" label="Tip">
			<TextInput
				id="tip-id"
				name="tip"
				placeholder='The amount you tipped. Not % percentages.'
				value={tip}
				onChange={(event) => {
					updateBill('tip', event.target.value)
				}}
			/>
		</FormField>
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
		<Form>
				<EventFormField
					eventName={bill.eventName}
					updateBill={updateBillMetaData}
				/>
				<OwnerFormField
					owner={bill.owner}
					updateBill={updateBillMetaData}
				/>
				<DateFormField
					date={bill.date}
					updateBill={updateBillMetaData}
				/>
				<DescriptionFormField
					description={bill.description}
					updateBill={updateBillMetaData}
				/>
			<TabUserInterface
				tabs={bill.tabs}
				updateBill={updateTabs}
				addTab={addTab}
			/>
				<TaxUserInterface
					tax={bill.tax}
					updateBill={updateBillMetaData}
				/>
				<TipUserInterface
					tip={bill.tip}
					updateBill={updateBillMetaData}
				/>
		</Form>
	)
}

/**
 * TODO: Add description input and add mark required fields w/ red *
 * @param {*} props 
 * @returns 
 */
const BillFormUserInterface = ({ bill, updateBills }) => {
	const [value, setValue] = React.useState({});
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
	  <Form
		value={value}
		onChange={nextValue => setValue(nextValue)}
		onSubmit={({ value }) => {}}
	  >
		<FormField name="event" htmlFor="text-input-event-id" label="Event">
		  <TextInput 
		  	id="text-input-event-id" 
			name="event" 
			placeholder="Event i.e restaurant, bar, concert"
		  />
		</FormField>
		<FormField name="owner" htmlFor="text-input-owner-id" label="Owner">
		  <TextInput 
		  	id="text-input-owner-id" 
			name="owner" 
			placeholder="Owner i.e Trevor"
		  />
		</FormField>
		<FormField name="date" htmlFor="date-input-id" label="Date">
			<DateInput/>
		</FormField>
		<FormField name="description" htmlFor="description-id" label="Description">
		  <TextInput 
		  	id="description-id" 
			name="description" 
			placeholder="Remember when Arthur yaked"
		/>
		</FormField>
		<LabelDataTable/>
		<TabUserInterface
			tabs={bill.tabs}
			updateBill={updateTabs}
			addTab={addTab}
		/>
		<FormField name="tax" htmlFor="tax-id" label="Tax">
		  <TextInput 
		  	id="tax-id" 
			name="tax" 
			placeholder="The tax on the bill. Not % percentages."
		  />
		</FormField>
		<FormField name="tip" htmlFor="tip-id" label="Tip">
		  <TextInput 
		  	id="tip-id" 
			name="tip" 
			placeholder="The tip on the bill. Not % percentages."
		  />
		</FormField>
	   </Form>
	)
}


const sendBills = async (bills) => {
	const response = await fetch('https://fastapi-1-i3987591.deta.app/bill', {
		mode: 'cors',
		credentials: 'same-origin',
		method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(bills)
	})
	return response.json();
}

const BillsUserInterface = ({ bills, setBills, updateBill }) => {
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
					setBills([...bills, new Bill(new Row())])
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
			<Tab icon={<Add />} Tab />
		</Tabs>
	)
}

const TotalOutputRow = ({name, price}) => {
	return (
		<TableRow>
			<TableCell scope='row'></TableCell>
			<TableCell>{name}</TableCell>
			<TableCell>{price}</TableCell>
		</TableRow>
	)
}

const TotalOutput = (props) => {
	return (
		<Table>
			<TableHeader>
				<TableCell scope='col' border='bottom'>
					Name
				</TableCell>
				<TableCell scope='col' border='bottom'>
					Price
				</TableCell>
			</TableHeader>
			<TableBody>
				{
					Object.keys(props.totals).map(name => ((
						<TotalOutputRow total={{name, price: props.totals[name]}}/>
					)))
				}
			</TableBody>
		</Table>
	)
}

const calculateTotal = (bills) => {
	let totals = {}
	for (const bill of bills) {
		for (const tab of bill.tabs) {
			const name = tab.name.toLowerCase()
			if (totals[name] === undefined || totals[name] === null)
				totals[name] = Number(tab.price)
			else 
				totals[name] += Number(tab.price)
		}
	}
	console.log(totals)
	return totals
}

const DisplaySpinner = ({ display }) => {
	if (display) {
		return <Spinner />
	}
}

const App = () => {
	const [bills, setBills] = useState([new Bill(new Row())])
	const updateBill = (newBill) => {
		const update = bills.map(bill => {
			if (bill.id === newBill.id)
				return newBill
			return bill
		})
		setBills(update)
	}
	const [venmoInstructions, setVenmoInstructions ] = useState([])
	const [loadSpinner, setLoadSpinner] = useState(0);
	return (
		<Grommet theme={hpe} full themeMode='dark'>
			<Page>
				<PageContent>
					<PageHeader
						title="FinFriends"
						subtitle={
							<Box>{subtitle}</Box>
						}
					/>
					<BillsUserInterface 
						bills={bills} 
						setBills={setBills}
						updateBill={updateBill}
					/>

					<Box pad={{ top: 'large' }}>
						<Button primary label='Submit' onClick={async () => {
							setLoadSpinner(1);
							try {
								const response = await sendBills(bills)
								setVenmoInstructions(response)
								console.log("response from API");
								console.log(response);
							} catch (err) {
								setVenmoInstructions([
									"An error occured",
									err.toString()
								])
								console.log(err)
							}
							setLoadSpinner(0);
						}}
						/>
					{
						venmoInstructions.map( venmo => (
							<Text key={uuidv4()}>{venmo}</Text>
						))
					}
					<DisplaySpinner display={loadSpinner}/>
					</Box>
				</PageContent>
			</Page>
		</Grommet>
	);
}



export default App;

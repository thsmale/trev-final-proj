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
 * 		handleTab a function that iterates over the tabs and mutates the respective tab
 * 		id how handleTab identifies which tab to modify
 *   }
 * @returns 
 */
const TabInputUserInterface = ({ handleTab, id }) => {
	return (
		<Grid columns="medium" gap="small" pad={{ bottom: "small" }}>
			<TextInput
				placeholder="arthur"
				onChange={(event) => {
					handleTab('name', event.target.value, id)
				}}
			/>
			<TextInput
				placeholder="pizza"
				onChange={(event) => {
					handleTab('item', event.target.value, id)
				}}
			/>
			<TextInput
				placeholder="0.00"
				onChange={(event) => {
					handleTab('price', event.target.value, id)
				}}
			/>
		</Grid>
	);
}

const TabTableRow = (props) => {
	return (
		<TableRow>
			<TableCell scope="row">{props.tab.name}</TableCell>
			<TableCell>{props.tab.item}</TableCell>
			<TableCell>{props.tab.price}</TableCell>
		</TableRow>
	)
}

const LabelDataTable = (props) => {
	return (
		<Grid columns='medium' pad={{ top: 'medium' }}>
			<Box alignContent='center' align='center'>
				<Text>Name</Text>
			</Box>
			<Box align='center'>
				<Text>Item</Text>
			</Box>
			<Box align='center'>
				<Text>Price</Text>
			</Box>
		</Grid>
	);
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

const AddRow = ({ bill, setBill, userInterfaceTabs, setUserInterfaceTabs }) => {
	/*
		  <Button label='Add row' onClick={() => {
			  bill.tabs.push(new Row())
			  for (let i = 0; i < bill.tabs.length; ++i) {
				  setUserInterfaceTabs([
					  ...userInterfaceTabs,
					  <TabInputUserInterface
						  bill={bill}
						  setBill={setBill}
						  index={i}
						  key={bill.tabs[0].id}
					  />
				  ])
			  }
		  }} />
		  */
}

const PrintBill = ({ bill }) => {
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

const PrintTabs = ({ tabs }) => {
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

const ShowBill = ({ bill }) => {
	const [showBill, setShowBill] = useState(
		bill.tabs.map(tab => <TabTableRow tab={tab} />)
	)
	const [activeAccordionIndex, setActiveAccordionIndex] = useState([])
	return (
		<Accordion pad={{ top: 'large' }} onActive={(index) => {
			console.log(`Active accordion index ${index}`)
			console.log(`accordian index length: ${index.length}`)
			if (index.length === 0) {
				setActiveAccordionIndex([])
				return
			}
			setActiveAccordionIndex([])
			console.log(bill.tabs[0])
			setShowBill(bill.tabs.map(tab => <TabTableRow tab={tab} />))
			setActiveAccordionIndex([0])
		}} activeIndex={activeAccordionIndex}>
			<AccordionPanel label='Data table'>
				<BillOutput showBill={showBill} />
			</AccordionPanel>
		</Accordion>
	)
}

const TabUserInterface = (props) => {
	const [tabs, setTabs] = useState([new Row()]);
	const handleTab = (property, value, id) => {
		const updatedTabs = tabs.map(tab => {
			if (tab.id === id)
				tab[property] = value
			return tab
		})
		setTabs(updatedTabs)
	}
	const [userInterfaceTabs, setUserInterfaceTabs] = useState([
		<TabInputUserInterface
			key={tabs[0].id}
			handleTab={handleTab}
			id={tabs[0].id} //Note not the way to mark this
		/>
	]);
	return (
		<Grid>
			<LabelDataTable />
			{userInterfaceTabs}
			<Button
				label='Add row'
				onClick={() => {
					const tab = new Row();
					setTabs([
						...tabs,
						tab
					])
					setUserInterfaceTabs([
						...userInterfaceTabs,
						<TabInputUserInterface
							key={tab.id}
							id={tab.id}
							handleTab={handleTab}
						/>
					])
				}}
			/>
			<PrintTabs tabs={tabs} />
		</Grid>
	)
}

const BillUserInterface = (props) => {
	const [bill, setBill] = useState(new Bill(new Row()));

	return (
		//<Tab title={bill.eventName !== '' ? bill.eventName : 'Create Bill'}>
		<Grid>
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
						onChange={(event) => {
							setBill({
								...bill,
								owner: event.target.value
							})
						}}
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
			<TabUserInterface/>
			<PrintBill bill={bill} />
			<ShowBill bill={bill} />
		</Grid>
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
						<Tab>
							<BillUserInterface />

						</Tab>
					</Tabs>
					<Box pad={{ top: 'large' }}>
						<Button label='Create Event' onClick={() => console.log('Create event')} />
						<Button label='Submit' onClick={() => {
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

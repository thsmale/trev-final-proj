import React, { useState } from 'react';
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
	TextInput
} from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { subtitle } from './data.js';
import { Bill, Row } from './model.js';

// Should make a function called settleTab ahha
const setTab = (name, tabs, index) => {
	//reactState({...value, name })
	return (
		tabs[index] = {
			...tabs[index],
			name
		}
	);
}

const tabInputUserInterface = (props) => {
	return (
		<Grid columns="medium" gap="small" pad={{ bottom: "small" }}>
			<TextInput
				placeholder="Name"
				onChange={(event) => {
					console.log(event.target.value)
					console.log(props.tabs)
					console.log(props.index);
					/*
					props.setTabs(setTab(
						event.target.value, props.tabs, props.index 
					))
					*/
				}}
			/>

		</Grid>
	);
}

const temp = (props) => {
	return (
		5
		/*
		<Grid>

			<TextInput
				placeholder="Price"
				textAlign='$'
				value={value.price}
				onChange={ (event) => {
					const price = event.target.value
					setValue({...value, price })
					props.data[props.index] = { 
						...props.data[props.index], 
						price
					}
					props.setRows(props.data)
				}}
			/>
		</Grid>
		*/
	)
}

const BillUserInterface = (props) => {
	const bill = new Bill();
	const userInterfaceTabs = [];
	for (let i = 0; i < bill.tabs.length; ++i) {
		userInterfaceTabs.push(
			<tabInputUserInterface
				index={i} 
				tabs={groupTabs} 
				setTabs={setGroupTabs} 
			/>
		);
	}

	return (
		<Tab title={ bill.eventName === '' ? bill.eventName : 'Create Event' }>
			<Box direction='row' gap='small' pad={{ bottom: 'small' }}>
				<TextInput
					placeholder="Event i.e. restaurant, game, bar"
					onChange={(event) => bill.eventName = event.target.value}
				/>
				<DateInput
					format="mm/dd/yyyy"
					onChange={({ value }) => bill.date = value}
				/>
			</Box>
			{userInterfaceTabs}
			<Button label='Add row' onClick={() => bill.tabs.push(new Row())} />
		</Tab>
	)
}

const App = () => {
	const tab = {
		eventName: '',
		date: new Date().toISOString(),
		data: []
	}
	const metaData = {
		name: '',
		item: '',
		price: ''
	}
	const tabIndex = 0;
	const [Bills, setBills] = useState([tab, tab, tab])
	const userInterfaceRows = [];
	for (let i = 0; i < groupTabs.length; ++i) {
		userInterfaceRows.push(
			<Input index={i} tabs={groupTabs} setTabs={setGroupTabs} />
		);
	}

	return (
		<Grommet theme={hpe}>
			<Page>
				<PageContent>
					<PageHeader
						title="Trevor Final Project"
						subtitle={
							<Box>{subtitle}</Box>
						}
					/>
					<Tabs onActive={(index) => { tabIndex = index }}>
						<BillUserInterface/>
					</Tabs>
					<Box>
						<Button label='Create Event' onClick={() => console.log('Create event')} />
						<Button label='Submit' onClick={() => console.log('Submit!!!')} />
					</Box>
				</PageContent>
			</Page>
		</Grommet>
	);
}

export default App;

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
	Tabs,
	Tab,
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

const TabInputUserInterface = (props) => {
	return (
		<Grid columns="medium" gap="small" pad={{ bottom: "small" }}>
			<TextInput
				placeholder="Name i.e trevor"
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
			<TextInput
				placeholder="Item i.e pizza"
				onChange={ (event) => {
					console.log(event)
				}}
			/>
			<TextInput
				placeholder="Price 0.00"
				textAlign='$'
				onChange={ (event) => {
					console.log(event)
				}}
			/>
		</Grid>
	);
}
const BillUserInterface = (props) => {
	const [bill, setBill] = useState(new Bill());
	const [userInterfaceTabs, setUserInterfaceTabs] = useState([]);
	bill.tabs.map(bill => {
		console.log(bill)
	})
	for (let i = 0; i < bill.tabs.length; ++i) {
		const rows = [];
		rows.push(
			<TabInputUserInterface
			 /*
				index={i} 
				tabs={bill.tabs} 
				*/
				// TODO: Pass some kind of state in here 
			/>
		);
		console.log('hi')
		setUserInterfaceTabs(rows)
	}
	return (
		<Tab title={ bill.eventName !== '' ? bill.eventName : 'Create Event' }>
		<Form
			onChange={nextValue => console.log(nextValue)}
			onReset={() => console.log('reset')}
			onSubmit={({ value }) => {console.log('submittt')}}
		>
		<FormField name="Event" htmlFor="text-input-id" label="Name">
			<TextInput id='text-input-id' name='name'
					placeholder="Event i.e. restaurant, game, bar"
					onChange={ (event) => {
						setBill({
							...bill,
							eventName: event.target.value
						})
					}}
				/>
		</FormField>
		<FormField name="Date" htmlFor="date-input-id" label='Date'>
				<DateInput id='date-input-id' name='date'
					format="mm/dd/yyyy"
					onChange={({ value }) => {
						setBill({
							...bill,
							date: value,
						})
					}}
				/>
		</FormField>
		<FormField name='Tabs' htmlFor='tab-input' label='Tabs'>
			<Box pad={{ top: 'small' }}>
				<TabInputUserInterface pad={{ top: 'small' }}/>

			</Box>
		</FormField>
		</Form>
			<Button label='Add row' onClick={() => bill.tabs.push(new Row())} />
					</Tab>
	)
}

const App = () => {
	let tabIndex = 0;
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

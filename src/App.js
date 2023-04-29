import React, { useState } from 'react';
import {
	Box,
	Button,
	DateInput,
	Form,
	FormField,
	Grid,
	Grommet,
	Heading,
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
	const [bill, setBill] = React.useState(new Bill());
	const userInterfaceTabs = [];
	for (let i = 0; i < bill.tabs.length; ++i) {
		userInterfaceTabs.push(
			<tabInputUserInterface
				index={i} 
				tabs={bill.tabs} 
				// TODO: Pass some kind of state in here 
			/>
		);
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
		</Form>
			{tabInputUserInterface}
			<Button label='Add row' onClick={() => bill.tabs.push(new Row())} />
		</Tab>
	)
}

const App = () => {
	const tabIndex = 0;
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

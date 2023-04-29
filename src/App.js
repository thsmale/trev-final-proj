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
	return (
		<Tab title={ bill.eventName !== '' ? bill.eventName : 'Create Bill' }>
		<Grid columns='medium' gap='small' pad={{top: 'small'}}>
			<Box>
				<Text>Event</Text>
					<TextInput 
					placeholder="Event i.e. restaurant, game, bar"
					onChange={ (event) => {
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
		<Grid columns='medium' pad={{top: 'medium'}}>
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
				<Box /*pad={{ top: 'small' }}*/>
				<TabInputUserInterface/>
			</Box>
			<TabInputUserInterface/>
			{userInterfaceTabs}
			<Button label='Add row' onClick={() => {
				bill.tabs.push(new Row()) 
				console.log(bill.tabs.length)
bill.tabs.map(bill => {
		setUserInterfaceTabs([...userInterfaceTabs, <TabInputUserInterface/>])
		console.log(userInterfaceTabs.length)
	})
			}}/>
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

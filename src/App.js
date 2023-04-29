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
const setTab = (val, tabs, index) => {
	//reactState({...value, name })
	console.log('------setTab--------')
	console.log(val)
	console.log(tabs)
	console.log(index)
	console.log('--------------------')
	tabs[index][val] = val 
	return (
		tabs[index] = {
			...tabs[index],
			val	
		}
	);

}

const newSetTab = (value, bill, index) => {
	/*
	const updatedTab = {
		...bill.tabs[props.index], 
		'name': event.target.value 
	}
	*/
	bill.tabs[index][value] = value
	/*
	props.setBill({ 
		...bill,
		tabs: [{
			//...updatedTab
		}]
	})
	*/
}

/**
 * 
 * @param {Object} props 
 *   {
 *		tabs: "the array of tabs which are {item, name, price}" 
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
				onChange={ (event) => {
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
				onChange={ (event) => {
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
const BillUserInterface = (props) => {
	const [bill, setBill] = useState(new Bill(new Row ()));
	const [userInterfaceTabs, setUserInterfaceTabs] = useState([
		<TabInputUserInterface 
			index={0} 
			bill={bill}
			setBill={setBill}
		/>
	]);
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
			}}/>
			<Button label='Print bill' onClick={() => {
				console.log(bill)
				console.log(bill.tabs[0])
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
						<Button label='Submit' onClick={() => {
							console.log('Submit!!!') 
						}}/>
					</Box>
				</PageContent>
			</Page>
		</Grommet>
	);
}

export default App;

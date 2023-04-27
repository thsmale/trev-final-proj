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

const Input = (props) => {
	return (
		<Grid columns="medium" gap="small" pad={{ bottom: "small" }}>
			<TextInput
				placeholder="Name"
				onChange={ (event) => {
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
				placeholder="Item"
				onChange={ (event) => {
					const item = event.target.value
					setValue({...value, item })
					props.data[props.index] = { 
						...props.data[props.index], 
						item
					}
					props.setRows(props.data)
				}}
			/>
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

class Tab {
	constructor() {
		this.eventName = '';
		this.date = new Date().toISOString();
		this.data = [];
	}
}

class Row {
	constructor() {
		this.name = '';
		this.item = '';
		this.price = '';
	}
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
	const [groupTabs, setGroupTabs] = useState([tab, tab, tab])
	const listItems = [];
	for (let i = 0; i < groupTabs.length; ++i) {
		listItems.push(
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
					<Tabs onActive={ (index) => { tabIndex = index }}>
						<Tab title={tab.eventName || 'Create Event'}>
							<Box direction='row' gap='small' pad={{bottom: 'small'}}>
								<TextInput 
									placeholder="Event i.e. restaurant, game, bar"
									onChange={ (event) => tab.eventName = event.target.value }
								/>
								<DateInput
									format="mm/dd/yyyy"
									onChange={({ value }) => tab.date = value }
								/>
							</Box>
							{listItems}
							<Button label='Add row' onClick={() => groupTabs.push(new Row())}/>
						</Tab>
					</Tabs>
					<Box>
						<Button label='Create Event' onClick={() => console.log('Create event')}/>
						<Button label='Submit' onClick={() => console.log('Submit!!!')}/>
					</Box>
				</PageContent>
			</Page>
		</Grommet>
	);
}

export default App;

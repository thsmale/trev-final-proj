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

const Input = (props) => {
	const [value, setValue] = React.useState({ name: '', item: '', price: '' });
	return (
		<Grid columns="medium" gap="small" pad={{ bottom: "small" }}>
			<TextInput
				placeholder="Name"
				value={value.name}
				onChange={ (event) => {
					const name = event.target.value
					setValue({...value, name })
					props.data[props.index] = { 
						...props.data[props.index], 
						name
					}
					props.setRows(props.data)
				}}
			/>
			<TextInput
				placeholder="Item"
				value={value.item}
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
	);
}

const App = () => {
	const row = {
		name: '',
		item: '',
		price: ''
	}
	const [dark, setDark] = useState(false);
	const [eventName, setEventName] = useState('Event name');
	const [date, setDate] = useState((new Date()).toISOString());
	const [data, setData] = useState([row, row, row])
	const listItems = [];
	for (let i = 0; i < data.length; ++i) {
		listItems.push(
			<Input index={i} data={data} setRows={setData} />
		);
	}

	return (
		<Grommet theme={hpe} full themeMode={dark ? 'dark' : 'light'}>
			<Page>
				<PageContent>
					<PageHeader 
						title="Trevor Final Project"
						subtitle={
							<Box>{subtitle}</Box>
						}
					/>
					<Tabs>
						<Tab title={eventName}>
							<Box direction='row' gap='small' pad={{bottom: 'small'}}>
								<TextInput 
									placeholder="Event i.e. restaurant, game, bar"
									value={eventName}
									onChange={(event) => setEventName(event.target.value)}
								/>
								<DateInput
									format="mm/dd/yyyy"
									value={date}
									onChange={({ value }) => { setDate(value) }}
								/>
							</Box>
							{listItems}
							<Button label='Add row' onClick={() => setData([...data, row])}/>
						</Tab>
					</Tabs>
					<Box>
						<Button label='Create Event' onClick={() => console.log(data)}/>
						<Button label='Submit' onClick={() => console.log(data)}/>
					</Box>
				</PageContent>
			</Page>
		</Grommet>
	);
}

export default App;

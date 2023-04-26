import React, { useState } from 'react';
import {
	Accordion,
	AccordionPanel,
	Box,
	Button,
	DateInput,
	Grid,
	Grommet,
	Header,
	Heading,
	Page,
	PageContent,
	PageHeader,
	Text,
	TextInput
} from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { Moon, Sun, Add } from 'grommet-icons';

const AppBar = (props) => {
	const { dark, setDark}  = props;
	return (
		<Header background='brand'>
			<Heading>Trevor Final Project</Heading>
			<Button
				a11yTitle={dark ? 'Light mode' : 'Dark mode'}
				icon={dark ? <Moon /> : <Sun />}
				onClick={() => setDark(!dark)}
				tip={{
					content: (
						<Box
							pad='small'
							round='small'
							background={dark ? 'dark-1' : 'light-3'}
						>
							{dark ? 'Light mode' : 'Dark mode'}
						</Box>
					),
					plain: true,
				}}
			/>
		</Header>
	);
}

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
				<AppBar dark={dark} setDark={setDark}/>
				<PageContent>
					<PageHeader 
						title="Trevor Final Project"
						subtitle={
							<Box>Easily calculate how much much everyone owes each other after an event such as a vaction.</Box>
						}
					/>
					<Accordion>
						<AccordionPanel>
							<Box direction='row' gap='small' pad={{bottom: 'small'}}>
								<TextInput placeholder="Event i.e. restaurant, game, bar"/>
								<DateInput
									format="mm/dd/yyyy"
									value={date}
									onChange={({ value }) => { setDate(value) }}
								/>
							</Box>
							{listItems}
							<Button label='Add row' onClick={() => setData([...data, row])}/>
						</AccordionPanel>
					</Accordion>
					<Box>
						<Button label='Add event' onClick={() => console.log('yolo')}/>
						<Button label='Submit' onClick={() => console.log(data)}/>
					</Box>
				</PageContent>
			</Page>
		</Grommet>
	);
}

export default App;

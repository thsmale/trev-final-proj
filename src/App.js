import React, { useState } from 'react';
import {
	Box,
	Button,
	Grid,
	Grommet,
	grommet,
	Header,
	Heading,
	Page,
	PageContent,
	PageHeader,
	Text,
	TextInput
} from 'grommet';
import { deepMerge } from 'grommet/utils';
import { Moon, Sun, Add } from 'grommet-icons';

const theme = deepMerge(grommet, {
	global: {
		colors: {
			brand: '#228BE6'
		},
		font: {
			family: 'Roboto',
			size: '18px',
			height: '20px',
		}
	}
});

const AppBar = props => {
	return <Header
		background="brand"
		pad={{ left: 'medium', right: 'small', vertical: 'small' }}
		elevation='medium'
		{...props}
	/>
};

const Input = (props) => {
	const [value, setValue] = React.useState({ name: '', item: '', price: '' });
	return (
		<Grid columns="medium" gap="small" pad={{ bottom: "large" }}>
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
	const [data, setData] = useState([row])
	const listItems = [];
	for (let i = 0; i < data.length; ++i) {
		listItems.push(
			<Input index={i} data={data} setRows={setData} />
		);
	}

	return (
		<Grommet theme={theme} full themeMode={dark ? 'dark' : 'light'}>
			<Page>
				<AppBar>
					<Text size="large">Trevor Final Project</Text>
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
				</AppBar>
				<PageContent>
					<PageHeader title="Trevor Final Project" />
					<div>
						{listItems}
					</div>
				<Button label='+' onClick={() => setData([...data, row])}/>
				<Button label='Submit' onClick={() => console.log(data)}/>
				</PageContent>
			</Page>
		</Grommet>
	);
}

export default App;

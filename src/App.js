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



const Input = () => {
	const [value, setValue] = React.useState({});
	return (
		<Grid columns="medium" gap="small" pad={{ bottom: "large" }}>
			<TextInput
				placeholder="Name"
				value={value}
				onChange={event => setValue(event.target.value)}
			/>
			<TextInput
				placeholder="Item"
				value={value}
				onChange={event => setValue(event.target.value)}
			/>
			<TextInput
				placeholder="Price"
				textAlign='$'
				value={value}
				onChange={event => setValue(event.target.value)}
			/>
		</Grid>
	);
}

const x = (props) => {
	return (
		React.Children.toArray(props)
		//<React.Fragment>
			//props
		//</React.Fragment>
	)
}

const App = () => {
	const [dark, setDark] = useState(false);
	const [rows, setRows] = useState([<Input/>, <Input/>, <Input/>])
					//<Button icon={<Add />} onClick={setRows => {Input, ...{rows}}}/>
	const [numRows, setNumRows] = useState([1])
	const listItems = numRows.map((numRows) =>
		<Input/>
	);
	const z = 10;
	const listRows = () => {
		const c = []
		for (let i = 0; i < z; ++i) {
			console.log('hello world')
			c.push(<Input/>)
		}
		return c;
	}
	const addRow = () => setNumRows([1, ...numRows])

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
					<x>
						{rows}
					</x>
					<div>
						{listRows}
					</div>
				<Button label='+' onClick={() => setNumRows([1, ...numRows])}/>
				</PageContent>
			</Page>
			React.Children.toArray(components)
		</Grommet>
	);
}

export default App;

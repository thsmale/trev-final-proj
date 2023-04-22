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

class Car extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {value: 0}
	}
	render() {
		return (
			<div>
				<Text>{this.state.value}</Text>
				<Button label='+' onClick={() => {this.setState({value: this.state.value += 1})}}/>
			</div>
		)
	}
  }

const Input = () => {
	const [value, setValue] = React.useState({});
	return (
		<Grid columns="medium" gap="small" pad={{ bottom: "large" }}>
			<TextInput
				placeholder="Name"
				value={value}
				onChange={event => setValue({ name: event.target.value, ...value })}
			/>
			<TextInput
				placeholder="Item"
				value={value}
				onChange={event => setValue({ item: event.target.value, ...value })}
			/>
			<TextInput
				placeholder="Price"
				textAlign='$'
				value={value}
				onChange={event => setValue({ price: event.target.value, ...value })}
			/>
		</Grid>
	);
}

const App = () => {
	const [dark, setDark] = useState(false);
	const [numRows, setNumRows] = useState([1])
	const listItems = numRows.map((numRows) =>
		<Input/>
	);

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
				<Button label='+' onClick={() => setNumRows([1, ...numRows])}/>
				<Button label='Submit' />
				<Car/>
				</PageContent>
			</Page>
		</Grommet>
	);
}

export default App;

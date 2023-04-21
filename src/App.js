import React, { useState } from 'react';
import { 
	Box,
	Button, 
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Grid,
	Grommet, 
	grommet,
	Header, 
	Heading,
	Page, 
	PageContent, 
	PageHeader, 
	Paragraph,
	Text 
} from 'grommet';
import { deepMerge } from 'grommet/utils';
import { Moon, Sun } from 'grommet-icons';

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

const CardTemplate = ({ title }) => {
	return (
		<Card>
			<CardHeader pad='medium'>
				<Heading level={2} margin='none'> {title} </Heading>
			</CardHeader>
			<CardBody pad='medium'>
				<Paragraph>Hello world</Paragraph>
			</CardBody>
			<CardFooter pad='medium' background='background-contrast'>
				Footer
			</CardFooter>
		</Card>
	);
}

const App = () => {
  const [dark, setDark] = useState(false);
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
					      plain : true,
				      }}
			      />
		      </AppBar>
		      <PageContent>
			      <PageHeader title="Trevor Final Project" />
			      <Grid columns='medium' gap='large' pad={{ bottom: 'large' }}>
				      <CardTemplate title={'Card 1'} />
				      <CardTemplate title={'Card 2'} />
			      </Grid>
		      </PageContent>
	      </Page>
      </Grommet>
  );
}

export default App;

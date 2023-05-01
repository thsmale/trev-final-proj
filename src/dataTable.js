/**
 * Displays a table
 * Note this was used to update the react state for bill as well at one point
 * Does this by only updating accordion every time it is opened and closed
 * TODO: Format response from trevor's python code using this
 */

import {
	Accordion,
	AccordionPanel,
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableRow,
} from 'grommet'

const TabTableRow = (props) => {
	return (
		<TableRow>
			<TableCell scope="row">{props.tab.name}</TableCell>
			<TableCell>{props.tab.item}</TableCell>
			<TableCell>{props.tab.price}</TableCell>
		</TableRow>
	)
}

const BillOutput = (props) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableCell scope="col" border="bottom">
						Name
					</TableCell>
					<TableCell scope="col" border="bottom">
						Item
					</TableCell>
					<TableCell scope="col" border="bottom">
						Price
					</TableCell>
				</TableRow>
			</TableHeader>
			<TableBody>
			{
				props.bill.tabs.map(tab => ((
					<TabTableRow tab={tab} />
				)))
			}
			</TableBody>
		</Table>
	);
}

const ShowBill = ({ bill, setBill, tabs }) => {
	const [showBill, setShowBill] = useState(
		bill.tabs.map(tab => <TabTableRow tab={tab} />)
	)
	const [activeAccordionIndex, setActiveAccordionIndex] = useState([])
	return (
		<Accordion pad={{ top: 'large' }} onActive={(index) => {
			console.log(`Active accordion index ${index}`)
			console.log(`accordian index length: ${index.length}`)
			if (index.length === 0) {
				setActiveAccordionIndex([])
				return
			}
			setActiveAccordionIndex([])
			setBill({ ...bill, tabs })
			//setShowBill(bill.tabs.map(tab => <TabTableRow tab={tab} />))
			setActiveAccordionIndex([0])
		}} activeIndex={activeAccordionIndex}>
			<AccordionPanel label='Data table'>
				<BillOutput bill={bill} />
			</AccordionPanel>
		</Accordion>
	)
}
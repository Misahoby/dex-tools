import { useRef, useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { BitQueryDeXTradeRes } from '../../common/types/bitquery'

const columnDefs = [{
	headerName: 'Date',
	field: 'date',
	width: 130
}, {
	headerName: 'Protocol',
	field: 'protocol',
	width: 125
}, {
	headerName: 'Type',
	field: 'type',
	width: 70
}, {
	headerName: 'Sell Currency',
	field: 'sellCurrency',
	width: 125
}, {
	headerName: 'Sell Amount',
	field: 'sellAmount',
	width: 125
}, {
	headerName: 'Price',
	field: 'price',
	width: 70
}, {
	headerName: 'Buy Currency',
	field: 'buyCurrency',
	width: 125
}, {
	headerName: 'Buy Amount',
	field: 'buyAmount',
	width: 125
}, {
	headerName: 'Maker',
	field: 'makerAddress',
	flex: 1
}, {
	headerName: 'Taker',
	field: 'takerAddress',
	flex: 1
}]

export const DeXTransactionsTable = ({ dexTransactions }: {
	dexTransactions: BitQueryDeXTradeRes | null
}) => {
	const gridRef = useRef(null)

	const defaultColDef = useMemo(()=> ({
		resizable: true,
		sortable: true
	}), []);

	const rowData = useMemo(() => !dexTransactions ? [] : dexTransactions.data.ethereum.dexTrades.map(data => ({
		date: data.date.date,
		protocol: data.protocol,
		type: data.side,
		sellCurrency: data.sellCurrency.symbol,
		sellAmount: data.sellAmount,
		price: data.price,
		buyCurrency: data.buyCurrency.symbol,
		buyAmount: data.buyAmount,
		makerAddress: data.maker.address,
		takerAddress: data.taker.address
	})), [dexTransactions])

	return (<div className="ag-theme-alpine" style={{ height: '800px', width: '100%' }}>
		<AgGridReact ref={gridRef}
			columnDefs={columnDefs}
			defaultColDef={defaultColDef}
			rowData={rowData}
			enableRangeSelection
			animateRows>
		</AgGridReact>
		</div>)
}

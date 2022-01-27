import { useRef, useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { BitQueryDeXTradeRes } from '../../common/types/bitquery'

const columnDefs = [{
	headerName: 'Date',
	field: 'date',
	width: 170
}/*, {
	headerName: 'Protocol',
	field: 'protocol',
	width: 125
}*/, {
	headerName: 'Type',
	field: 'type',
	flex: 1
}, {
	headerName: 'Amount',
	field: 'baseAmount',
	flex: 1
}, {
	headerName: 'Base Currency',
	children: [{
		headerName: 'Symbol',
		field: 'baseSymbol',
		flex: 1
	}]
}, {
	headerName: 'Quote Currency',
	children: [{
		headerName: 'Symbol',
		field: 'quoteSymbol',
		flex: 1
	}]
}, {
	headerName: 'Quote Price',
	field: 'quotePrice',
	flex: 1
}]

export const DeXTransactionsTable = ({ dexTransactions, onSelectTokenAddress, baseCurrency, quoteCurrency }: {
	dexTransactions: BitQueryDeXTradeRes | null,
	baseCurrency: string,
	quoteCurrency?: string,
	onSelectTokenAddress: Function
}) => {
	const gridRef = useRef(null)

	const defaultColDef = useMemo(()=> ({
		resizable: true,
		sortable: true
	}), []);

	const rowData = useMemo(() => !dexTransactions ? [] : dexTransactions.data.ethereum.dexTrades.map(data => ({
		date: data.timeInterval.second,
		// protocol: data.protocol,
		type: data.side,
		baseAmount: data.baseAmount,
		baseSymbol: data.baseCurrency.symbol,
		quoteSymbol: data.quoteCurrency.symbol,
		quoteAddress: data.quoteCurrency.address,
		quotePrice: data.quotePrice,
	})), [dexTransactions])

	// const columnDefs = useMemo(() => {
	// 	const baseSymbol = !dexTransactions || !baseCurrency ? '' :
	// 		dexTransactions.data.ethereum.dexTrades.find(data => data.baseCurrency.address === baseCurrency)?.symbol || ''
	// 	const quoteSymbol = !dexTransactions || !quoteCurrency ? '' :
	// 		dexTransactions.data.ethereum.dexTrades.find(data => data.quoteCurrency.address === quoteCurrency)?.symbol || ''
	// 	return generateColumnDefs(baseSymbol, quoteSymbol)
	// }, [dexTransactions])

	const onCellClicked = (params: any) => {
		if (params.type === 'cellClicked') {
			if (params.column.colId === 'quoteSymbol') {
				onSelectTokenAddress(params.data.quoteAddress)
			}
		}
	}

	return (<div className="ag-theme-alpine" style={{ height: '800px', width: '100%' }}>
		<AgGridReact ref={gridRef}
			columnDefs={columnDefs}
			defaultColDef={defaultColDef}
			rowData={rowData}
			enableRangeSelection
			animateRows
			onCellClicked={onCellClicked}>
		</AgGridReact>
		</div>)
}

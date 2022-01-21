import { useRef, useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { DeXPair } from '../../common/types/bitquery'

const columnDefs = [{
	headerName: 'Protocol',
	field: 'protocol',
	width: 125
}, {
	headerName: 'Count',
	field: 'count',
	width: 95
}, {
	headerName: 'Buy Currency',
	children: [{
		headerName: 'Name',
		field: 'buyCurrencyName',
		width: 155
	}, {
		headerName: 'Symbol',
		field: 'buyCurrencySymbol',
		width: 95
	}, {
		headerName: 'Address',
		field: 'buyCurrencyAddress',
		flex: 1
	}]
}, {
	headerName: 'Sell Currency',
	children: [{
		headerName: 'Name',
		field: 'sellCurrencyName',
		width: 155
	}, {
		headerName: 'Symbol',
		field: 'sellCurrencySymbol',
		width: 95
	}, {
		headerName: 'Address',
		field: 'sellCurrencyAddress',
		flex: 1
	}]
}]

export const DeXPairsTable = ({ dexTrades, onChangeCurrency }: {
	dexTrades: DeXPair | null,
	onChangeCurrency: Function
}) => {
	const gridRef = useRef(null)

	const defaultColDef = useMemo(()=> ({
		resizable: true,
		sortable: true
	}), []);

	const rowData = useMemo(() => !dexTrades ? [] : dexTrades.data.ethereum.dexTrades.map(pair => ({
		protocol: pair.protocol,
		count: pair.count,
		buyCurrencyName: pair.buyCurrency.name,
		buyCurrencySymbol: pair.buyCurrency.symbol,
		buyCurrencyAddress: pair.buyCurrency.address,
		sellCurrencyName: pair.sellCurrency.name,
		sellCurrencySymbol: pair.sellCurrency.symbol,
		sellCurrencyAddress: pair.sellCurrency.address
	})), [dexTrades])

	const onCellClicked = (params: any) => {
		if (params.type === 'cellClicked' && (
			params.column.colId === 'buyCurrencyAddress' || params.column.colId === 'sellCurrencyAddress')) {
			onChangeCurrency(params.value)
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

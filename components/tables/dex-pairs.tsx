import { useRef, useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { BitQueryDeXTradeRes } from '../../common/types/bitquery'

const columnDefs = [{
	headerName: 'Protocol',
	field: 'protocol',
	flex: 1
}, {
	headerName: 'Count',
	field: 'count',
	flex: 1
}, {
	headerName: 'Base Currency',
	children: [{
		headerName: 'Name',
		field: 'buyCurrencyName',
		flex: 1
	}, {
		headerName: 'Symbol',
		field: 'buyCurrencySymbol',
		flex: 1
	}/*, {
		headerName: 'Address',
		field: 'buyCurrencyAddress',
		flex: 1
	}*/]
}, {
	headerName: 'Quote Currency',
	children: [{
		headerName: 'Name',
		field: 'sellCurrencyName',
		flex: 1
	}, {
		headerName: 'Symbol',
		field: 'sellCurrencySymbol',
		flex: 1
	}/*, {
		headerName: 'Address',
		field: 'sellCurrencyAddress',
		flex: 1
	}*/]
}]

export const DeXTradePairsTable = ({ dexTrades, onSelectTokenAddress }: {
	dexTrades: BitQueryDeXTradeRes | null,
	onSelectTokenAddress: Function
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
		if (params.type === 'cellClicked') {
			if (params.column.colId === 'buyCurrencySymbol' || params.column.colId === 'buyCurrencyName') {
				onSelectTokenAddress(params.data.buyCurrencyAddress)
			} else if (params.column.colId === 'sellCurrencySymbol' || params.column.colId === 'sellCurrencyName') {
				onSelectTokenAddress(params.data.sellCurrencyAddress)
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

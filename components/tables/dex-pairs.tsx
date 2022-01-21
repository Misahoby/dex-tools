import { useRef, useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'

interface DeXPairCurrency {
	symbol: string,
	name: string,
	address: string
}

interface DeXPair {
	count: number,
	protocol: string,
	buyCurrency: DeXPairCurrency
	sellCurrency: DeXPairCurrency
}

const columnDefs = [{
		headerName: 'Protocol',
		field: 'protocol'
	}, {
		headerName: 'Count',
		field: 'count'
	}, {
	headerName: 'Buy Currency',
	children: [{
		headerName: 'Name',
		field: 'buyCurrencyName'
	}, {
		headerName: 'Symbol',
		field: 'buyCurrencySymbol'
	}, {
		headerName: 'Address',
		field: 'buyCurrencyAddress'
	}]
}, {
	headerName: 'Sell Currency',
	children: [{
		headerName: 'Name',
		field: 'sellCurrencyName'
	}, {
		headerName: 'Symbol',
		field: 'sellCurrencySymbol'
	}, {
		headerName: 'Address',
		field: 'sellCurrencyAddress'
	}]
}]


export const DeXPairsTable = ({ dexTrades }: {
	dexTrades: Array<DeXPair>
}) => {
	const gridRef = useRef(null)

	const defaultColDef = useMemo(()=> ({
		resizable: true,
		sortable: true,
		flex: 1
	}), []);

	const rowData = useMemo(() => !dexTrades.data ? [] : dexTrades.data.ethereum.dexTrades.map(pair => ({
		protocol: pair.protocol,
		count: pair.count,
		buyCurrencyName: pair.buyCurrency.name,
		buyCurrencySymbol: pair.buyCurrency.symbol,
		buyCurrencyAddress: pair.buyCurrency.address,
		sellCurrencyName: pair.sellCurrency.name,
		sellCurrencySymbol: pair.sellCurrency.symbol,
		sellCurrencyAddress: pair.sellCurrency.address
	})), [dexTrades])

	return (<div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
		<AgGridReact ref={gridRef}
			columnDefs={columnDefs}
			defaultColDef={defaultColDef}
			rowData={rowData}
			enableRangeSelection
			animateRows>
		</AgGridReact>
		</div>)
}

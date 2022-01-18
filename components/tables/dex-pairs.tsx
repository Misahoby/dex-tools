import { useRef, useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'

const fakeData: Object = {
	columnDefs: [
		{ headerName: "Protocol", field: "protocol" },
		{ headerName: "Count", field: "count" },
		{ headerName: "Buy Currency", field: "buyCurrency" },
		{ headerName: "Sell Currency", field: "sellCurrency" }
	],
	rowData: [
		{ protocol: "Uniswap v2", count: 10, buyCurrency: "BNB", sellCurrency: "USDT" },
		{ protocol: "Uniswap v2", count: 10, buyCurrency: "BUSD", sellCurrency: "WETH" },
		{ protocol: "Uniswap v3", count: 10, buyCurrency: "SOL", sellCurrency: "BTC" },
		{ protocol: "Uniswap v2", count: 10, buyCurrency: "BNB", sellCurrency: "USDT" },
		{ protocol: "Uniswap v2", count: 10, buyCurrency: "BUSD", sellCurrency: "WETH" },
		{ protocol: "Uniswap v3", count: 10, buyCurrency: "SOL", sellCurrency: "BTC" },
		{ protocol: "Uniswap v2", count: 10, buyCurrency: "BNB", sellCurrency: "USDT" },
		{ protocol: "Uniswap v2", count: 10, buyCurrency: "BUSD", sellCurrency: "WETH" },
		{ protocol: "Uniswap v3", count: 10, buyCurrency: "SOL", sellCurrency: "BTC" }
	]
}

export const DeXPairsTable = ({}) => {
	const gridRef = useRef(null)

	const defaultColDef = useMemo(()=> ({
    resizable: true,
    sortable: true,
    flex: 1
	}), []);

	return (<div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
		<AgGridReact
			ref={gridRef}
			columnDefs={fakeData.columnDefs}
			defaultColDef={defaultColDef}
			rowData={fakeData.rowData}
			enableRangeSelection
			animateRows
		>
		</AgGridReact>
	</div>)
}

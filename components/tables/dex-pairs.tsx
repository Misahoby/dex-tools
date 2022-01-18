import { useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'

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
		{ protocol: "Uniswap v3", count: 10, buyCurrency: "SOL", sellCurrency: "BTC" }
	]
}

export const DeXPairsTable = ({}) => {
	const gridRef = useRef(null)

	return (<div className="ag-theme-balham" style={{ height: '500px', width: '100%' }}>
		<AgGridReact
			ref={gridRef}
			columnDefs={fakeData.columnDefs}
			rowData={fakeData.rowData}
		>
		</AgGridReact>
	</div>)
}

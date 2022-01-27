export enum DEX_PROTOCOLS {
	US2 = 'Uniswap v2',
	US3 = 'Uniswap v3'
}

interface BitQueryDeXCurrency {
	symbol: string,
	name: string,
	address: string
}

interface BitQueryTimeInterval {
	minute: string,
	second: string
}

interface BitQueryDeXDate {
	date: string
}

interface BitQueryDeXMakerTaker {
	address: string
}

type BitQueryDeXTradeSide = 'SELL' | 'BUY'

export interface BitQueryDeXTradeRes {
	data: {
		ethereum: {
			dexTrades: [{
				count: number,
				protocol: string,
				date: BitQueryDeXDate,
				baseAmount: number,
				baseCurrency: BitQueryDeXCurrency,
				quoteCurrency: BitQueryDeXCurrency, 
				buyCurrency: BitQueryDeXCurrency,
				buyAmount: number,
				sellCurrency: BitQueryDeXCurrency,
				sellAmount: number,
				side: BitQueryDeXTradeSide,
				maker: BitQueryDeXMakerTaker,
				taker: BitQueryDeXMakerTaker,
				timeInterval: BitQueryTimeInterval,
				price: number,
				quotePrice: number
			}]
		}
	}
	
}

export interface UniSwapBitqueryReqParams {
	protocol: string,
	perPage: number,
	offset: number,
	baseCurrency: string,
	quoteCurrency: string
}

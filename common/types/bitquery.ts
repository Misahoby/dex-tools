export enum DEX_PROTOCOLS {
	US2 = 'Uniswap v2',
	US3 = 'Uniswap v3'
}

interface BitQueryDeXCurrency {
	symbol: string,
	name: string,
	address: string
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
				buyCurrency: BitQueryDeXCurrency,
				buyAmount: number,
				sellCurrency: BitQueryDeXCurrency,
				sellAmount: number,
				side: BitQueryDeXTradeSide,
				maker: BitQueryDeXMakerTaker,
				taker: BitQueryDeXMakerTaker,
				price: number
			}]
		}
	}
	
}

export interface UniSwapBitqueryReqParams {
	protocol: string,
	perPage: number,
	offset: number,
	currency: string
}

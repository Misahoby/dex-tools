export enum DEX_PROTOCOLS {
	US2 = 'Uniswap v2',
	US3 = 'Uniswap v3'
}

export interface DeXPairCurrency {
	symbol: string,
	name: string,
	address: string
}

export interface DeXPair {
	data: {
		ethereum: {
			dexTrades: [{
				count: number,
				protocol: string,
				buyCurrency: DeXPairCurrency
				sellCurrency: DeXPairCurrency			
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

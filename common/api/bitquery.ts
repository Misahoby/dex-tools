import { gql } from '@apollo/client'
import { bitQueryApolloClient } from './apollo'
import { BITQUERY_CONFIG } from '../config/general'
import { BITQUERY_GQL_URL } from '../constants/general'
import { gqlToPromise } from '../utilities/graphql'
import { BitQueryDeXTradeRes, UniSwapBitqueryReqParams } from '../types/bitquery'

const generateUniSwapGQLDeXPairsQuery = (params: UniSwapBitqueryReqParams) => `{
  ethereum {
    dexTrades(
      options: {
      	limit: ${params.perPage},
      	desc: "count",
      	offset: ${params.offset}
      },
      protocol: {
      	is: "${params.protocol}"
      }
    ) {
      count
      protocol
      buyCurrency {
        symbol
        name
        address
      }
      sellCurrency {
        symbol
        name
        address
      }
    }
  }
}`

const generateUniSwapGQLDeXTransactionsQuery = (params: UniSwapBitqueryReqParams) => `{
  ethereum {
    dexTrades(
      options: {
        limit: ${params.perPage},
        desc: "date.date",
        offset: ${params.offset}
      }
      protocol: {is: "${params.protocol}"}
      baseCurrency: {is: "${params.currency}"}
    ) {
      protocol
      date {
        date(format: "%Y-%m-%d %T")
      }
      buyAmount
      sellAmount
      side
      maker {
        address
      }
      taker {
        address
      }
      buyCurrency {
        address
        name
        symbol
      }
      sellCurrency {
        address
        name
        symbol
      }
      price
    }
  }
}`

const generateDeXTradesQuery = (params: UniSwapBitqueryReqParams) => {
  if (params.currency) {
    return generateUniSwapGQLDeXTransactionsQuery(params)
  } else {
    return generateUniSwapGQLDeXPairsQuery(params)
  }
}

export const getUniSwapTrades = (params: UniSwapBitqueryReqParams): Promise<BitQueryDeXTradeRes> => {
	return new Promise(async (resolve, reject) => {
		if (BITQUERY_CONFIG.GRAPHQL) {
			try {
				resolve(await bitQueryApolloClient.query({ query: gql`${generateDeXTradesQuery(params)}` }))
			} catch (e) {
				reject(e)	
			}
		} else {
			gqlToPromise(BITQUERY_GQL_URL, generateDeXTradesQuery(params), {
				'X-API-KEY': BITQUERY_CONFIG.X_API_KEY	
			}).then((data: BitQueryDeXTradeRes) => resolve(data), error => reject(error))
		}	
	})
}

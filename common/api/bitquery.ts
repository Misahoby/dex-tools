import { gql } from '@apollo/client'
import { bitQueryApolloClient } from './apollo'
import { BITQUERY_CONFIG } from '../config/general'
import { BITQUERY_GQL_URL } from '../constants/general'
import { gqlToPromise } from '../utilities/graphql'
import { DeXPair, UniSwapBitqueryReqParams } from '../types/bitquery'

const generateUniSwapGQLQuery = (params: UniSwapBitqueryReqParams) => `{
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
    ${!params.currency ? "" : ",baseCurrency: { is: \"" + params.currency + "\"}"}
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

export const getUniSwapTrades = (params: UniSwapBitqueryReqParams): Promise<DeXPair> => {
	return new Promise(async (resolve, reject) => {
		if (BITQUERY_CONFIG.GRAPHQL) {
			try {
				resolve(await bitQueryApolloClient.query({ query: gql`${generateUniSwapGQLQuery(params)}` }))
			} catch (e) {
				reject(e)	
			}
		} else {
			gqlToPromise(BITQUERY_GQL_URL, generateUniSwapGQLQuery(params), {
				'X-API-KEY': BITQUERY_CONFIG.X_API_KEY	
			}).then((data: DeXPair) => resolve(data), error => reject(error))
		}	
	})
}

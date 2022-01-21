import { gql } from '@apollo/client'
import { bitQueryApolloClient } from './apollo'
import { BITQUERY_CONFIG } from '../config/general'
import { BITQUERY_GQL_URL } from '../constants/general'
import { gqlToPromise } from '../utilities/graphql'
import { DeXPair } from '../types/bitquery'

const generateUniSwapGQLQuery = (protocol: string, perPage: number, offset: number) => `{
  ethereum {
    dexTrades(options: {limit: ${perPage}, desc: "count", offset: ${offset}}, protocol: {is: "${protocol}"}) {
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

export const getUniSwapTrades = (protocol: string, perPage: number, offset: number): Promise<DeXPair> => {
	return new Promise(async (resolve, reject) => {
		if (BITQUERY_CONFIG.GRAPHQL) {
			try {
				resolve(await bitQueryApolloClient.query({ query: gql`${generateUniSwapGQLQuery(protocol, perPage, offset)}` }))
			} catch (e) {
				reject(e)	
			}
		} else {
			gqlToPromise(BITQUERY_GQL_URL, generateUniSwapGQLQuery(protocol, perPage, offset), {
				'X-API-KEY': BITQUERY_CONFIG.X_API_KEY	
			}).then((data: DeXPair) => resolve(data), error => reject(error))
		}	
	})
}

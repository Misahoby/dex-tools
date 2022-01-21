import { gql } from '@apollo/client'
import { bitQueryApolloClient } from './apollo'
import { BITQUERY_CONFIG } from '../config/general'
import { BITQUERY_GQL_URL } from '../constants/general'
import { gqlToPromise } from '../utilities/graphql'

const generateUniSwapGQLQuery = protocol => `{
  ethereum {
    dexTrades(options: {limit: 100, desc: "count"}, protocol: {is: "${protocol}"}) {
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

export const getUniSwapTrades = (protocol) => {
	return new Promise(async (resolve, reject) => {
		if (BITQUERY_CONFIG.GRAPHQL) {
			try {
				resolve(await bitQueryApolloClient.query({ query: gql`${generateUniSwapGQLQuery(protocol)}` }))
			} catch (e) {
				reject(e)	
			}
		} else {
			gqlToPromise(BITQUERY_GQL_URL, generateUniSwapGQLQuery(protocol), {
				'X-API-KEY': BITQUERY_CONFIG.X_API_KEY	
			}).then(data => resolve(data), error => reject(error))
		}	
	})
}

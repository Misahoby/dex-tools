import { gql } from '@apollo/client'
import { bitQueryApolloClient } from './apollo'
import { BITQUERY_CONFIG } from '../config/general'
import { BITQUERY_GQL_URL } from '../constants/general'
import { gqlToPromise } from '../utilities/graphql'

const generateUniSwapGQLQuery = protocol => `{
	ethereum {
		dexTrades(protocol: {is: "${protocol}"}, options: {limit: 100, desc: "count"}) {
			count
			protocol
			buyCurrency {
				name
				symbol
			}
			sellCurrency {
				name
				symbol
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

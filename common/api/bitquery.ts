import { gql } from '@apollo/client'
import { bitQueryApolloClient } from './apollo'
import { BITQUERY_CONFIG } from '../config/general'
import { BITQUERY_GQL_URL } from '../constants/general'

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

const generateUniSwapJSONQuery = protocol => `{ ethereum {
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
}}`

export const getUniSwapTrades = (protocol) => {
	return new Promise(async (resolve, reject) => {
		if (BITQUERY_CONFIG.GRAPHQL) {
			try {
				const { data } = await bitQueryApolloClient.query({ query: gql`${generateUniSwapGQLQuery(protocol)}` })
				resolve(data)
			} catch (e) {
				reject(e)	
			}
		} else {
			fetch(BITQUERY_GQL_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-API-KEY': BITQUERY_CONFIG.X_API_KEY
				},
				body: JSON.stringify({ query: generateUniSwapJSONQuery(protocol) }),
			})
			.then(res => res.json())
			.then(res => resolve(res.data))
			.catch(e => reject(e))
		}	
	})
}

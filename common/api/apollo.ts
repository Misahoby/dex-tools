import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { BITQUERY_GQL_URL } from '../constants/general'
import { BITQUERY_CONFIG } from '../config/general'

const httpLink = createHttpLink({ uri: BITQUERY_GQL_URL })

const authLink = setContext((_, { headers }) => ({
	headers: {
		...headers,
		'X-API-KEY': BITQUERY_CONFIG.X_API_KEY
	}
}))

export const bitQueryApolloClient = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
})

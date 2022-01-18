import { ApolloClient, InMemoryCache } from '@apollo/client'
import { BITQUERY_GQL_URL } from '../constants/general'

export const bitQueryApolloClient = new ApolloClient({
	uri: BITQUERY_GQL_URL,
	cache: new InMemoryCache()
})

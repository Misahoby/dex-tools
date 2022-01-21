export const gqlToPromise = (uri: string, query: string, headers = {}): Promise<any> => {
	return new Promise((resolve, reject) => {
		fetch(uri, {
			method: 'POST',
			headers: {
				...headers,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ query }),
		})
		.then(res => res.json())
		.then(res => resolve(res.data))
		.catch(e => reject(e))	
	})
}

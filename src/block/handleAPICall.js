import graphqlRequest from 'graphql-request';

const api = {};

api.handleAPICall = user => {
	const root = 'https://api.github.com';

	fetch(`${root}/users/${user}`, {
		crossDomain:true,
		method: 'GET'
	})
		.then(response => response.json())
  	.then( responseJson => {
			 return responseJSON;
		})
		.catch( () => null);
}

export default api;


const api = {};

api.handleAPICall = user => {
	const root = 'https://api.github.com';

	fetch(`${root}/users/${user}`, {
		crossDomain:true,
		method: 'GET'
	})
		.then(response => response.json())
		.catch( () => null);
}

export default api;

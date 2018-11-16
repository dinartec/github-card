
const handleAPICall = ( user, update) => {
	const root = 'https://api.github.com';

	return fetch(`${root}/users/${user}`, {
		crossDomain:true,
		method: 'GET'
	})
		.then( response => {
			if ( response.status >= 200 && response.status < 300 ){
				const parsedResponse = response.json();
				parsedResponse.last_updated = Date.now();
				console.log('hmm:', parsedResponse);

				return parsedResponse;
			} else {
				return null;
			}
		})
		.catch( (err) => console.error( err ));
}

export default handleAPICall;

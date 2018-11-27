
const handleAPICall = route => {
	const root = 'https://api.github.com/repos/';

	if ( route == '' ) {
		return null;
	}

	return fetch(`${root}${route}`, {
		crossDomain:true,
		method: 'GET',
		headers: {
			"Authorization" : "token b3e72b19892ee14f82f72c56d358db8c5e0b71bd"
		}
	})
		.then( response => {

			if ( response.status >= 200 && response.status < 300 ){
				const parsedResponse = response.json();


				return parsedResponse;
			} else {
				return null;
			}
		})
		.catch( (err) => {
			console.error( err )
			return null;
		});
}

export default handleAPICall;

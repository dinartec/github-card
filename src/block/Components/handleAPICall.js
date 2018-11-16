
const handleAPICall = ( user, update) => {
	const root = 'https://api.github.com';

	fetch(`${root}/users/${user}`, {
		crossDomain:true,
		method: 'GET'
	})
		.then(response => {
			response.json();
			response.last_update = Date.now();
			update.userInfo(response);
		})
		.catch( (err) => console.error( err ));
}

export default handleAPICall;

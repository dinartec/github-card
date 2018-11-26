import GithubCard from "./GithubCard";
import UsernameInput from "./Inputs/UsernameInput";
import handleUserAPICall from "./handleUserAPICall";
import handleRepoAPICall from "./handleRepoAPICall";
import Inspector from "./Inspector";

const { __ } = wp.i18n;
const { Component } = wp.element;
const { Spinner, Placeholder } = wp.components;
const cacheRefreshTime = 60000;

export default class Edit extends Component {


	constructor(props) {
		super(...arguments);
		this.props = props;
	};

	state = {
		isError: false,
		repoError: [],
		repoPlaceholder: true
	};

	componentWillMount() {
		const MAX = 5;
		const arrayError = [];
		for( let i = 0; i <= MAX; i++ ) {
			arrayError[i] = false;
		}
		this.setState({repoError: arrayError});

	};

	async userAPI() {

		const { attributes: { username, userInfo }, update } = this.props;

		if ( username !== '' && !this.state.isError ){
			if ( !(userInfo.hasOwnProperty( 'login' )) || username.toUpperCase() !== userInfo.login.toUpperCase() || Date.now() - userInfo.lastUpdate > cacheRefreshTime ) {
				const userInfoResponse = await handleUserAPICall( username );

				if ( userInfoResponse === null ) {
					this.setState({isError: true});
				}
				else {
					userInfoResponse.lastUpdate = Date.now();
					update.username( userInfoResponse.login );
					update.userInfo( userInfoResponse );
				}
			}
		}
	};

	async repoAPI() {
		let { attributes: { repoArray, repoInfo }, update } = this.props;
		let { repoError } = this.state;

		const compare = () => {
			let isDifferent = false;
			console.log( repoInfo, repoArray );
			if (repoInfo.length !== 0 ) {
				repoInfo.map( ( value, index ) => {
				if ( value.full_name.toUpperCase() !== repoArray[index].toUpperCase() ) {
					isDifferent = true;
				}
				});
			}
			return isDifferent;
		};

		console.log(repoInfo.length)

		if ( repoArray.length !== 0 ) {
			if ( repoArray.length !== repoInfo.length || Date.now() - repoInfo[0].lastUpdate > cacheRefreshTime || !compare()) {

				let buildRepo = [];

				for( let length = repoArray.length, i = 0 ; i < length; i++ ){
					const x = await handleRepoAPICall(repoArray[i]);
					console.log(x);
				}
				// repoArray.map( ( value, index ) => {
				// 		await handleRepoAPICall( value )
				// 		.then( repoResponse => {
				// 			if ( repoResponse === null ) {
				// 				repoError[index] = true;

				// 			}
				// 			else {
				// 				repoResponse.lastUpdate = Date.now();
				// 			}
				// 			buildRepo[index] = repoResponse;
				// 		});
				// }, this);

				console.log(buildRepo);
			}

	}
}

	componentDidUpdate() {
		this.userAPI();
		this.repoAPI();

	}

	UIRender() {
		const { attributes: { username, userInfo, repoArray, showRepos }, update } = this.props;
		const { isError } = this.state;

		update.error = () => this.setState({isError: false});

		if ( username === '' || isError === true ) {
			return <UsernameInput {...{ username, update, isError }} />;
		}
		else if( !(userInfo.hasOwnProperty( 'login' )) || username.toUpperCase() !== userInfo.login.toUpperCase() ) {
			return <Placeholder icon={<Spinner />} label={__('Fetching @','github-card' ) + username}/>;
		}

		return <GithubCard {...{ userInfo, repoArray, showRepos }} />;

	}



	render() {

		const { attributes, update } = this.props;
		const { isError, repoError } = this.state;

		return [ (<Inspector {...{ attributes, isError, repoError, update }}/>), this.UIRender()];



	}
}

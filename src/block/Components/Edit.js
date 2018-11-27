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

	setErrorFalse() {
		const MAX = 5;
		const arrayError = [];
		for( let i = 0; i <= MAX; i++ ) {
			arrayError[i] = false;
		}
		this.setState({repoError: arrayError});
	}

	componentWillMount() {
		this.setErrorFalse();
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

		const compare = () => {
			let isDifferent = false;
			if (repoInfo.length !== repoArray.length ){
				isDifferent = true;
			}
			else if (repoInfo.length !== 0 ) {
				repoInfo.map( ( value, index ) => {
				if ( value.full_name.toUpperCase() !== repoArray[index].toUpperCase() ) {
					isDifferent = true;
				}
				});
			}
			console.log('is different: ' + isDifferent);
			return isDifferent;
		};

		console.log(repoInfo);
		if ( repoArray.length !== 0 ) {
			console.log('pass 1');
			if ( repoInfo.length === 0 || Date.now() - repoInfo[0].lastUpdate > cacheRefreshTime || compare() ) {
				console.log('pass 2');
				let buildRepo = [];
				let buildRepoName = [];

				for( let length = repoArray.length, i = 0 ; i < length; i++ ) {
					console.log('pass 3');
					buildRepo[i] = await handleRepoAPICall(repoArray[i]);
					if( buildRepo[i] === null) {
						buildRepoName[i] = null;
					}
					else if ( i === 0 ) {
						buildRepo[i].lastUpdate = Date.now();
					}
				}
				buildRepo = buildRepo.filter( value=> value );
				buildRepoName = buildRepo.map(value => value.full_name );
				console.log('build',buildRepo);
				console.log('name', buildRepoName);
				update.repoInfo(buildRepo);
				update.repoArray(buildRepoName);
			}

	}
}

	componentDidUpdate() {
		this.userAPI();
		this.repoAPI();
	}

	UIRender() {
		const { attributes: { username, userInfo, repoInfo, showRepos }, update } = this.props;
		const { isError } = this.state;

		update.error = () => this.setState({isError: false});

		if ( username === '' || isError === true ) {
			return <UsernameInput {...{ username, update, isError }} />;
		}
		else if( !(userInfo.hasOwnProperty( 'login' )) || username.toUpperCase() !== userInfo.login.toUpperCase() ) {
			return <Placeholder icon={<Spinner />} label={__('Fetching @','github-card' ) + username}/>;
		}

		return <GithubCard {...{ userInfo, repoInfo, showRepos }} />;

	}



	render() {

		const { attributes, update } = this.props;
		const { isError, repoError } = this.state;

		return [ (<Inspector {...{ attributes, isError, repoError, update }}/>), this.UIRender()];



	}
}

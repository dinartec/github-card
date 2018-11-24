import GithubCard from "./GithubCard";
import UsernameInput from "./Inputs/UsernameInput";
import handleAPICall from "./handleAPICall";
import Inspector from "./Inspector";

const { __ } = wp.i18n;
const { Component } = wp.element;
const { Spinner, Placeholder } = wp.components;

export default class Edit extends Component {


	constructor(props) {
		super(...arguments);
		this.props = props;
	};

	state = {
		isError: false
	};

	async componentDidUpdate() {

		const { attributes: { username, userInfo, repoArray }, update } = this.props;
		if ( username !== '' && !this.state.isError ){
			if ( !(userInfo.hasOwnProperty( 'login' )) || username.toUpperCase() !== userInfo.login.toUpperCase() || Date.now() - userInfo.lastUpdate > 60000 ) {
				const userInfoResponse = await handleAPICall( username );

				if ( userInfoResponse === null ) {

					if ( username.toUpperCase() === userInfo.login.toUpperCase() ) {
						return null;
					}
					this.setState({isError: true});
				}
				else {
					userInfoResponse.lastUpdate = Date.now();
					update.username( userInfoResponse.login );
					update.userInfo( userInfoResponse );
				}
			}
		}
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
		const { isError } = this.state;

		return [ (<Inspector {...{ attributes, isError, update }}/>), this.UIRender()];



	}
}

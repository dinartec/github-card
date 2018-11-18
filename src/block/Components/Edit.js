import GithubCard from "./GithubCard";
import UsernameInput from "./Inputs/UsernameInput";
import handleAPICall from "./handleAPICall";
import Inspector from "./Inspector";

const { __ } = wp.i18n;
const { Component } = wp.element;
const { Spinner, Placeholder, PanelBody, PanelRow } = wp.components;
const { InspectorControls } = wp.editor

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

				console.log('Updated!');

				if (userInfoResponse === null) {
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
		const { attributes: { username, userInfo, repoArray }, update } = this.props;
		const { isError } = this.state;

		update.error = () => this.setState({isError: false});

		if ( username === '' || isError === true ) {
			return <UsernameInput {...{ username, update, isError }} />;
		}
		else if( !(userInfo.hasOwnProperty( 'login' )) || username !== userInfo.login ) {
			return <Placeholder icon={<Spinner />} label={__('Fetching @','github-card' ) + username}/>;
		}

		return <GithubCard {...{ userInfo, repoArray }} />;

	}



	render() {

		const { attributes: { username }, update } = this.props;
		const { isError } = this.state;

		return [ (<Inspector {...{ username, isError, update }}/>), this.UIRender()];



	}
}

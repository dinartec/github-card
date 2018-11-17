import GithubCard from "./GithubCard";
import BlockInput from "./BlockInput";
import handleAPICall from "./handleAPICall";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component, Fragment } = wp.element;
const { TextControl, Button, Spinner, Placeholder } = wp.components;

export default class Edit extends Component {


	constructor(props) {
		super(...arguments);
		this.props = props;
	};

	state = {
		isError: false
	};

	componentDidMount() {


	};

	async componentDidUpdate() {

		const { attributes: { username, userInfo, repoArray }, update } = this.props;
		if ( username !== '' && !this.state.isError ){
			if ( !(userInfo.hasOwnProperty( 'login' )) || username.toUpperCase() !== userInfo.login.toUpperCase() || Date.now() - userInfo.lastUpdate > 60000 ) {
				const userInfoResponse = await handleAPICall( username );
				userInfoResponse.lastUpdate = Date.now();

				if (userInfoResponse === null) {
					this.setState({isError: true});
				}
				else {
					update.username( userInfoResponse.login );
					update.userInfo( userInfoResponse );
				}
			}
		}
	}


	render() {

		const { attributes: { username, userInfo, repoArray }, update } = this.props;
		const { isError } = this.state;

		update.error = () => this.setState({isError: false});

		if ( username === '' || isError === true ) {
			return <BlockInput {...{ username, update, isError }} />;
		}
		else if( !(userInfo.hasOwnProperty( 'login' )) || username !== userInfo.login ) {
			return <Placeholder icon={<Spinner />} label={__('Fetching @','github-card' ) + username}/>;
		}

		return(<GithubCard {...{userInfo}} />)
	}
}

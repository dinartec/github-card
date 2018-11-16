import GithubCard from "./GithubCard";
import BlockInput from "./BlockInput";
import handleAPICall from "./handleAPICall";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component, Fragment } = wp.element;
const { TextControl, Button, Spinner, Placeholder } = wp.components;
let isError = false;

export default class Edit extends Component {


	constructor(props) {
		super(...arguments);
		this.props = props;
	};

	state = {

	};

	componentDidMount() {


	};

	componentDidUpdate() {

		const { attributes: { username, userInfo, repoArray }, update } = this.props;
		if ( username !== '' ){
			if ( !(userInfo.hasOwnProperty( 'login' )) || username !== userInfo.login ) {
			// if ( userInfo === null || username !== userInfo.login || update.last_update - 1200000 > 0 ) {
				handleAPICall( username, update ) ;
			}
		}
	}


	render() {

		const { attributes: { username, userInfo, repoArray }, update } = this.props;
		console.log(userInfo);

		if ( username === '' ) {
			return <BlockInput {...{ username, update }} />;
		}
		else if( !(userInfo.hasOwnProperty( 'login' )) || username !== userInfo.login ) {
			return <Placeholder icon={<Spinner />} label={__('Fetching @','github-card' ) + username}/>;
		}
		else if( userInfo.login !== username ){

		}

		// if ( isSubmitted === true ) {
		// 	if ( username === '' ) {
		// 		setAttributes({isSubmitted:false});
		// 	}
		// 	else {
		// 		const response = handleAPICall(username);
		// 		if (response === null) {
		// 			isError === true;
		// 		}
		// 		else {
		// 			return <Placeholder icon={<Spinner />} label={__('Fetching @','github-card' ) + username}/>;
		// 		}
		// 	}
		// }

		// if ( username === '' || !isSubmitted ) {

		// 	return (
		// 		<BlockInput { ...{ attributes, setAttributes, isError } } />
		// 	)

		// }
	}
}

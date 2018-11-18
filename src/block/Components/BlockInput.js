import UsernameInput from './Inputs/UsernameInput';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component, Fragment } = wp.element;
const { TextControl, Button, Spinner } = wp.components;

export default class BlockInput extends Component {
	constructor() {
		super( ...arguments );
		this.render.bind(this);

	};

	state = {
		inputUsername : ''
	};

	componentWillMount = () => {
		this.setState({ inputUsername : this.props.username });
	};

	render() {
		const { username, isError, update } = this.props;
		const setState = this.setState;

		return (
			<Fragment>
				<UsernameInput {...{ username, isError, setState }} />
				<Button onClick={ () => {
												update.username( this.state.inputUsername );
												update.error()}} >Submit</Button>
			</Fragment>
		);
	}
}

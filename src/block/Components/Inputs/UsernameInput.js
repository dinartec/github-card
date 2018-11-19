const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component, Fragment } = wp.element;
const { TextControl, Button } = wp.components;

export default class UsernameInput extends Component {
	constructor() {
		super( ...arguments );
		this.render.bind(this);

	};

	state = {
		inputUsername : ''
	};

	componentWillMount = () => {
		this.setState({ inputUsername : this.props.username });
	}

	render() {
		const { username, isError, update } = this.props;

		return (
			<Fragment>
				<TextControl
					label={ __( 'Enter your GitHub username:', 'github-card' ) }
					help={ __( isError ? 'Something went wrong fetching that username. Try again.' : '' , 'github-card' ) }
					value={ this.state.inputUsername }
					onChange={ inputUsername => this.setState({inputUsername}) }
					/>
				<Button onClick={ () => {
												update.username( this.state.inputUsername );
												update.error()}} >Submit</Button>
			</Fragment>
		);
	}
}

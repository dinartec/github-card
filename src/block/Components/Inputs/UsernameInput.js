const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component, Fragment } = wp.element;
const { TextControl, Button } = wp.components;

export default class BlockInput extends Component {
	constructor( props ) {
		super( ...arguments );
		this.props = props;
	}

	render() {
		const { isError } = this.props;

		return (
			<Fragment>
				<TextControl
					label={ __( 'Enter your GitHub username:', 'github-card' ) }
					help={ __( isError ? 'Something went wrong fetching that username. Try again.' : '' , 'github-card' ) }
					value={ this.state.inputUsername }
					onChange={ inputUsername => this.props.setState({inputUsername}) }
					/>
			</Fragment>
		);
	}
};

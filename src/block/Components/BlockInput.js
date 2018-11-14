const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component, Fragment } = wp.element;
const { TextControl, Button, Spinner } = wp.components;

export default class BlockInput extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		const { attributes: { username, isSubmitted }, setAttributes, isError } = this.props;

		return (
			<Fragment>
				<TextControl
					label={ __( 'Enter your GitHub username:', 'github-card' ) }
					help={ __( isError ? 'Something went wrong fetching that username. Try again.' : '' , 'github-card' ) }
					value={ username }
					onChange={ username => setAttributes( { username } ) }
					/>
					{isSubmitted ?
					(<Spinner />) :
				(<Button isDefault onClick={ () => setAttributes( {isSubmitted: true} )}>Submit</Button>) }
			</Fragment>
		);
	}
}

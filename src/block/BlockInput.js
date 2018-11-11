const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component } = wp.element;
const { TextControl, Button, Fragment, Spinner } = wp.components;

export default class BlockInput extends Component {
	constructor() {
		super( ...arguments );
	}

	render() {
		console.log('xd');
		console.log( this.props );
		const { attributes: { username, isSubmitted }, setAttributes, isError } = this.props;
		console.log('xd');

		return (
			<Fragment>
				<TextControl
					label={ __( 'Enter your GitHub username', 'github-prof-card' ) }
					help={ __( isError ? 'Something went wrong fetching that username. Try again.' : '' , 'github-prof-card' ) }
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

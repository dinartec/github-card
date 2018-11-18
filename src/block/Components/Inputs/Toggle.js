const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component, Fragment } = wp.element;
const { ToggleControl  } = wp.components;

export default class Toggle extends Component {
	constructor(props) {
		super( ...arguments );
		this.props = props;

	};

	render() {

		const { showRepos, update, label, help } = this.props;

		return (<ToggleControl
												label={ label }
												help={ help }
												checked={ showRepos }
												onChange={ () => update.showRepos(!showRepos) } />);

	}

}

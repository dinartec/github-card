const { __ } = wp.i18n;
const { Component } = wp.element;
const { Spinner, Placeholder, PanelBody, PanelRow } = wp.components;
const { InspectorControls } = wp.editor

export default class Edit extends Component {


	constructor(props) {
		super(...arguments);
		this.props = props;
	};

	render() {

		return(<InspectorControls>
			<PanelBody title={ __('Github username', 'github-card') }>
				<PanelRow>

				</PanelRow>
			</PanelBody>
		</InspectorControls>)
	}

}

import UsernameInput from "./Inputs/UsernameInput";

const { __ } = wp.i18n;
const { Component } = wp.element;
const { PanelBody, PanelRow } = wp.components;
const { InspectorControls } = wp.editor

export default class Inspetor extends Component {


	constructor(props) {
		super(...arguments);
		this.props = props;
	};

	render() {
		const { username, isError, update } = this.props;

		return(<InspectorControls>
			<PanelBody title={ __('Username', 'github-card') }>
				<PanelRow>
					<UsernameInput {...{ username, update, isError }} />
				</PanelRow>
			</PanelBody>
			<PanelBody title={ __('Repository display', 'github-card')}>

			</PanelBody>
		</InspectorControls>)
	}

}

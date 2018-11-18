import UsernameInput from "./Inputs/UsernameInput";
import Toggle from "./Inputs/Toggle";

const { __ } = wp.i18n;
const { Component } = wp.element;
const { PanelBody, PanelRow, Disabled } = wp.components;
const { InspectorControls } = wp.editor

export default class Inspetor extends Component {


	constructor(props) {
		super(...arguments);
		this.props = props;
	};

	RepoSettings () {

		
		return null;

	};

	render() {
		const { attributes: { username, showRepos }, isError, update } = this.props;

		return(<InspectorControls>
			<PanelBody title={ __('Username', 'github-card') }
									initialOpen={ false }>

					<UsernameInput {...{ username, update, isError }} />

			</PanelBody>
			<PanelBody title={ __('Repository display', 'github-card')}
									initialOpen={ false }>
					
					<Toggle {...{ showRepos, update }} label={ __('Show repositories', 'github-card') } help={ __( 'Toggle whether repositories are displayed or not' ,'github-card') } />
					{ showRepos ? (<Disabled> { this.RepoSettings() } </Disabled>) :  this.RepoSettings()  }


			</PanelBody>
		</InspectorControls>)
	}

}

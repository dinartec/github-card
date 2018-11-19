import UsernameInput from "./Inputs/UsernameInput";
import ReposUnit from "./Inputs/ReposInput";

const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { PanelBody, Disabled, ToggleControl } = wp.components;
const { InspectorControls } = wp.editor

export default class Inspetor extends Component {


	constructor(props) {
		super(...arguments);
		this.props = props;
	};

	RepoSettings () {
		const { attributes: { pinnedRepos }, update } = this.props;

		return (<Fragment>
			<ToggleControl checked={ pinnedRepos }
											onChange={ () => update.pinnedRepos( !pinnedRepos ) }
						   				label={ __('Use pinned repos', 'github-card') }
											help={ __( 'Toggle whether to use pinned repositories or user submitted ones' ,'github-card') } />
			<ReposUnit />

		</Fragment>);



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

					<ToggleControl checked={ showRepos}
												 onChange={ () => update.showRepos( !showRepos ) }
												 label={ __('Show repositories', 'github-card') }
												 help={ __( 'Toggle whether repositories are displayed or not' ,'github-card') } />
					{ showRepos ?  this.RepoSettings() : (<Disabled> { this.RepoSettings() } </Disabled>)  }


			</PanelBody>
		</InspectorControls>)
	}

}

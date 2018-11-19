const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component, Fragment } = wp.element;
const { PanelRow, TextControl, IconButton, Button } = wp.components;

export default class ReposInput extends Component {
	constructor(props) {
		super( ...arguments );
    this.props = props;
  }

  state = {
    reposArray: ['example','woot']
  }

  // // componentWillMount() {
  // //   const { reposArray } = this.props;
  // //   this.setState( {reposArray} );
	// // }

	RepoInput = props => {

		const { index } = props;
		const { reposArray } = this.state;

		return (<Fragment>
			<PanelRow>
				<TextControl value={ reposArray[index] }
										 onChange= { value => {
											reposArray[index] = value;
											this.setState({reposArray});
										 }} />
				<IconButton icon="no-alt" label="Delete" />
			</PanelRow>
		</Fragment>)
	}

  render() {

    return (<Fragment>
			{ this.state.reposArray.map((value, index) => <this.RepoInput index={index} />, this) }
		</Fragment>)

  }
}

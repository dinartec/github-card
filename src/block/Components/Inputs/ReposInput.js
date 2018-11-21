const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component } = wp.element;
const { TextControl, Button, IconButton } = wp.components;

export default class ReposInput extends Component {
	constructor(props) {
		super( ...arguments );
    this.props = props;
  }

  state = {
		reposArray: ['example', 'umm' ,'woot'],
		index: -1
  }

  // // componentWillMount() {
  // //   const { reposArray } = this.props;
  // //   this.setState( {reposArray} );
	// // }

	InputMover = props => {

		const { className, disableBottom, disableTop, disableX } = props;
		console.log( className );

		return(<div className={ className } >
	<IconButton
					className={ disableTop }
					icon={ 'arrow-up' }
				/>
	<IconButton
					className={ disableX }
					icon={ 'no' }
				/>
	<IconButton
					className={ disableBottom }
					icon={'arrow-down'}
				/>
	</div>)
	}

	RepoInput = props => {

		const { index } = props,
					{ reposArray, index:stateIndex } = this.state,
					arrayLength = reposArray.length;

		let className = 'buttons',
				disableTop = '',
				disableX = '',
				disableBottom = '';

		if( stateIndex === index ) {
			className += ' visible';
		}

		if( arrayLength === 1 ) {
			disableX = 'disabled';
		}

		if( index === 0 ) {
			disableTop = 'disabled';
		}

		if( index === arrayLength -1 ) {
			disableBottom = 'disabled';
		}

		return (<div className="container" onMouseEnter={() => this.setState({index})} onMouseLeave={() => this.setState({index: -1})}>
			<this.InputMover {...{disableTop, disableBottom, disableX, className}} />
			<TextControl value={ reposArray[index] }
									 onFocus={ () => this.setState({toolbarIndex: index})}
									 onChange= { value => {
												reposArray[index] = value;
												this.setState({reposArray});
											 }} />
		</div>);
		}

  render() {

    return (<div id="github-card-repo-input">
			{ this.state.reposArray.map((value, index) => <this.RepoInput index={index} />, this) }
		</div>)

  }
}

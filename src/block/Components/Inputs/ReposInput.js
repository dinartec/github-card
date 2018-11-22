const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component } = wp.element;
const { TextControl, Button, IconButton } = wp.components;

export default class ReposInput extends Component {
	constructor(props) {
		super( ...arguments );
    this.props = props;
  }

  state = {
		reposArray: ['example', 'umm' ,'woot','4','5','6'],
		index: -1
  }

  // // componentWillMount() {
  // //   const { reposArray } = this.props;
  // //   this.setState( {reposArray} );
	// // }

	InputMover = props => {

		const { className, disableBottom, disableTop, disableX, index } = props;

		return(<div className={ className } >
		<IconButton
						onClick={ () => this.moveItem( index, 'up' )}
						tabIndex={-1}
						className={ disableTop }
						icon={ 'arrow-up' }
					/>
		<IconButton
						onClick={ () => this.deleteItem( index )}
						tabIndex={-1}
						className={ disableX }
						icon={ 'no' }
					/>
		<IconButton
						onClick={ () => this.moveItem( index, 'down' )}
						tabIndex={-1}
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
			<this.InputMover {...{ disableTop, disableBottom, disableX, className, index }} />
			<TextControl value={ reposArray[index] }
									 onFocus={ () => this.setState({toolbarIndex: index})}
									 onChange= { value => {
												reposArray[index] = value;
												this.setState({reposArray});
											 }} />
		</div>);
	}

	deleteItem = index => {
		const arrayLength = this.state.reposArray.length,
					newArray = this.state.reposArray.slice();

		if ( arrayLength === 1) {
			return null;
		}

		newArray.splice( index, 1 );
		this.setState({reposArray: newArray});

	}

	moveItem = (index, direction) => {

		const arrayLength = this.state.reposArray.length,
					newIndex = ( direction === 'up' ? index - 1 : index + 1 ),
					newArray = this.state.reposArray.slice(),
					value = newArray[index];

		if( ( direction === 'up' && index === 0) || ( direction === 'down' && index === arrayLength - 1) ){
			return null;
		}

		newArray.splice(index, 1);
		newArray.splice(newIndex, 0, value);

		this.setState({reposArray: newArray});
	}

  render() {

		const { reposArray, index:stateIndex } = this.state,
					arrayLength = reposArray.length;

    return (<div id="github-card-repo-input">
			<h2>
				<span>Custom Repositories</span>
				<IconButton icon="plus"
										label={ arrayLength > 5 ? 'Maximum 6 repos can be displayed' : 'Add another repo display'}/>
			</h2>
			<p><i>Add the link or the route to the repository.</i></p>
			{ reposArray.map((value, index) => <this.RepoInput index={index} />, this) }
		</div>)

  }
}

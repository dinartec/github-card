const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component } = wp.element;
const { TextControl, Disabled, IconButton, Button } = wp.components;

const MAX = 5; // Maximum array elements - 1

export default class ReposInput extends Component {
	constructor(props) {
		super( ...arguments );
    this.props = props;
  }

  state = {
		repoArray: [''],
		index: -1,
		isError: []
  }

  componentWillMount() {
		 const { repoArray } = this.props;
		 if(repoArray.length === 0) {
			 repoArray.push('');
		 }
		 this.setState( {repoArray} );


	}

	parseLink = link => {
		let parsedLink;

		if ( link.includes('github.com/')) {
			parsedLink = link.split('github.com/')[1];
			parsedLink = parsedLink.split('/');
			parsedLink = parsedLink[0] + '/' + parsedLink[1];

			return parsedLink;

		}
		else {
			if( link.split('/').length === 2 ) {
				return link;
			}
		}
	}

	submitChanges = () => {
		const { update } = this.props;
		const { repoArray } = this.state;

		const newRepo = repoArray.map( value => this.parseLink(value), this).filter(value => value !== undefined || value != null ? true : false )

		if (newRepo.length === 0) {
			newRepo.push('');
		}

		this.setState({repoArray:newRepo});
		update.repoArray(newRepo);


	}

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
					{ repoArray, index:stateIndex } = this.state,
					arrayLength = repoArray.length;

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
			<TextControl value={ repoArray[index] }
									 placeholder='Insert the repo link or route'
									 onFocus={ () => this.setState({toolbarIndex: index})}
									 className={ this.state.isError[index] ? 'input-error' : '' }
									 onChange= { value => {
												repoArray[index] = value;
												this.setState({repoArray});
											 }} />
		</div>);
	}

	deleteItem = index => {
		const arrayLength = this.state.repoArray.length,
					newArray = this.state.repoArray.slice();

		if ( arrayLength === 1) {
			return null;
		}

		newArray.splice( index, 1 );
		this.setState({repoArray: newArray});

	}

	addItem = () => {
		const arrayLength = this.state.repoArray.length,
					newArray = this.state.repoArray.slice();

		if (arrayLength > MAX) {
			return null;
		}

		newArray.splice( arrayLength, 0, '');

		this.setState({repoArray: newArray});

	}

	moveItem = (index, direction) => {

		const arrayLength = this.state.repoArray.length,
					newIndex = ( direction === 'up' ? index - 1 : index + 1 ),
					newArray = this.state.repoArray.slice(),
					value = newArray[index];

		if( ( direction === 'up' && index === 0) || ( direction === 'down' && index === arrayLength - 1) ){
			return null;
		}

		newArray.splice(index, 1);
		newArray.splice(newIndex, 0, value);

		this.setState({repoArray: newArray});
	}

	addItemButton = props => {
		return(<IconButton onClick={ this.addItem }
										icon="plus"
										label={ props.arrayLength > MAX ? __('Maximum 6 repos can be displayed', 'github-card') : 'Add another repo display'}/>)
	}

  render() {

		const { repoArray } = this.state,
					arrayLength = repoArray.length;


    return (<div id="github-card-repo-input">
			<h2>
				<span>{__('Custom Repositories','github-card')}</span>
				{ arrayLength > MAX ? <Disabled><this.addItemButton {...arrayLength} /></Disabled>
				: <this.addItemButton {...arrayLength} /> }
			</h2>

			<p><i>{ __( 'Add the link or the route to the repository. Max 6.', 'github-card' )}</i></p>

			{ repoArray.map((value, index) => <this.RepoInput index={index} />, this) }

			<Button onClick={ this.submitChanges }>Submit</Button>
		</div>)

  }
}

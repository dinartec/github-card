const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component, Fragment } = wp.element;
const { TextControl, Button, Spinner } = wp.components;

export default class GithubCardBlock extends Component {
	constructor() {
		super( ...arguments );
	};

	/**
	 *	Creates HTML with the info and picture of a Github user
	 *
	 * @param {*} Props {user, name, url, avatar}
	 * @returns
	 */
	GhUserInfo = ({user, name, url, avatar}) => {
		return (
			<Fragment>
				<a href={url}>
					<img src={avatar}/>
					<h2>{name}</h2>
					<h3>@{user}</h3>
				</a>
			</Fragment>
		);

	};

	/**
	 * Creates a list item with text and optional title
	 *
	 * @param {*} props text - optional:  url, title, iconId
	 * @returns React element
	 */
	GhListItem = props => {
		const { title = null, text} = props;
		return(
			<li>
					{ title && <strong>{ title } </strong>}
					{text}
			</li>
		)
	}

	/**
	 * Creates a snippet a list item with a link, an icon, and some text
	 *
	 * @memberof GithubCardBlock
	 */
	GhRepoIcon = props => {
		const {url, text, iconId} = props;
		return (<li>
			<a href={url}>
				{/* <Icon iconId={iconId} /> {text} */}
				<p>{iconId}-{text}</p>
			</a>
		</li>);
	}

	/**
	 *	Creates a single Repo card element
	 *
	 * @param {Object} props accepts the specific Repo object from the API and the elements class
	 * @returns
	 */
	GhRepoLink = props => {
		//Destructures the needed properties from the Repo object and the class to be set
		const {name, description, html_url:url, language, stargazers_count:stars, forks, repoClass } = props;

		return(
		<li className={repoClass}>
			<h3><a href={url}>{name}</a></h3>
			<p>
				{ description }
			</p>
			<ul>
				<this.GhListItem text={language}/>
				<this.GhListItem title={'Stars'} text={stars}/>
				<this.GhListItem title={'Forks'} text={forks}/>
			</ul>
		</li>
		)
	};


	/**
	 *  Creates the list of Repos to be displayed
	 *
	 * @param {Object} props accepts the array of Repos to display and the title of the segment ("Featured Repos by default")
	 * @returns React element
	 */
	GhReposLinks = props => {
		// Destructures variables to be used and creates the elements' class
		const { repoInfo = [], title } = props;
		let repoClass = 'repo-element';

		//If there are more than 3 elements, they will be rendered with half the width of the parent element.
		if( repoInfo.length > 3 ) {
			repoClass += ' half';
		}


		return (
			<div className = 'repo-list'>
				<h2>{ title }</h2>
				<ul>
					{ repoInfo.map( repo => <this.GhRepoLink { ...{ ...repo, repoClass } }/> ) }
				</ul>
			</div>
		)

	}

	/**
	 *
	 *
	 * @param {*} props
	 * @returns
	 */
	GhUserLinks = props => {
		const { followers, gists, repos, url, gists_url } = props;

		return(
			<ul className="gh-user-links">
				<this.GhListItem title="Followers" text={ followers } url={ `${url}?tab=followers` } />
				<this.GhListItem title="Gists" text={ gists } url={ gists_url } />
				<this.GhListItem title="Repos" text={ repos } url={ `${url}?tab=repositories` } />
			</ul>
		)
	}

	render(){

		const {userInfo:{ html_url:url, login:user, name, avatar_url:avatar, followers, public_gists:gists, public_repos:repos  }, repoInfo = [], showRepos = false } = this.props;
		const gists_url = `https://gist.github.com/${user}`;


		return(<Fragment>
			<this.GhUserInfo { ...{ user, name, url, avatar }} />
			{ showRepos && <this.GhReposLinks { ...{ title: "Featured Repos", repoInfo }} />}
			<this.GhUserLinks { ...{ followers, gists, repos, url, gists_url } } />
		</Fragment>)
	}
}

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
	 * @param {*} Props {user, name, profile_url, avatar}
	 * @returns
	 */
	GhUserInfo = ({user, name, profile_url, avatar}) => {
		return (
			<Fragment>
				<a href={profile_url}>
					<img src={avatar}/>
					<h2>{name}</h2>
					<h3>{user}</h3>
				</a>
			</Fragment>
		);

	};

	/**
	 * Creates a list item with text and optional title, html, and icon
	 *
	 * @param {*} props text - optional:  url, title, iconId
	 * @returns React element
	 */
	GhListItem = props => {
		const { url = null, title = null, text, iconId = null } = props;
		return(
			<li>
				<a href={ url }>
					{ iconId && <p>{iconId}</p>}
					{ title && <strong>{ title }</strong>}
					{text}
				</a>
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
		const {name, description, html_url:url, language, stargazers_count:stars, stargazers_url:stars_url, forks, forks_url, repoClass} = props;

		return(
		<li className={repoClass}>
			<h3><a href={url}>{name}</a></h3>
			<p>
				{ description }
			</p>
			<ul>
				<this.GhListItem iconId={language} text={language}/>
				<this.GhListItem iconId={'star'} url={stars_url} text={stars}/>
				<this.GhListItem iconId={'fork'} url={forks_url} text={forks}/>
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
		const { reposArray, title } = props;
		let repoClass = 'repo-element';

		//If there are more than 3 elements, they will be rendered with half the width of the parent element.
		if( reposArray.length > 3 ) {
			repoClass += ' half';
		}

		return (
			<div className = 'repo-list'>
				<h2>{ title }</h2>
				<ul>
					{ repoClass.map( repo => <this.GhRepoLink { ...{ ...repo, repoClass } }/> ) }
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
		const { followers, followers_url, gists, gists_url, repos, repos_url } = props;

		return(
			<ul className="gh-user-links">
				<this.GhListItem title="Followers" text={followers} url={followers_url} />
				<this.GhListItem title="Gists" text={gists} url={gists_url} />
				<this.GhListItem title="Repos" text={repos} url={repos_url} />
			</ul>
		)
	}

	render(){

		const {apiCall:{ html_url:profile_url, login:user, name, avatar_url:avatar, bio, followers, followers_url, public_gists:gists, gists_url, public_repos:repos, repos_url  }, reposArray =[] } = this.props;


		return(<Fragment>
			<this.GhUserInfo { ...{ user, name, profile_url, avatar }} />
			<this.GhReposLinks { ...{ title: "Featured Repos", reposArray }} />
			<this.GhUserLinks { ...{ followers, followers_url, gists, gists_url, repos, repos_url } } />
		</Fragment>)
	}
}

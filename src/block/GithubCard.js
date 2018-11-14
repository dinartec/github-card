const { __ } = wp.i18n; // Import __() from wp.i18n
const { Component, Fragment } = wp.element;
const { TextControl, Button, Spinner } = wp.components;

export default class GithubCard extends Component {
	constructor() {
		super( ...arguments );
	};

	GhName = ({user, name, profile_url, avatar}) => {
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

	GhUserLink = props => {
		const {elementName, elementCount, elementUrl} = props;
		return(
			<li>
				<a href={elementUrl}>
					<strong>{elementName}</strong>
					{elementCount}
				</a>
			</li>
		)
	}

	GhRepoIcon = props => {
		const {url, text, iconId} = props;
		return (<li>
			<a href={url}>
				{/* <Icon iconId={iconId} /> {text} */}
				<p>{iconId}-{text}</p>
			</a>
		</li>);
	}

	GhRepoLink = props => {
		const {name, description, html_url:url, language, stargazers_count:stars, stargazers_url:stars_url, forks, forks_url, repoClass} = props;

		return(
		<li className={repoClass}>
			<h3><a href={url}>{name}</a></h3>
			<p>
				{description}
			</p>
			<ul>
				<GhRepoIcon iconId={language} url={null} text={language}/>
				<GhRepoIcon iconId={'star'} url={stars_url} text={stars}/>
				<GhRepoIcon iconId={'fork'} url={forks_url} text={forks}/>
			</ul>
		</li>
		)
	};


	GhReposLinks = props => {
		const { reposArray, title } = props;
		let repoClass = 'repo-element';
		if( reposArray.length > 3 ) {
			repoClass += '-half';
		}

		return (
			<div className = 'repo-list'>
				<h2>{title}</h2>
				<ul>
					{repoClass.map( repo => <GhRepoLink {...{...repo, repoClass}}/>)}
				</ul>
			</div>
		)

	}

	GhUserLinks = ({followers, followersUrl, gists, gistsUrl, repos, reposUrl}) => {
		return(
			<ul className="gh-user-links">
				<GhUserLink elementName="Followers" elementCount={followers} elementUrl={followersUrl} />
				<GhUserLink elementName="Gists" elementCount={gists} elementUrl={gistsUrl} />
				<GhUserLink elementName="Repos" elementCount={repos} elementUrl={reposUrl} />
			</ul>
		)
	}

	render(){
		const { html_url:profile_url, login:user, name, bio, followers, followers_url, public_gists:gists, gists_url, public_repos:repos, repos_url  } = this.props;


		return(<Fragment>
			<div></div>
		</Fragment>)
	}
}

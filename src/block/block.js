/**
 * BLOCK: github-card
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';
import Edit from './Components/Edit';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-github-card', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Github Card', 'github-card' ), // Block title.
	description: __('Embed a card with information about Github users and repositories ', 'github-card'),
	icon: 'admin-post', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'embed', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Github Gh Card','github-card' ),
		__( 'Profile embed','github-card' ),
		__( 'Repo Repositories','github-card' ),
	],
	attributes: {
		username: {
			type: 'string',
			source: 'attribute',
			attribute: 'value',
			default: '',
		},
		repoArray: {
			type: 'array',
			default: []
		},
		userInfo: {
			type: 'object',
			default: {}
		},
		showRepos: {
			type: 'boolean',
			default: false
		},
		pinnedRepos: {
			type: 'boolean',
			default: true,
		}
	},
	styles: [
		{ name: 'default', label: __( 'Short Line' ), isDefault: true },
		{ name: 'wide', label: __( 'Wide Line' ) },
		{ name: 'dots', label: __( 'Dots' ) },
	],

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: ( props ) => {
		const { className, setAttributes } = props,
					update = {
						username: username => setAttributes({username}),
						userInfo: userInfo => setAttributes({userInfo}),
						repoArray: repoArray => setAttributes({repoArray}),
						showRepos: showRepos => setAttributes({showRepos}),
						pinnedRepos: pinnedRepos => setAttributes({pinnedRepos})
					};

		return(<div className = { className }>
				<Edit { ...{ ...props, update, className } }/>
			</div>);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
		return (
			<div>
				<p>— Hello from the frontend.</p>
				<p>
					CGB BLOCK: <code>github-prof-card</code> is a new Gutenberg block.
				</p>
				<p>
					It was created via{ ' ' }
					<code>
						<a href="https://github.com/ahmadawais/create-guten-block">
							create-guten-block
						</a>
					</code>.
				</p>
			</div>
		);
	},
} );

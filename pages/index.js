/* Libraries */
// Universal fetch API
import fetch from 'isomorphic-unfetch'

/* Next Components */
import Link from 'next/link'


/* Custom Components */
import Layout from '../components/GlobalLayout'
import Repo from '../components/Repo'
import { colors, gradient } from '../components/styles'
import {
	Flex,
	Box
} from 'rebass'


// Github username and repo
import { username, featured } from '../components/github'

// Capitalizes and converts hyphens to spaces; 'init-next' -> 'Init Next'
const prettyName = str => {
	return str.replace(/(-|^)([^-]?)/g, (_, prep, letter) => {
		return (prep && ' ') + letter.toUpperCase()
	})
}

// Renders the main app page
const Index = props => {
	const title = prettyName(props.repo)
	const { project, repos, repo } = props

	return (
		<Layout
			text={title}
			repo={repo}
			repos={repos}
			title={title}
			username={username}
			error={!project}>
			<Flex direction="column">
				<Box>
					<Repo repo={project} title={title} username={username} />
				</Box>
				<Box width={[3 /4]}>
					{repos &&
						repos.map && (
							<ul>
								{repos.map(r => {
									let c = r.name == repo ? 'active' : ''
									return (
										<li key={r.id}>
											<Link as={`/repo/${r.name}`} href={`/index?repo=${r.name}`}>
												<a className={c}>{r.name}</a>
											</Link>

										</li>
									)
								})}
								<style jsx>{`

									ul {
										box-sizing: border-box;
										width: 75%;
										max-height: 200px;
										margin-bottom: 50px;
										position: relative;
										overflow-y: auto;
										overflow-x: hidden;

										background:
											/* Shadow covers */
											linear-gradient(white 30%, rgba(255,255,255,0)),
											linear-gradient(rgba(255,255,255,0), white 70%) 0 100%,

											/* Shadows */
											radial-gradient(50% 0, farthest-side, rgba(0,0,0,.2), rgba(0,0,0,0)),
											radial-gradient(50% 100%,farthest-side, rgba(0,0,0,.2), rgba(0,0,0,0)) 0 100%;
										background:
											/* Shadow covers */
											linear-gradient(white 30%, rgba(255,255,255,0)),
											linear-gradient(rgba(255,255,255,0), white 70%) 0 100%,

											/* Shadows */
											radial-gradient(farthest-side at 50% 0, rgba(0,0,0,.2), rgba(0,0,0,0)),
											radial-gradient(farthest-side at 50% 100%, rgba(0,0,0,.2), rgba(0,0,0,0)) 0 100%;
											background-repeat: no-repeat;
											background-color: white;
											background-size: 100% 40px, 100% 40px, 100% 14px, 100% 14px;

											/* Opera doesn't support this in the shorthand */
											background-attachment: local, local, scroll, scroll;
									}
									ul::before {
										position: absolute;
										bottom: 0;
										left: 0;
										right: 0;
										background-image: linear-gradient(0deg,#000000 100%,rgba(0,0,0,.5));
										-webkit-background-clip: text;
										-webkit-text-fill-color: transparent;
										display: block;
									}
									li {
										display: block;
										padding: 4px 16px;
									}
									a {
										padding: 4px 16px;
									}
									a:hover {
										color: ${colors.magenta};
									}
								`}</style>
							</ul>
						)}
				</Box>
			</Flex>
		</Layout>
	)
}

Index.getInitialProps = async function(context) {
	// Get the users repos (max: 30)
	let repos = await fetch(`https://api.github.com/users/${username}/repos`)
	  .then(res => res.json())

	// Get a random repo if none set
	let rand = Math.floor(Math.random() * repos.length)
	let repo = context.query.repo || featured || repos[rand].name
	let project =
		repos.filter &&
		repos.filter(function(obj) {
			return obj.name == repo
		})[0]

	return { project, repo, repos }
}

export default Index

/* Libraries */
// Universal fetch API
import fetch from 'isomorphic-unfetch'

/* Next Components */
import Link from 'next/link'


/* Custom Components */
import Layout from '../components/GlobalLayout'
import Repo from '../components/Repo'
import { colors, gradient } from '../components/styles'


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
			<div>
				<Repo repo={project} title={title} username={username} />
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
										<style jsx>{`
											li {
												display: inline-block;
											}
											a {
												padding: 4px 16px;
											}
											`}</style>
									</li>
								)
							})}
						</ul>
					)}
			</div>
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

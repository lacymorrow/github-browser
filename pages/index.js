/* Libraries */
// Universal fetch API
import fetch from 'isomorphic-unfetch'

/* Next Components */
import Link from 'next/link'

/* Custom Components */
import Layout from '../components/GlobalLayout'
import Repo from '../components/Repo'

// Github username
import username from '../components/github'
// Github repo to try
const featured = 'init-next'

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
	let repos = await fetch(`https://api.github.com/users/${username}/repos`, {
		json: true,
		headers: {
			accept: 'application/vnd.github.v3+json',
			username: username,
			'User-Agent': username
		}
	}).then(res => res.json())

	// Get a random repo if none set
	let rand = Math.floor(Math.random() * repos.length)
	let repo = context.query.repo || featured || repos[rand].name
	let project =
		repos.filter &&
		repos.filter(function(obj) {
			return obj.name == repo
		})[0]

	// // Get a single repo to feature
	// let packageJson = await fetch(
	// 	`https://raw.githubusercontent.com/${username}/${repo}/master/package.json`
	// ).then(
	// 	res =>
	// 		res.json().then(res, err => {
	// 			console.log(err)
	// 			return ''
	// 		}),
	// 	err => console.log(err)
	// )
	let packageJson = ''

	return { packageJson, project, repo, repos }
}

export default Index

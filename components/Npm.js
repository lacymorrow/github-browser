import { Pre } from 'rebass'
import ru from 'registry-url'
const registryUrl = ru()

class Npm extends React.Component {
	constructor () {
	  super()
	}

	async getInitialProps ( { repo } ) {
		let repos = await fetch(registryUrl + repo.name.toLowerCase())
		  .then(res => res.json())
		// Get a single repo to feature
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
		let packageJson = 'asdasd'
		console.log(packageJson)
		return { packageJson, repos, repo }
	}

	render (props) {
		return (
			<Pre>{this.props.packageJson} npm i -g {props.children}</Pre>
		)
	}
}

export default Npm

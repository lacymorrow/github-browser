import { Pre } from 'rebass'
import ru from 'registry-url'
const registryUrl = ru()

class Npm extends React.Component {
	constructor () {
	  super()
	  this.state = { npm: false }
	}

	componentDidMount () {
		// get a public package 
		npi('album-art', function(err, pkg) {
		  console.log(err, pkg);
		})

	  // fetch(`https://registry.npmjs.org/?callback=callback`, {  headers: { 'Access-Control-Allow-Origin':'*' }, method: "GET", mode: 'no-cors' })
	  //   .then((res,err) => {this.setState({ npm: res.ok });console.log('as',res, err)})
	  //   .catch(res => this.setState({ npm: false }))

		// const res = jsonp('https://registry.npmjs.org/album-art?callback=callback', function (err, data) {
		// 	// this.setState({ npm: res })
		// 	console.log('asd', err, data)
		// })
	}	

	render (props) {
		return (
			<div>{ this.state.npm && (<Pre>npm i -g {this.props.children}</Pre>) }</div>
		)
	}
}

export default Npm

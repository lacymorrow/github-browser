import { Pre } from 'rebass'

const Npm = props => {
	return (
		<Pre>npm i -g {props.children}</Pre>
	)
}

export default Npm

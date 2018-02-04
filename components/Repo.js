import {
	Flex,
	Box,
	Absolute,
	Relative,
	Badge,
	Divider,
	Heading,
	NavLink,
	Text,
	Pre,
	Star
} from 'rebass'
import Link from 'next/link'

import Npm from './Npm'
import { colors } from './styles'

const sx = {
	divider: {
		backgroundImage: 'linear-gradient(90deg, #0ff, #f0f)',
		height: 3,
		border: 0,
		margin: 0,
		transform: 'scaleX(0)',
		transformOrigin: '0 0',
		animationName: 'grow',
		animationDelay: '2s',
		animationDuration: '1.5s',
		animationTimingFunction: 'ease-out',
		animationFillMode: 'forwards'
	}
}

const Repo = props => {
	const url =
		props.repo && props.repo.name
			? `https://github.com/${props.username}/${props.repo.name}`
			: `https://github.com/${props.username}/`
	return (
		<Flex wrap>
			<Box p={4} width={[1, 1 / 2]}>
				<Heading f={[4, 5]} mt={[4, 4, 6]}>
					<Relative>
						<Absolute right>
							<Badge bg="gray">
								{props.repo &&
									props.repo.license &&
									props.repo.license.key.toUpperCase()}
							</Badge>
						</Absolute>
					</Relative>
					{props.title}
				</Heading>
				<Divider style={sx.divider} />
				<Text bold f={[1, 2]} my={4} width={[1, 3 / 5]}>
					{(props.repo && props.repo.description) ||
						'A Juiced boilerplate for Next.JS'}
				</Text>
				{props.repo && (
					<div>
						<Relative>
							<Absolute right>
								<Flex>
									<Text f={24} color={colors.lightGray} children={props.repo.stargazers_count} />
									<Star f={24} />
								</Flex>
							</Absolute>
						</Relative>
						<Flex align="center">
							<NavLink f={12} className="button" href={url}>
								GitHub
							</NavLink>
							<Box mx={2} />
							<Npm>{props.repo.name}</Npm>
						</Flex>
					</div>
				)}
			</Box>
		</Flex>
	)
}

Repo.getInitialProps = async function ( { repo } ) {
	// console.log('asd', await npmName('movie-info'))
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
	let packageJson = repo
	return { packageJson }
}

export default Repo

import Link from 'next/link'

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
		animationDuration: '1.5s',
		animationTimingFunction: 'ease',
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
							{props.repo && (
								<Badge bg="gray">
									{props.repo.license && props.repo.license.key.toUpperCase()}
								</Badge>
							)}
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

export default Repo

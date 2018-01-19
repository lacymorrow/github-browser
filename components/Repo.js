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

const sx = {
	divider: {
		backgroundImage: 'linear-gradient(90deg, #0ff, #f0f)',
		height: 3,
		border: 0,
		margin: 0,
		transform: 'scaleX(0)',
		transformOrigin: '0 0',
		animationName: 'grow',
		animationDelay: '1s',
		animationDuration: '1s',
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
									<Star
										f={24}
										children={props.repo.stargazers_count}
									/>
									<Star f={24} />
								</Flex>
							</Absolute>
						</Relative>
						<Flex align="center">
							<NavLink f={12} className="button" href={url}>
								GitHub
							</NavLink>
							<Box mx={2} />
							<Pre>npm install {props.repo.name}</Pre>
						</Flex>
					</div>
				)}
			</Box>
		</Flex>
	)
}
export default Repo

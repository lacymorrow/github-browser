import { Flex, Box, NavLink } from 'rebass'

const Footer = () => (
	<Flex align="center">
		<NavLink f={12} href="http://lacymorrow.com">
			Made by Lacy Morrow
		</NavLink>
		<Box mx="auto" />
		{/*
			<Btn href='https://travis-ci.org/lacymorrow/rebass'>
				<img
					src='https://img.shields.io/travis/jxnblk/rebass/master.svg'
					style={{
						display: 'block',
						margin: 0
					}}
				/>
			</Btn>
		*/}
	</Flex>
)

export default Footer

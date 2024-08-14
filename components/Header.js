import Link from 'next/link'
import Router from 'next/router'

import { Box, Flex, Select } from 'rebass'

import { colors } from './styles'

const sx = {
	nav: {
		padding: '0px',
		color: colors.magenta,
		backgroundColor: '#000',
		WebkitFontSmoothing: 'antialiased'
	},
	select: {
		height: '46px',
		fontWeight: 700,
		boxShadow: 'none'
	}
}

const Header = (props) => {
	let { error, username, text, repo, repos } = props
	return (
		<div>
			<Flex wrap align="center" style={sx.nav} p={2}>
				<Link prefetch href="/">
					<a>{text || 'Home'}</a>
				</Link>
				{!error && <Link
					prefetch
					href={`https://github.com/${username || ''}/${repo ||
						''}`}>
					<a>GitHub</a>
				</Link>}
				<Box ml="auto" />
				<Box ml={2} />
				<Box w={[1 / 4]}>
					{repos &&
						repos.map && (
							<Select
								value={repo}
								f={12}
								style={sx.select}
								className="select"
								onChange={e => {
									Router.push(`/repo/${e.target.value}`)
								}}>
								{repos.map(r => {
									let c = r.name == repo ? 'active' : ''
									return (
										<option key={r.name} value={`${r.name}`} className={c}>
											{r.name.toUpperCase()}
										</option>
									)
								})}
							</Select>
						)}
				</Box>
			</Flex>
		</div>
	)
}

export default Header

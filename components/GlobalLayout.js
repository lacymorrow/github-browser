import Head from 'next/head'
import { Provider } from 'rebass'
import Footer from './Footer'
import Header from './Header'
import Script from './Script'


import { colors, gradient } from './styles'

const sx = {
	layout: {
		color: '#222'
	}
}

const Layout = (props) => {
	let { title, ...other } = props
	return (
		<Provider
			theme={{
				// font: '"Avenir Next", Helvetica, sans-serif',
				fontSizes: [12, 16, 24, 36, 48, 72]
			}}>
			<div style={sx.layout}>
				<Head>
					<title>{props.title || 'Init'}</title>

					<Script>
						{() => {
							// any arbitrary js
							console.log(`init loaded`)
						}}
					</Script>
				</Head>
				<Header {...other} />

				{props.children}

				<Footer />
			</div>

			{/* global app styles */}
			<style global jsx>{`
				body {
					background: white;
					margin: 0;
				}
				a {
					padding: 16px;
					text-decoration: none;
					color: inherit;
					letter-spacing: 2.4px;
					text-transform: uppercase;
					font-size: 12px;
					font-weight: 700;
				}
				a.button {
					color: white;
					background-color: ${colors.cyan};
					background-image: ${gradient(120, 'magenta', 'violet')};
					border-radius: 6px;
					appearance: none;
					transition-property: transform, color;
					transition-timing-function: ease-out;
					transition-duration: 0.05s;
				}
				a.button:hover {
					color: #000;
					background-image: ${gradient(120, 'lime', 'cyan')};
					transform: scale(${17 / 16});
				}
				a.button:focus {
					outline: none;
					transform: scale(${17 / 16});
					box-shadow: 0 0 0 2px #fff, 0 0 0 4px ${colors.cyan};
				}
				a.button:active {
					transform: scale(${15 / 16});
				}

				@keyframes grow {
					0% {
						transform: scaleX(0);
					}
					100% {
						transform: scaleX(1);
					}
				}

				.select svg {
					margin-top: 18px;
				}
			`}</style>
		</Provider>
	)
}

export default Layout

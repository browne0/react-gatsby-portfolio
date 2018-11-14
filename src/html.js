/* eslint-disable */
import React from 'react';
import appleicon from './images/favicons/apple-touch-icon.png';
import favicon1 from './images/favicons/favicon-32x32.png';
import favicon2 from './images/favicons/favicon-16x16.png';

let stylesStr;
if (process.env.NODE_ENV === `production`) {
	try {
		stylesStr = require(`!raw-loader!../public/styles.css`);
	} catch (e) {
		console.log(e);
	}
}

module.exports = class HTML extends React.Component {
	render() {
		let css;
		if (process.env.NODE_ENV === `production`) {
			css = (
				<style
					id="gatsby-inlined-css"
					dangerouslySetInnerHTML={{ __html: stylesStr }}
				/>
			);
		}
		return (
			<html lang="en">
				<head>
					<meta charSet="utf-8" />
					<meta httpEquiv="x-ua-compatible" content="ie=edge" />
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1, shrink-to-fit=no"
					/>
					<link rel="apple-touch-icon" sizes="180x180" href={appleicon} />
					<link rel="icon" type="image/png" sizes="32x32" href={favicon1} />
					<link rel="icon" type="image/png" sizes="16x16" href={favicon2} />
					<link
						href="https://fonts.googleapis.com/icon?family=Material+Icons"
						rel="stylesheet"
						type="text/css"
						defer
					/>
					<link
						rel="stylesheet"
						href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
						defer
					/>
					<link
						rel="stylesheet"
						type="text/css"
						href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
						defer
					/>
					<link
						rel="stylesheet"
						type="text/css"
						href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
						defer
					/>
					<script src="https://cdn.polyfill.io/v2/polyfill.min.js " />
					{this.props.headComponents}
					{css}
				</head>
				<body>
					{this.props.preBodyComponents}
					<div
						key={`body`}
						id="___gatsby"
						dangerouslySetInnerHTML={{ __html: this.props.body }}
					/>
					{this.props.postBodyComponents}
				</body>
			</html>
		);
	}
};

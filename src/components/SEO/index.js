import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import config from '../../../data/SiteConfig';

class SEO extends Component {
	static propTypes = {
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired,
		article: PropTypes.bool,
	};

	static defaultProps = {
		type: 'website',
	};

	render() {
		const { props } = this;
		return (
			<Helmet>
				{/* General tags */}
				<title>{props.title}</title>
				<link rel="canonical" href={props.url} />
				<meta name="description" content={props.description} />
				<meta name="image" content={props.image} />

				{/* OpenGraph tags */}
				<meta property="og:url" content={props.url} />
				<meta property="og:type" content={props.type} />
				<meta property="og:title" content={props.title} />
				<meta property="og:description" content={props.description} />
				<meta property="og:image" content={props.image} />
				<meta
					property="og:site_name"
					content="Malik Browne | Front End Engineer and UX Enthusiast"
				/>

				{props.article && (
					<meta
						property="article:published_time"
						content={props.articlePublishTime}
					/>
				)}

				{props.article && (
					<meta
						property="article:modified_time"
						content={props.articleModifiedTime}
					/>
				)}

				{props.article && (
					<meta
						property="article:updated_time"
						content={props.articleModifiedTime}
					/>
				)}

				<meta name="google-site-verification" content="0ZQ1_A7uOwomESRDEoD2m3zDVbpvOC4MMloA9HECfWo" />

				{/* Twitter Card tags */}
				<meta name="twitter:card" content="summary" />
				<meta
					name="twitter:creator"
					content={config.userTwitter ? config.userTwitter : ''}
				/>
				<meta name="twitter:site" content="@milkstarz" />
				<meta name="twitter:title" content={props.title} />
				<meta name="twitter:description" content={props.description} />
				<meta name="twitter:image" content={props.image} />
			</Helmet>
		);
	}
}

export default SEO;

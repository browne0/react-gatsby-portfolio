import React from 'react';
import Helmet from 'react-helmet';

const config = {
	userTwitter: '@milkstarz',
	siteTitle: 'Malik Browne | Front End Engineer',
	siteDescription:
		'Malik is a Front End Engineer & UX Enthusiast with a strong desire to produce high quality websites and online tools, bundled with an exceptional user experience.',
	pathPrefix: '/',
	siteGATrackingID: 'UA-106199608-1',
	siteUrl: 'https://www.malikbrowne.com/',
};

type Props = {
	title: string;
	description: string;
	image: string;
	url: string;
	article?: boolean;
	type?: string;
	articlePublishTime?: string;
	articleModifiedTime?: string;
};

export const SEO = (props: Props) => {
	const {
		type = 'website',
		title,
		url,
		description,
		image,
		article,
		articlePublishTime,
		articleModifiedTime,
	} = props;
	return (
		<Helmet>
			{/* General tags */}
			<title>{title}</title>
			<link rel="canonical" href={url} />
			<meta name="description" content={description} />
			<meta name="image" content={image} />

			{/* OpenGraph tags */}
			<meta property="og:url" content={url} />
			<meta property="og:type" content={type} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={image} />
			<meta
				property="og:site_name"
				content="Malik Browne | Front End Engineer and UX Enthusiast"
			/>

			{article && (
				<meta property="article:published_time" content={articlePublishTime} />
			)}

			{article && (
				<meta property="article:modified_time" content={articleModifiedTime} />
			)}

			{article && (
				<meta property="article:updated_time" content={articleModifiedTime} />
			)}

			<meta
				name="google-site-verification"
				content="0ZQ1_A7uOwomESRDEoD2m3zDVbpvOC4MMloA9HECfWo"
			/>

			{/* Twitter Card tags */}
			<meta name="twitter:card" content="summary" />
			<meta
				name="twitter:creator"
				content={config.userTwitter ? config.userTwitter : ''}
			/>
			<meta name="twitter:site" content="@milkstarz" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={image} />
		</Helmet>
	);
};

export default SEO;

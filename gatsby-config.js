const config = require('./data/SiteConfig');

module.exports = {
	siteMetadata: {
		siteUrl: config.siteUrl,
		rssMetadata: {
			site_url: config.siteUrl,
			title: config.siteTitle,
			description: config.siteDescription,
			image_url: `${config.siteUrl}logos/malikbrowne_logo.png`,
			author: 'Malik Browne',
			copyright: 'Copyright © 2018. Malik Browne',
		},
	},
	plugins: [
		{
			resolve: `gatsby-source-contentful`,
			options: {
				spaceId: `vr1jne1k56yv`,
				accessToken: `e54141f9d445d4c967173c8ae71f27ee05777a67ee45eef8be8b44ca487831dc`,
			},
		},
		`gatsby-plugin-react-helmet`,
		`gatsby-plugin-sass`,
		{
			resolve: `gatsby-plugin-google-fonts`,
			options: {
				fonts: [`average`, `source sans pro`, `merriweather`, `lato`],
			},
		},
		{
			resolve: 'gatsby-plugin-google-analytics',
			options: {
				trackingId: config.siteGATrackingID,
			},
		},
		'gatsby-plugin-sitemap',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: config.siteTitle,
				short_name: config.siteTitle,
				description: config.siteDescription,
				start_url: config.pathPrefix,
				background_color: '#ffffff',
				theme_color: '#000000',
				display: 'standalone',
				icons: [
					{
						src: '/logos/malikbrowne_logo.png',
						sizes: '192x192',
						type: 'image/png',
					},
				],
			},
		},
		// {
		// 	resolve: `gatsby-plugin-feed`,
		// 	options: {
		// 		query: `
		// 			{
		// 				site {
		// 					siteMetadata {
		// 						rssMetadata: {
		// 							site_url
		// 							title
		// 							description
		// 							author
		// 						},
		// 					}
		// 				}
		// 				allContentfulPost(sort: { fields: [date], order: DESC }) {
		// 					edges {
		// 						node {
		// 							title {
		// 								title
		// 							}
		// 							slug
		// 							author {
		// 								name
		// 								twitter
		// 								profilePhoto {
		// 									file {
		// 										url
		// 									}
		// 								}
		// 							}
		// 							description {
		// 								description
		// 							}
		// 							body {
		// 								body
		// 							}
		// 							date
		// 						}
		// 					}
		// 				}
		// 			}
		// 		`,
		// 		output: "/rss.xml"
		// 	}
		// },
		{
			resolve: `gatsby-plugin-nprogress`,
			options: {
				// Setting a color is optional.
				color: `#c24d01`,
				// Disable the loading spinner.
				showSpinner: false,
			},
		},
		{
			resolve: `gatsby-plugin-netlify`,
			options: {
				headers: {
					'/': [
						'Link: </static/spotter.jpg>; rel=preload; as=image',
						'Link: </static/mychef.jpg>; rel=preload; as=image',
					],
					'/about': ['Link: </static/about_bg3.jpg>; rel=preload; as=image'],
				}, // option to add more headers. `Link` headers are transformed by the below criteria
				allPageHeaders: ['Cache-Control: public, max-age=0, must-revalidate'], // option to add headers for all pages. `Link` headers are transformed by the below criteria
			},
		},
	],
};

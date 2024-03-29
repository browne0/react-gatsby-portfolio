/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import { Link, graphql } from 'gatsby';

import Moment from 'react-moment';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'pris... Remove this comment to see the full error message
import Prism from 'prismjs';
import Markdown from 'react-markdown';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import withSizes from 'react-sizes';

import PropTypes from 'prop-types';
import DisqusThread from '../components/DisqusThread';
import PortfolioDelegate from '../utils/PortfolioDelegate';
import {SEO} from '../components/SEO';
import getBlogLengthString from '../utils/getBlogLengthString';
import { withLayout } from '../components/layout';
import BlogHighlights from '../components/blog/BlogHighlights';

const disclosureMessages = [
	'Just a friendly neighborhood disclosure,',
	'Disclosure Time!',
	'Just a heads up,',
	'Just so you know...',
	'Disclosure & Other Legal Mumbo-jumbo.',
];

const rand = Math.floor(Math.random() * disclosureMessages.length);

const AffiliateDisclosureBanner = () => (
	<div className="affiliate-disclosure">
		<div className="banner">
			<div className="banner--head">
				<h2>{disclosureMessages[rand]}</h2>
			</div>
			<div className="banner--body">
				<p>
					This post contains <span className="highlight">affiliate links.</span>{' '}
				</p>
				<p className="banner--spacing">
					This means that if you decide to check out or buy something I
					recommend in this article, I may receive compensation, some dope swag,
					or some <i>sweet</i> brownie points.
				</p>
				<p className="banner--spacing">
					Please know your trust means{' '}
					<span className="highlight">everything to me</span>, and I would never
					recommend anything I haven't tried and liked myself.
				</p>
				<p className="banner--spacing">Enjoy the post.</p>
			</div>
		</div>
	</div>
);

// @ts-expect-error TS(7006): Parameter 'date' implicitly has an 'any' type.
const generateDate = (date) => {
	const yearToday = new Date().getFullYear();
	if (yearToday - Number(date.substr(0, 4)) > 0) {
		return (
// @ts-expect-error TS(2786): 'Moment' cannot be used as a JSX component.
			<Moment parse="YYYY-MM-DD" format="MMM YYYY">
				{date}
			</Moment>
		);
	}
	return (
// @ts-expect-error TS(2786): 'Moment' cannot be used as a JSX component.
		<Moment parse="YYYY-MM-DD" format="MMM D">
			{date}
		</Moment>
	);
};
class blogPost extends Component {
	static propTypes = {
		data: PropTypes.object,
	};

// @ts-expect-error TS(7006): Parameter 'props' implicitly has an 'any' type.
	constructor(props) {
		super(props);

		const delegate = new PortfolioDelegate();

		this.state = {
// @ts-expect-error TS(2339): Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
			blog: this.props.data.blog,
			nextBlog: delegate.getNextBlog(
// @ts-expect-error TS(2339): Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
				this.props.data.blogs.edges,
// @ts-expect-error TS(2339): Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
				this.props.data.blog.title.title
			),
			mostPopularBlogs: delegate.getMostPopularBlogs(
// @ts-expect-error TS(2339): Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
				this.props.data.blogs.edges
			),
			prevBlog: delegate.getPreviousBlog(
// @ts-expect-error TS(2339): Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
				this.props.data.blogs.edges,
// @ts-expect-error TS(2339): Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
				this.props.data.blog.title.title
			),
		};
	}

	componentDidMount() {
		Prism.highlightAll();
	}

	render() {
// @ts-expect-error TS(2339): Property 'blog' does not exist on type 'Readonly<{... Remove this comment to see the full error message
		const { blog, nextBlog, prevBlog } = this.state;
		const { isFeaturedImageVideo } = blog;

		const date = generateDate(blog.date);
		const twitterURI = encodeURI(
			`"${blog.title.title}" by @${blog.author.twitter} \nhttps://malikbrowne.com/blog/${blog.slug}/`
		);

		const prevButton = (
			<div className="article">
				<h2>
					<Link to={`/blog/${prevBlog.slug}`}>{prevBlog.title.title}</Link>
				</h2>
				<p>{prevBlog.description.description}</p>
				<p>
					<span>
						By{' '}
						<a
							href={prevBlog.author.twitter}
							target="_blank"
							rel="noopener noreferrer"
						>
							{prevBlog.author.name}
						</a>{' '}
						&middot; {generateDate(prevBlog.date)}
					</span>
				</p>
			</div>
		);
		const nextButton = (
			<div className="article">
				<h2>
					<Link to={`/blog/${nextBlog.slug}`}>{nextBlog.title.title}</Link>
				</h2>
				<p>{nextBlog.description.description}</p>
				<p>
					<span>
						By{' '}
						<a
							href={nextBlog.author.twitter}
							target="_blank"
							rel="noopener noreferrer"
						>
							{nextBlog.author.name}
						</a>{' '}
						&middot; {generateDate(nextBlog.date)}
					</span>
				</p>
			</div>
		);
		return (
			<div className="blog-post">
				<SEO
					title={`${blog.title.title} | Malik Browne`}
					description={blog.description.description}
					image={`https:${blog.featuredImage.file.url}`}
					url={`https://www.malikbrowne.com/${blog.slug}`}
					type="article"
					article
					articlePublishTime={new Date(blog.date).toISOString()}
					articleModifiedTime={blog.updatedAt}
				/>
				<div className="back-to-blog">
					<Link to="/blog">
						<i className="material-icons">arrow_back</i>
						<span>Back to blog</span>
					</Link>
					<p>{blog.title.title}</p>
				</div>
				<div className="container">
					<article className="wrapper" id="blog-article">
						<div className="post-header">
							<div className="post-header__left">
								<div className="post-title">
									<h1>{blog.title.title}</h1>
								</div>
								<div className="post-author">
									<div className="post-info-wrapper">
										<img
											src={blog.author.profilePhoto.file.url}
											alt={blog.author.name}
											className="avatar"
										/>
										<div className="avatar-info">
											<p className="author-name">
												<a href={blog.author.twitter}>{blog.author.name}</a>
											</p>
											<p className="date">
												{date}
												<span>&middot;</span>
												{getBlogLengthString(blog.body.body)}
											</p>
										</div>
									</div>
								</div>
								<div className="share-links">
									<a
										className="link facebook"
										href={`https://www.facebook.com/sharer/sharer.php?u=https%3A//malikbrowne.com/blog/${blog.slug}/`}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="facebook"
									>
										<i className="icon ion-social-facebook" />
									</a>
									<a
										className="link twitter"
										href={`https://twitter.com/intent/tweet?text=${twitterURI}`}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="twitter"
									>
										<i className="icon ion-social-twitter" />
									</a>
									<a
										className="link linkedin"
										href={`https://www.linkedin.com/shareArticle?mini=true&url=https://malikbrowne.com/blog/${
											blog.slug
										}/&title=${encodeURI(blog.title.title)}&summary=${
											blog.description.description
										}`}
										target="_blank"
										rel="noopener noreferrer"
										aria-label="linkedin"
									>
										<i className="icon ion-social-linkedin" />
									</a>
								</div>
							</div>
							<div className="post-header__right">
								{isFeaturedImageVideo ? (
									<video
										loop
										poster={blog.compressedFeaturedImage.file.url}
										autoPlay
										muted
										playsInline
										className="post-header__featuredImage"
									>
										<source
											src={blog.featuredImage.file.url}
											type="video/webm"
										/>
									</video>
								) : (
									<img
										src={blog.featuredImage.file.url}
										alt={blog.title.title}
										className="post-header__featuredImage"
									/>
								)}
							</div>
						</div>

						{blog.containsAffiliateLinks && <AffiliateDisclosureBanner />}
						<div
							className={
								blog.containsAffiliateLinks
									? 'post-body post-body--with-margin'
									: 'post-body'
							}
						>
							<Markdown className="markdown-body" source={blog.body.body} />
							{!this.props.isTablet && (
								<div className="blog-post-sidebar">
									<BlogHighlights blogs={this.state.mostPopularBlogs}>
										<div className="author-card">
											<img
												src={blog.author.profilePhoto.file.url}
												alt={blog.author.name}
											/>
											<p>{blog.author.description}</p>
											<a
												className="link twitter"
												href={`https://twitter.com/${blog.author.twitter}`}
												target="_blank"
												rel="noopener noreferrer"
												aria-label="twitter"
												style={{
													height: '30px',
													width: 'calc(100% - 32px)',
													margin: '8px auto 0px auto',
												}}
											>
												<i className="icon ion-social-twitter" />
											</a>
										</div>
									</BlogHighlights>
								</div>
							)}
						</div>
						<div className="blog-guide">
							{nextButton}
							{prevButton}
						</div>
					</article>
					{blog.comments && (
						<DisqusThread
							basename="https://www.malikbrowne.com/blog"
							shortname="malik-browne"
							title={blog.title.title}
							identifier={`/${blog.slug}`}
							className="comments"
						/>
					)}
				</div>
			</div>
		);
	}
}

// @ts-expect-error TS(7031): Binding element 'width' implicitly has an 'any' ty... Remove this comment to see the full error message
const mapSizesToProps = ({ width }) => ({
	isTablet: width < 768,
});

export default withLayout(withSizes(mapSizesToProps)(blogPost));

export const pageQuery = graphql`
	query blogPostQuery($id: String!) {
		blog: contentfulPost(id: { eq: $id }) {
			title {
				title
			}
			slug
			author {
				name
				twitter
				profilePhoto {
					file {
						url
					}
				}
				description
			}
			description {
				description
			}
			body {
				body
			}
			featuredImage {
				file {
					url
				}
			}
			compressedFeaturedImage {
				file {
					url
				}
			}
			date
			comments
			containsAffiliateLinks
			updatedAt
			isFeaturedImageVideo
		}
		blogs: allContentfulPost {
			edges {
				node {
					title {
						title
					}
					slug
					author {
						name
						twitter
						profilePhoto {
							file {
								url
							}
						}
					}
					description {
						description
					}
					body {
						body
					}
					featuredImage {
						file {
							url
						}
					}
					compressedFeaturedImage {
						file {
							url
						}
					}
					date
					comments
					isFeaturedImageVideo
					popularPost
				}
			}
		}
	}
`;

import React, { Component } from 'react';
import Link from 'gatsby-link';
import Moment from 'react-moment';
import Prism from 'prismjs';
import Markdown from 'react-markdown';
import PropTypes from 'prop-types';
import DisqusThread from '../components/DisqusThread';
import PortfolioDelegate from '../utils/PortfolioDelegate';
import SEO from '../components/SEO';

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

const generateDate = date => {
	const yearToday = new Date().getFullYear();
	if (yearToday - Number(date.substr(0, 4)) > 0) {
		return (
			<Moment parse="YYYY-MM-DD" format="MMM YYYY">
				{date}
			</Moment>
		);
	}
	return (
		<Moment parse="YYYY-MM-DD" format="MMM D">
			{date}
		</Moment>
	);
};
class blogPost extends Component {
	static propTypes = {
		data: PropTypes.object,
	};
	constructor(props) {
		super(props);

		const delegate = new PortfolioDelegate();

		this.state = {
			blog: this.props.data.blog,
			nextBlog: delegate.getNextBlog(
				this.props.data.blogs.edges,
				this.props.data.blog.title.title
			),
			prevBlog: delegate.getPreviousBlog(
				this.props.data.blogs.edges,
				this.props.data.blog.title.title
			),
		};
	}

	componentDidMount() {
		Prism.highlightAll();
	}

	render() {
		const blogLength = this.state.blog.body.body
			.replace(/[^a-zA-Z0-9']+/g, ' ')
			.trim()
			.split(' ').length;

		const blogLengthString =
			blogLength / 275 < 1
				? `${((blogLength / 275) * 60).toFixed()} sec read`
				: `${(blogLength / 275).toFixed()} min read`;

		const date = generateDate(this.state.blog.date);
		const twitterURI = encodeURI(
			`"${
				this.state.blog.title.title
			}" by @milkstarz \nhttps://malikbrowne.com/blog/${this.state.blog.slug}/`
		);

		const prevButton = (
			<div className="article">
				<h2>
					<Link to={`/blog/${this.state.prevBlog.slug}`}>
						{this.state.prevBlog.title.title}
					</Link>
				</h2>
				<p>{this.state.prevBlog.description.description}</p>
				<p>
					By{' '}
					<a
						href={this.state.prevBlog.author.twitter}
						target="_blank"
						rel="noopener noreferrer"
					>
						{this.state.prevBlog.author.name}
					</a>{' '}
					&middot; {generateDate(this.state.prevBlog.date)}
				</p>
			</div>
		);
		const nextButton = (
			<div className="article">
				<h2>
					<Link to={`/blog/${this.state.nextBlog.slug}`}>
						{this.state.nextBlog.title.title}
					</Link>
				</h2>
				<p>{this.state.nextBlog.description.description}</p>
				<p>
					By{' '}
					<a
						href={this.state.nextBlog.author.twitter}
						target="_blank"
						rel="noopener noreferrer"
					>
						{this.state.nextBlog.author.name}
					</a>{' '}
					&middot; {generateDate(this.state.nextBlog.date)}
				</p>
			</div>
		);
		return (
			<div className="blog-post">
				<SEO
					title={`${this.state.blog.title.title} | Malik Browne`}
					description={this.state.blog.description.description}
					image={`https:${this.state.blog.featuredImage.file.url}`}
					url={`https://www.malikbrowne.com/${this.state.blog.slug}`}
					type="article"
					article
					articlePublishTime={new Date(this.state.blog.date).toISOString()}
					articleModifiedTime={this.state.blog.updatedAt}
				/>
				<div className="back-to-blog">
					<Link to="/blog">
						<i className="material-icons">arrow_back</i>
						<span>Back to blog</span>
					</Link>
					<p>{this.state.blog.title.title}</p>
				</div>
				<div className="container">
					<article className="wrapper" id="blog-article">
						<div className="post-header">
							<div className="post-header__left">
								<div className="post-title">
									<h1>{this.state.blog.title.title}</h1>
								</div>
								<div className="post-author">
									<div className="post-info-wrapper">
										<img
											src={this.state.blog.author.profilePhoto.file.url}
											alt={this.state.blog.author.name}
											className="avatar"
										/>
										<div className="avatar-info">
											<p className="author-name">
												<a href={this.state.blog.author.twitter}>
													{this.state.blog.author.name}
												</a>
											</p>
											<p className="date">
												{date}
												<span>&middot;</span>
												{blogLengthString}
											</p>
										</div>
									</div>
								</div>
								<div className="share-links">
									<a
										className="link facebook"
										href={`https://www.facebook.com/sharer/sharer.php?u=https%3A//malikbrowne.com/blog/${
											this.state.blog.slug
										}/`}
										target="_blank"
										rel="noopener noreferrer"
									>
										<i className="icon ion-social-facebook" />
									</a>
									<a
										className="link twitter"
										href={`https://twitter.com/home?status=${twitterURI}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										<i className="icon ion-social-twitter" />
									</a>
									<a
										className="link linkedin"
										href={`https://www.linkedin.com/shareArticle?mini=true&url=https://malikbrowne.com/blog/${
											this.state.blog.slug
										}/&title=${encodeURI(
											this.state.blog.title.title
										)}&summary=${this.state.blog.description.description}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										<i className="icon ion-social-linkedin" />
									</a>
								</div>
							</div>
							<div className="post-header__right">
								<img
									src={this.state.blog.featuredImage.file.url}
									alt={this.state.blog.title.title}
									className="post-header__featuredImage"
								/>
							</div>
						</div>

						{this.state.blog.containsAffiliateLinks && (
							<AffiliateDisclosureBanner />
						)}
						<Markdown
							className="markdown-body"
							source={this.state.blog.body.body}
						/>
						<div className="blog-guide">
							{nextButton}
							{prevButton}
						</div>
					</article>
					{this.state.blog.comments && (
						<DisqusThread
							basename="https://www.malikbrowne.com/blog"
							shortname="malik-browne"
							title={this.state.blog.title.title}
							identifier={`/${this.state.blog.slug}`}
							className="comments"
						/>
					)}
				</div>
			</div>
		);
	}
}

export default blogPost;

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
				}
			}
		}
	}
`;

import React, { useEffect } from 'react';
import { Link } from 'gatsby';

import Moment from 'react-moment';
import Prism from 'prismjs';
import Markdown from 'react-markdown';
import withSizes from 'react-sizes';

import DisqusThread from '../components/DisqusThread';
import PortfolioDelegate from '../utils/PortfolioDelegate';
import { SEO } from '../components/SEO';
import getBlogLengthString from '../utils/getBlogLengthString';
import { BlogHighlights, BlogPostType, BlogPostNode } from '../pages/blog';
import { graphql } from 'gatsby';
import { withLayout } from '../components/layout';

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

const generateDate = (date: string) => {
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

type BlogPostProps = {
	data: {
		blog: BlogPostType;
		blogs: { edges: BlogPostNode[] };
	};
	isTablet: boolean;
};

const BlogPost = (props: BlogPostProps) => {
	useEffect(() => {
		Prism.highlightAll();
	}, []);

	const { blog, blogs } = props.data;
	const delegate = new PortfolioDelegate();

	const nextBlog = delegate.getNextBlog(blogs.edges, blog.title.title);

	const mostPopularBlogs = delegate.getMostPopularBlogs(blogs.edges);

	const prevBlog = delegate.getPreviousBlog(blogs.edges, blog.title.title);

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
									<source src={blog.featuredImage.file.url} type="video/webm" />
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
						{props.isTablet && (
							<div className="blog-post-sidebar">
								<BlogHighlights blogs={mostPopularBlogs}>
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
};

const mapSizesToProps = ({ width }: { width: number }) => ({
	isTablet: width < 768,
});

// @ts-ignore
export default withLayout(withSizes(mapSizesToProps)(BlogPost));

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

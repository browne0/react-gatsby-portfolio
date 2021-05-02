import React from 'react';
import { Link } from 'gatsby';
import Moment from 'react-moment';
import ProgressiveImage from 'react-progressive-image';
import cx from 'classnames';
import getBlogLengthString from '../../utils/getBlogLengthString';

type ContentfulImage = {
	file: {
		url: string;
	};
};
type Props = {
	blog: {
		slug: string;
		isFeaturedImageVideo: boolean;
		title: {
			title: string;
		};
		compressedFeaturedImage: ContentfulImage;
		featuredImage: ContentfulImage;
		date: string;
		author: {
			twitter: string;
			profilePhoto: ContentfulImage;
			name: string;
		};
		body: {
			body: string;
		};
		description: {
			description: string;
		};
		containsAffiliateLinks: boolean;
	};
	main: boolean;
};
const BlogArticleItem = (props: Props) => {
	const { blog, main } = props;

	const blogHeader = blog.featuredImage ? (
		<Link
			to={`/blog/${blog.slug}`}
			className={cx('post-header', {
				'post-header-video-wrapper': blog.isFeaturedImageVideo,
			})}
			aria-label={blog.title.title}
		>
			{blog.isFeaturedImageVideo ? (
				<video
					loop
					autoPlay
					muted
					playsInline
					poster={blog.compressedFeaturedImage.file.url}
					className="post-header-video"
				>
					<source src={blog.featuredImage.file.url} type="video/webm" />
				</video>
			) : (
				<ProgressiveImage
					src={blog.featuredImage.file.url}
					placeholder={blog.compressedFeaturedImage.file.url}
				>
					{(src: string, loading: boolean) => {
						if (loading) {
							return (
								<div
									className="post-header-image"
									style={{
										backgroundImage: `url(${blog.compressedFeaturedImage.file.url})`,
									}}
								/>
							);
						}
						return (
							<div
								className="post-header-image"
								style={{
									backgroundImage: `url(${src})`,
								}}
							/>
						);
					}}
				</ProgressiveImage>
			)}
		</Link>
	) : null;

	const yearToday = new Date().getFullYear();
	let date;
	if (yearToday - Number(blog.date.substr(0, 4)) > 0) {
		date = (
			<Moment parse="YYYY-MM-DD" format="MMM YYYY">
				{blog.date}
			</Moment>
		);
	} else {
		date = (
			<Moment parse="YYYY-MM-DD" format="MMM D">
				{blog.date}
			</Moment>
		);
	}

	const twitterURI = encodeURI(
		`"${blog.title.title}" by @${blog.author.twitter} \nhttps://malikbrowne.com/blog/${blog.slug}/`
	);
	return (
		<div className={cx('post', { 'post--main': main })}>
			<div className="post-author">
				<div className="post-info-wrapper">
					<img
						src={blog.author.profilePhoto.file.url}
						alt=""
						className="avatar"
					/>

					<div className="author-info">
						<p className="author">
							<a href={blog.author.twitter}>{blog.author.name}</a>
						</p>
						<p className="date">
							{date}
							<span>&middot;</span>
							{getBlogLengthString(blog.body.body)}
						</p>
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
			{blogHeader}
			<Link
				to={`/blog/${blog.slug}`}
				className={cx('title', {
					'title-video': !main && blog.isFeaturedImageVideo,
				})}
			>
				<h2>{blog.title.title}</h2>
			</Link>
			<p className="summary">{blog.description.description}</p>
			<div className="bloglist--footer">
				<div className="read-more">
					<Link
						to={`/blog/${blog.slug}`}
						className="post-header"
						aria-label={blog.title.title}
					>
						Read more...
					</Link>
				</div>
				<div className="tags">
					{blog.containsAffiliateLinks && (
						<div className="tag">
							<b>Contains affiliate links</b>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default BlogArticleItem;

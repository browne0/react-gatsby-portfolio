import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Moment from 'react-moment';
import ProgressiveImage from 'react-progressive-image';
import cx from 'classnames';

class BlogArticleItem extends Component {
	static propTypes = {
		blog: PropTypes.object.isRequired,
		main: PropTypes.bool,
	};

	constructor(props) {
		super(props);
		this.state = {
			url: this.props.blog.compressedFeaturedImage.file.url,
		};
	}

	render() {
		const { blog, main } = this.props;

		const blogHeader = blog.featuredImage ? (
			<Link to={`/blog/${blog.slug}`} className="post-header">
				<ProgressiveImage
					src={this.props.blog.featuredImage.file.url}
					placeholder={this.state.url}
				>
					{(src, loading) => {
						if (loading) {
							return (
								<div
									className="post-header-image"
									style={{
										backgroundImage: `url(${this.state.url})`,
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
			</Link>
		) : null;
		const blogLength = blog.body.body
			.replace(/[^a-zA-Z0-9']+/g, ' ')
			.trim()
			.split(' ').length;
		const blogLengthString =
			blogLength / 275 < 1
				? `${((blogLength / 275) * 60).toFixed()} sec read`
				: `${(blogLength / 275).toFixed()} min read`;
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
			`"${blog.title.title}" by @milkstarz \nhttps://malikbrowne.com/blog/${
				blog.slug
			}/`
		);
		return (
			<div
				to={`/blog/${blog.slug}`}
				className={cx('post', { 'post--main': main })}
			>
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
								{blogLengthString}
							</p>
						</div>
					</div>
					<div className="share-links">
						<a
							className="link facebook"
							href={`https://www.facebook.com/sharer/sharer.php?u=https%3A//malikbrowne.com/blog/${
								blog.slug
							}/`}
							target="_blank"
							rel="noopener noreferrer"
							aria-label="facebook"
						>
							<i className="icon ion-social-facebook" />
						</a>
						<a
							className="link twitter"
							href={`https://twitter.com/home?status=${twitterURI}`}
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
				<Link to={`/blog/${blog.slug}`} className="title">
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
	}
}

export default BlogArticleItem;

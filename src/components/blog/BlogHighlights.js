import React from 'react';
import { Link } from 'gatsby';
import getBlogLengthString from '../../utils/getBlogLengthString';

const BlogHighlights = ({ blogs, children }) => (
	<div className="most-popular-posts">
		<h3>Most Popular</h3>
		{blogs.map(({ node }) => (
				<Link
					key={node.slug}
					to={`/blog/${node.slug}`}
					className="most-popular-post"
				>
					<h4>{node.title.title}</h4>
					<p>{getBlogLengthString(node.body.body)}</p>
				</Link>
			))}
		{children}
	</div>
);

export default BlogHighlights;
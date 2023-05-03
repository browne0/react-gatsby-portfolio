import React from 'react';
import { Link } from 'gatsby';
import getBlogLengthString from '../../utils/getBlogLengthString';

const BlogHighlights = ({ blogs, children }: any) => (
	<div className="most-popular-posts">
		<h3>Most Popular</h3>
		{blogs.map(({ node }) => (
			// @ts-expect-error TS(2786): 'Link' cannot be used as a JSX component.
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

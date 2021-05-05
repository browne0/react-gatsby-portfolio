import React, { useState } from 'react';
import TextField from 'material-ui/TextField';
import FlipMove from 'react-flip-move';
import debounce from 'lodash/debounce';
import withSizes from 'react-sizes';
import { Link } from 'gatsby';
import { SEO } from '../components/SEO';
import BlogArticle from '../components/BlogArticleItem';
import getBlogLengthString from '../utils/getBlogLengthString';
import PortfolioDelegate from '../utils/PortfolioDelegate';
import { graphql } from 'gatsby';
import { withLayout } from '../components/layout';
import styled from 'styled-components';

/**
 * IDEA FOR NEXT BLOG LIST PAGE:
 *
 * MAIN PHOTO REALLY BIG ON TOP WITH THE SAME 2x2 GRID BELOW
 *
 * Right hand side will have:
 * - Search
 * - Newsletter
 * - Editor's Picks
 * - Most Popular Articles
 *
 * On mobile the right hand column will not be there, and will stick
 * with the original design we have now.
 *
 * Probably gonna have to render new components based on width, but
 * that shouldn't be too bad.
 *
 * Check image here:
 * https://gyazo.com/befdd314ed22a908d0f48e46b1d87acb
 *
 * Idea came from here:
 * https://www.impactbnd.com/blog/blog-layout-best-practices-2016
 */

type ContentfulImage = {
	file: {
		url: string;
	};
};
export type BlogPostNode = {
	node: BlogPostType;
};

export type BlogPostType = {
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
		description: string;
	};
	body: {
		body: string;
	};
	description: {
		description: string;
	};
	containsAffiliateLinks: boolean;
	popularPost: boolean;
	updatedAt: string;
	comments: boolean;
};

export const BlogHighlights: React.ComponentType<{ blogs: BlogPostNode[] }> = ({
	blogs,
	children,
}) => (
	<div className="most-popular-posts">
		<h3>Most Popular</h3>
		{blogs.map(({ node }) => {
			return (
				<Link
					key={node.slug}
					to={`/blog/${node.slug}`}
					className="most-popular-post"
				>
					<h4>{node.title.title}</h4>
					<p>{getBlogLengthString(node.body.body)}</p>
				</Link>
			);
		})}
		{children}
	</div>
);

const StyledTextField = styled(TextField)`
	margin: 'auto';
	color: '#c24d01';
	border-color: '#c24d01';
`;

type BlogListProps = {
	data: {
		allContentfulPost: {
			edges: BlogPostNode[];
		};
	};
	isTablet: boolean;
};

const BlogList: React.FunctionComponent<BlogListProps> = (props) => {
	const allBlogs: BlogPostNode[] = props.data.allContentfulPost.edges.sort(
		(edge: BlogPostNode) => {
			const blog = edge.node;
			if (new Date(blog.date).getTime() < Date.now()) {
				return 1;
			}
			return 0;
		}
	);

	const delegate = new PortfolioDelegate();

	const [searchValue, setSearchValue] = useState('');
	const [filteredBlogs, setFilteredBlogs] = useState<BlogPostNode[]>(allBlogs);
	const [mostPopularBlogs] = useState<BlogPostNode[]>(
		delegate.getMostPopularBlogs(allBlogs)
	);

	const filterBlogs = debounce((search) => {
		const filteredBlogs = allBlogs.filter((blog) =>
			blog.node.title.title.toLowerCase().includes(search)
		);
		setFilteredBlogs(filteredBlogs);
	}, 200);

	const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.persist();

		if (searchValue !== e.target.value) {
			console.log('hi');
			setSearchValue(e.target.value);
		}
		const search = e.target.value.toLowerCase();
		filterBlogs(search);
	};

	const style = {
		blogFilter: {
			margin: 'auto',
			color: {
				color: '#c24d01',
			},
			bgcolor: {
				borderColor: '#c24d01',
			},
		},
	};

	const blogs = filteredBlogs.map((item, index) => {
		const blog = item.node;
		return <BlogArticle key={index} blog={blog} />;
	});

	const blogPosts = [];

	for (let i = searchValue ? 0 : 1; i < blogs.length; i += 2) {
		blogPosts.push(
			<div className="row" key={i}>
				{blogs[i]}
				{blogs[i + 1]}
			</div>
		);
	}
	return (
		<div className="blog-wrapper">
			<SEO
				title="Blog | Malik Browne"
				description="Check out the latest blog posts from front end developer, Malik Browne."
				image="/selfie/about_bg3.jpg"
				url="https://www.malikbrowne.com/blog"
			/>
			<div className="blog-posts">
				{props.isTablet && (
					<StyledTextField
						hintText="Enter a blog post title"
						floatingLabelText="Filter blog by title"
						className="blog-filter"
						floatingLabelFocusStyle={style.blogFilter.color}
						underlineFocusStyle={style.blogFilter.bgcolor}
						onChange={onFilterChange}
						value={searchValue}
					/>
				)}
				<FlipMove
					duration={400}
					enterAnimation="fade"
					leaveAnimation="fade"
					className="blog"
					maintainContainerHeight
				>
					{!searchValue && (
						<div className="row">
							<BlogArticle main blog={filteredBlogs[0].node} />
						</div>
					)}
					{blogPosts}
				</FlipMove>
			</div>
			<div className="more-info">
				<BlogHighlights blogs={mostPopularBlogs} />
				{!props.isTablet && (
					<StyledTextField
						hintText="Enter a blog post title"
						floatingLabelText="Filter blog by title"
						className="blog-filter"
						floatingLabelFocusStyle={style.blogFilter.color}
						underlineFocusStyle={style.blogFilter.bgcolor}
						onChange={onFilterChange}
						value={searchValue}
					/>
				)}
			</div>
		</div>
	);
};

const mapSizesToProps = ({ width }: { width: number }) => ({
	isTablet: width < 768,
});

// @ts-ignore TODO: Follow up and figure out type
export default withLayout(withSizes(mapSizesToProps)(BlogList));

export const pageQuery = graphql`
	query blogQuery {
		allContentfulPost(sort: { fields: [date], order: DESC }) {
			edges {
				node {
					title {
						title
					}
					containsAffiliateLinks
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

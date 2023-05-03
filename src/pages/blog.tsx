/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlipMove from 'react-flip-move';
import debounce from 'lodash/debounce';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import withSizes from 'react-sizes';
import { graphql } from 'gatsby';
import {SEO} from '../components/SEO';
import BlogArticle from '../components/BlogArticleItem';
import PortfolioDelegate from '../utils/PortfolioDelegate';
import { withLayout } from '../components/layout';
import BlogHighlights from '../components/blog/BlogHighlights';

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

class BlogList extends Component {
// @ts-expect-error TS(7006): Parameter 'props' implicitly has an 'any' type.
	constructor(props) {
		super(props);

// @ts-expect-error TS(7006): Parameter 'edge' implicitly has an 'any' type.
		const allBlogs = props.data.allContentfulPost.edges.sort((edge) => {
			const blog = edge.node;
// @ts-expect-error TS(2365): Operator '<' cannot be applied to types 'Date' and... Remove this comment to see the full error message
			return new Date(blog.date) < Date.now();
		});

		const delegate = new PortfolioDelegate();

		this.state = {
			allBlogs,
			mostPopularBlogs: delegate.getMostPopularBlogs(allBlogs),
			filteredBlogs: allBlogs,
			searchValue: '',
		};
	}

	filterBlogs = debounce((search) => {
// @ts-expect-error TS(2339): Property 'blogs' does not exist on type 'Readonly<... Remove this comment to see the full error message
		const { blogs } = this.state;
// @ts-expect-error TS(7006): Parameter 'blog' implicitly has an 'any' type.
		const filteredBlogs = blogs.filter((blog) =>
			blog.node.title.title.toLowerCase().includes(search)
		);
		this.setState(() => ({ filteredBlogs }));
	}, 200);

// @ts-expect-error TS(7006): Parameter 'e' implicitly has an 'any' type.
	onFilterChange = (e) => {
		e.persist();

// @ts-expect-error TS(2339): Property 'searchValue' does not exist on type 'Rea... Remove this comment to see the full error message
		if (this.state.searchValue !== e.target.value) {
			this.setState(() => ({
				searchValue: e.target.value,
			}));
		}
		const search = e.target.value.toLowerCase();
		this.filterBlogs(search);
	};

	render() {
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

// @ts-expect-error TS(2339): Property 'filteredBlogs' does not exist on type 'R... Remove this comment to see the full error message
		const blogs = this.state.filteredBlogs.map((item, index) => {
			const blog = item.node;
			return <BlogArticle key={index} blog={blog} />;
		});

		const blogPosts = [];

// @ts-expect-error TS(2339): Property 'searchValue' does not exist on type 'Rea... Remove this comment to see the full error message
		for (let i = this.state.searchValue ? 0 : 1; i < blogs.length; i += 2) {
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
					{this.props.isTablet && (
						<TextField
							hintText="Enter a blog post title"
							floatingLabelText="Filter blog by title"
							className="blog-filter"
							style={style.blogFilter}
							floatingLabelFocusStyle={style.blogFilter.color}
							underlineFocusStyle={style.blogFilter.bgcolor}
							onChange={this.onFilterChange}
// @ts-expect-error TS(2339): Property 'searchValue' does not exist on type 'Rea... Remove this comment to see the full error message
							value={this.state.searchValue}
						/>
					)}
					<FlipMove
						duration={400}
						enterAnimation="fade"
						leaveAnimation="fade"
						className="blog"
						maintainContainerHeight
					>
						{!this.state.searchValue && (
							<div className="row">
								<BlogArticle main blog={this.state.filteredBlogs[0].node} />
							</div>
						)}
						{blogPosts}
					</FlipMove>
				</div>
				<div className="more-info">
					<BlogHighlights blogs={this.state.mostPopularBlogs} />
					{!this.props.isTablet && (
						<TextField
							hintText="Enter a blog post title"
							floatingLabelText="Filter blog by title"
							className="blog-filter"
							style={style.blogFilter}
							floatingLabelFocusStyle={style.blogFilter.color}
							underlineFocusStyle={style.blogFilter.bgcolor}
							onChange={this.onFilterChange}
// @ts-expect-error TS(2339): Property 'searchValue' does not exist on type 'Rea... Remove this comment to see the full error message
							value={this.state.searchValue}
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

export default withLayout(withSizes(mapSizesToProps)(BlogList));

export const pageQuery = graphql`
query blogQuery {
	allContentfulPost(sort: {date: DESC}) {
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

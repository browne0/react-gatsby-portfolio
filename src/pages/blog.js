/* eslint-disable */
import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlipMove from 'react-flip-move';
import debounce from 'lodash/debounce';
import SEO from '../components/SEO';
import Newsletter from '../components/Newsletter';
import BlogArticle from '../components/BlogArticleItem';
import withSizes from 'react-sizes';

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
	constructor(props) {
		super(props);

		const blogs = props.data.allContentfulPost.edges.filter(edge => {
			const blog = edge.node;
			return new Date(blog.date) < Date.now();
		});
		this.state = {
			blogs,
			filteredBlogs: blogs,
			searchValue: '',
		};
	}

	filterBlogs = debounce(search => {
		const { blogs } = this.state;
		const filteredBlogs = blogs.filter(blog =>
			blog.node.title.title.toLowerCase().includes(search)
		);
		this.setState(() => ({ filteredBlogs }));
	}, 200);

	onFilterChange = e => {
		e.persist();

		if (this.state.searchValue !== e.target.value) {
			console.log('hi');
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

		const blogs = this.state.filteredBlogs.map((item, index) => {
			const blog = item.node;
			return <BlogArticle key={index} blog={blog} />;
		});

		const blogPosts = [];

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
					{this.props.isMobile && (
						<TextField
							hintText="Enter a blog post title"
							floatingLabelText="Filter blog by title"
							className="blog-filter"
							style={style.blogFilter}
							floatingLabelFocusStyle={style.blogFilter.color}
							underlineFocusStyle={style.blogFilter.bgcolor}
							onChange={this.onFilterChange}
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
					{!this.props.isMobile && (
						<TextField
							hintText="Enter a blog post title"
							floatingLabelText="Filter blog by title"
							className="blog-filter"
							style={style.blogFilter}
							floatingLabelFocusStyle={style.blogFilter.color}
							underlineFocusStyle={style.blogFilter.bgcolor}
							onChange={this.onFilterChange}
							value={this.state.searchValue}
						/>
					)}
					<Newsletter />
					{/* <div className="top-posts">Top Posts</div> */}
				</div>
			</div>
		);
	}
}

const mapSizesToProps = ({ width }) => ({
	isMobile: width <= 768,
});

export default withSizes(mapSizesToProps)(BlogList);

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
				}
			}
		}
	}
`;

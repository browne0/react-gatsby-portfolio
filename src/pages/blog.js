import React, { Component } from "react";
import Link from "gatsby-link";
import Moment from "react-moment";
import TextField from "material-ui/TextField";
import FlipMove from "react-flip-move";
import PortfolioDelegate from "../utils/PortfolioDelegate";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import SEO from "../components/SEO"

class blogList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogs: this.props.data.allContentfulPost.edges,
      filteredBlogs: this.props.data.allContentfulPost.edges,
      search: ""
    };
    this.onFilterChange = this.onFilterChange.bind(this);
    this.filterBlogs = this.filterBlogs.bind(this);
  }
  filterBlogs() {
    let blogs = this.state.blogs;
    let query = this.state.search;

    blogs = blogs.filter(blog => {
      return blog.node.title.title.toLowerCase().includes(query);
    });
    this.setState({ filteredBlogs: blogs });
  }

  onFilterChange(e) {
    let search = e.target.value.toLowerCase();
    this.setState({ search }, () => this.filterBlogs());
  }
  render() {
    let { match, location } = this.props;
    let style = {
      blogFilter: {
        margin: "auto",
        color: {
          color: "#c24d01"
        },
        bgcolor: {
          borderColor: "#c24d01"
        }
      }
    };

    const blogPosts = this.state.filteredBlogs.map((item, index) => {
      let blog = item.node;
      let blogHeader = blog.featuredImage ? (
        <Link to={`/blog/${blog.slug}`} className="post-header">
          <div
            className="post-header-image"
            style={{
              backgroundImage: `url(${blog.featuredImage.file
                .url})`
            }}
          />
        </Link>
      ) : null;
      let blogLength = blog.body.body
        .replace(/[^a-zA-Z0-9']+/g, " ")
        .trim()
        .split(" ").length;
      let blogLengthString =
        blogLength / 275 < 1
          ? (blogLength / 275 * 60).toFixed() + " sec read"
          : (blogLength / 275).toFixed() + " min read";
      let yearToday = new Date().getFullYear();
      let date;
      if (yearToday - Number(blog.date.substr(0, 4)) > 0) {
        date = <Moment parse="YYYY-MM-DD" format="MMM YYYY">
        {blog.date}
      </Moment>;
      } else {
        date = <Moment parse="YYYY-MM-DD" format="MMM D">
        {blog.date}
      </Moment>
      }
      return (
        <article
          key={blog.slug}
          to={`/blog/${blog.slug}`}
          className="post"
        >
          <img
            src={blog.author.profilePhoto.file.url}
            alt=""
            className="avatar"
          />

          <p className="author">
            <a href={blog.author.twitter}>
              {blog.author.name}
            </a>
          </p>
          <p className="date">
            {date}
            <span>&middot;</span>
            {blogLengthString}
          </p>
          {blogHeader}
          <Link to={`/blog/${blog.slug}`} className="title">
            <h2>{blog.title.title}</h2>
          </Link>
          <p className="summary">{blog.description.description}</p>
          <div className="read-more">
            <Link to={`/blog/${blog.slug}`} className="post-header">
              Read more...
            </Link>
          </div>
        </article>
      );
    });
    const timeout = { enter: 300, exit: 200 };
    return (
      <div className="blog-wrapper">
        <SEO
          title="Blog | Malik Browne"
          description="Check out the latest blog posts from front end developer, Malik Browne."
          image="/selfie/about_bg3.jpg"
          url="https://www.malikbrowne.com/blog"
        />
        <TextField
          hintText="Enter a blog post title"
          floatingLabelText="Search my blog"
          className="blog-filter"
          style={style.blogFilter}
          floatingLabelFocusStyle={style.blogFilter.color}
          underlineFocusStyle={style.blogFilter.bgcolor}
          onChange={this.onFilterChange}
          value={this.state.search}
        />
        <FlipMove
          duration={400}
          easing="ease"
          className="blog"
          enterAnimation="fade"
          leaveAnimation="fade"
        >
          {blogPosts}
        </FlipMove>
      </div>
    );
  }
}

export default blogList;

export const pageQuery = graphql`
query blogQuery {
  allContentfulPost {
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
        date
        comments
      }
    }
  }
}
`;

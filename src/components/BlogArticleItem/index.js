import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
import Moment from "react-moment";
import ProgressiveImage from "react-progressive-image";

class BlogArticleItem extends Component {
  static propTypes = {
    blog: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      url: this.props.blog.compressedFeaturedImage.file.url
    };
  }

  render() {
    let blog = this.props.blog;

    let blogHeader = blog.featuredImage ? (
      <Link to={`/blog/${blog.slug}`} className="post-header">
        <ProgressiveImage
          src={this.props.blog.featuredImage.file.url}
          placeholder={this.state.url}
        >
          {(src, loading) => (
            <div
              className="post-header-image"
              style={{
                backgroundImage: `url(${src})`,
                filter: loading ? "blur(4px)" : "blur(0px)"
              }}
            />
          )}
        </ProgressiveImage>
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
    return (
      <article to={`/blog/${blog.slug}`} className="post">
        <div className="post-author">
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
  }
}

export default BlogArticleItem;

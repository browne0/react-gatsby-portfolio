import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";

const AboutFooter = props => {
  let style = {
    container: {
      backgroundColor: 'rgb(194, 77, 1)',
      minHeight: "30vh"
    }
  };
  let className = "pic";
  let path = `/blog/${props.blog.slug}`
  return (
    <div className="about-footer" style={style.container}>
      <div className="footer-container">
        <div className="next-post-info">
          <h2>Check out my latest blog post:</h2>
          <h3>{props.blog.title.title}</h3>
          <h4>{props.blog.description.description}</h4>
        </div>
        <div className="next-post-image">
          <div className="inner">
            <p>Read More:</p>
            <Link to={path}>
              <img
                className={className}
                src={props.blog.featuredImage.file.url}
                alt={props.blog.title.title}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

AboutFooter.propTypes = {
  blog: PropTypes.object.isRequired
};

export default AboutFooter;
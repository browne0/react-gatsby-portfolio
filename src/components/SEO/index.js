import React, { Component } from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import config from "../../../data/SiteConfig";

class SEO extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  };

  render() {
    let { props } = this;
    return (
      <Helmet>
        {/* General tags */}
        <title>{props.title}</title>
        <meta name="description" content={props.description} />
        <meta name="image" content={props.image} />

        {/* OpenGraph tags */}
        <meta property="og:url" content={props.url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.description} />
        <meta property="og:image" content={props.image} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:creator"
          content={config.userTwitter ? config.userTwitter : ""}
        />
        <meta name="twitter:title" content={props.title} />
        <meta name="twitter:description" content={props.description} />
        <meta name="twitter:image" content={props.image} />
      </Helmet>
    );
  }
}

export default SEO;

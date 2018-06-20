import React from "react";
import PropTypes from "prop-types";

const AboutSection = props => {
  const className = props.className
    ? `about-section ${props.className}`
    : "about-section";
  return (
    <section className={className}>
      <h4>{props.title}</h4>
      <div className="section-content">{props.children}</div>
    </section>
  );
};

AboutSection.defaultProps = {
  className: "",
};

AboutSection.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element,
  title: PropTypes.string,
};
export default AboutSection;

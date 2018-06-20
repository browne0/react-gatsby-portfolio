import React from "react";
import PropTypes from "prop-types";

const ProjectSection = props => {
  const className = props.className
    ? `project-section ${props.className}`
    : "project-section";
  return (
    <section className={className} style={props.style}>
      {props.title ? <h4>{props.title}</h4> : null}
      <div className="section-content">{props.children}</div>
    </section>
  );
};

ProjectSection.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string,
  children: PropTypes.element,
};

ProjectSection.defaultProps = {
  className: "",
};
export default ProjectSection;

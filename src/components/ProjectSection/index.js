import React from "react";

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

ProjectSection.defaultProps = {
  className: ""
};
export default ProjectSection;
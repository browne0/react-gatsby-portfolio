import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";

const ProjectFooter = props => {
  let style = {
    container: {
      backgroundColor: props.currentProject.color
        ? props.currentProject.color
        : props.currentProject.bgColor,
      minHeight: props.currentProject.name === "Spotter" ? "40vh" : "30vh"
    }
  };
  let className =
    props.nextProject.name === "Spotify Mixmax Integration" ? null : "pic";
  return (
    <div className="project-footer" style={style.container}>
      <div className="footer-container">
        <div className="next-project-info">
          <h2>Enjoyed the case study? Check out this project:</h2>
          <h3>{props.nextProject.name}</h3>
          <h4>{props.nextProject.description}</h4>
        </div>
        <div className="next-project-image">
          <div className="inner">
            <p>Up Next:</p>
            <Link to={props.nextProject.path}>
              <img
                className={className}
                src={props.nextProject.image_urls.screenshots[0]}
                alt={props.nextProject.name}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

ProjectFooter.propTypes = {
  currentProject: PropTypes.object.isRequired,
  nextProject: PropTypes.object.isRequired
};

export default ProjectFooter;
import React, { Component } from "react";
import PortfolioDelegate from "../../utils/PortfolioDelegate";
import PropTypes from "prop-types";
import Button from "../../components/ThemedButton";
import ProjectSection from "../../components/ProjectSection";
import ProjectFooter from "../../components/ProjectFooter";

class ProjectPage extends Component {
  constructor(props) {
    super(props);

    const projects = new PortfolioDelegate();

    this.state = {
      nextProj: projects.getNextProject(this.props.name)
    };
  }
  static propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  };

  static defaultProps = {
    name: "",
    description: undefined,
    github: undefined,
    liveUrl: undefined
  };

  componentDidMount() {
    document.title = this.props.title + " | Malik Browne";
  }

  render(props) {
    const technologies = this.props.technologies.map(tech => {
      return <li key={tech}>{tech}</li>;
    });
    const style = {
      button: {
        display: "inline-block",
        padding: "10px 10px 10px 0px"
      },
      img: {
        maxHeight: "500px"
      }
    };
    let githubButton = this.props.github ? (
      <div style={style.button}>
        <Button target="_blank" label="Github" url={this.props.github} />
      </div>
    ) : null;
    let liveUrlButton = this.props.liveUrl ? (
      <div style={style.button}>
        <Button target="_blank" label="Live Demo" url={this.props.liveUrl} />
      </div>
    ) : null;
    let screenshotClass = this.props.bigPicture
      ? "screenshot-big-picture"
      : null;
    
    let color = this.props.color !== undefined ? this.props.color : this.props.bgColor;

    return (
      <div className={`project`}>
        <div className="wrapper">
          <div className="hero">
            <h2
              style={{
                color: this.props.color ? this.props.color : this.props.bgColor
              }}
            >
              {this.props.name}
            </h2>
            <p>{this.props.description}</p>
          </div>
          <ProjectSection style={{ margin: "0px auto 20px auto" }}>
            {githubButton}
            {liveUrlButton}
          </ProjectSection>
          {this.props.bigPicture && <div
            className={screenshotClass}
            style={{ backgroundImage: `url(${this.props.images[0]})` }}
          />}
          {this.props.children}
          <ProjectSection title="Technologies Used">
            <ul>{technologies}</ul>
          </ProjectSection>
          <ProjectSection
            className="project-section-last"
            title="Available Links"
          >
            <div style={style.button}>{githubButton}</div>
            <div style={style.button}>{liveUrlButton}</div>
          </ProjectSection>
          <ProjectFooter
            currentProject={this.props}
            nextProject={this.state.nextProj}
          />
        </div>
      </div>
    );
  }
}

export default ProjectPage;
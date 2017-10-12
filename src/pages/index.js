import React, { Component } from "react";
import Link from "gatsby-link"

import SEO from "../components/SEO";

import projects from "../data/projects.json";

class Home extends Component {
  render() {
    let projectList = [];
    for (var i = 0; i < projects.length; i++) {
      let project = projects[i];
      if (project.big_picture) {
        projectList.push(
          <Link key={i} to={project.path} className="bigPicture">
            <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
              <div
                className="img"
                style={{
                  backgroundImage: `url(${project.image_urls.screenshots[0]})`
                }}
              />
            </div>
            <div className="overlay">
              <div className="project-information">
                <div className="description">
                  <h2>{project.name}</h2>
                  <p>{project.description}</p>
                </div>
              </div>
            </div>
          </Link>
        );
      } else {
        projectList.push(
          <Link
            key={i}
            to={project.path}
            className="icon"
            style={{ backgroundColor: project.background_color }}
          >
            <img src={project.image_urls.logo} alt={project.name} />
            <div className="overlay">
              <div className="project-information">
                <div className="description">
                  <h2>{project.name}</h2>
                  <p>{project.description}</p>
                </div>
              </div>
            </div>
          </Link>
        );
      }
    }
    return (
      <div className="Home">
        <div className="hero">
          <SEO 
            title="Home | Malik Browne"
            description="Malik is a Front End Engineer & UX Enthusiast with a strong desire to produce high quality websites and online tools, bundled with an exceptional user experience."
            image="/selfie/about_bg3.jpg"
            url="http://malikbrowne.com" />
          <h1>
            I create <span>simple</span> and <span>intuitive</span> websites and
            applications.
          </h1>
        </div>
        <div className="container">{projectList}</div>
      </div>
    );
  }
}

export default Home;
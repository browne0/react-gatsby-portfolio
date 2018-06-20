import React, { Component } from "react";
import Link from "gatsby-link";

import SEO from "../components/SEO";

import projects from "../data/projects";

class Home extends Component {
  render() {
    const projectList = [];
    let flip = false;
    const projectListItems = projects.map((project, index) => {
      if (project.big_picture) {
        return (
          <Link key={index} to={project.path} className="bigPicture">
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
      } 
        return (
          <Link
            key={index}
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
      
    });
    for (let i = 0; i < projectListItems.length; i += 3) {
      if (!flip) {
        projectList.push(
          <div className="row" key={i}>
            {projectListItems[i]}
            <div className="regular">
              {projectListItems[i + 1]}
              {projectListItems[i + 2]}
            </div>
          </div>
        );
        flip = !flip;
      } else {
        projectList.push(
          <div className="row" key={i}>
            <div className="regular">
              {projectListItems[i]}
              {projectListItems[i + 2]}
            </div>
            {projectListItems[i + 1]}
          </div>
        );
        flip = !flip;
      }
    }
    return (
      <div className="Home">
        <div className="hero">
          <SEO
            title="Home | Malik Browne"
            description="Malik is a Front End Engineer & UX Enthusiast with a strong desire to produce high quality websites and online tools, bundled with an exceptional user experience."
            image="/selfie/about_bg3.jpg"
            url="https://www.malikbrowne.com"
          />
          <h1>
            I create <span>simple</span> and <span>intuitive</span> websites and
            applications.
          </h1>
        </div>
        {projectList}
      </div>
    );
  }
}

export default Home;

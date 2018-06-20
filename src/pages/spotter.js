import React, { Component } from "react";
import ProjectPage from "../components/ProjectPage";
import ProjectSection from "../components/ProjectSection";
import PortfolioDelegate from "../utils/PortfolioDelegate";
import SEO from "../components/SEO";

class Spotter extends Component {
  constructor(props) {
    super(props);

    const delegate = new PortfolioDelegate();

    const index = delegate.getProjectIndex("Spotter");

    this.state = {
      project: delegate.projects[index]
    };
  }
  render() {
    const style = {
      title: {
        color: this.state.project.background_color,
        fontWeight: "bold"
      }
    };
    return (
      <ProjectPage
        name={this.state.project.name}
        title={this.state.project.name}
        description={this.state.project.description}
        github={this.state.project.github_url}
        liveUrl={this.state.project.live_url}
        bgColor={this.state.project.background_color}
        technologies={this.state.project.technologies}
        images={this.state.project.image_urls.screenshots}
        bigPicture={this.state.project.big_picture}
      >
        <SEO
          title={`${this.state.project.name} | Malik Browne`}
          description={this.state.project.description}
          image={this.state.project.image_urls.screenshots[0]}
          url={`https://www.malikbrowne.com/${this.state.project.path.substr(1)}`}
        />
        <ProjectSection title="Background">
          <p>
            During my time in college, I helped create landing pages for several
            different groups, businesses, and people. One of the more
            interesting projects I worked on was the landing page for a fitness
            startup called <span style={style.title}>Spotter.</span>
          </p>

          <p>
            <span style={style.title}>Spotter</span> provides a fitness tracking
            device that any person from the everyday bodybuilder to the novice
            can fully utilize.
          </p>
        </ProjectSection>
        <ProjectSection title="Requirements">
          <p>
            Since the team had earned the opportunity to present at TechCrunch
            in New York City, they needed a landing page to perform the
            following tasks:
          </p>
          <ol>
            <li>Show off their awesome product</li>
            <li>Provide an option to join their email list for updates</li>
            <li>
              Link their social media to provide live updates from the team
            </li>
          </ol>

          <p>
            I also wanted to learn more about parallax scrolling in single page
            websites as well as using{" "}
            <a href="http://imakewebthings.com/waypoints/">Waypoints</a> in
            websites to trigger animations.
          </p>
        </ProjectSection>
        <ProjectSection title="Implementation">
          <p>
            The <span style={style.title}>Spotter</span> team came to me with a
            base template that they had found on{" "}
            <a href="https://themeforest.net/">ThemeForest.</a> However, the
            theme had a lot of things that needed to be redone. This includes:
          </p>
          <ol>
            <li>
              Fixing hacky solutions created by the original template creator
            </li>
            <li>Redoing animations</li>
            <li>Implementing background video on landing page</li>
            <li>Using Twitter API to get recent tweets</li>
          </ol>

          <h6>Home Page</h6>
          <p>
            I wanted something that would look unique and would portray an urban
            vibe for the startup. I looked on YouTube to find appropriate videos
            to use and found this awesome{" "}
            <a href="http://youtu.be/kn-1D5z3-Cs">
              stock video of New York City.
            </a>
          </p>
          <p>
            Since they were presenting in New York, I thought this would
            definitely portray an awesome vibe for Tech Crunch. I added the
            title of the company, as well as their slogan, and a{" "}
            <a href="http://www.hongkiat.com/blog/call-to-action-buttons-guidelines-best-practices-and-examples/">
              call to action.
            </a>
          </p>
          <p>
            To offer some UX guidance, I added a little mouse icon with a bounce
            animation. This is a common technique to indicate to the user that
            they should continue to scroll down the page.
          </p>
          <img
            className="pic"
            src={this.state.project.image_urls.screenshots[0]}
            alt="Home Page"
          />
          <h6>Features</h6>
          <p>
            This section was used to describe the capabilities the application
            offered. Using Waypoints, I triggered an animation to make the mock
            screenshots slide in from the left and right when the user hits the
            top of the Features section.
          </p>
          <p>
            In order to make things look nicer, I also added hover animations
            over the four "bullet points".
          </p>
          <p>
            The final result ended up looking very smooth, and impressed a lot
            of people:
          </p>
          <img
            className="pic"
            src={this.state.project.image_urls.screenshots[4]}
            alt="Slide-In"
          />
          <h6>Newsletter &amp; Gallery</h6>
          <p>
            The newsletter was straightforward – it uses AJAX to submit the
            email address to a PHP file. The file will then validate the email,
            and then send it off to MailChimp.
          </p>
          <p>
            For the gallery, I pulled the four most recent pictures from{" "}
            <span style={style.title}>Spotter's</span> Instagram. Once the
            photos were retrieved I created hover animations over each photo and
            added a lightbox in order to see a larger version of the image.
          </p>
          <p>
            Using{" "}
            <a href="https://github.com/webmandesign/jquery.hoverdir">
              jQuery HoverDir
            </a>, I was also able to get the hover animation to track which side
            of the image the user enters. This allows me to then and transition
            from that side. You can see the final result below:
          </p>
          <img
            className="pic"
            src={this.state.project.image_urls.screenshots[3]}
            alt="Newsletter and Gallery"
          />
          <h6>Contact Form</h6>
          <p>
            The final thing that needed to be done was to add a contact form.
            When the person hits the bottom of the page, the form animates in
            using waypoints. I added in a wobble animation as it transitioned in
            to get the user's attention.
          </p>
          <p>
            Like I said before, the form is submitted via AJAX to a contact.php
            file. The file parses all the provided fields, and if valid will
            send it over to the Spotter team. The final result can be seen
            below:
          </p>
          <img
            src={this.state.project.image_urls.screenshots[2]}
            alt="Contact Form"
            className="pic"
          />
        </ProjectSection>
        <ProjectSection title="Project Challenges">
          <p>
            I spent a lot of time trying to make this website look perfect. The
            first part that I struggled with was creating the smooth animations
            on the Features page. Since there was a lot going on, I had to
            utilize the ":after" and ":before" properties on some of the
            elements.
          </p>
          <p>
            The next part I had trouble with was the video background. Instead
            of only being in the top section, I wanted it to stay in the
            background, and swap between transparent and white sections as the
            user scrolls down the page. I ended up having to use a combination
            of CSS and JavaScript since the video is initially loaded via video
            plugin.
          </p>
          <p>Some things that I learned from this project were:</p>

          <ul>
            <li>Parallax Scrolling</li>
            <li>Advanced CSS3 Animations</li>
            <li>
              AJAX submissions to prevent client-side refresh upon submitting
            </li>
            <li>Branding and setting color schemes for websites</li>
            <li>Basic UX Principles</li>
          </ul>
        </ProjectSection>
      </ProjectPage>
    );
  }
}

export default Spotter;

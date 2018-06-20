import React, { Component } from "react";
import ProjectPage from "../components/ProjectPage/index";
import Slider from "react-slick";
import ProjectSection from "../components/ProjectSection/index";
import SyntaxHighlighter from "react-syntax-highlighter";
import { obsidian } from "react-syntax-highlighter/dist/styles";
import PortfolioDelegate from "../utils/PortfolioDelegate";
import SEO from "../components/SEO";

class BeesDesign extends Component {
  constructor(props) {
    super(props);

    const delegate = new PortfolioDelegate();

    const index = delegate.getProjectIndex("Bee's Design");

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
    const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      speed: 1000,
      fade: true,
      autoplaySpeed: 4000,
      draggable: false,
      autoplay: true
    };

    const screenshots = this.state.project.image_urls.screenshots.map(img => (
        <div
          key={img}
          className="project-image"
          style={{ backgroundImage: `url(${img})` }}
        />
      ));
    return (
      <ProjectPage
        name={this.state.project.name}
        title={this.state.project.name}
        technologies={this.state.project.technologies}
        description={this.state.project.description}
        github={this.state.project.github_url}
        liveUrl={this.state.project.live_url}
        bgColor={this.state.project.background_color}
        images={this.state.project.image_urls.screenshots}
        bigPicture={this.state.project.big_picture}
      >
        <SEO
          title={`${this.state.project.name} | Malik Browne`}
          description={this.state.project.description}
          image={this.state.project.image_urls.screenshots[0]}
          url={`https://www.malikbrowne.com/${this.state.project.path.substr(1)}`}
        />
        <div className="container container-bd">
          <Slider {...settings}>{screenshots}</Slider>
        </div>
        <ProjectSection title="Background">
          <p>
            My first exploration into web development started{" "}
            <b>way back in 2010.</b> I started developing an interest in coding
            when I was fifteen, and after three years of practice, I realized
            that I could work for small businesses and make a profit.
          </p>
          <p>
            <span style={style.title}>Bee's Design</span> was born from this
            realization.
          </p>
        </ProjectSection>

        <ProjectSection title="Requirements">
          <p>
            I wanted a website that was simple and straight to the point, almost
            like an online business card. At this point, I had just learned
            about Bootstrap and was interested in making the website
            mobile-friendly as well.
          </p>

          <p>
            I also wanted to add a contact form for the first time. I had
            recently learned PHP, but I had not learned any type of input
            sanitization or other things related to security on the server side.
          </p>

          <p>
            Finally, I wanted to have a project page where you could click on a
            website and see a bigger image of it.{" "}
          </p>

          <p>
            <b>(you know, the good ol' noobie days.)</b>
          </p>
        </ProjectSection>

        <ProjectSection title="Implementation">
          <p>
            After getting some inspiration from similar websites, I decided to
            go with a standard three column layout that showed the main services
            I provided.
          </p>
          <p>
            This would then scale down to one column per service on mobile.{" "}
          </p>
          <h6>Home Page</h6>
          <p>
            Using Bootstrap I was able to create a homepage using the{" "}
            <a href="http://getbootstrap.com/docs/4.0/examples/jumbotron/">
              Jumbotron
            </a>{" "}
            template and learned a lot about how Bootstrap's grid system worked,
            and how media queries tie into responsive designs.
          </p>
          <img
            className="pic"
            src={this.state.project.image_urls.screenshots[0]}
            alt="Home Page"
          />

          <h6>About Page</h6>
          <p>
            For the about page, I wanted to create my own layout, since I
            utilized the{" "}
            <a href="http://getbootstrap.com/docs/4.0/examples/jumbotron/">
              Jumbotron
            </a>{" "}
            for my home page.
          </p>
          <p>I decided to split the page up into two columns: </p>

          <ol>
            <li>
              A column that would take up 75% of the page, and go into detail
              about <span style={style.title}>Bee's Design</span>.
            </li>
            <li>
              A column that would take up 25% of the page, and talk about who I
              am.
            </li>
          </ol>
          <p>
            The template would then scale down to a one column layout, similar
            to the home page for mobile devices and tablets. At this point, I
            was very happy with the final result and received many compliments
            on how it looked.
          </p>
          <img
            className="pic"
            src={this.state.project.image_urls.screenshots[1]}
            alt="Home Page"
          />

          <h6>Contact Page</h6>
          <p>
            The contact page was probably the hardest part of the project for
            me. I needed to learn how to sanitize input properly, and learn how
            to use the Google Map API to display a map of my business's general
            location.
          </p>

          <p>
            To filter out spam, I needed to create a "bad-words" text file that
            PHP would go through and check if any field contained a word from
            that list. The first part of this function does exactly that:
          </p>

          <SyntaxHighlighter
            language="javascript"
            showLineNumbers
            style={obsidian}
          >
            {`
function processInput() {
  // Timestamp for later
  $timestamp = date('Y-m-d g:i:s A');

  // Create a boolean gate to prevent us from moving forward w/o checking
  $isInputOK = true;

  // Load English bad word dictionary
  $badwords = file("badwords-en", FILE_IGNORE_NEW_LINES);

  // Chars to remove from string
  $charsToRemove = array(" ", ",");

  // Check if any element in $_POST is inappropriate
  foreach ($_POST as $value) {
    foreach ($badwords as $word) {
      // Strip the chars ($charsToRemove) from the string ($value) and check if it matches a bad word ($word)
      if (strpos(str_replace($charsToRemove, '', $value), $word) !== false) {
        // We have a match
        $isInputOK = false;
        break 2; // break out of both loops to skip checking other words
      }
    }
  }
// ...
              `}
          </SyntaxHighlighter>

          <p>
            After looping through our fields, we will check to see if the
            $isInputOk flag was triggered, and if so it will add the request to
            a log file.
          </p>

          <SyntaxHighlighter
            language="javascript"
            showLineNumbers
            style={obsidian}
            wrapLines={true}
          >
            {`// ...

// If input wasn't OK, error out. If it was, sent an email.
if (!$isInputOK) {
  // Bad words detected, throw an error!
  echo "<p>ERROR: The message was spam. This message was sent from:\\n";
  echo "<ul>\\n";
  echo "<li>Your IP: " . $_SERVER['REMOTE_ADDR'] . "</li>\\n";
  echo "<li>Your ISP Info: " . gethostbyaddr($_SERVER['REMOTE_ADDR']) . "</li>\\n";
  echo "<li>Browser Information: " . $_SERVER['HTTP_USER_AGENT'] . "</li>\\n";
  echo "<li>Request Time: " . $timestamp . "</li>\\n";
  echo "<li>Your Name, Email, and Message Content</li>\\n";
  echo "</ul>\\n";
  logMessage($isInputOK, $timestamp);
} else {
  // No bad words detected, proceed with mail operation
  $subject = "Message from a potential client!: " . $_POST['name'];
  mail("info@beesdesign.net",$subject,$_POST['message'],"From: {$_POST['email']}\\n");
  logMessage($isInputOK, $timestamp);
}
}
            `}
          </SyntaxHighlighter>
        </ProjectSection>
        <ProjectSection title="Project Challenges">
          <p>
            Since I wanted to make sure this project was perfect I took a lot of
            time learning about the mobile first development process for static
            websites. Some included things that I learned were:
          </p>

          <ul>
            <li>Vendor Prefixes</li>
            <li>Sanitizing User Input</li>
            <li>Dealing with Cross-Site Scripting</li>
            <li>Media Queries</li>
          </ul>
        </ProjectSection>
      </ProjectPage>
    );
  }
}

export default BeesDesign;

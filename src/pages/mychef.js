import React, { Component } from "react";
import ProjectPage from "../components/ProjectPage";
import ProjectSection from "../components/ProjectSection";
import SyntaxHighlighter from "react-syntax-highlighter";
import { obsidian } from "react-syntax-highlighter/dist/styles";
import Slider from "react-slick";
import PortfolioDelegate from "../utils/PortfolioDelegate";
import SEO from "../components/SEO";

class myChef extends Component {
  constructor(props) {
    super(props);

    const delegate = new PortfolioDelegate();

    let index = delegate.getProjectIndex("myChef");

    this.state = {
      project: delegate.projects[index]
    };
  }
  render() {
    let style = {
      title: {
        color: this.state.project.background_color,
        fontWeight: "bold"
      }
    };

    let settings = {
      dots: false,
      arrows: false,
      infinite: true,
      speed: 500,
      fade: true,
      autoplaySpeed: 4000,
      draggable: false,
      autoplay: true
    };
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
        <ProjectSection title="Background">
          <p>
            When I was in college, a friend of mine reached out to me about an
            idea for a company. He wanted to create a web application that will
            help match local chefs with people looking for home cooked meals.
          </p>
          <p>
            This was an awesome opportunity to practice adding authentication to
            a website for a registration and login system. The name of the
            application was going to be called{" "}
            <span style={style.title}>myChef</span>.
          </p>
        </ProjectSection>
        <ProjectSection title="Requirements">
          <p>
            I was told by <span style={style.title}>myChef</span> to lay out the
            foundation of their site. This included three major things:
          </p>

          <ol>
            <li>Login Page</li>
            <li>Registration Page</li>
            <li>Home Page</li>
          </ol>

          <p>
            I also wanted to learn how to implement prepared statements, as I
            had recently learned about SQL injection, and how bad it can be for
            websites in production.
          </p>
        </ProjectSection>
        <ProjectSection title="Implementation">
          <h6>Creating the database schema</h6>
          <p>The first thing I wanted to do was lay out the database schema.</p>
          <p>
            For the basic user, they would need to fill out the following
            fields:
          </p>

          <ol>
            <li>First Name</li>
            <li>Last Name</li>
            <li>Password</li>
            <li>Email</li>
            <li>Zip Code</li>
          </ol>

          <p>
            I also gave every account a unique ID to be used as the primary key
            for the table. Once that was created it was time to get started on
            the Home Page.
          </p>

          <h6>Home Page</h6>
          <p>
            After searching for different images to use on{" "}
            <a href="https://stocksnap.io/">StockSnap</a>, I settled on these
            three images:
          </p>
          <Slider {...settings}>
            <div>
              <img
                className="pic"
                src="http://dev.beesdesign.net/mychef/assets/img/backgrounds/1.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="pic"
                src="http://dev.beesdesign.net/mychef/assets/img/backgrounds/2.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                className="pic"
                src="http://dev.beesdesign.net/mychef/assets/img/backgrounds/3.jpg"
                alt=""
              />
            </div>
          </Slider>

          <p>
            Using a{" "}
            <a href="http://www.jquery-backstretch.com/">
              jQuery plugin I found
            </a>, I set it up to fade through each image every second or so. I
            made sure to choose rich imagery for the photos, as it was going to
            be a service focused around food.
          </p>

          <h6>Login & Registration Page</h6>

          <p>
            For the login page, I used CSS3 transitions to make a stylish login
            box: The example can be seen here:
          </p>

          <iframe
            height="460"
            scrolling="no"
            title="rGzarX"
            src="https://codepen.io/browne0/embed/rGzarX/?height=460&theme-id=dark&default-tab=result&embed-version=2"
            frameBorder="no"
            allowTransparency="true"
            allowFullScreen="true"
            style={{ width: "100%", margin: "15px 0px" }}
          />

          <p>
            If the credentials are correct, the user is then redirected to the
            home page, where they can get started with the application.
            Otherwise, an error is shown based off of which field was wrong.
          </p>

          <p>
            To prevent SQL injections, I made sure to use prepared statements
            and bound parameters in my PHP code. In order to do this, I used the{" "}
            <a href="http://php.net/manual/en/class.pdo.php">
              PDO Library
            </a>{" "}
            that is provided by PHP.
          </p>

          <p>
            I set my bound parameters, and execute each prepared statement in a
            try/catch block in order to make sure there were no errors with the
            database:
          </p>

          <SyntaxHighlighter language="php" style={obsidian}>
            {`<?php 
// State our connection to our database and start a session.
require("common.php");

// Use this in order to resubmit username value if user fails login
$submitteduser = "";
$error = "";

if(!empty($_SESSION['user'])){
  header("Location: main");

}

// Check to see if a form was submitted;
if(!empty($_POST))
{
  if(empty($_POST['email']) || empty($_POST['pass']))
  {
    $error = "All fields are required.";
  }
  else
  {
    // Retrieve info from database
    $query = "SELECT id, fname, lname, password, salt, email FROM users WHERE email = :email";

    // Set param values
    $queryparams = array(
      ':email' => $_POST['email']
      );

    try
    {
      // Execute query against database
      $stmt = $db -> prepare($query);
      $result = $stmt -> execute($queryparams);
    }

    // Catch error
    catch (PDOException $ex)
    {
      $error = "Oops! There was an error. Please try again.";
    }

    // Create variable to tell us whether user has logged in or not. 
    // Set to false in beginning, and switch it to true if correct credentials.
    $goodlogin = false;

    // Retrieve user data from database. If false, then username is not registered.
    $row = $stmt -> fetch();

    if($row)
    {
      // Using password submitted by user and salt stored in database, we check to see if passwords match
      $check_password = hash('sha256', $_POST['pass'] .$row['salt']);

      for($round = 0; $round < 65536; $round++)
      {
        $check_password = hash('sha256', $check_password . $row['salt']);
      }

      if($check_password == $row['password'])
      {
        // If true, then we change login variable to true.
        $goodlogin = true;
      }
    }

    // If user logged in successfully, then send them to the private members-only page.
    if($goodlogin)
    {
      unset($row['salt']);
      unset($row['password']);
      $_SESSION['user'] = $row;
      header("Location: http://dev.beesdesign.net/mychef");
    }
    else
    {
      $error = "Login failed. Please try again.";
      // Show them the email they entered.
      $submitteduser = htmlentities($_POST['email'], ENT_QUOTES, 'UTF-8');
    }
  }
}
?>

  // load the html          
            `}
          </SyntaxHighlighter>

          <p>
            You will notice that I separated the standard database connection
            info into a file called <b>"common.php"</b>. I do this so I can call
            the database on both every page, and check if the user is a valid
            user when they are trying to access content on{" "}
            <span style={style.title}> myChef</span>.
          </p>
        </ProjectSection>
        <ProjectSection title="Project Challenges">
          <p>
            I spent a lot of time learning about the Post/Redirect/Get pattern.
            The pattern prevents duplicate form submissions, which I was running
            into when I first started.
          </p>

          <p>
            I also ran into trouble changing what was shown on the home page. I
            learned about PHP sessions, and with the use of an .htaccess file on
            the server I was able to get it to redirect based on a cookie that
            is set by the server.
          </p>

          <p>Some cool things that I learned about were:</p>

          <ul>
            <li>The PDO Library</li>
            <li>Prepared Statements</li>
            <li>MySQL & PHPMyAdmin</li>
          </ul>
        </ProjectSection>
      </ProjectPage>
    );
  }
}

export default myChef;

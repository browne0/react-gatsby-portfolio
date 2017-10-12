import React, { Component } from "react";
import ProjectPage from "../components/ProjectPage/index";
import ProjectSection from "../components/ProjectSection/index";
import SyntaxHighlighter from "react-syntax-highlighter";
import PortfolioDelegate from "../utils/PortfolioDelegate";
import { obsidian } from "react-syntax-highlighter/dist/styles";
import SEO from "../components/SEO";

class Mixmax extends Component {
  constructor(props) {
    super(props);

    const delegate = new PortfolioDelegate();

    let index = delegate.getProjectIndex("Spotify Mixmax Integration");

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
          image={this.state.project.image_urls.screenshots[2]}
          url={`https://malikbrowne.com/${this.state.project.path.substr(1)}`}
        />
        <div className="container">
          <img
            src={this.state.project.image_urls.screenshots[2]}
            alt="Three types of rich links"
          />
        </div>
        <ProjectSection title="Background">
          <p>
            <span style={style.title}>Mixmax</span> is an awesome startup that
            provides powerful analytics, automation, and enhancements for Gmail.
            I thought this service was awesome and wanted to see if I could
            create a <span style={style.title}>Mixmax</span> integration that I
            could see myself using since I use the service a lot myself.
          </p>

          <p>
            The API that <span style={style.title}>Mixmax</span> provides allows
            you to make any of three integrations:
          </p>
          <ol>
            <li>
              <a href="https://developer.mixmax.com/docs/overview-slash-commands">
                Slash Commands
              </a>
            </li>
            <li>
              <a href="https://developer.mixmax.com/docs/overview-enhancement">
                Enhancements
              </a>
            </li>
            <li>
              <a href="https://developer.mixmax.com/docs/overview-link-resolvers">
                Link Resolvers
              </a>
            </li>
          </ol>
          <p>
            I decided that I was going to make a slash command that creates a
            rich media link to Spotify for a specific song, artist, or album.
          </p>
        </ProjectSection>
        <ProjectSection title="Requirements">
          <p>
            In order for a simple <span style={style.title}>Mixmax</span> slash
            command to work, two components are needed:
          </p>
          <ol>
            <li>Typeahead</li>
            <li>Resolver</li>
          </ol>

          <p>
            Once those two things are implemented in your slash command, it will
            be able to resolve the URL you provide and generate a rich preview
            of a template you can set.
          </p>

          <p>
            Since email templating is years behind normal web templating, and
            not all email providers render emails the same, we will need to make
            sure our templates use backward-compatible HTML elements and CSS
            properties.
          </p>

          <p>
            <b>
              <i>Flexbox my friend, we shall reunite soon!</i>
            </b>
          </p>
        </ProjectSection>
        <ProjectSection title="Implementation">
          <p>
            After laying out the requirements, the first thing that I got to
            work on was the <b>typeahead.</b>
          </p>

          <h6>What is a typeahead?</h6>

          <p>
            Slash commands are triggered when a user types in "/" into a draft
            email. You can think of the typeahead as an API - a resource the
            Mixmax menu will reference to load your specific slash command data.
            By default, that menu provides all of the slash commands that Mixmax
            currently has.
          </p>

          <h6>Creating the typeahead</h6>

          <p>
            In order to get the slash command to show up locally, I needed to
            add the slash command to the{" "}
            <a href="https://app.mixmax.com/dashboard/settings/developer">
              Mixmax Developer Dashboard.
            </a>
          </p>
          <p>
            Once that was done, I got started on the actual logic for the
            typeahead, since it would be the hardest component to do. The first
            thing we did was define all of our constants:
          </p>

          <SyntaxHighlighter
            language="javascript"
            showLineNumbers
            style={obsidian}
          >
            {`var key = require('../utils/key');
var request = require('request');
var _ = require('underscore');
var createTemplate = require('../utils/template.js').typeahead;

// get client keys
const keys = require('./clientKeys');

// define options a user can choose
var options = {
	Album: "album",
	Track: "track",
	Artist: "artist"
}

// set a variable for our access token that'll be refreshed automatically by Spotify every 6 minutes
let access_token;
`}
          </SyntaxHighlighter>

          <p>
            The first thing we need to do is get the users option and find the
            matching hash key for that input. We can do that using two of
            Lodash's helper functions: _.keys, and _.find
          </p>

          <SyntaxHighlighter
            language="javascript"
            showLineNumbers
            style={obsidian}
          >
            {`module.exports = (req, res) => {
	var input = req.query.text.slice();

	// if user has selected option then we will prefix the option to the search string
	var selectedOption = _.find(_.keys(options), key => {
		return input.indexOf(key + ':') === 0;
	})
`}
          </SyntaxHighlighter>

          <p>
            Now that we have gotten their input we can now figure out which
            options to return. The options are filtered based on the user's
            input, as long as they haven't submitted an option. We can then set
            the first parameter for our Spotify query.
          </p>

          <SyntaxHighlighter
            language="javascript"
            showLineNumbers
            style={obsidian}
          >
            {`// if user doesn't have a valid option selected, they're still deciding between track, artist or album
if (!selectedOption) {
  var matchingOptions = _.filter(_.keys(options), option => {
    return input.trim() === '' ? true : option.toLowerCase().startsWith(input.toLowerCase());
  });

  if (matchingOptions.length === 0) {
    res.json([{
      title: 'You can only choose album, track, or artist.',
      text: ''
    }])
  }

  else {
    res.json(matchingOptions.map(option => {
      return {
        title: option,
        text: option + ':',
        resolve: false // don't automatically resolve and remove the text
      }
    }));
  }
  return;
}

// the search term is the remaining string after the option and the colon
var valueToSearch = input.slice((selectedOption + ': ').length)
`}
          </SyntaxHighlighter>

          <p>
            At this point, the user has either selected an option and typed in a
            value, or they're thinking about what to search for. We can ask the
            user what they're looking for until there is data to be shown:
          </p>

          <SyntaxHighlighter
            language="javascript"
            showLineNumbers
            style={obsidian}
          >
            {`// if they haven't started entering a value, ask them what they're searching for
if (valueToSearch === "") {
  // user hasn't typed in an option yet
  res.json([{
    title: "What " + options[selectedOption] + " are you looking for?",
    text: ''
  }])
}
`}
          </SyntaxHighlighter>

          <p>
            The Spotify API requires that we pass in our client key and secret
            as a{" "}
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding">
              base64 encoded string.
            </a>{" "}
            Since we needed it in that format I created a small function that
            given a string, will utilize the{" "}
            <a href="https://nodejs.org/api/buffer.html#buffer_buf_tostring_encoding_start_end">
              Buffer
            </a>{" "}
            instance provided by NodeJS, and return the base64 encoding of that
            string:
          </p>

          <SyntaxHighlighter
            language="javascript"
            showLineNumbers
            style={obsidian}
          >
            {`// simple function using the buffer module to return base64 for the authorization header.
function base64(str) {
  return new Buffer(str).toString('base64');
}
`}
          </SyntaxHighlighter>

          <p>
            Using the{" "}
            <a href="https://github.com/request/request">
              extremely popular request module,
            </a>{" "}
            we can now query Spotify's API by first passing in our base64
            encoded clientKey, and then searching:
          </p>

          <SyntaxHighlighter
            language="javascript"
            showLineNumbers
            style={obsidian}
          >
            {`else {
// Spotify requires that we get an access token before a request. 
// Since we're providing a clientID and secret, we don't need an OAuth Token.
request({
  url: 'https://accounts.spotify.com/api/token',
  method: 'POST',
  headers: {
    Authorization: 'Basic ' + base64(keys.clientID + ":" + keys.clientSecret)
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
}, (err, authResponse) => {
  if (err || authResponse.statusCode !== 200 || !authResponse.body) {
    res.status(500).send('Error');
    return;
  }

  let access_token = authResponse.body.access_token;

  // add wildcards to actual search so the outputted array better matches what a user searches
  request({
    url: 'https://api.spotify.com/v1/search',
    headers: {
      Authorization: "Bearer " + access_token
    },
    qs: {
      q: "*" + valueToSearch + "*",
      type: options[selectedOption]
    },
    json: true
  }, (err, response) => {
    if (err || response.statusCode !== 200 || !response.body) {
      res.status(500).send('Error');
      return;
    }

    // The first property return by the api is the plural version of the option we choose.
    let selection = options[selectedOption] + 's'

    // go through array of items returned from response and return data for the templates to use for each item
    var results = _.chain(response.body[selection].items)
    .map(data => {
      return {
        title: createTemplate(data),
        text: data.href
      };
    })
    .value();

    // nothing returned from spotify api
    if (results.length === 0) {
      res.json([{
        title: "No results found for <i>" + valueToSearch + "</i>.",
        text: ''
      }]);
    } else {
      res.json(results);
    }
  });
});
}
`}
          </SyntaxHighlighter>
          <p>
            At this point the typeahead should be fully functional! Here's an
            example of what it looks like:
          </p>
          <div className="container">
            <img
              src={this.state.project.image_urls.screenshots[0]}
              alt="Mixmax typeahead"
            />
          </div>

          <h6>What is the resolver?</h6>

          <p>
            When a user selects a result from the list, Mixmax needs the slash
            command to provide content to put in the email. THe resolver will
            take our search string, and resolve it against Spotify's API.
          </p>

          <p>
            The resolver will then take the data that Spotify returns and create
            a template for our rich media link.
          </p>

          <h6>Creating the resolver</h6>

          <p>
            For the resolver, the first thing we will need to do once again is
            define all of our constants for the module:
          </p>

          <SyntaxHighlighter
            language="javascript"
            showLineNumbers
            style={obsidian}
          >
            {`var key = require('../utils/key');
var request = require('request');
var _ = require('underscore');
var createTemplate = require('../utils/template.js').resolver

// get client keys
const keys = require('./clientKeys');
`}
          </SyntaxHighlighter>

          <p>
            The second thing we need to do is handle the search string that the
            typeahead module gave us. One of the easiest ways to do this would
            be to create a function that takes in a search string, a request
            object, and a response, that way we can directly plug in our request
            and response into our application.
          </p>

          <p>
            We once again pass in our base64 encoded string, and make a request
            to Spotify:
          </p>

          <SyntaxHighlighter
            language="javascript"
            showLineNumbers
            style={obsidian}
          >
            {`function handleSearchString(term, req, res) {
// Spotify requires that we get an access token before a request. Since we're providing a clientID and secret, we don't need an OAuth Token.
request({
  url: 'https://accounts.spotify.com/api/token',
  method: 'POST',
  headers: {
    Authorization: 'Basic ' + base64(keys.clientID + ":" + keys.clientSecret)
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
}, (err, authResponse) => {
  if (err || authResponse.statusCode !== 200 || !authResponse.body) {
    res.status(500).send('Error');
    return;
  }

  let access_token = authResponse.body.access_token;
`}
          </SyntaxHighlighter>
          <p>
            Next, we pass in our access token, and set the resulting object to
            be provided to the templates each containing different information
            depending on the result:
          </p>

          <SyntaxHighlighter
            language="javascript"
            showLineNumbers
            style={obsidian}
          >
            {`request({
  url: term,
  headers: {
    Authorization: "Bearer "+ access_token
  },
  json: true
}, (err, response) => {
  if (err || response.statusCode !== 200 || !response.body) {
    res.status(500).send('Error');
    return;
  }
  let results;
  let data = response.body;
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }

  // data for album
  if (response.body.album_type) {
    results = {
      type: 'album',
      album_url: data.external_urls.spotify,
      artist_url: data.artists[0].external_urls.spotify,
      image_url: data.images[2].url,
      name: data.name,
      artist: data.artists[0].name
    }
  }

  // data for track
  else if (response.body.album) {
    results = {
      type: 'track',
      album_url: data.album.external_urls.spotify,
      image_url: data.album.images[2].url,
      name: data.name,
      song_url: data.external_urls.spotify,
      artist_url: data.artists[0].external_urls.spotify,
      artist: data.artists[0].name
    }
  }

  // data for artist
  else {
    results = {
      type: 'artist',
      artist_url: data.external_urls.spotify,
      image_url: data.images[2].url,
      name: data.name,
      followers: data.followers.total.toLocaleString()
    }
  }

  res.json({
    body: createTemplate(results)
  })
});
});
}
`}
          </SyntaxHighlighter>
          <p>
            This will allow us to just create the term, and pass it in along
            with the request and response in our module.exports:
          </p>
          <SyntaxHighlighter
            language="javascript"
            showLineNumbers
            style={obsidian}
          >
            {`module.exports = function(req, res) {
  var input = req.query.text.trim();

  handleSearchString(input, req, res);
};
`}
          </SyntaxHighlighter>
          <p>
            <b>And, voilà!</b> Once we create the templates are created with the
            data, we are done! Here's what the end result of my application
            looks like in my example:
          </p>
          <div className="container">
            <img
              src={this.state.project.image_urls.screenshots[1]}
              alt="Mixmax Resolver"
            />
          </div>
        </ProjectSection>
        <ProjectSection title="Project Challenges">
          <p>
            This was one of the more technically challenging projects I've
            worked on. There was a lot that I didn't understand at first and
            realized I needed to find some other implementations.
          </p>

          <p>
            Some of the things that I learned a lot about from this project
            include:
          </p>
          <ul>
            <li>
              <a href="https://lodash.com/">Lodash</a>
            </li>
            <li>Using a response to resolve another response</li>
            <li>Creating a web application with only NodeJS and HTML</li>
            <li>
              Algorithmic thinking: It challenged me to think in order of
              logical steps rather than how do I get from point A to point B
            </li>
            <li>base64 encoding</li>
          </ul>
        </ProjectSection>
      </ProjectPage>
    );
  }
}

export default Mixmax;

// Spotter
import spotterLogo from "../images/logos/spotter.png";
import spotter1 from "../images/screenshots/spotter.jpg";
import spotter2 from "../images/screenshots/spotter1.jpg";
import spotter3 from "../images/screenshots/spotter2.png";
import spotter4 from "../images/project_gifs/spotter-info.gif";
import spotter5 from "../images/project_gifs/spotter-slide-in.gif";

// Mixmax
import mixmaxLogo from "../images/logos/mixmax_logo.png";
import mixmax1 from "../images/project_gifs/mixmax_typeahead.gif";
import mixmax2 from "../images/project_gifs/mixmax_resolver.gif";
import mixmax3 from "../images/screenshots/mixmax_final.png";

// Bee's Design
import beesdesignLogo from "../images/logos/beesdesign_logo.png";
import beesdesign1 from "../images/screenshots/beesdesign.png";
import beesdesign2 from "../images/screenshots/beesdesign2.png";
import beesdesign3 from "../images/screenshots/beesdesign3.png";
import beesdesign4 from "../images/screenshots/beesdesign4.png";

// Facts of Today
import factsOfTodayLogo from "../images/logos/factsoftoday_logo.png";
import factsoftoday1 from "../images/project_gifs/factsoftoday.gif";

// myChef
import mychef1 from "../images/screenshots/mychef.jpg";

// Old Portfolio
import oldPortfolioLogo from "../images/logos/old_portfolio_logo.png";
import oldportfolio1 from "../images/screenshots/old_portfolio.jpg";
import oldportfolio2 from "../images/screenshots/old_portfolio_halfandhalf.png";
import oldportfolio3 from "../images/project_gifs/oldportfolio_halfandhalf.gif";

export default [
  {
    name: "Spotter",
    description:
      "A landing page crafted for an Indiana based startup called Spotter.",
    technologies: ["HTML5/CSS3", "JavaScript", "jQuery", "PHP"],
    big_picture: true,
    image_urls: {
      logo: spotterLogo,
      screenshots: [spotter1, spotter2, spotter3, spotter4, spotter5],
    },
    github_url: "https://github.com/browne0/Spotter",
    live_url: "http://dev.beesdesign.net/spotter",
    path: "/spotter",
    background_color: "#074b88",
  },
  {
    name: "Spotify Mixmax Integration",
    description:
      "A Spotify Mixmax slash command that allows you to search for a track, artist, or album to embed in an email.",
    technologies: ["NodeJS", "HTML5/CSS3"],
    big_picture: false,
    image_urls: {
      logo: mixmaxLogo,
      screenshots: [mixmax1, mixmax2, mixmax3],
    },
    github_url: "https://github.com/browne0/spotify-mixmax-slash-command",
    background_color: "#2F2462",
    path: "/mixmax",
  },
  {
    name: "Bee's Design",
    description:
      "A freelance web development company I started when I was seventeen.",
    technologies: ["HTML5/CSS3", "jQuery", "PHP"],
    big_picture: false,
    image_urls: {
      logo: beesdesignLogo,
      screenshots: [beesdesign1, beesdesign2, beesdesign3, beesdesign4],
    },
    github_url: "",
    live_url: "http://beesdesign.net",
    background_color: "#21512A",
    path: "/beesdesign",
  },
  {
    name: "Facts of Today",
    description:
      "An iOS app that given a date, returns different information that happened on the same day in history.",
    technologies: ["Swift", "Objective-C", "Photoshop"],
    big_picture: false,
    image_urls: {
      logo: factsOfTodayLogo,
      screenshots: [
        factsoftoday1,
        "http://is3.mzstatic.com/image/thumb/Purple30/v4/fa/e8/95/fae895bd-287e-3a62-0050-828ac31a348f/source/392x696bb.jpg",
        "http://is4.mzstatic.com/image/thumb/Purple18/v4/b6/80/b0/b680b058-c5ec-98b0-d47d-252b72eba4e9/source/392x696bb.jpg",
        "https://github.com/browne0/FactsOfToday/blob/master/wireframe.png?raw=true",
        "https://github.com/browne0/FactsOfToday/raw/master/factsoftoday-demo.gif",
        "https://github.com/browne0/FactsOfToday/raw/master/factsoftoday-demo-66%25.gif",
        "https://github.com/browne0/FactsOfToday/raw/master/factsOfToday-demo2.gif",
        "http://is5.mzstatic.com/image/thumb/Purple20/v4/7a/50/ef/7a50efab-e4f9-dcfd-dfd8-0302c2c3b383/source/392x696bb.jpg",
        "http://is2.mzstatic.com/image/thumb/Purple30/v4/c0/89/88/c089881f-c065-d6ef-9ff2-32d15f07a304/source/392x696bb.jpg",
      ],
    },
    github_url: "https://github.com/browne0/FactsOfToday",
    live_url:
      "https://itunes.apple.com/us/app/facts-of-today/id1118574083?mt=8",
    background_color: "#fff",
    color: "#5599D7",
    path: "/factsoftoday",
  },
  {
    name: "myChef",
    description:
      "A web application that matches you with local chefs in the nearby area to receive a personalized home cooked meal.",
    technologies: ["HTML5/CSS3", "JavaScript", "jQuery", "PHP/MySQL"],
    big_picture: true,
    image_urls: {
      screenshots: [mychef1],
    },
    github_url: "https://github.com/browne0/myChef",
    live_url: "http://dev.beesdesign.net/mychef",
    path: "/mychef",
    background_color: "#e75967",
  },
  {
    name: "Post Grad Portfolio",
    description:
      "A website used to display my completed projects during college.",
    technologies: ["HTML5/CSS3", "AngularJS", "jQuery"],
    big_picture: false,
    image_urls: {
      logo: oldPortfolioLogo,
      screenshots: [oldportfolio1, oldportfolio2, oldportfolio3],
    },
    github_url: "https://github.com/browne0/browne0.github.io",
    live_url: "https://browne0.github.io",
    path: "/old-portfolio",
    background_color: "#333",
    color: "rgb(194, 77, 1)",
  },
];

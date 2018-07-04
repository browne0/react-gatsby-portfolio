import React, { Component } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { obsidian } from 'react-syntax-highlighter/dist/styles';
import ProjectPage from '../components/ProjectPage/index';
import ProjectSection from '../components/ProjectSection/index';
import PortfolioDelegate from '../utils/PortfolioDelegate';
import SEO from '../components/SEO';

class OldPortfolio extends Component {
	constructor(props) {
		super(props);

		const delegate = new PortfolioDelegate();

		const index = delegate.getProjectIndex('Post Grad Portfolio');

		this.state = {
			project: delegate.projects[index],
		};
	}
	render() {
		return (
			<ProjectPage
				name={this.state.project.name}
				title={this.state.project.name}
				color={this.state.project.color}
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
					url={`https://www.malikbrowne.com/${this.state.project.path.substr(
						1
					)}`}
				/>
				<div className="container">
					<img
						src={this.state.project.image_urls.screenshots[1]}
						alt="Three types of rich links"
						className="pic"
					/>
				</div>
				<ProjectSection title="Background">
					<p>
						This project was the portfolio I used when I first started applying
						for jobs. I originally got inspiration from a popular UX designer's
						portfolio, <a href="http://melaniedaveid.com/">Melanie DaVeid</a>.
					</p>

					<p>
						I thought it was really cool how she had the screen split up into
						two separate parts, and had one side scroll along with the content.
						I took that effect and made it my own for the portfolio.
					</p>
				</ProjectSection>
				<ProjectSection title="Requirements">
					<p>
						At this time, I had become really comfortable with Angular, and I
						wanted to learn how to create single page applications.
					</p>
					<p>
						<b>Two-way data binding blew my mind.</b>
					</p>
					<p>I knew I wanted my portfolio to have three things:</p>

					<ul>
						<li>Home Page</li>
						<li>About Page</li>
						<li>Projects Page</li>
					</ul>

					<p>
						Using bold colors such as orange and green is not common, as they're
						not considered "friendly". In order to combat that, I used a more
						"muted" orange and green, so that the colors seemed more light.
					</p>

					<p>
						In order to save time, I decided to use Bootstrap to take advantage
						of their mobile features.
					</p>

					<p>
						I also wanted to make sure I tried to imitate the effect Melanie
						DaVeid used for the about section.
					</p>
				</ProjectSection>
				<ProjectSection title="Implementation">
					<h6>Creating the Home & Projects Page</h6>
					<p>
						I wanted the home page to be very simple. I'm a big fan of
						minimalist design after all.
					</p>
					<p>
						Using a simple typical effect script called{' '}
						<a href="http://steven.codes/typerjs/">typer.js</a>, I was able to
						get a cool looking typing effect on the home page.
					</p>
					<p>
						The final result for the home page looked very clean, and I was
						definitely happy with it:
					</p>
					<div className="container">
						<img
							src={this.state.project.image_urls.screenshots[1]}
							alt="Home PAge"
						/>
					</div>
					<p>The projects page was slightly different.</p>
					<p>
						In order to follow along with the single page application flow, I
						needed it to change between projects in the same view.
					</p>
					<p>
						I ended up using Angular's ngRoute to direct to different templates
						based on the project the user chose.
					</p>
					<p>Each template followed the same guideline:</p>
					<ol>
						<li>Title</li>
						<li>Screenshot</li>
						<li>Live Site & Github</li>
						<li>Description</li>
						<li>Technologies</li>
					</ol>
					<p>
						Once I had the controllers set up for each individual template, it
						was easy to pass in the data for each project.
					</p>
					<h6>Creating the About Page</h6>
					<p>
						This page was simple - each section had a different "fun fact" about
						me. I wanted each section to fade in as the user scrolled near the
						section.
					</p>
					<p>
						In order to do this, I used{' '}
						<a href="http://imakewebthings.com/waypoints/">jQuery Waypoints</a>.
					</p>
					<p>The code to set that up is very simple:</p>

					<SyntaxHighlighter
						showLineNumbers
						language="javascript"
						style={obsidian}
					>
						{`// app.js
$('.funfact').css('opacity', 0)
$('.animated').waypoint(function() {
  $(this).toggleClass($(this).data('animated'));
  $(this).css('opacity', 1)
},{ offset: '100%', triggerOnce: true });       

//...            `}
					</SyntaxHighlighter>

					<p>The final result ends up looking really slick:</p>

					<div className="container">
						<img
							src={this.state.project.image_urls.screenshots[2]}
							alt="About Page"
						/>
					</div>

					<p>
						Another popular feature of single page applications is smooth
						scrolling from section to section when clicking links in the
						navigation bar.
					</p>

					<p>
						This is pretty simple to do with jQuery and a little bit of Regex:
					</p>

					<SyntaxHighlighter
						showLineNumbers
						language="javascript"
						style={obsidian}
					>
						{`$(function() {
  // This will select everything with the class smoothScroll
  // This should prevent problems with carousel, scrollspy, etc...
  $('.link').click(function() {
    if (location.pathname.replace(/^\\//, '') == this.pathname.replace(/^\\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000); // The number here represents the speed of the scroll in milliseconds
        return false;
      }
    }
  });
});        `}
					</SyntaxHighlighter>
				</ProjectSection>
				<ProjectSection title="Project Challenges">
					<p>
						The hardest part of this project was imitating the scrolling effect
						that Melanie DaVeid did. I wasn't able to get it perfect, but I got
						it pretty close.
					</p>

					<p>
						This project was an awesome precursor into Angular and it helped me
						learn how powerful JavaScript can be if used correctly.
					</p>

					<p>Some things that I learned a lot about on this project were:</p>

					<ul>
						<li>Angular Templates and Directives</li>
						<li>Angular's ngRoute</li>
						<li>Building a basic single page application</li>
						<li>Layout and Color Theory</li>
					</ul>
				</ProjectSection>
			</ProjectPage>
		);
	}
}

export default OldPortfolio;

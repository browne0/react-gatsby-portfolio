import React, { Component } from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import Section from '../components/AboutSection';
import Footer from '../components/AboutFooter';
import SEO from '../components/SEO';

class About extends Component {
	constructor(props) {
		super(props);
		const lastIndex = props.data.allContentfulPost.edges.length - 1;
		this.state = {
			blog: props.data.allContentfulPost.edges[lastIndex].node,
		};
	}

	render() {
		return (
			<div className="About">
				<SEO
					title="About | Malik Browne"
					description="Find out more about Malik Browne, a front end engineer with a strong desire to produce high quality websites and online tools, bundled with an exceptional user experience."
					image="/selfie/about_bg3.jpg"
					url="https://www.malikbrowne.com/about"
				/>
				<div className="hero-wrapper">
					<div
						className="hero"
						ref={elem => {
							this.blurredEl = elem;
						}}
					>
						<div className="hero-text">
							<h1>
								Hi, I'm <span>Malik.</span>
							</h1>
							<h2>I'm a Full Stack Engineer at Meetup,</h2>
							<h2>and a UX/Mobile Development hobbyist.</h2>
						</div>
					</div>
				</div>
				<Section title={`"Creativity is a breed of history and perspective."`}>
					<p>
						I've realized that anything innovative has stemmed from an original
						idea that someone else had. Taking something that is great, and
						remaking into something that is your own is an amazing feeling, and
						that's why I've fallen in love with web development.
					</p>
				</Section>
				<Section title="A little about me">
					<p>
						I am currently a <b>Full Stack Engineer at Meetup</b>. I work on the
						core Meetup product - aka the Groups team, and work on everything
						from new product features to exploring new platform integrations for
						our web engineers.
					</p>
					<p>
						The story of how I came across web development is actually quite
						interesting. It began all the way back when I was fifteen when I
						first learned about it at a computer camp in New York. If you want
						the full story, check out the video below.
					</p>

					<iframe
						title="How I became a web developer in 2017"
						src="https://www.youtube.com/embed/aIznyaLbtdQ"
						frameBorder="0"
						allowFullScreen
					/>

					<p>
						Outside of that, I love to read, play my ukulele, and play
						intramural sports. As of late, I am exploring the daunting world of
						writing.
					</p>
				</Section>
				<Section title="Technologies and Mantra">
					<p>
						My expertise and interests lie mostly in front-end technologies,
						including HTML5, CSS3, and JavaScript as well as popular JavaScript
						libraries such as React and NodeJS, and frameworks like Angular and
						Ember.
					</p>

					<p>
						Most of my initial server side skills stemmed from PHP, but after
						using NodeJS for a bit, and after a ton of time growing as a
						developer I've started to appreciate{' '}
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://medium.com/@cscalfani/so-you-want-to-be-a-functional-programmer-part-1-1f15e387e536"
						>
							functional programming
						</a>{' '}
						even more which has led me to explore languages like Scala and
						Elixir.
					</p>

					<p>
						My mantra is <b>Keep it Sleek, but Simple</b>. Human nature leads us
						as consumers to take the path of least resistance. This is why
						finding the motivation to go the gym, sticking to a diet, or
						learning a new technology can seem like such an <b>arduous task</b>.{' '}
					</p>

					<p>
						The key to creating awesome user experiences does not lie with the
						flashiness or the "glam" a website provides, but rather{' '}
						<b>
							the ease of access to your site for someone who's never visited
							before
						</b>.{' '}
					</p>

					<img
						className="gif"
						src="https://media.giphy.com/media/Oy9kJMlIHzOVi/giphy.gif"
						alt="It's law."
					/>

					<p>
						Create designs that are simple and replicate the world you live in,
						and visitors will feel a sense of serenity. and maybe even a sense
						of amazement about why your website is so pleasing to use. Google
						talks about this extensively in their Material Design guidelines.
					</p>

					<p>
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://material.io/guidelines/material-design/introduction.html"
						>
							I highly recommend you check it out.
						</a>
					</p>
				</Section>
				<Section className="about-section-last" title="Contact Me">
					<p>
						If you want to contact me, I'm pretty easy to reach, I mean,{' '}
						<Link to="/contact">there is a contact page after all.</Link>
					</p>
					<p>
						If you want to see what I'm up to,{' '}
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://twitter.com/milkstarz"
						>
							follow me on Twitter
						</a>{' '}
						for updates on projects I'm working on and my opinions on things
						going on with web development, entrepreneurship, and sometimes even
						finance.
					</p>
				</Section>
				<Footer blog={this.state.blog} />
			</div>
		);
	}
}

About.propTypes = {
	data: PropTypes.object.isRequired,
};

export default About;

export const pageQuery = graphql`
	query latestBlogQuery {
		allContentfulPost {
			edges {
				node {
					title {
						title
					}
					slug
					author {
						name
						twitter
						profilePhoto {
							file {
								url
							}
						}
					}
					description {
						description
					}
					body {
						body
					}
					featuredImage {
						file {
							url
						}
					}
					date
					comments
				}
			}
		}
	}
`;

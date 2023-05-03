import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PortfolioDelegate from '../../utils/PortfolioDelegate';
import Button from '../../components/ThemedButton';
import ProjectSection from '../../components/ProjectSection';
import ProjectFooter from '../../components/ProjectFooter';

class ProjectPage extends Component {
// @ts-expect-error TS(7006): Parameter 'props' implicitly has an 'any' type.
	constructor(props) {
		super(props);

		const projects = new PortfolioDelegate();

		this.state = {
// @ts-expect-error TS(2339): Property 'name' does not exist on type 'Readonly<{... Remove this comment to see the full error message
			nextProj: projects.getNextProject(this.props.name),
		};
	}
	static propTypes = {
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		title: PropTypes.string,
		technologies: PropTypes.array,
		github: PropTypes.string,
		liveUrl: PropTypes.string,
		bigPicture: PropTypes.bool,
		color: PropTypes.string,
		bgColor: PropTypes.string,
		images: PropTypes.array,
		children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	};

	static defaultProps = {
		name: '',
		description: undefined,
		github: undefined,
		liveUrl: undefined,
	};

	componentDidMount() {
// @ts-expect-error TS(2339): Property 'title' does not exist on type 'Readonly<... Remove this comment to see the full error message
		document.title = `${this.props.title} | Malik Browne`;
	}

	render() {
		const {
// @ts-expect-error TS(2339): Property 'technologies' does not exist on type 'Re... Remove this comment to see the full error message
			technologies,
// @ts-expect-error TS(2339): Property 'github' does not exist on type 'Readonly... Remove this comment to see the full error message
			github,
// @ts-expect-error TS(2339): Property 'liveUrl' does not exist on type 'Readonl... Remove this comment to see the full error message
			liveUrl,
// @ts-expect-error TS(2339): Property 'bigPicture' does not exist on type 'Read... Remove this comment to see the full error message
			bigPicture,
// @ts-expect-error TS(2339): Property 'color' does not exist on type 'Readonly<... Remove this comment to see the full error message
			color,
// @ts-expect-error TS(2339): Property 'bgColor' does not exist on type 'Readonl... Remove this comment to see the full error message
			bgColor,
// @ts-expect-error TS(2339): Property 'description' does not exist on type 'Rea... Remove this comment to see the full error message
			description,
// @ts-expect-error TS(2339): Property 'name' does not exist on type 'Readonly<{... Remove this comment to see the full error message
			name,
// @ts-expect-error TS(2339): Property 'images' does not exist on type 'Readonly... Remove this comment to see the full error message
			images,
			children,
		} = this.props;

// @ts-expect-error TS(7006): Parameter 'tech' implicitly has an 'any' type.
		const listOfTechnologies = technologies.map(tech => (
			<li key={tech}>{tech}</li>
		));
		const style = {
			button: {
				display: 'inline-block',
				padding: '10px 10px 10px 0px',
			},
			img: {
				maxHeight: '500px',
			},
		};
		const githubButton = github ? (
			<div style={style.button}>
				<Button target="_blank" label="Github" url={github} />
			</div>
		) : null;
		const liveUrlButton = liveUrl ? (
			<div style={style.button}>
				<Button target="_blank" label="Live Demo" url={liveUrl} />
			</div>
		) : null;
		const screenshotClass = bigPicture ? 'screenshot-big-picture' : null;

		return (
			<div className={`project`}>
				<div className="wrapper">
					<div className="hero">
						<h2
							style={{
								color: color || bgColor,
							}}
						>
							{name}
						</h2>
						<p>{description}</p>
					</div>
					<ProjectSection style={{ margin: '0px auto 20px auto' }}>
						{githubButton}
						{liveUrlButton}
					</ProjectSection>
					{bigPicture && (
						<div
// @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
							className={screenshotClass}
							style={{ backgroundImage: `url(${images[0]})` }}
						/>
					)}
					{children}
					<ProjectSection title="Technologies Used">
						<ul>{listOfTechnologies}</ul>
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
// @ts-expect-error TS(2339): Property 'nextProj' does not exist on type 'Readon... Remove this comment to see the full error message
						nextProject={this.state.nextProj}
					/>
				</div>
			</div>
		);
	}
}

export default ProjectPage;

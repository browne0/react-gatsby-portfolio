import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PortfolioDelegate from '../../utils/PortfolioDelegate';
import Button from '../../components/ThemedButton';
import ProjectSection from '../../components/ProjectSection';
import ProjectFooter from '../../components/ProjectFooter';

class ProjectPage extends Component {
	constructor(props) {
		super(props);

		const projects = new PortfolioDelegate();

		this.state = {
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
		document.title = `${this.props.title} | Malik Browne`;
	}

	render() {
		const {
			technologies,
			github,
			liveUrl,
			bigPicture,
			color,
			bgColor,
			description,
			name,
			images,
			children,
		} = this.props;

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
						nextProject={this.state.nextProj}
					/>
				</div>
			</div>
		);
	}
}

export default ProjectPage;

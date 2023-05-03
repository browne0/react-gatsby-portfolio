import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const ProjectFooter = (props: any) => {
	const style = {
		container: {
			backgroundColor: props.currentProject.color
				? props.currentProject.color
				: props.currentProject.bgColor,
			minHeight: props.currentProject.name === 'Spotter' ? '40vh' : '30vh',
		},
	};
	const className =
		props.nextProject.name === 'Spotify Mixmax Integration' ? null : 'pic';
	return (
		<div className="project-footer" style={style.container}>
			<div className="footer-container">
				<div className="next-project-info">
					<h2>Enjoyed the case study? Check out this project:</h2>
					<h3>{props.nextProject.name}</h3>
					<h4>{props.nextProject.description}</h4>
				</div>
				<div className="next-project-image">
					<div className="inner">
						<p>Up Next:</p>
// @ts-expect-error TS(2786): 'Link' cannot be used as a JSX component.
						<Link to={props.nextProject.path}>
							<img
// @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
								className={className}
								src={props.nextProject.image_urls.screenshots[0]}
								alt={props.nextProject.name}
							/>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

ProjectFooter.propTypes = {
	currentProject: PropTypes.object.isRequired,
	nextProject: PropTypes.object.isRequired,
};

export default ProjectFooter;

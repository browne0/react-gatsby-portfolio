import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

type Props = {
	blog: {
		slug: string;
		title: {
			title: string;
		};
		description: {
			description: string;
		};
		featuredImage: {
			file: {
				url: string;
			};
		};
	};
};
const AboutFooter = (props: Props) => {
	const style = {
		container: {
			backgroundColor: 'rgb(194, 77, 1)',
			minHeight: '30vh',
		},
	};
	const className = 'pic';
	const path = `/blog/${props.blog.slug}`;
	return (
		<div className="about-footer" style={style.container}>
			<div className="footer-container">
				<div className="next-post-info">
					<h2>Check out my latest blog post:</h2>
					<h3>{props.blog.title.title}</h3>
					<h4>{props.blog.description.description}</h4>
				</div>
				<div className="next-post-image">
					<div className="inner">
						<p>Read More:</p>
// @ts-expect-error TS(2786): 'Link' cannot be used as a JSX component.
						<Link to={path}>
							<img
								className={className}
								src={props.blog.featuredImage.file.url}
								alt={props.blog.title.title}
							/>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

AboutFooter.propTypes = {
	blog: PropTypes.object.isRequired,
};

export default AboutFooter;

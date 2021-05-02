import React from 'react';

const AboutSection: React.ComponentType<{
	className?: string;
	title: string;
}> = (props) => {
	const className = props.className
		? `about-section ${props.className}`
		: 'about-section';
	return (
		<section className={className}>
			<h4>{props.title}</h4>
			<div className="section-content">{props.children}</div>
		</section>
	);
};

AboutSection.defaultProps = {
	className: '',
};

export default AboutSection;

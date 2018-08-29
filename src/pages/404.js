import React from 'react';
import { Link } from 'gatsby';

const NotFound = () => {
	const style = {
		button: {
			display: 'inline-block',
			padding: '10px 10px 10px 0px',
		},
	};
	return (
		<div className="NotFound">
			<div className="cover">
				<h1>
					Page not found <small>Error 404</small>
				</h1>
				<p className="lead">
					Oops! I couldn't find the page you were looking for.
				</p>
				<img
					src="https://media.giphy.com/media/l41lFw057lAJQMwg0/giphy.gif"
					alt="Not found"
				/>

				<div className="back-to-home" style={style.button}>
					<Link to="/">Back to Home</Link>
				</div>
			</div>
		</div>
	);
};

export default NotFound;

import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import 'github-markdown-css';

import '../styles/base.scss';

import MaterialTheme from './MainWrapper';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const propTypes = {
	children: PropTypes.object.isRequired,
};

class DefaultLayout extends Component {
	render() {
		return (
			<MaterialTheme>
				<div className="site">
					<Navbar location={this.props.location} />
					<main>{this.props.children}</main>
					<Footer />
				</div>
			</MaterialTheme>
		);
	}
}

DefaultLayout.propTypes = propTypes;

export default DefaultLayout;

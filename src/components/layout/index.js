import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import 'github-markdown-css';

import MaterialTheme from './MainWrapper';
import Navbar from '../Navbar';
import Footer from '../Footer';

import './base.scss';

const propTypes = {
	children: PropTypes.func.isRequired,
};

class DefaultLayout extends Component {
	render() {
		return (
			<MaterialTheme>
				<div className="site">
					<Navbar />
					<main>{this.props.children}</main>
					<Footer />
				</div>
			</MaterialTheme>
		);
	}
}

DefaultLayout.propTypes = propTypes;

export default DefaultLayout;

export const withLayout = (Page) => {
	return class extends Component {
		render() {
			return (
				<DefaultLayout>
					<Page {...this.props} />
				</DefaultLayout>
			);
		}
	};
};

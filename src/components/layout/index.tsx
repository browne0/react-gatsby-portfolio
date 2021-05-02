import React from 'react';
import 'github-markdown-css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Navbar from '../Navbar';
import Footer from '../Footer';

import './base.scss';

const DefaultLayout: React.ComponentType = (props) => {
	return (
		<MuiThemeProvider>
			<div className="site">
				<Navbar />
				<main>{props.children}</main>
				<Footer />
			</div>
		</MuiThemeProvider>
	);
};

export const withLayout = (Page: React.ComponentType) => {
	return (props: any) => (
		<DefaultLayout>
			<Page {...props} />
		</DefaultLayout>
	);
};

import React from 'react';
import 'github-markdown-css';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'mate... Remove this comment to see the full error message
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

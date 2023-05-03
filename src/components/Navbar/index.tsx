import React from 'react';

// @ts-expect-error TS(7016): Could not find a declaration file for module 'mate... Remove this comment to see the full error message
import AppBar from 'material-ui/AppBar';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'mate... Remove this comment to see the full error message
import { Tabs, Tab } from 'material-ui/Tabs';
import { navigate } from 'gatsby';
import { Location } from '@reach/router';
import { Link } from 'gatsby';

import logo from '../../images/logos/malikbrowne_logo.png';

const Navbar: React.ComponentType = () => {
	const title = (
// @ts-expect-error TS(2786): 'Link' cannot be used as a JSX component.
		<Link to="/" className="logo-wrapper">
			<img className="logo" src={logo} alt="Malik Browne" />
			<div className="title">
				<h1>MALIK BROWNE</h1>
				<h2>FRONT END ENGINEER &amp; UX ENTHUSIAST</h2>
			</div>
		</Link>
	);

	const styles = {
		tabs: {
			backgroundColor: 'rgba(33,35,41,1)',
			boxShadow:
				'rgba(0, 0, 0, 0.24) 0px 1px 6px, rgba(0, 0, 0, 0.24) 0px 1px 4px',
			overflow: 'hidden',
			title: {
				width: '400px',
			},
			tab: {
				gridColumn: '',
				height: '100%',
				backgroundColor: 'rgba(33,35,41,1)',
			},
			inkBar: {
				backgroundColor: '#ff6000',
			},
		},
	};

	return (
		<Location>
			{({ location }) => (
				<header>
					<AppBar
						title={title}
						style={styles.tabs}
						titleStyle={styles.tabs.title}
						showMenuIconButton={false}
						className="navbar"
					>
						<Tabs
							tabItemContainerStyle={styles.tabs.tab}
							inkBarStyle={styles.tabs.inkBar}
							value={location.pathname}
							className="nav-items"
						>
							<Tab
								label="About"
								onActive={() => navigate('/about')}
								value="/about"
								className="nav-item"
							/>
							<Tab
								label="Blog"
								onActive={() => navigate('/blog')}
								value="/blog"
								className="nav-item"
							/>
							<Tab
								label="Contact"
								onActive={() => navigate('/contact')}
								value="/contact"
								className="nav-item"
							/>
						</Tabs>
					</AppBar>
				</header>
			)}
		</Location>
	);
};

export default Navbar;

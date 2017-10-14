import React, { Component } from "react";

import AppBar from "material-ui/AppBar";
import { Tabs, Tab } from "material-ui/Tabs";

import { navigateTo } from "gatsby-link"
import { withRouter } from "react-router-dom"
import logo from "../../images/logos/malikbrowne_logo.png"

class Navbar extends Component {
  onTabClick = tab => {
    let lowerCaseRoute = tab.props.label.toLowerCase();
    navigateTo(lowerCaseRoute)
  };

  onTitleClick = () => {
    navigateTo("/")
  };

  render() {
    const title = (
      <div className="logo-wrapper">
        <img
          className="logo"
          src={logo}
          alt="Malik Browne"
        />
        <div className="title">
          <h1>MALIK BROWNE</h1>
          <h2>FRONT END ENGINEER & UX ENTHUSIAST</h2>
        </div>
      </div>
    );

    const styles = {
      tabs: {
        backgroundColor: "rgba(33,35,41,1)",
        boxShadow:
          "rgba(0, 0, 0, 0.24) 0px 1px 6px, rgba(0, 0, 0, 0.24) 0px 1px 4px",
        overflow: "hidden",
        title: {
          width: "400px"
        },
        tab: {
          gridColumn: "",
          height: "100%",
          backgroundColor: "rgba(33,35,41,1)"
        },
        inkBar: {
          backgroundColor: "#ff6000"
        }
      }
    };

    let { location } = this.props;

    return (
      <header>
        <AppBar
          onTitleTouchTap={this.onTitleClick}
          title={title}
          style={styles.tabs}
          titleStyle={styles.title}
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
              onActive={this.onTabClick}
              value="/about"
              className="nav-item"
            />
            <Tab
              label="Blog"
              onActive={this.onTabClick}
              value="/blog"
              className="nav-item"
            />
            <Tab
              label="Contact"
              onActive={this.onTabClick}
              value="/contact"
              className="nav-item"
            />
          </Tabs>
        </AppBar>
      </header>
    );
  }
}

export default withRouter(Navbar);
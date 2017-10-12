import React, { Component } from "react";
import Link from "gatsby-link";
import * as PropTypes from "prop-types";
import MaterialTheme from "./MainWrapper";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "github-markdown-css";

import "./base.scss";

const propTypes = {
  children: PropTypes.func.isRequired
};

class DefaultLayout extends Component {
  render() {
    return (
      <MaterialTheme>
        <div className="site">
          <Navbar />
              <main>{this.props.children()}</main>
          <Footer />
        </div>
      </MaterialTheme>
    );
  }
}

DefaultLayout.propTypes = propTypes;

export default DefaultLayout;

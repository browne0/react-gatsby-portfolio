import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default ({ children }) => (
  <MuiThemeProvider>
    {children}
  </MuiThemeProvider>
);
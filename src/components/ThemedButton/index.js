import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import PropTypes from "prop-types";

const ThemedButton = props => {
  let style = {
    button: {
      minWidth: '94px'
    },
    label: {
      fontSize: '1.1em'
    },
    buttonContainer: {
      padding: '5px 0px',
      height: 'auto',
    }
  }
  return (
    <RaisedButton
      style={style.button}
      buttonStyle={style.buttonContainer}
      containerElement={props.containerElement}
      label={props.label}
      className={props.className}
      labelStyle={style.label}
      backgroundColor="rgb(194, 77, 1)"
      labelColor="#fff"
      href={props.url}
      target={props.target}
      disabled={props.disabled}
    >
      {props.children}
    </RaisedButton>
  );
};

ThemedButton.propTypes = {
  label: PropTypes.string,
  url: PropTypes.string,
  disabled: PropTypes.bool
};

ThemedButton.defaultProps = {
  label: ""
};

export default ThemedButton;
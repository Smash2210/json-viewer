import React from 'react';
import { connect } from "react-redux";
import * as actions from "../../redux/actions/coreActions";
import { NavLink } from "react-router-dom";

function Header(props) {

  const { toggleDropDown, showDropdown } = props;

  const toggleNavDropdown = () => {
    toggleDropDown();
  }

  return (
    <nav className="navbar" role="navigation">
      <div className="navbar-brand">
        <h2 className="navbar-item" style={{ color: "blue" }}>
          JSON Viewer
        </h2>
        <a className="navbar-burger" data-target="navbarBasicExample" onClick={toggleNavDropdown}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample" className={`navbar-menu ${showDropdown ? 'is-active' : ''}`}>
        <div className="navbar-start">
          <NavLink className="navbar-item" to="/" exact>
            Home
            </NavLink>
          <NavLink className="navbar-item" to="/about">
            About
            </NavLink>
        </div>
      </div>
    </nav>
  )
};

export default connect(
  (state) => ({
    showDropdown: state.core.showDropdown
  }),
  {
    toggleDropDown: actions.toggleDropDown
  }
)(Header)

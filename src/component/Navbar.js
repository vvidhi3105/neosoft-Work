import React from "react";
import { Link, Navigate } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div id="header-content">
        <div id="logo-brand">
          <Link to="/">
            <b>Neosoft work</b>
          </Link>
        </div>
        <div id="menu-data">
          <Link to="/">Home</Link>
          <Link to="/addNewRecord">Add New List</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

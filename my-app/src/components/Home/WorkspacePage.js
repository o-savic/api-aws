import React, { useEffect } from 'react';
import NavigationBar from '../NavigationBar'
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getWorkspace } from "../../Store/actions/home"

const Workspace = ({ }) => {
  const workspace = localStorage.getItem("workspace");
  const newText = workspace.split('\n').map(str => <p>{str}</p>);
  return (
    <div>
      <NavigationBar></NavigationBar>
      <div style={{ marginLeft: '750px' }}>
        <h1><u> Workspace </u></h1>
        {newText}
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
});

export default withRouter(connect(mapStateToProps, {})(Workspace));

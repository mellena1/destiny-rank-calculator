import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";

import { Destiny } from "./destiny/destiny";

import "./App.css";
import githubLogo1x from "./GitHub-Mark-Light-32px.png";
import githubLogo2x from "./GitHub-Mark-Light-64px.png";
import githubLogo4x from "./GitHub-Mark-Light-128px.png";

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Destiny Rank Calculator</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="githubLink">
            <a href="https://github.com/mellena1/destiny-rank-calculator"><Image fluid src={githubLogo1x} srcSet={`${githubLogo1x} 1x,${githubLogo2x} 2x,${githubLogo4x} 4x`} alt="Link to Github Repo" /></a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <br />
      <Destiny />
    </div>
  );
}

export default App;

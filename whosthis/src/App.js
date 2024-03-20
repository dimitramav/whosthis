import "./sass/main.scss";
import CameraStreamer from "./components/CameraStreamer";
import Context from "./Context";

import fullLogo from "./assets/full-logo.png";
import InfoPanel from "./components/InfoPanel.js";
import { useState } from "react";
function App() {
  const [name, setName] = useState("");

  return (
    <Context.Provider
      value={{
        name,
        setName,
      }}
    >
      <div className="container-fluid">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="#">
            <img src={fullLogo} alt="" heigth="50%" width="50%" />
          </a>
        </nav>
        <div className="container-fluid main-body">
          <div className="row ">
            <div className="col-1"></div>
            <InfoPanel></InfoPanel>
            <div className="col-1"></div>
            <CameraStreamer></CameraStreamer>
            <div className="col-1"></div>
            <div className="col-3"></div>
          </div>
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;

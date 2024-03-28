import "./sass/main.scss";
import CameraDetectionStreamer from "./components/CameraDetectionStreamer";
import CameraIdentificationStreamer from "./components/CameraIdentificationStreamer";
import Context from "./Context";

import fullLogo from "./assets/full-logo.png";
import InfoPanel from "./components/InfoPanel.js";
import { useState } from "react";
function App() {
  const [name, setName] = useState("");
  const [selectedModel, setSelectedModel] = useState("model-1");
  const [prediction, setPrediction] = useState(undefined);
  return (
    <Context.Provider
      value={{
        name,
        setName,
        selectedModel,
        setSelectedModel,
        prediction,
        setPrediction,
      }}
    >
      <div className="container-fluid">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="#">
            <img src={fullLogo} alt="" heigth="50%" width="50%" />
          </a>
        </nav>
        <div className="container main-body">
          <div className="row  justify-content-start">
            <InfoPanel></InfoPanel>
            <div className="col-1"></div>
            <CameraDetectionStreamer></CameraDetectionStreamer>
            <div className="col-1"></div>
            <CameraIdentificationStreamer></CameraIdentificationStreamer>
          </div>
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;

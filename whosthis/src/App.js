import "./sass/main.scss";
import CameraStreamer from "./CameraStreamer";
import fullLogo from "./assets/full-logo.png";
import Users from "./Users.js";
function App() {
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img src={fullLogo} alt="" heigth="50%" width="50%" />
        </a>
      </nav>
      <div className="container-fluid main-body">
        <div className="row ">
          <div className="col-1"></div>
          <Users></Users>
          <div className="col-1"></div>
          <CameraStreamer></CameraStreamer>
          <div className="col-1"></div>
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
}

export default App;

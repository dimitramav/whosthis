import "./sass/main.scss";
import CameraStreamer from "./CameraStreamer";
import fullLogo from "./assets/full-logo.png";
function App() {
  return (
    <div className="container-fluid">
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="#">
          <img src={fullLogo} alt="" heigth="50%" width="50%" />
        </a>
      </nav>
      <CameraStreamer></CameraStreamer>
    </div>
  );
}

export default App;

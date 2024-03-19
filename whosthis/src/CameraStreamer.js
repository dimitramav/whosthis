import React, { useEffect, useState } from "react";
import faceidGIF from "./assets/face-id.gif";

const CameraStreamer = () => {
  const [streamVideo, setStreamVideo] = useState(false);
  const streamCamVideo = () => {
    var constraints = {
      video: true,
    };
    console.log(navigator.mediaDevices);
    setStreamVideo(true);

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        var video = document.querySelector("video");

        if (video) {
          video.srcObject = mediaStream;
          video.onloadedmetadata = function (e) {
            video.play();
          };
        } else {
          console.error("Video element not found");
        }
      })
      .catch((err) => {
        console.error(err.name + ": " + err.message);
      }); // always check for errors at the end.
  };

  useEffect(() => {
    // Cleanup function
    return () => {
      // Stop the video stream when the component unmounts
      const video = document.querySelector("video");
      if (video && video.srcObject) {
        const tracks = video.srcObject.getTracks();
        tracks.forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  const button = (
    <div align="center">
      <button
        type="button"
        className="btn btn-primary btn-lg main"
        onClick={streamCamVideo}
      >
        <h4>Identify User</h4>
      </button>
    </div>
  );
  return (
    <div className="col-3 main-placeholder">
      {streamVideo ? (
        <div className=" video-placeholder" align="center">
          {" "}
          <video
            style={{ width: "inherit", height: 520 }}
            autoPlay={true}
            id="videoElement"
            controls
          ></video>
          <b className="text-danger Blink">&#11044;</b>
        </div>
      ) : (
        <div className=" gif-placeholder" align="center">
          <img src={faceidGIF}></img>
        </div>
      )}
      {button}
    </div>
  );
};

export default CameraStreamer;

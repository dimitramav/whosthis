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

  return (
    <>
      <div className="container">
        <div className="row p-5">
          <div class="col"></div>
          {streamVideo ? (
            <div class="col  video-placeholder">
              {" "}
              <video
                style={{ width: "inherit", height: 590 }}
                autoPlay={true}
                id="videoElement"
                controls
              ></video>
            </div>
          ) : (
            <div class="col gif-placeholder">
              <img src={faceidGIF}></img>
            </div>
          )}
          <div class="col"></div>
        </div>
        <div className="row">
          <div class="col"></div>
          <div class="col" align="center">
            <button
              type="button"
              class="btn btn-primary btn-lg main"
              onClick={streamCamVideo}
            >
              <h4>Identify User</h4>
            </button>
          </div>
          <div class="col"></div>
        </div>
      </div>
    </>
  );
};

export default CameraStreamer;

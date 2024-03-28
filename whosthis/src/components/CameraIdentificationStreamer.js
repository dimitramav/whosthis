import React, { useEffect, useState, useContext } from "react";
import users from "../assets/users.avif";
import Context from "../Context";
const CameraIdentificationStreamer = () => {
  const [streamVideo, setStreamVideo] = useState(false);
  const { prediction, name } = useContext(Context);

  const streamCamVideo = () => {
    //start timer
    var constraints = {
      video: true,
    };
    console.log(navigator.mediaDevices);
    setStreamVideo(true);

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        var video = document.querySelector("video");
        console.log(video);

        if (video) {
          video.srcObject = mediaStream;
          video.onloadedmetadata = function (e) {
            video.play();
            performObjectDetection(video);
          };
        } else {
          console.error("Video element not found");
        }
      })
      .catch((err) => {
        console.error(err.name + ": " + err.message);
      }); // always check for errors at the end.
  };
  const stopStream = () => {
    const video = document.querySelector("video");

    if (video && video.srcObject) {
      const tracks = video.srcObject.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    }
    setStreamVideo(false);
  };

  const performObjectDetection = (video) => {
    // Mock object detection results (bounding box coordinates)
    const detection = { x: 10, y: 20, width: 100, height: 50 };

    var canvas = document.querySelector("#videoCanvas");
    var ctx = canvas.getContext("2d");
    // ctx.drawImage(video, 0, 0, 100, 100);

    ctx.rect(detection.x, detection.y, detection.width, detection.height);
    ctx.lineWidth = "2";
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.font = "15px Roboto";
    ctx.fillStyle = "#000000";
    const textWidth = ctx.measureText(name).width; // Increase the width (stretch factor)
    const textX = detection.x + (detection.width - textWidth) / 2;
    const textY = detection.y; // Adjust for text padding from the top of the box
    ctx.fillText(name, textX, textY);

    // Request next frame for real-time object detection
    // requestAnimationFrame(() => performObjectDetection(video));
  };

  useEffect(() => {
    // Cleanup function
    return () => {
      // Stop the video stream when the component unmounts
      stopStream();
    };
  }, []);

  return (
    <div className="col-4 main-placeholder">
      <div align="center">
        <h3>STEP 3: IDENTIFY USER</h3>
      </div>
      {streamVideo ? (
        <div className=" video-placeholder" align="center">
          {" "}
          <video
            style={{ width: "inherit", height: 520 }}
            autoPlay={true}
            id="videoElement"
            controls
          ></video>
          <canvas
            id="videoCanvas"
            style={{ width: "inherit", height: 520 }}
          ></canvas>
        </div>
      ) : (
        <div className=" gif-placeholder" align="center">
          <img src={users} alt="users"></img>
        </div>
      )}
      <div align="center">
        <button type="button" class="btn btn-primary" onClick={streamCamVideo}>
          <h4>Identify {name}</h4>
        </button>
      </div>
    </div>
  );
};

export default CameraIdentificationStreamer;

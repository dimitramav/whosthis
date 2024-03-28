import React, { useEffect, useState, useContext, useRef } from "react";
import faceidGIF from "../assets/face-id.gif";
import Context from "../Context";
const CameraDetectionStreamer = () => {
  const [streamDetection, setStreamDetection] = useState(false);
  const { name, prediction, setPrediction } = useContext(Context);
  const Ref = useRef(null);
  const [timer, setTimer] = useState("00:00:30");

  const streamCamVideo = () => {
    //start timer
    clearTimer(getDeadTime());
    var constraints = {
      video: true,
    };
    console.log(navigator.mediaDevices);
    setStreamDetection(true);

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((mediaStream) => {
        var video = document.querySelector("video");
        console.log(video);

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
  const stopStream = () => {
    const video = document.querySelector("video");

    if (video && video.srcObject) {
      const tracks = video.srcObject.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    }
    setStreamDetection(false);
  };

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    } else {
      setPrediction(true);
      stopStream();
    }
  };

  const clearTimer = (e) => {
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 30); //30 seconds countdown
    return deadline;
  };

  useEffect(() => {
    // Cleanup function
    return () => {
      // Stop the video stream when the component unmounts
      stopStream();
    };
  }, []);

  useEffect(() => {
    if (name === "") {
      setPrediction(undefined);
    }
  }, [name]);

  let footer;

  if (name !== "" && !streamDetection) {
    if (prediction !== undefined) {
      footer = (
        <div className="footer">
          <h4>
            <span className="primary-color">{name}</span> has been detected
          </h4>
          <i class="bi bi-check-circle primary-color"></i>{" "}
        </div>
      );
    } else {
      footer = (
        <div align="center">
          <button
            type="button"
            class="btn btn-primary"
            onClick={streamCamVideo}
          >
            <h4>Detect {name}</h4>
          </button>
        </div>
      );
    }
  } else {
    footer = (
      <div align="center">
        <button type="button" style={{ visibility: "hidden" }}>
          <h4>Detect {name}</h4>
        </button>
      </div>
    );
  }

  return (
    <div className="col-4 main-placeholder">
      <div align="center">
        <h3>STEP 2: DETECT USER</h3>
      </div>
      {streamDetection ? (
        <div className=" video-placeholder" align="center">
          {" "}
          <video
            style={{ width: "inherit", height: 520 }}
            autoPlay={true}
            id="videoElement"
            controls
          ></video>
          <span className="timer">
            {timer}
            <b className="text-danger Blink">&#11044;</b>
          </span>
        </div>
      ) : (
        <div className=" gif-placeholder" align="center">
          <img src={faceidGIF} alt="face ID"></img>
        </div>
      )}
      {footer}
    </div>
  );
};

export default CameraDetectionStreamer;

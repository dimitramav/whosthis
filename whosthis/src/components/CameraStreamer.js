import React, { useEffect, useState, useContext, useRef } from "react";
import faceidGIF from "../assets/face-id.gif";
import Context from "../Context";
//import * as cocoSsd from '@tensorflow-models/coco-ssd';

require('@tensorflow/tfjs-backend-cpu');
require('@tensorflow/tfjs-backend-webgl');
const blazeface = require('@tensorflow-models/blazeface');


const CameraStreamer = () => {

    const [prediction, setPrediction] = useState(undefined);
    const [streamVideo, setStreamVideo] = useState(false);
    const [userIdentified, setUserIdentified] = useState(false);
    const { name } = useContext(Context);
    const Ref = useRef(null);
    const [timer, setTimer] = useState("00:00:30");

    const [model, setModel] = useState(null);
    const [isModelLoaded, setIsModelLoaded] = useState(false);

    const [videoSrc, setVideoSrc] = useState(undefined);


    const drawBoxes = () => {

        //const detection = { x: 10, y: 20, width: 100, height: 50 };
        const detection = {
            x: prediction[0].topLeft[0],
            y: prediction[0].topLeft[1],
            width: prediction[0].bottomRight[0] - prediction[0].topLeft[0],
            height: prediction[0].bottomRight[1] - prediction[0].topLeft[1]
        };

        console.log("TO DETECTION POU PAME NA ZWGRAFISOUME",detection);
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
    }



    const streamCamVideo = () => {
        //start timer
        
        clearTimer(getDeadTime());
        var constraints = {
            video: true,
        };
        console.log(navigator.mediaDevices);
        setStreamVideo(true);

        navigator.mediaDevices
        .getUserMedia(constraints)
        .then((mediaStream) => {
            var video = document.querySelector("video");
            console.log(video.videoWidth);
            console.log(video.videoHeight);

            if (video) {
                video.srcObject = mediaStream;
                video.onloadedmetadata = function (e) {
                    video.play();


                    
                    setVideoSrc(video); // edw orizoume to video element 
                };
                console.log("Video element found",video);
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

            setTimer(
                (hours > 9 ? hours : "0" + hours) +
                ":" +
                (minutes > 9 ? minutes : "0" + minutes) +
                ":" +
                (seconds > 9 ? seconds : "0" + seconds)
            );
        } else {
            setUserIdentified(true);
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
        const loadModel = async () => {
            

            try {
                console.log("prin to fortwma",blazeface)
                //const my_model = await cocoSsd.load();
                const my_model = await blazeface.load();
                //modelRef.current = my_model; // Assign the model to the ref
                setModel(my_model); // Update state to indicate the model is loaded
                setIsModelLoaded(true);

              /*  const inShape = my_model.model.input;
                const outShape = my_model.model.output;

                console.log('Input shape:', inShape);
                console.log('Output shape:', outShape);  */

            } catch (error) {
                console.log(error)
                console.error('DEN FORTWSE TO GAMIDI ')
            }

        };
        loadModel();

        // Cleanup function
        return () => {
            // Stop the video stream when the component unmounts
            stopStream();
        };

    }, []);

    useEffect(() => {
        if (model) {
            console.log('FORTWSE TO MODELO me to ref');
        }
        else {
            console.log("den fortwse")
        }
        
    }, [model]);


    // an exoume anoixtw stream kane detection 
    //TODO: DEN EXOUME VALEI AKOMA NA SXEDIAZEI TA PREDICTIONS ALLA TSEKARE TA LOGS GIA NA DEIS AMA KANEI DETECTION
    useEffect(() => {
        let intervalId;
        
        if (streamVideo) {
            const DetectFaces = async () => {
                //const frame = videoRef.current

                intervalId = setInterval(async () => {
                    console.log(videoSrc);
                    if (videoSrc) {
                        console.log("auto einai to model", model)
                        console.log("width tou video:", videoSrc.videoWidth);
                        console.log("height tou video:", videoSrc.videoHeight);


                        const predictions = await model.estimateFaces(videoSrc, false);

                        console.log('Predictions: ', predictions);
                        
                        if (predictions.length > 0) {
                            console.log('Face detected');
                            setUserIdentified(true);
                            // Assuming you want to do something when a face is identified
                            // Handle face detection logic here

                            //const detection = { x: predictions.bottomRight[0], y: predictions.bottomRight[1], width: predictions.topLeft[0] - predictions.bottomRight[0], height: predictions.topLeft[1]-predictions.bottomRight[1] };
                            setPrediction(predictions)
                            



                        } else {
                            setUserIdentified(false);
                        }
                    }
                }, 5000); // Run detection every 2000 ms
            };

            DetectFaces();
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [videoSrc]); // Effect runs when `streamVideo` changes


    useEffect(() => {
        if (prediction) {
            drawBoxes();
        }

    }, [prediction])

    //useEffect(() => {
    //    // Cleanup function
    //    return () => {
    //        // Stop the video stream when the component unmounts
    //        stopStream();
    //    };
    //}, []);

    useEffect(() => {
        if (name === "") {
            console.log("fe");
            setUserIdentified(false);
        }
    }, [name]);

    let footer;

    if (name !== "" && !streamVideo) {
        if (userIdentified) {
            footer = (
                <div className="footer">
                    <h4>
                        <span className="primary-color">{name}</span> has been identified
                    </h4>
                    <i className="bi bi-check-circle primary-color"></i>{" "}
                </div>
            );
        } else {
            footer = (
                <div align="center">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={streamCamVideo}
                    >
                        <h4>Identify {name}</h4>
                    </button>
                </div>
            );
        }
    } else {
        footer = (
            <div align="center">
                <button type="button" style={{ visibility: "hidden" }}>
                    <h4>Identify {name}</h4>
                </button>
            </div>
        );
    }

    return (
        <div className="col-3 main-placeholder">
            <div align="center">
                <h3>STEP 2: IDENTIFY USER</h3>
            </div>
            {streamVideo ? (
                <div className=" video-placeholder" align="center">
                    {" "}
                    <video
                        
                        //style={{ width: "inherit", height: 520 }}
                        width="inherit"
                        heigth="520"
                        autoPlay={true}
                        id="videoElement"
                        controls
                    ></video>

                    <canvas
                        id="videoCanvas"
                        //style={{ width: "inherit", height: 520 }}
                    ></canvas>

                   {/* <span className="timer">
                        {timer}
                        <b className="text-danger Blink">&#11044;</b>
                    </span>*/}
                </div>
            ) : (
                <div className=" gif-placeholder" align="center">
                    <img src={faceidGIF}></img>
                </div>
            )}
            {footer}
        </div>
    );
};

export default CameraStreamer;

import objectDetectionImage from "../assets/object-detection.jpg";
import { useState, useContext } from "react";
import Context from "../Context";
const InfoPanel = () => {
  const [tempName, setTempName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { setName, setSelectedModel, selectedModel } = useContext(Context);
  const models = [
    { id: "model-1", title: "Model 1" },
    { id: "model-2", title: "Model 2" },
    { id: "model-3", title: "Model 3" },
  ];
  const submitName = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setName(tempName);
  };

  let modelsElement = models.map((model) => {
    return (
      <div className="form-check" key={model.id}>
        <input
          className="form-check-input"
          id={model.id}
          type="radio"
          onChange={() => {
            setSelectedModel(model.id);
          }}
          checked={model.id === selectedModel}
        />
        <label className="radio-label" htmlFor={model.id}>
          {model.title}
        </label>
      </div>
    );
  });

  return (
    <div className="col-4 side-panel ">
      <div align="center">
        <h3>STEP 1: INSERT INFORMATION</h3>
      </div>
      <img src={objectDetectionImage} alt="object detection"></img>
      <form>
        <div className="input-group mb-5">
          <input
            value={tempName}
            type="text"
            className="form-control"
            placeholder="What's your name?"
            onChange={(e) => {
              if (submitted) {
                setName("");
                setSubmitted(false);
              }
              setTempName(e.target.value);
            }}
          />
          <button
            className="input-group-text btn btn-primary"
            onClick={submitName}
            disabled={submitted}
          >
            Submit
          </button>
        </div>
        <label>Select a model:</label>
        {modelsElement}
      </form>
    </div>
  );
};

export default InfoPanel;

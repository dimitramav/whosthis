import users from "../assets/users.avif";
import { useState, useContext } from "react";
import Context from "../Context";
const InfoPanel = () => {
  const [tempName, setTempName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { setName } = useContext(Context);

  const submitName = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setName(tempName);
  };

  return (
    <div className="col-3 side-panel ">
      <div align="center">
        <h3>STEP 1: INSERT USER INFORMATION</h3>
      </div>
      <img src={users}></img>
      <form>
        <div className="input-group mb-3">
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
      </form>
    </div>
  );
};

export default InfoPanel;

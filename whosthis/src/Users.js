import users from "./assets/users.avif";
import { useState, useCallback } from "react";
const Users = () => {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const submitName = (event) => {
    event.preventDefault();
    setSubmitted(true);
    console.log(name);
  };

  return (
    <div className="col-3 side-panel ">
      <img src={users}></img>
      <form>
        <div className="input-group mb-3">
          <input
            value={name}
            type="text"
            className="form-control"
            placeholder="What's your name?"
            onChange={(e) => {
              if (submitted) setSubmitted(false);
              setName(e.target.value);
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

export default Users;

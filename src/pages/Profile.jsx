import React from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import user_image from "../assets/images/useravatar.png";

const Profile = () => {
  const history = useHistory();
  const [openEdit, setOpenEdit] = useState(false);
  const [email, setEmail] = useState(localStorage.getItem("username"));
  if (localStorage.getItem("id") === null) {
    //check condition
    history.push("/login");
  }
  const DoOpenEdot = () => {
    setOpenEdit(true);
  };
  const DoUpdate = () => {
    axios
      .post("http://localhost:4000/users/update", {
        id: localStorage.getItem("id"),
        username: email,
      })
      .then((res) => {
        localStorage.setItem("username", res.data.username);
        window.location.reload(false);
      });
  };
  React.useEffect(async () => {}, []);
  return (
    <div>
      {" "}
      <h2 className="page-header">Profile Page</h2>
      <div className="card col-8">
        <div className="row">
          <div className="col-3"></div>
          <img src={user_image} style={{ height: "250px", width: "250px" }} />
        </div>

        <br></br>
        {openEdit ? (
          <div>
            <input
              placeholder="User ..."
              className="input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <button className="button col-2" onClick={DoUpdate}>
              Submit
            </button>
          </div>
        ) : (
          <div>
            {" "}
            <h3>UserName :</h3>
            <div> {localStorage.getItem("username")}</div>
            <br></br>
            <h3>Email :</h3>
            <div> {localStorage.getItem("email")}</div>
            <button className="button col-2" onClick={DoOpenEdot}>
              Edit
            </button>
            <br></br>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

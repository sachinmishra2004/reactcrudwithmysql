import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
function Edituser() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const [fromvalue, setformvalue] = useState({
    username: "",
    email: "",
    status: "",
  });
  const [message, setMessage] = useState("");
  const handleInput = (e) => {
    setformvalue({ ...fromvalue, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const userRowdata = async () => {
      const getUserData = await fetch(
        "http://localhost/reactcrudphp/api/user.php/" + id
      );
      const resuserdata = await getUserData.json();
      setformvalue(resuserdata);
    };
    userRowdata();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(fromvalue);
    const formData = {
      id: id,
      username: fromvalue.username,
      email: fromvalue.email,
      status: fromvalue.status,
    };

    const res = await axios.put(
      "http://localhost/reactcrudphp/api/user.php",
      formData
    );

    if (res.data.success) {
      setMessage(res.data.success);
      setTimeout(() => {
        navigate("/userlist");
      }, 2000);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-4">
            <h5 className="mb-4">Adduser</h5>
            <p className="text-success">{message}</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3 row">
                <label className="col-sm-2 ">username</label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    name="username"
                    value={fromvalue.username}
                    className="form-control"
                    onChange={handleInput}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2 ">email</label>
                <div className="col-sm-10">
                  <input
                    type="email"
                    name="email"
                    value={fromvalue.email}
                    className="form-control"
                    onChange={handleInput}
                  />
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2 ">status</label>
                <div className="col-sm-10">
                  <select
                    name="status"
                    className="form-control"
                    value={fromvalue.status}
                    onChange={handleInput}
                  >
                    <option value="">---Select status--</option>
                    <option value="1">Active</option>
                    <option value="0">InActive</option>
                  </select>
                </div>
              </div>

              <div className="mb-3 row">
                <label className="col-sm-2 "></label>
                <div className="col-sm-10">
                  <button name="submit" className="btn btn-success">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Edituser;

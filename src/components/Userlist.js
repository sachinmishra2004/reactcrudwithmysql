import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Userlist() {
  const [userData, setUserData] = useState([]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const reqData = await fetch("http://localhost/reactcrudphp/api/user.php");
    const resData = await reqData.json();
    setUserData(resData);
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(
      "http://localhost/reactcrudphp/api/user.php/" + id
    );
    setMessage(res.data.success);
    getUserData();
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h5>userlist</h5>
            <p className="text-danger">{message}</p>

            <table className="table table-bordered border-dark">
              <thead>
                <tr>
                  <th scope="col">Sr.no</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((uData, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{uData.username}</td>
                    <td>{uData.email}</td>
                    <td>{uData.status === "1" ? "Active" : "Inactive"}</td>
                    <td>
                      <Link
                        to={"/edituser/" + uData.id}
                        className="btn btn-success mx-2"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(uData.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Userlist;

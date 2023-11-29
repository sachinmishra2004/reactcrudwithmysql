import React from "react";
import logo from "./sachin.png";
function Home() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-start mt-4">
            <h5>REACT CRUD USING PHP AND MYSQL WELCOME!</h5>
            <img className="image" src={logo} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

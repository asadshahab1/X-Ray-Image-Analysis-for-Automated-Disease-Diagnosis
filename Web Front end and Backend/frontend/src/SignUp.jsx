import React, { useState } from "react";
import "./CSS/SignIn.css";
import { HiLockClosed } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import { MdAlternateEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaRegHospital } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [hospitalName, setHospitalName] = useState("");

  const navigate = useNavigate();
  const navigateToSignIn = () => navigate("/signin");

  const registered = () =>
    toast.success("Successfully Registered", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const failed = (msg) =>
    toast.error(msg, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handlefName = (event) => {
    setfName(event.target.value);
  };
  const handlelName = (event) => {
    setlName(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePhone = (event) => {
    setPhone(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleHospitalName = (event) => {
    setHospitalName(event.target.value);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   axios
  //     .post("http://localhost:3000/signup", {
  //       fName,
  //       lName,
  //       email,
  //       phone,
  //       password,
  //       hospitalName,
  //     })
  //     .then((res) => {
  //       console.log("DATA SENT", res.data);

  //       if (res.data === "Saved successfully!") {
  //         registered();
  //         setTimeout(() => {
  //           navigateToSignIn();
  //         }, 1500);
  //       } else if (res.data === "Email already registered") {
  //         failed("Registration Failed! User already exists");
  //       } else {
  //         failed("Registration Failed! Try Again");
  //       }
  //     })
  //     .catch((err) => console.log(err));

  //   setfName("");
  //   setlName("");
  //   setEmail("");
  //   setPhone("");
  //   setPassword("");
  //   setHospitalName("");
  // };


  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/signup", {
        fName,
        lName,
        email,
        phone,
        password,
        hospitalName,
      })
      .then((res) => {
        console.log("DATA SENT", res.data);

        if (res.data.message === "Saved successfully!") {
          registered();
          setTimeout(() => {
            navigate('/signin'); // Assuming you want to navigate to a sign-in page
          }, 1500);
        } else if (res.data.message === "Email already registered") {
          failed("Registration Failed! User already exists");
        } else {
          failed("Registration Failed! Try Again");
        }
      })
      .catch((err) => console.log("There is some Error "+ err));

    setfName("");
    setlName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setHospitalName("");
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="sign-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h3 className="myh2">Sign Up</h3>

          <div className="mycontainer">
            <div className="sign-input-container2">
              <label className="inp-label" htmlFor="fName">
                <AiOutlineUser />
                First Name
              </label>
              <input
                className="sign-inp"
                type="text"
                id="fName"
                placeholder="Enter your first name"
                value={fName}
                onChange={handlefName}
                required
              />
            </div>
            <div className="sign-input-container2">
              <label className="inp-label" htmlFor="lName">
                <AiOutlineUser />
                Last Name
              </label>
              <input
                className="sign-inp"
                type="text"
                id="lName"
                placeholder="Enter your last name"
                value={lName}
                onChange={handlelName}
                required
              />
            </div>
          </div>

          <div className="mycontainer">
            <div className="sign-input-container2">
              <label className="inp-label" htmlFor="hospitalName">
                <FaRegHospital />
                Hospital Name
              </label>
              <input
                className="sign-inp"
                type="text"
                id="hospitalName"
                placeholder="Enter your hospital name"
                value={hospitalName}
                onChange={handleHospitalName}
                required
              />
            </div>
            <div className="sign-input-container2">
              <label className="inp-label" htmlFor="phone">
                <BsFillTelephoneFill />
                Phone Number
              </label>
              <input
                className="sign-inp"
                type="tel"
                id="phone"
                pattern="[0-9]+"
                placeholder="Enter your phone number"
                value={phone}
                onChange={handlePhone}
                required
              />
            </div>
          </div>

          <div className="sign-input-container">
            <label className="inp-label" htmlFor="email">
              <MdAlternateEmail />
              Email
            </label>
            <input
              className="sign-inp"
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmail}
              required
            />
          </div>

          <div className="sign-input-container">
            <label className="inp-label" htmlFor="password">
              <HiLockClosed />
              Password
            </label>
            <input
              className="sign-inp"
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePassword}
              required
            />
          </div>

          <button className="sign-btn" type="submit">
            Sign Up
          </button>

          <div className="bottom-text">
            <span>Already have an account?</span>
            <Link to="/signin">Sign In</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;



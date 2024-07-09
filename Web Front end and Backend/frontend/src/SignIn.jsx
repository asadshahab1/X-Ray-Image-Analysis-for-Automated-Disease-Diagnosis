// import React, { useState } from 'react';
// import './CSS/SignIn.css';
// import { MdAlternateEmail } from "react-icons/md";
// import { HiLockClosed } from "react-icons/hi";
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const SignIn = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const registered = () =>
//     toast.success("Successfully Logged In", {
//       position: "top-center",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//     });

//   const failed = (msg) =>
//     toast.error(msg, {
//       position: "top-center",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//     });

//   const handleEmail = (event) => {
//     setEmail(event.target.value);
//   };

//   const handlePassword = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     axios.post("http://localhost:3000/customer-login", { email, password })
//       .then((res) => {
//         if (res.data.data === "No such email exists") {
//           failed("Account doesn't exist");
//           setEmail('');
//           setPassword('');
//         } else if (res.data.data === 'Incorrect Password') {
//           failed('Incorrect Password! Try Again');
//           setPassword('');
//         } else {
//           let token = res.data.token;
//           localStorage.setItem('user', JSON.stringify(res.data.data));
//           registered();
//           setTimeout(() => {
//             navigate('/');
//           }, 2000);
//         }
//       })
//       .catch((err) => {
//         console.log('err', err);
//       });
//   };

//   // const handleSubmit = (event) => {
//   //   event.preventDefault();
//   //   // Simulate successful login
//   //   registered();
//   //   setTimeout(() => {
//   //     navigate('/');
//   //   }, 2000);
  
//   //   // Commented out the backend check
//   //   /*
//   //   axios.post("http://localhost:3000/customer-login", { email, password })
//   //     .then((res) => {
//   //       if (res.data.data === "No such email exists") {
//   //         failed("Account doesn't exist");
//   //         setEmail('');
//   //         setPassword('');
//   //       } else if (res.data.data === 'Incorrect Password') {
//   //         failed('Incorrect Password! Try Again');
//   //         setPassword('');
//   //       } else {
//   //         let token = res.data.token;
//   //         localStorage.setItem('user', JSON.stringify(res.data.data));
//   //         registered();
//   //         setTimeout(() => {
//   //           navigate('/');
//   //         }, 2000);
//   //       }
//   //     })
//   //     .catch((err) => {
//   //       console.log('err', err);
//   //     });
//   //   */
//   // };
  

//   return (
//     <>
//       <ToastContainer
//         position="top-center"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="light"
//       />

//       <div className="sign-container" style={{ height: '450px' }}>
//         <form className="signin-form" onSubmit={handleSubmit}>
//           <h3 className='myh2'>Sign In</h3>
//           <div className="sign-input-container">
//             <label className='inp-label' htmlFor="email"><MdAlternateEmail />Email</label>
//             <input
//               className='sign-inp'
//               type="email"
//               id="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={handleEmail}
//               required
//             />
//           </div>
//           <div className="sign-input-container">
//             <label className='inp-label' htmlFor="password"><HiLockClosed />Password</label>
//             <input
//               className='sign-inp'
//               type="password"
//               id="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={handlePassword}
//               required
//             />
//           </div>
//           <button className='sign-btn' type="submit">Sign In</button>
//           <div className="bottom-text">
//             <span>Don't have an account?</span>
//             <Link to='/signup'>Sign Up</Link>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

// export default SignIn;


import React, { useState } from 'react';
import './CSS/SignIn.css';
import { MdAlternateEmail } from "react-icons/md";
import { HiLockClosed } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registered = () =>
    toast.success("Successfully Logged In", {
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

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:3000/signin", { email, password })
      .then((res) => {
        if (res.data.message === "Invalid email or password") {
          failed("Invalid email or password");
          setPassword('');
        } else {
          registered();
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      })
      .catch((err) => {
        console.log('Error:', err);
        failed("An error occurred. Please try again.");
      });
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

      <div className="sign-container" style={{ height: '450px' }}>
        <form className="signin-form" onSubmit={handleSubmit}>
          <h3 className='myh2'>Sign In</h3>
          <div className="sign-input-container">
            <label className='inp-label' htmlFor="email"><MdAlternateEmail />Email</label>
            <input
              className='sign-inp'
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmail}
              required
            />
          </div>
          <div className="sign-input-container">
            <label className='inp-label' htmlFor="password"><HiLockClosed />Password</label>
            <input
              className='sign-inp'
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePassword}
              required
            />
          </div>
          <button className='sign-btn' type="submit">Sign In</button>
          <div className="bottom-text">
            <span>Don't have an account?</span>
            <Link to='/signup'>Sign Up</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignIn;

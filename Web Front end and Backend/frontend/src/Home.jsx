// import React, { useState } from "react";
// import "./CSS/home.css";

// const Home = () => {
//   const [xrayImage, setXrayImage] = useState(null);
//   const [aiResult, setAiResult] = useState("");

//   const handleImageUpload = (e) => {
//     setXrayImage(URL.createObjectURL(e.target.files[0]));
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     // Simulate AI model processing
//     setAiResult("AI Model Result: Normal");
//   };

//   return (
//     <div className="container">
//       <h1 className="title">Patient X-ray Report</h1>
//       <div className="patient-info">
//         <p><strong>Patient Name:</strong> John Doe</p>
//         <p><strong>Hospital Name:</strong> General Hospital</p>
//         <p><strong>Phone Number:</strong> (123) 456-7890</p>
//       </div>
//       <form className="form" onSubmit={handleFormSubmit}>
//         <div className="form-group">
//           <label>Upload X-ray Report:</label>
//           <input type="file" accept="image/*" onChange={handleImageUpload} required />
//         </div>

//         {xrayImage && (
//           <div className="xray-preview">
//             <h2>X-ray Report Preview:</h2>
//             <img src={xrayImage} alt="X-ray Report" />
//           </div>
//         )}

//         <button type="submit" className="submit-button">Submit</button>
//       </form>

//       {aiResult && (
//         <div className="ai-result">
//           <h2>{aiResult}</h2>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

import React, { useState } from "react";
import "./CSS/home.css";
import axios from 'axios';

const Home = () => {
  const [xrayImage, setXrayImage] = useState(null);
  const [aiResult, setAiResult] = useState("");

  const handleImageUpload = (e) => {
    setXrayImage(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!xrayImage) {
        alert('Please upload an X-ray image.');
        return;
      }

      const formData = new FormData();
      formData.append('file', xrayImage);

      const response = await axios.post('http://localhost:3000/navigate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Assuming response.data.result contains the AI model result
      setAiResult(response.data.result);

    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error state or show error message
    }
  };

  return (
    <div className="container">
      <h1 className="title">Patient X-ray Report</h1>
      <div className="patient-info">
        <p><strong>Patient Name:</strong> John Doe</p>
        <p><strong>Hospital Name:</strong> General Hospital</p>
        <p><strong>Phone Number:</strong> (123) 456-7890</p>
      </div>
      <form className="form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Upload X-ray Report:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} required />
        </div>

        {xrayImage && (
          <div className="xray-preview">
            <h2>X-ray Report Preview:</h2>
            <img src={URL.createObjectURL(xrayImage)} alt="X-ray Report" />
          </div>
        )}

        <button type="submit" className="submit-button">Submit</button>
      </form>

      {aiResult && (
        <div className="ai-result">
          <h2>AI Model Result: {aiResult}</h2>
        </div>
      )}
    </div>
  );
};

export default Home;


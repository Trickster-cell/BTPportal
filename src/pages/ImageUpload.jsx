import React, { useState } from "react";
import "./ImageUpload.css";

const ImageUpload = () => {
  const [mode, setMode] = useState("Digit"); // Default mode is Digit

  const [prediction, setPrediction] = useState("");
  const [base64Img, setBase64Img] = useState("");
  const [engPrediction, setEngPrediction] = useState("");
  const [upImg, setUpImg] = useState("");

  const uploadImage = async () => {
    const fileInput = document.getElementById("imageInput");
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    setUpImg(fileInput.files[0]);
    try {
      const response = await fetch("http://127.0.0.1:8000/hindi", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setBase64Img(data.transformed_image);
        setPrediction(data.predicted_label);
        setEngPrediction(data.eng_predicted_label);
        // Handle the data or update the state as needed
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error or show a message to the user
    }
  };

  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  return (
    <div>
      <div className="heading">
        <h1>Image classification portal</h1>
      </div>
      <div className="container">
        <h1>Image Upload</h1>
        <form id="uploadForm" encType="multipart/form-data">
          <input type="file" name="file" id="imageInput" accept="image/*" />
          <div className="radio-buttons">
            <label>
              <input
                type="radio"
                value="Digit"
                checked={mode === "Digit"}
                onChange={handleModeChange}
              />
              Digit
            </label>
            <label>
              <input
                type="radio"
                value="Letter"
                checked={mode === "Letter"}
                onChange={handleModeChange}
              />
              Letter
            </label>
          </div>
          <button type="button" onClick={uploadImage}>
            Upload
          </button>
        </form>
        <div id="message"></div>
      </div>
      <div className="text">
        <h1>Text translated</h1>
        <div className="container box">
          {/* Content based on the current mode */}
          {mode === "Digit" && <p>Digit mode content</p>}
          {mode === "Letter" && base64Img && (
            <div style={{ textAlign: "center", marginLeft: "2vh" }}>
              {/* Display predicted value */}
              <p style={{ fontSize: "20px" }}>
                {prediction}({engPrediction})
              </p>

              {/* Display the images */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ margin: "10px" }}>
                  {/* Display the uploaded image */}
                  {base64Img && (
                    <div>
                      <img
                        src={URL.createObjectURL(upImg)}
                        alt="Uploaded Image"
                        style={{ width: "200px", height: "200px" }}
                      />
                      <p>Uploaded Image</p>
                    </div>
                  )}
                </div>
                {base64Img && (
                  <div style={{ margin: "10px" }}>
                    {/* Display the transformed image */}
                    <div>
                      <img
                        src={`data:image/png;base64,${base64Img}`}
                        alt="Transformed Image"
                        style={{ width: "200px", height: "200px" }}
                      />
                      <p>Transformed Image</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;

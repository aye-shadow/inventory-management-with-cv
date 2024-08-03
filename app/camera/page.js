"use client";
import React, { useRef, useState } from "react";
import { Camera } from "react-camera-pro";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase.js";
import OpenAI from "openai";
import axios from "axios";

export default function CameraComponent() {
  const camera = useRef(null);
  const [photo, setPhoto] = useState(null);

  const takePhoto = () => {
    if (camera.current) {
      const photoTaken = camera.current.takePhoto();
      setPhoto(photoTaken);
    } else {
      console.log("Camera is not available");
    }
  };

  async function classifyImage() {
    var payload = { photoURL: photo };
    await axios.post("/api/openAI", payload).then((res) => {
      // console.log("payload:", payload);
      // console.log("photo:", photo);
      console.log("res:", res.data.message.choices[0].message.content);
    });
  }

  async function uploadStorage() {
    // Extract the base64 data from the photo string
    const base64Data = photo.split(",")[1];

    // Convert the base64 string to a binary string
    const byteCharacters = atob(base64Data);

    // Convert the binary string to an array of bytes
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    // Convert the array of bytes to a Blob
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/jpeg" });

    // Generate a unique filename
    const filename = `images/photo_${Date.now()}.jpeg`;

    // Create a reference to the file in Firebase Storage
    const storageRef = ref(storage, filename);

    // Upload the Blob to Firebase Storage
    await uploadBytes(storageRef, blob);

    // Get the download URL
    const downloadUrl = await getDownloadURL(storageRef);

    // Update the state with the download URL
    setPhoto(downloadUrl);
    classifyImage();
  }

  return (
    <div>
      <div style={{ position: "relative", width: "100%", height: "500px" }}>
        <Camera ref={camera} aspectRatio={16 / 9} />
        <button
          onClick={takePhoto}
          style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Take Photo
        </button>
      </div>
      {photo && (
        <div>
          <h3>Photo Preview:</h3>
          <img src={photo} alt="Preview" />
          <button
            onClick={uploadStorage}
            style={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Upload Photo
          </button>
        </div>
      )}
    </div>
  );
}

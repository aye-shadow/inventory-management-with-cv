"use client";
import React, { useRef, useState } from "react";
import { Camera } from "react-camera-pro";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "../../firebase.js";
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
    const base64Data = photo.split(",")[1];

    const filename = `images/photo_${Date.now()}.jpeg`;
    const storageRef = ref(storage, filename);

    await uploadString(storageRef, base64Data, "base64", {
      contentType: "image/jpeg",
    });

    const downloadUrl = await getDownloadURL(storageRef);

    setPhoto(downloadUrl); // Set the photo state to the download URL instead of the filename
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

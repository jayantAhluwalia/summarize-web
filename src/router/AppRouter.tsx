import { Route, Routes, useNavigate } from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import ImageUploadPage from "../pages/ImageUploadPage"
import ResultPage from "../pages/ResultPage"
import { useState } from "react"
import axios from "axios"
import { AppRouterProps } from "../models/model"



const AppRouter = ({ username, setUsername }: AppRouterProps) => {
  const [imageId, setImageId] = useState('')

  const navigate = useNavigate()

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("filetype", file);
    formData.append("userName", username);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/page",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setImageId(response.data.image_id); // Store the image ID
        navigate(`/results/${username}`); // Navigate to result page with username
      } else {
        console.error("Upload failed:", response.data);
        // Handle upload failure gracefully (e.g., display error message)
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle upload errors gracefully (e.g., display error message)
    }
  };
  return (
    <Routes>
      <Route path="/" element={<LoginPage setUsername={setUsername} />} />
      <Route
        path="/upload"
        element={
          <ImageUploadPage
            username={username}
            onImageUpload={handleImageUpload}
          />
        }
      />
      <Route
        path="/results/:username"
        element={
            <ResultPage imageId={imageId} />
          }
        />
      </Routes>
  )
}

export default AppRouter
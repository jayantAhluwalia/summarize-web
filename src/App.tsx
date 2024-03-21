import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./App.css"
// Components for each page
import LoginPage from './pages/LoginPage';
import ImageUploadPage from './pages/ImageUploadPage';
import ResultPage from './pages/ResultPage';

function App() {
  const [username, setUsername] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [ocrText, setOcrText] = useState('');
  const [summaryText, setSummaryText] = useState('');
  const navigate = useNavigate();

  // Handle image upload and API call on ImageUploadPage
  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('filetype', file);
    formData.append('userName', username);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/page', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setImageUrl(response.data.imageUrl);
      setOcrText(response.data.ocrText);
      setSummaryText(response.data.summaryText);
      navigate(`/results/${username}`); // Navigate to result page with username
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle upload errors gracefully (e.g., display error message)
    }
  };

  // Fetch results on route change to ResultPage
  useEffect(() => {
    const fetchResults = async () => {
      const username = window.location.pathname.split('/')[2]; // Extract username from URL
      if (username) {
        try {
          const response = await axios.get(`/api/v1/page/${username}`);
          setImageUrl(response.data.imageUrl);
          setOcrText(response.data.ocrText);
          setSummaryText(response.data.summaryText);
        } catch (error) {
          console.error('Error fetching results:', error);
          // Handle fetch errors gracefully (e.g., display error message)
        }
      }
    };

    fetchResults();
  }, []);

  return (
      <Routes>
        <Route path="/" element={<LoginPage setUsername={setUsername} />} />
        <Route
          path="/upload"
          element={<ImageUploadPage username={username} onImageUpload={handleImageUpload} />}
        />
        <Route
          path="/results/:username"
          element={
            <ResultPage imageUrl={imageUrl} ocrText={ocrText} summaryText={summaryText} />
          }
        />
      </Routes>
  );
}

export default App;

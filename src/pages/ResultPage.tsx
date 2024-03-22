import axios from "axios";
import React, { useEffect, useState } from "react";

interface ResultPageProps {
  imageId: string | null;
}

const ResultPage: React.FC<ResultPageProps> = ({
  imageId,
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const [ocrText, setOcrText] = useState('');
  const [summaryText, setSummaryText] = useState('');

  useEffect(() => {
    if (imageId) {
      fetchResults();
    }
  }, [imageId, imageUrl]);

  const fetchResults = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/page/${imageId}`
      );
      console.log(response);
      setImageUrl(response.data.imageURL);
      setOcrText(response.data.textExtracted);
      setSummaryText(response.data.textSummary);
      console.log(imageUrl, ocrText, summaryText)
    } catch (error) {
      console.error("Error fetching results:", error);
      // Handle fetch errors gracefully (e.g., display error message)
    }
  };
  return (
    <div className="result-page">
      <h1>Results</h1>
      {imageUrl && (
        <div className="image-container">
          <h2>Image</h2>
          <img src={imageUrl} alt="Uploaded Image" />
        </div>
      )}
      {ocrText && (
        <div className="ocr-text-container">
          <h2>Extracted Text</h2>
          <p>{ocrText}</p>
        </div>
      )}
      {summaryText && (
        <div className="summary-text-container">
          <h2>Summary</h2>
          <p>{summaryText}</p>
        </div>
      )}
    </div>
  );
};

export default ResultPage;

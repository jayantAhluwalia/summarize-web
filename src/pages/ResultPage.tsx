import React from 'react';

interface ResultPageProps {
  imageUrl: string | null;
  ocrText: string | null;
  summaryText: string | null;
}

const ResultPage: React.FC<ResultPageProps> = ({ imageUrl, ocrText, summaryText }) => {
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

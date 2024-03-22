import axios from 'axios';
import React, { useState } from 'react';
import { ImageUploadPageProps } from '../models/model';



const ImageUploadPage: React.FC<ImageUploadPageProps> = ({ username, onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrlPreview, setImageUrlPreview] = useState<string | null>(null);

  

  const handleImageChange = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImageUrlPreview(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
      setImageUrlPreview(null);
    }
  };

  const handleUpload = () => {
    if (selectedImage) {
      onImageUpload(selectedImage); // Call parent function to handle upload
    }
  };

  return (
    <div className="image-upload-page">
      <h1>Upload Image</h1>
      {username && <p>Welcome, {username}</p>}
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {imageUrlPreview && <img src={imageUrlPreview} alt="Selected Image Preview" />}
      <button type="button" onClick={handleUpload} disabled={!selectedImage}>
        Upload
      </button>
    </div>
  );
};

export default ImageUploadPage;

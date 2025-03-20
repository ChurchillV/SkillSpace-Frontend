import React, { useState } from "react";
import { ImageUploadModalProps } from "../../../types";
import { uploadToCloudinary } from "../../../utils/uploadToCloudinary";
import toast from "react-hot-toast";

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ 
    isOpen,
    onClose,
    onUploadSuccess
}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      setSelectedFile(file);
  
      if (file) {
        const reader = new FileReader();
        reader.onload = () => setPreviewUrl(reader.result as string);
        reader.readAsDataURL(file);
      }
    };
  
    const handleUpload = async () => {
      if (!selectedFile) return;
  
      setIsUploading(true);
  
      try {
        const imageUrl = await uploadToCloudinary(selectedFile);
        onUploadSuccess(imageUrl); // Pass the image URL back to the parent
        onClose(); // Close the modal
  
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image. Please try again.");
  
      } finally {
        setIsUploading(false);
      }
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
  
          {/* Image Preview */}
          {previewUrl ? (
            <div className="mb-4">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="mb-4 text-gray-500 text-center">
              No image selected. Please choose an image to preview.
            </div>
          )}
  
          {/* File Input */}
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-secondary border border-tertiary rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
          </div>
  
          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              className="btn-secondary"
              onClick={onClose}
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              className="btn-primary"
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      </div>
    );
}

export default ImageUploadModal
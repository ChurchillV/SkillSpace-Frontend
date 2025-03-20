import axios from "axios";

export const uploadToCloudinary = async(file: File) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
    
        const uploadPreset = import.meta.env.VITE_CLOUDINARY_PRESET;
        if (!uploadPreset) {
            throw new Error("CLOUDINARY_PRESET is not defined in the environment variables.");
        }
        
        formData.append('upload_preset', uploadPreset);
        
        const cloudinaryURL = import.meta.env.VITE_CLOUDINARY_URL;
        if(!cloudinaryURL) {
            throw new Error("CLOUDINARY_URL is not defined in the environment variables.");
        }

        const response = await axios.post(cloudinaryURL, formData);
        const uploadedURL = response.data.secure_url;
        console.log("Cloudinary URL: ", uploadedURL);
        return uploadedURL;

    } catch (error) {
        console.error('Error uploading photo: ', error);
    }
}
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";
import { Close } from "@mui/icons-material";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { ModalProps } from "../../types";
import { useAuth } from "../../context/AuthContext";
import workshopSchema from "./workshopSchema";
import toast from "react-hot-toast";
import axios from "axios";

const CreateWorkshopForm: React.FC<ModalProps> = ({
    isOpen, 
    onClose
}) => {
    const { user } = useAuth();
    const organizerId = user?.id;
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [photo, setPhoto] = useState("");

    const addTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    const removeTag = (tag: string) => {
        setTags(tags.filter(t => t !== tag));
    };

    const handlePhotoUpload = async(file: File) => {
        const cloudinaryUrl = await uploadToCloudinary(file);
        setPhoto(cloudinaryUrl);
    }

    const validationSchema = workshopSchema;

    const handleSubmit = async(values: any) => {
        try {

            console.log("Values: ", values);
            const response = await axios.post(`${import.meta.env.VITE_LIVE_BACKEND_URL}/workshops`, {
                ...values,
                tags,
                organizerId
            });

            console.log("Response: ", response.data);

            if(!response.data.success) {
                return toast.error(`Failed: ${response.data.message}`);
            }

            toast.success("Workshop Published successfully");
            return onClose();
        } catch (error) {
            toast.error("Failed to publish Workshop. Please try again");
            console.error("Error:", error);
        }
    }



    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-scroll h-screen w-full">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-11/12 max-w-lg relative overflow-y-scroll h-full">
                {/* Close Button */}
                <button className="absolute top-6 right-4 text-gray-400 hover:text-white" onClick={onClose}>
                    <Close />
                </button>

                {/* Title */}
                <h2 className="text-2xl font-bold mb-8 text-center">Publish Workshop</h2>

                <Formik
                    initialValues={{
                        name: "",
                        summary: "",
                        description: "",
                        date: "",
                        photo: "",
                        venue: "",
                        isRecurring: false,
                        isVirtual: false,
                        meetingLink: "",
                        chatLink: "",
                        recurrenceDetails: []
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, values }) => (
                        <Form className="flex flex-col gap-4 text-left">
                            {/* Workshop Name */}
                            <div>
                                <label className="block text-gray-300">Workshop Name</label>
                                <Field type="text" name="name" className="w-full p-2 bg-gray-700 border border-gray-600 rounded" />
                                <ErrorMessage name="name" component="div" className="text-red-400 text-sm" />
                            </div>

                            {/* Summary */}
                            <div>
                                <label className="block text-gray-300">Summary</label>
                                <Field as="textarea" name="summary" className="w-full p-2 bg-gray-700 border border-gray-600 rounded" />
                                <ErrorMessage name="summary" component="div" className="text-red-400 text-sm" />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-gray-300">Workshop Description</label>
                                <Field as="textarea" name="description" placeholder="A Detailed description of your workshop" className="w-full p-2 bg-gray-700 border border-gray-600 rounded" />
                                <ErrorMessage name="description" component="div" className="text-red-400 text-sm" />
                            </div>

                            {/* Venue */}
                            <div>
                                <label className="block text-gray-300">Workshop Venue</label>
                                <Field type="text" name="venue" placeholder="If virtual, state the platform. Eg. Google Meet" className="w-full p-2 bg-gray-700 border border-gray-600 rounded" />
                                <ErrorMessage name="venue" component="div" className="text-red-400 text-sm" />
                            </div>

                            {/* Date */}
                            <div>
                                <label className="block text-gray-300">Workshop Date & Time</label>
                                <Field type="datetime-local" name="date" placeholder="If virtual, state the platform. Eg. Google Meet" className="w-full p-2 bg-gray-700 border border-gray-600 rounded" />
                                <ErrorMessage name="date" component="div" className="text-red-400 text-sm" />
                            </div>

                            <div>
                                <label>
                                    <Field type="checkbox" name="isRecurring" /> This is a Recurring Workshop
                                </label>
                            </div>
                    
                    {values.isRecurring && (
                        <FieldArray name="recurrenceDetails">
                            {({ push, remove }) => (
                                <div>
                                    {values.recurrenceDetails.map((_, index) => (
                                        <div key={index} className="flex gap-2">
                                            <Field type="date" name={`recurrenceDetails.${index}.date`} className="w-1/3 p-2 bg-gray-700 border border-gray-600 rounded" placeholder="Date" />
                                            <Field type="time" name={`recurrenceDetails.${index}.time`} className="w-1/3 p-2 bg-gray-700 border border-gray-600 rounded" placeholder="Time" />
                                            <button type="button" className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => remove(index)}>Remove</button>
                                        </div>
                                    ))}
                                    <button type="button" className="px-4 py-2 bg-gray-900 text-white rounded my-2" onClick={() => push({ date: '', time: '' })}>Add Recurrence</button>
                                </div>
                            )}
                        </FieldArray>
                    )}
                    
                    <div>
                        <label>
                            <Field type="checkbox" name="isVirtual" /> This is a Virtual Workshop
                        </label>
                    </div>
                    
                    {values.isVirtual && (
                        <div>
                            <label>Meeting Link</label>
                            <Field type="url" name="meetingLink" placeholder="Zoom, Google Meet link, etc." className="w-full p-2 bg-gray-700 border border-gray-600 rounded"/>
                            <ErrorMessage name="meetingLink" component="div" className="text-red-500" />
                        </div>
                    )}
                    
                    <div>
                        <label>Chat Link</label>
                        <Field type="text" name="chatLink" placeholder="A platform for your registrants to communicate with you" className="w-full p-2 bg-gray-700 border border-gray-600 rounded" />
                        <ErrorMessage name="chatLink" component="div" className="text-red-500" />
                    </div>

                            {/* Tags */}
                            <div>
                                <label className="block text-gray-300">Tags</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                                        placeholder="Type a tag and press Add"
                                    />
                                    <button type="button" onClick={addTag} className="px-4 py-2 bg-gray-900 text-white rounded">Add</button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {tags.map((tag) => (
                                        <div key={tag} className="flex items-center bg-gray-600 px-3 py-1 rounded">
                                            {tag}
                                            <span className="ml-2 cursor-pointer text-red-400" onClick={() => removeTag(tag)}>
                                                &times;
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Upload Photo */}
                            <div>
                                <label className="block text-gray-300">Upload Workshop Flyer</label>
                                <input 
                                    type="file" 
                                    accept="image/*"
                                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
                                    onChange={(e) => {
                                        if(e.target.files) {
                                            handlePhotoUpload(e.target.files[0]);
                                        }
                                    }}
                                />
                                {photo && (
                                    <div className="flex mt-2 items-center justify-center">
                                        <img
                                            src={photo}
                                            alt="Uploaded Preview"
                                            className="h-32 w-32 object-cover rounded"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <motion.button 
                                type="submit"
                                className="relative w-full py-3 font-bold text-primary rounded-3xl bg-gray-100 transition delay-75 mt-4"
                                disabled={isSubmitting}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                whileHover={!isSubmitting ? { scale: 1.05, filter: "brightness(1.25)" } : {}}
                            >
                                <span>{isSubmitting ? (<CircularProgress color="inherit" />) : "Publish Workshop"}</span>
                            </motion.button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default CreateWorkshopForm;

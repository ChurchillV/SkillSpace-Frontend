import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../../../context/AuthContext";
import { RemoveRedEye, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Attendee, Organizer } from "../../../components/Exports/export";
import { CircularProgress } from "@mui/material";

const SignUp = () => {
  const [role, setRole] = useState<"user" | "organizer">("user");
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    firstname: role === "user" ? Yup.string().required("First name is required") : Yup.mixed(),
    lastname: role === "user" ? Yup.string().required("Last name is required") : Yup.mixed(),
    name: role === "organizer" ? Yup.string().required("Organization name is required") : Yup.mixed(),
    description: role === "organizer" ? Yup.string().required("Description is required") : Yup.mixed(),
    contact: Yup.string().required("Contact is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values: any) => {
    try {
      const endpoint = role === "user" ? "user" : "org";
      const response = await axios.post(`${import.meta.env.VITE_LIVE_BACKEND_URL}/create-account/${endpoint}`, values);

      if (!response.data.success) {
        return toast.error(`Signup failed: ${response.data.message}`);
      }

      const { accessToken } = response.data;
      localStorage.setItem(import.meta.env.VITE_LOCALSTORAGE_PROFILE, JSON.stringify(response.data.profile));
      login(role, response.data.profile, accessToken);
      toast.success("Signup successful! Logged in.");
    } catch (error: any) {
      if(error.response.status === 400) {
        toast.error(`${error.response.data.message}`);
      } else {
        toast.error("There was an error creating your account. Please try again");
      }
      console.error('Sign Up error:', error);
    }
  };

  return (
    <div className="text-gray-900">
      <section className="h-screen flex flex-col items-center md:justify-center text-center bg-gradient-to-r from-black via-gray-800 to-gray-900 text-white">
        <motion.div
          className="flex space-x-4 mt-6 bg-gray-900 p-2 rounded-3xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button
            className={`px-6 py-2 rounded-3xl transition ${role === "user" ? "bg-white text-gray-900" : "text-white"}`}
            onClick={() => setRole("user")}
          >
            User Sign Up
          </button>
          <button
            className={`px-6 py-2 rounded-3xl transition ${role === "organizer" ? "bg-white text-gray-900" : "text-white"}`}
            onClick={() => setRole("organizer")}
          >
            Organizer Sign Up
          </button>
        </motion.div>

        <motion.div className="mt-6 w-full max-w-md bg-white p-8 rounded-xl shadow-lg text-gray-900">
          {/* Illustration */}
                   <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      transition={{ duration: 1 }}
                      className="flex justify-center"
                  >
                      <AnimatePresence mode="wait">
                          <motion.img 
                          key={role} // Ensures re-render on role change
                          src={role === "organizer" ? Organizer : Attendee} 
                          alt="Skillspace Illustration" 
                          className="w-24 h-auto"
                          initial={{ opacity: 0, scale: 0.8 }} 
                          animate={{ opacity: 1, scale: 1 }} 
                          exit={{ opacity: 0, scale: 0.8 }} 
                          transition={{ duration: 0.4 }} 
                          />
                      </AnimatePresence>
                  </motion.div>
          <h2 className="text-2xl font-bold mb-4">{role === "user" ? "Create a User Account" : "Create an Organizer Account"}</h2>
            <AnimatePresence mode="wait">
            <motion.p
                    key={role}
                    initial={{ opacity: 0, scale: 0.8 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    exit={{ opacity: 0, scale: 0.8 }} 
                    transition={{ duration: 0.4 }}
                    className="text-sm mb-8" 
              >
                {role === "organizer" ? (
                    "Publish workshops, register attendees and manage attendance"
                ) : (
                    "Keep track of all workshops you attend, access your attendance history"
                )}
                </motion.p>
            </AnimatePresence>
          <Formik
            initialValues={{ firstname: "", lastname: "", name: "", description: "", contact: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4 text-left">
              {role === "user" && (
                <>
                  <label className="block">
                    First Name
                    <Field name="firstname" className="w-full p-2 border border-gray-300 rounded mt-1" />
                  </label>
                  <ErrorMessage name="firstname" component="div" className="text-red-500 text-sm" />
            
                  <label className="block">
                    Last Name
                    <Field name="lastname" className="w-full p-2 border border-gray-300 rounded mt-1" />
                  </label>
                  <ErrorMessage name="lastname" component="div" className="text-red-500 text-sm" />
                </>
              )}
            
              {role === "organizer" && (
                <>
                  <label className="block">
                    Organization Name
                    <Field name="name" className="w-full p-2 border border-gray-300 rounded mt-1" />
                  </label>
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            
                  <label className="block">
                    Description
                    <Field as="textarea" name="description" placeholder="Tell us a bit about yourself" className="w-full p-2 border border-gray-300 rounded mt-1 h-20 resize-none" />
                  </label>
                  <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                </>
              )}
            
              <label className="block">
                Contact
                <Field name="contact" className="w-full p-2 border border-gray-300 rounded mt-1" />
              </label>
              <ErrorMessage name="contact" component="div" className="text-red-500 text-sm" />
            
              <label className="block">
                Email
                <Field type="email" name="email" className="w-full p-2 border border-gray-300 rounded mt-1" />
              </label>
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            
              <div className="relative">
                <label className="block">
                  Password
                  <Field type={showPassword ? "text" : "password"} name="password" className="w-full p-2 border border-gray-300 rounded mt-1" />
                </label>
                <span 
                  className="absolute right-3 top-9 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                > 
                  {showPassword ? <VisibilityOff /> : <RemoveRedEye />}
                </span>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>
            
              <motion.button
                type="submit"
                className="w-full py-3 font-bold text-white rounded-3xl bg-gray-900 transition mt-4"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.05, filter: "brightness(1.25)" } : {}}
              >
                {isSubmitting ? (<CircularProgress color="inherit"/>) : "Sign Up"}
              </motion.button>
            </Form>            
            )}
          </Formik>
          <div className="mt-5">
            <p>Already have an account?
              <Link to="/login">
                <span className="underline underline-offset-2 hover:text-gray-600 ml-1">Log In</span>
              </Link>
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default SignUp;

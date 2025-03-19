import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { Attendee, Organizer } from "../../../components/Exports/export";
import { RemoveRedEye, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router";
import { CircularProgress } from "@mui/material";
import axios from "axios"
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";

const Login = () => {
  const [role, setRole] = useState<"user" | "organizer">("user");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string().required("Please enter your email"),
    password: Yup.string().required("Please enter your password"),
  });

  const handleSubmit = async(values: {email: string, password: string}) => {
    try {
      const endpoint = role === "user" ? "user" : "org"
      const response = await axios.post(`${import.meta.env.VITE_LIVE_BACKEND_URL}/auth/login/${endpoint}`, values);

      if(!response.data.success) {
        return toast.error(`Login failed: ${response.data.message}`);
      }

      const { accessToken } = response.data;

      // localStorage.setItem(import.meta.env.VITE_LOCALSTORAGE_PROFILE, JSON.stringify(response.data.profile));
      login(role, response.data.profile, accessToken);
      toast.success("Logged in successfully");

    } catch (error: any) {
      if(error.response.status === 404 || error.response.status === 401) {
        toast.error(`${error.response.data.message}`);
      } else {
        toast.error("There was an error Logging in. Please try again");
      }
      console.error('Login error:', error);
    }
  }


  return (
    <div className="text-gray-900">
      
      {/* Login Container */}
      <section className="h-screen flex flex-col items-center md:justify-center text-center bg-gradient-to-r from-black via-gray-800 to-gray-900 text-white">
        
        {/* Tab Switch */}
        <motion.div 
          className="flex space-x-4 mt-6 bg-gray-900 p-2 rounded-3xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button
            className={`px-6 py-2 rounded-3xl transition ${
              role === "user" ? "bg-white text-gray-900" : "text-white"
            }`}
            onClick={() => setRole("user")}
          >
            User Login
          </button>
          <button
            className={`px-6 py-2 rounded-3xl transition ${
              role === "organizer" ? "bg-white text-gray-900" : "text-white"
            }`}
            onClick={() => setRole("organizer")}
          >
            Organizer Login
          </button>
        </motion.div>


        {/* Login Form */}
        <motion.div 
          className="mt-6 w-full max-w-md bg-white p-8 rounded-xl shadow-lg text-gray-900"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
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
          <h2 className="text-2xl font-bold mb-4">{role === "user" ? "User Login" : "Organizer Login"}</h2>
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
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4 text-left">
                {/* Email Field */}
                <div>
                  <label className="block text-left text-gray-700">Email</label>
                  <Field 
                    type="email" 
                    name="email" 
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Eg. me@example.com" 
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Password Field */}
                <div className="relative">
                  <label className="block text-left text-gray-700">Password</label>
                  <Field 
                    type={showPassword ? "text" : "password" }
                    name="password" 
                    className="w-full p-2 border border-gray-300 rounded" 
                  />
                  <span 
                    className="absolute right-3 top-8 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  > 
                    {showPassword ? <VisibilityOff /> : <RemoveRedEye />}
                  </span>
            
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>

                {/* Submit Button */}
                <motion.button 
                    type="submit"
                    className="relative w-full py-3 font-bold text-white rounded-3xl bg-gray-900 transition delay-75 mt-8"
                    disabled={isSubmitting}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={!isSubmitting ? { scale: 1.05, filter: "brightness(1.25)" } : {}}
                >
                <span>{isSubmitting ? (<CircularProgress color="inherit"/>) : "Login"}</span>
                </motion.button>
              </Form>
            )}
          </Formik>
          <div className="mt-5">
            <p>Don't have an account? 
              <Link to="/signup">
                <span className="underline underline-offset-2 hover:text-gray-600 ml-1">
                  Sign Up
                </span>
              </Link>
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Login;

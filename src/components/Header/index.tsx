import { motion } from "framer-motion";
import { Logo } from "../Exports/export";
import CTAButtonPrimary from "../UI/CTAButtonPrimary";
import CTAButtonSecondary from "../UI/CTAButtonSecondary";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-black via-gray-800 to-gray-900 border-b border-b-gray-500 shadow-md py-4 px-6 flex justify-between items-center">
        <motion.div
            className="flex space-x-2 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
        >
            <img src={Logo} alt="SkillSpace Logo" className="w-16 h-auto"/>
        </motion.div>

      {/* Buttons */}
      <motion.div 
        className="flex space-x-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <CTAButtonSecondary 
            linkTo="/login"
            content="Log In"
        />
        <CTAButtonPrimary 
            linkTo="/signup"
            content="Sign Up"
        />

      </motion.div>
    </header>
  );
};

export default Header;

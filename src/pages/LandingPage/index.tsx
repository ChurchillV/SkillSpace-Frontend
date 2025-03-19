import { motion } from "framer-motion";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Logo } from "../../components/Exports/export";
import CTAButtonPrimary from "../../components/UI/CTAButtonPrimary";

const LandingPage = () => {
  return (
    <div className="text-gray-900">
        {/* Header */}
        <Header />
        {/* Hero Section */}
        <section className="h-screen flex flex-col justify-center items-center text-center bg-primary text-white">
        <motion.div>
            <img src={Logo} alt="Skillspace Logo" className="w-36 h-auto" />
        </motion.div>
        <motion.h1 
            className="text-5xl font-extrabold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            Welcome to SkillSpace
        </motion.h1>
        <motion.p 
            className="text-lg max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
        >
            Discover and register for workshops near you, or host your own!  
        </motion.p>
        <motion.div 
            className="mt-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
        >
            <CTAButtonPrimary 
                content="Explore Workshops"
                linkTo="/"
            />
        </motion.div>
        </section>

        {/* About Section */}
        <section className="py-20 px-6 text-center">
        <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            What is SkillSpace?
        </motion.h2>
        <motion.p 
            className="text-lg max-w-3xl mx-auto text-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
        >
            SkillSpace is a platform that connects learners and workshop organizers. 
            Find exciting workshops near you, register easily, and track your learning journey. 
            If you're an organizer, SkillSpace helps you post workshops, track registrations, and manage attendees.
        </motion.p>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-100 text-center">
        <motion.h2 
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            Key Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
            { title: "Find Workshops", desc: "Search for workshops near you and register instantly." },
            { title: "Host Workshops", desc: "Create and manage your own workshops easily." },
            { title: "Track Attendance", desc: "Monitor who attends your events in real time." }
            ].map((feature, index) => (
            <motion.div 
                key={index} 
                className="p-6 bg-white rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
            >
                <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
            ))}
        </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 text-center bg-primary text-white">
        <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            Ready to Explore?
        </motion.h2>
        <motion.p 
            className="text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
        >
            Join SkillSpace today and start your learning journey!
        </motion.p>
        <motion.div 
            className="mt-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
        >
            <button className="relative px-6 py-3 font-bold text-gray-900 rounded-3xl bg-gray-900 hover:scale-75 transition delay-75 group">
                <span className="absolute inset-0 border-2 rounded-3xl bg-gradient-to-t from-gray-100 via-white to-white animate-pulse group-hover:animate-none"></span>
                <span className="relative z-10">Get Started</span>
            </button>
        </motion.div>

        </section>
        <Footer />
    </div>
  );
};

export default LandingPage;

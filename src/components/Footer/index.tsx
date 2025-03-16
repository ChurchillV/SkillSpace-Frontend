const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-8 text-center border-t border-t-gray-600">
        <div className="px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div>
              <h3 className="text-xl font-bold mb-2">SkillSpace</h3>
              <p className="text-gray-400">
                Connecting learners with the best workshops around.
              </p>
            </div>
  
            {/* Column 2 */}
            <div>
              <h3 className="text-xl font-bold mb-2">Quick Links</h3>
              <ul className="text-gray-400 space-y-2">
                <li><a href="#" className="hover:text-gray-200">Explore Workshops</a></li>
                <li><a href="#" className="hover:text-gray-200">Host a Workshop</a></li>
                <li><a href="#" className="hover:text-gray-200">Contact Us</a></li>
              </ul>
            </div>
  
            {/* Column 3 */}
            <div>
              <h3 className="text-xl font-bold mb-2">Follow Me</h3>
              <div className="flex justify-center space-x-4">
                <a href="https://x.com/churchill_av" target="blank" className="text-gray-400 hover:text-gray-200">
                  <i className="fab fa-twitter"></i> Twitter
                </a>
                <a href="https://linkedin.com/in/vince-churchill" target="blank" className="text-gray-400 hover:text-gray-200">
                  <i className="fab fa-linkedin"></i> LinkedIn
                </a>
              </div>
            </div>
          </div>
  
          {/* Copyright */}
          <div className="mt-6 border-t border-gray-700 pt-4">
            <p className="text-gray-400">Built by Vince Churchill Ankrah - Vintech</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  
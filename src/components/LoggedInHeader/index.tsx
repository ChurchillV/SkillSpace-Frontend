import { useLocation } from "react-router";
import { Placeholder } from "../Exports/export";

const LoggedInHeader = () => {

  const pageTitles: {[key: string]: string} = {
    "/user/home" : "HomePage",
    "/org/home" : "HomePage",
    "/user/settings" : "Settings",
    "/org/settings" : "Settings",
  }

  const profile = JSON.parse(localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE_PROFILE) as string);
  const location = useLocation();
  const title = pageTitles[location.pathname] || "SkillSpace";
  return (
    <header className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-md">
      
      <div className="text-2xl font-bold">
        {title}
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-4">
        <img
          src={profile.photo || Placeholder}
          alt="Organizer"
          className="w-10 h-10 rounded-full object-cover border border-gray-700"
        />
      </div>
    </header>
  );
};

export default LoggedInHeader;

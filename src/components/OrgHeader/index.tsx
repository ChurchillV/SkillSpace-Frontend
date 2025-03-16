import { Logo, Placeholder } from "../Exports/export";

const OrgHeader = () => {
    const profile = JSON.parse(localStorage.getItem(import.meta.env.VITE_LOCALSTORAGE_PROFILE) as string)
  return (
    <header className="flex justify-between items-center p-4 bg-gray-900 text-white shadow-md">
      {/* App Logo */}
      <div className="text-2xl font-bold">
        <img src={Logo} alt="Logo" className="w-12 h-auto"/>
      </div>

      {/* Organizer Profile */}
      <div className="flex items-center gap-4">
        <span className="text-sm">{profile.email}</span>
        <img
          src={profile.photo || Placeholder}
          alt="Organizer"
          className="w-10 h-10 rounded-full object-cover border border-gray-700"
        />
      </div>
    </header>
  );
};

export default OrgHeader;

import { BsCloud } from "react-icons/bs";

export const AdminHeader = () => {
  return (
    <header className="bg-orange-500 text-white px-4 md:px-8 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <BsCloud className="text-white text-5xl md:text-6xl" />
            <span className="absolute text-[10px] md:text-xs font-semibold text-orange-100">
              Mom’s
            </span>
          </div>

          <h1 className="text-xl md:text-2xl font-bold tracking-wide">
            K<span className="text-lg md:text-xl font-medium">itchen</span>
          </h1>
        </div>

        {/* LOGOUT */}
        <button className="bg-white text-orange-500 px-4 py-1.5 rounded-full text-sm md:text-base font-semibold hover:bg-orange-100 transition">
          Logout
        </button>

      </div>
    </header>
  );
};

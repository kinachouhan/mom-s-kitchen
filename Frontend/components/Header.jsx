import { NavLink, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaCartArrowDown, FaBars, FaTimes } from "react-icons/fa";
import { BsCloud } from "react-icons/bs";
import { useState  } from "react";
import { useSelector } from "react-redux";



export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const closeMenu = () => setMenuOpen(false);


  const handleProfileClick = () => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* LOGO */}
        <NavLink to="/" className="flex items-center gap-1">
          <div className="relative flex items-center">
            <BsCloud className="text-orange-400 text-6xl" />
            <span className="absolute left-1/2 -translate-x-1/2 text-xs font-semibold">
              Mom’s
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 ml-1">
            K<span className="text-lg">itchen</span>
          </h1>
        </NavLink>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-6">
          {[
            { path: "/", label: "Home" },
            { path: "/menu", label: "Menu" },
            { path: "/about", label: "About" },
            { path: "/contact", label: "Contact Us" },
          ].map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `font-medium transition ${
                  isActive
                    ? "text-orange-500"
                    : "text-gray-700 hover:text-orange-500"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-4">

          {/* PROFILE ICON */}
          <div
            className="relative"
            onMouseEnter={() => isAuthenticated && setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <CgProfile
              onClick={handleProfileClick}
              className="text-2xl cursor-pointer hover:text-orange-500"
            />

            {/* ✅ DROPDOWN ONLY IF LOGGED IN */}
            {isAuthenticated && showDropdown && (
              <div className="absolute right-0 top-6 w-44 bg-white shadow-lg rounded-md border">
                <NavLink
                  to="/profile"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Profile
                </NavLink>

                <NavLink
                  to="/orders"
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Orders
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* CART */}
          <FaCartArrowDown
            onClick={() => navigate("/cart")}
            className="text-2xl cursor-pointer hover:text-orange-500 transition"
          />

          {/* MOBILE MENU ICON */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <nav className="flex flex-col py-4">
            {[
              { path: "/", label: "Home" },
              { path: "/menu", label: "Menu" },
              { path: "/about", label: "About" },
              { path: "/contact", label: "Contact Us" },
            ].map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `px-6 py-3 text-sm font-medium transition ${
                    isActive
                      ? "text-orange-500 bg-orange-50"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

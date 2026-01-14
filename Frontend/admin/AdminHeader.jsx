import { BsCloud } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../redux/authSlice"
import { useDispatch , useSelector} from "react-redux"
import {useEffect} from "react"

export const AdminHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch()
    const navItems = [
        { label: "Add Items", path: "/admin" },
        { label: "Food List", path: "/admin/list" },
        { label: "Orders", path: "/admin/all-orders" },
    ];

  const {isAuthenticated}= useSelector(state=>state.auth)

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);



    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header className="sticky top-0 z-50 bg-orange-500 shadow-md">
            {/* TOP BAR */}
            <div className="px-4 sm:px-6 lg:px-8 py-3">
                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    {/* LOGO */}
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div className="relative flex items-center justify-center">
                            <BsCloud className="text-white text-4xl sm:text-5xl" />
                            <span className="absolute text-[9px] sm:text-[10px] font-semibold text-orange-100">
                                Mom’s
                            </span>
                        </div>

                        <h1 className="text-lg sm:text-xl font-bold tracking-wide text-white">
                            K<span className="font-medium">itchen</span>
                        </h1>
                    </div>

                    {/* LOGOUT */}
                    <button
                        onClick={handleLogout}
                        className="bg-white text-orange-500 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-orange-100 transition">
                        Logout
                    </button>
                </div>
            </div>

            {/* NAVIGATION */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto px-2 sm:px-6">
                    <div className="flex justify-between sm:justify-start gap-2 py-2 overflow-x-auto">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;

                            return (
                                <button
                                    key={item.path}
                                    onClick={() => navigate(item.path)}
                                    className={`
                    whitespace-nowrap
                    px-3 sm:px-4 py-1.5
                    rounded-full
                    text-xs sm:text-sm
                    font-medium
                    transition
                    ${isActive
                                            ? "bg-orange-500 text-white"
                                            : "text-black hover:bg-orange-500/80 hover:text-white"
                                        }
                  `}
                                >
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </header>
    );
};

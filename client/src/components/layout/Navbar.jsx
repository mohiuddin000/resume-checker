import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const navLinkClass = ({ isActive }) =>
        `rounded-md px-3 py-2 text-sm font-medium transition ${
            isActive
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
        }`;

    return (
        <nav className="sticky top-0 z-50 border-b bg-white shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link
                    to="/dashboard"
                    className="text-2xl font-bold text-blue-600"
                >
                    AI Resume Matcher
                </Link>

                {/* Navigation */}
                <div className="hidden items-center gap-2 md:flex">
                    <NavLink to="/dashboard" className={navLinkClass}>
                        Dashboard
                    </NavLink>

                    <NavLink to="/resumes" className={navLinkClass}>
                        Resume History
                    </NavLink>

                    <NavLink to="/profile" className={navLinkClass}>
                        Profile
                    </NavLink>

                    <NavLink to="/change-password" className={navLinkClass}>
                        Change Password
                    </NavLink>
                </div>

                {/* User */}
                <div className="flex items-center gap-4">
                    <div className="hidden text-right sm:block">
                        <p className="text-sm text-gray-500">Signed in as</p>

                        <p className="font-semibold text-gray-900">
                            {user?.name || "User"}
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

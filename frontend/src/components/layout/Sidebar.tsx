import { useNavigate,NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar(){
    const {logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/signin");
    }

    return (
      <aside className="w-60 h-screen bg-[#0E1B2B] text-white flex flex-col">
        <div className="h-16 flex items-center px-6 text-lg font-semibold border-b border-white/10">
          BOOKBRIDGE
        </div>

        <nav className="flex-1 mt-4">
          <SidebarLink to="/" label="Dashboard" icon="🏠" />
          <SidebarLink to="/authors" label="Authors" icon="🧑‍💼" />
          <SidebarLink to="/books" label="Books" icon="📚" />
          
        </nav>

        <div className="border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-6 py-3 cursor-pointer hover:bg-[#1A3A5F]/60 transition-all mb-4 text-left"
          >
            <span className="text-xl">🚪</span>
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>
    );
}

function SidebarLink({ to, label, icon, extraClasses = "" }: { to: string; label: string; icon: string; extraClasses?: string }) {
    return(
        <NavLink to={to} end className={({isActive})=> `flex items-center gap-3 px-6 py-3 cursor-pointer transition-all ${isActive ? "bg-[#1A3A5F]" : "hover:bg-[#1A3A5F]/60"} ${extraClasses}`}>
            <span className="text-xl">{icon}</span>
            <span className="text-sm font-medium">{label}</span>
        </NavLink>
    )
}
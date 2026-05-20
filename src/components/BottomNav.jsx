import { HiHome } from "react-icons/hi";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { FaSearch, FaUser } from "react-icons/fa";
import { Link } from "react-router";

const navItems = [
  { icon: HiHome, label: "Inicio", path: "/home" },
  { icon: MdOutlineVideoLibrary, label: "Reels", path: "#" },
  { icon: TiMessages, label: "Mensajes", path: "#" },
  { icon: FaSearch, label: "Buscar", path: "#" },
  { icon: FaUser, label: "Perfil", path: "/profile/andrea" },
];

const BottomNav = () => (
  <nav className="fixed bottom-0 left-0 right-0 z-10 border-t border-slate-200 bg-white/95 backdrop-blur">
    <ul className="mx-auto flex max-w-lg items-center justify-around px-4 py-3">
      {navItems.map(({ icon: Icon, label, path }) => (
        <li key={label}>
          {path !== "#" ? (
            <Link
              to={path}
              aria-label={label}
              className="rounded-xl p-2 text-slate-500 transition hover:bg-pink-100 hover:text-rose-600 block"
            >
              <Icon className="h-6 w-6" />
            </Link>
          ) : (
            <button
              type="button"
              aria-label={label}
              className="rounded-xl p-2 text-slate-500 transition hover:bg-pink-100 hover:text-rose-600 cursor-not-allowed opacity-50"
              disabled
            >
              <Icon className="h-6 w-6" />
            </button>
          )}
        </li>
      ))}
    </ul>
  </nav>
);

export default BottomNav;

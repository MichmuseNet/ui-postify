import { HiHome } from "react-icons/hi";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { FaSearch, FaUser } from "react-icons/fa";

const navItems = [
  { icon: HiHome, label: "Inicio" },
  { icon: MdOutlineVideoLibrary, label: "Reels" },
  { icon: TiMessages, label: "Mensajes" },
  { icon: FaSearch, label: "Buscar" },
  { icon: FaUser, label: "Perfil" },
];

const BottomNav = () => (
  <nav className="fixed bottom-0 left-0 right-0 z-10 border-t border-slate-200 bg-white/95 backdrop-blur">
    <ul className="mx-auto flex max-w-lg items-center justify-around px-4 py-3">
      {navItems.map(({ icon: Icon, label }) => (
        <li key={label}>
          <button
            type="button"
            aria-label={label}
            className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"
          >
            <Icon className="h-6 w-6" />
          </button>
        </li>
      ))}
    </ul>
  </nav>
);

export default BottomNav;

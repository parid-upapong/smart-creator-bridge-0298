import { LayoutDashboard, Film, Library, Settings, Zap, Layers } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Film, label: 'Studio', href: '/studio', active: true },
  { icon: Library, label: 'Vault', href: '/vault' },
  { icon: Layers, label: 'Templates', href: '/templates' },
];

export default function Sidebar() {
  return (
    <aside className="w-20 lg:w-64 border-r border-zinc-800 flex flex-col bg-zinc-950 px-4 py-6">
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-10 h-10 bg-violet-600 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg shadow-violet-500/20">
          Ω
        </div>
        <span className="hidden lg:block font-bold text-xl tracking-tight">OVERLORD</span>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
              item.active 
                ? 'bg-violet-600/10 text-violet-400' 
                : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200'
            }`}
          >
            <item.icon size={22} />
            <span className="hidden lg:block font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-zinc-800">
        <button className="flex items-center gap-3 px-3 py-3 w-full text-zinc-500 hover:text-zinc-200">
          <Settings size={22} />
          <span className="hidden lg:block font-medium">Settings</span>
        </button>
      </div>
    </aside>
  );
}
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Болжау', href: '/'},
  { name: 'Аудару', href: '/audaru'},
  { name: 'Тілдесу', href: '/tildesu'},
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text">
          Bolzhau.AI
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${pathname === item.href
                  ? 'text-black font-semibold border-b-2 border-purple-500'
                  : 'text-gray-600 hover:text-black'
                }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Language buttons */}
        <div className="flex gap-2 text-sm">
          <button className="px-4 py-1 rounded-full text-white font-bold bg-gradient-to-r from-purple-400 to-blue-400">
            ҚАЗ
          </button>
          <button className="px-4 py-1 rounded-full border border-gray-300 font-bold text-gray-700 hover:bg-gray-100">
            РУС
          </button>
          <button className="px-4 py-1 rounded-full border border-gray-300 font-bold text-gray-700 hover:bg-gray-100">
            ENG
          </button>
        </div>
      </div>
    </header>
  );
}


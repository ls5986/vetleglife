import Link from 'next/link';
import { ReactNode } from 'react';

export default function SettingsLayout({ children }: { children: ReactNode }) {
  const navItems = [
    { href: '/admin/settings/general', label: 'General' },
    { href: '/admin/settings/email-templates', label: 'Email Templates' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin Settings</h1>
      <div className="grid grid-cols-12 gap-6">
        <aside className="col-span-12 md:col-span-3">
          <nav className="space-y-1 border rounded-md p-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="col-span-12 md:col-span-9">{children}</main>
      </div>
    </div>
  );
}



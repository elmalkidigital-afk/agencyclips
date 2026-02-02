'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Home, BookOpen, Share2, User, Settings } from 'lucide-react';

const navItems = [
  { label: 'Accueil', icon: <Home size={22} />, href: '/' },
  { label: 'Ressources', icon: <BookOpen size={22} />, href: '/' },
  { label: 'Partager', icon: <Share2 size={22} />, href: '/' },
  { label: 'Profil', icon: <User size={22} />, href: '/' },
  { label: 'Paramètres', icon: <Settings size={22} />, href: '/' },
];

const HIDDEN_PATHS = ['/privacy-policy', '/terms-of-service'];

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [activeNav, setActiveNav] = useState('Accueil');
  const pathname = usePathname();

  const showNav = !HIDDEN_PATHS.includes(pathname);

  return (
    <>
      <div className={showNav ? 'pb-20' : ''}>
        {children}
      </div>
      {showNav && (
        <BottomNavigation
          items={navItems}
          active={activeNav}
          onItemClick={setActiveNav}
        />
      )}
    </>
  );
}

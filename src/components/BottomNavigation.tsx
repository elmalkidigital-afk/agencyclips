/**
 * Bottom Navigation Component
 * Apple/Android style navigation bar for mobile
 * 
 * Usage:
 * <BottomNavigation 
 *   items={[
 *     { label: 'Accueil', icon: Home, href: '/' },
 *     { label: 'Recherche', icon: Search, href: '/search' },
 *     { label: 'Profile', icon: User, href: '/profile' }
 *   ]}
 *   active="Accueil"
 * />
 */

'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface BottomNavItem {
  label: string;
  icon: ReactNode;
  href: string;
  badge?: number;
}

interface BottomNavigationProps {
  items: BottomNavItem[];
  active?: string;
  onItemClick?: (label: string) => void;
}

export function BottomNavigation({
  items,
  active,
  onItemClick
}: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 safe-area-bottom bg-card/80 backdrop-blur-lg border-t border-border">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto px-safe">
        {items.map((item) => {
          const isActive = active === item.label;
          
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => onItemClick?.(item.label)}
              className="relative flex flex-col items-center justify-center w-full h-full group"
            >
              {/* Animated background on active */}
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-primary/10 rounded-t-2xl"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              
              {/* Icon and Label */}
              <div className="relative flex flex-col items-center gap-1 transition-smooth">
                <div className={cn(
                  'relative transition-smooth',
                  isActive && 'text-primary scale-110'
                )}>
                  {item.icon}
                  
                  {/* Badge */}
                  {item.badge && (
                    <span className="absolute -top-1 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold bg-accent text-accent-foreground rounded-full">
                      {item.badge > 99 ? '99+' : item.badge}
                    </span>
                  )}
                </div>
                
                {/* Label */}
                <span className={cn(
                  'text-xs font-medium transition-smooth',
                  isActive 
                    ? 'text-primary' 
                    : 'text-muted-foreground group-hover:text-foreground'
                )}>
                  {item.label}
                </span>
              </div>
              
              {/* Press feedback */}
              <div className="absolute inset-0 rounded-t-2xl transition-smooth group-active:bg-primary/20" />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomNavigation;

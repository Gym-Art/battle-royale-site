'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Tab {
  id: string;
  label: string;
}

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'identity', label: 'Identity' },
  { id: 'brand-kit', label: 'Brand Kit' },
  { id: 'roster', label: 'Roster' },
  { id: 'permissions', label: 'Coaches & Members' },
  { id: 'media', label: 'Media Board' },
  { id: 'share', label: 'Share & Export' },
];

interface TeamDashboardTabsProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export function TeamDashboardTabs({ activeTab, onTabChange }: TeamDashboardTabsProps) {
  const pathname = usePathname();
  const [currentTab, setCurrentTab] = useState<string>('overview');

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash && tabs.some((tab) => tab.id === hash)) {
      setCurrentTab(hash);
    } else {
      setCurrentTab('overview');
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && tabs.some((tab) => tab.id === hash)) {
        setCurrentTab(hash);
        onTabChange?.(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [onTabChange]);

  const handleTabClick = (tabId: string) => {
    setCurrentTab(tabId);
    window.history.replaceState(null, '', `${pathname}#${tabId}`);
    onTabChange?.(tabId);
  };

  const activeTabId = activeTab || currentTab;

  return (
    <div className="bg-surface-card border border-surface-muted rounded-lg p-4 mb-6">
      <div className="flex flex-wrap gap-2 md:gap-0 md:flex-nowrap overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTabId === tab.id
                ? 'bg-neon-green text-text-dark'
                : 'text-text-secondary hover:text-neon-green hover:bg-surface-muted'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}


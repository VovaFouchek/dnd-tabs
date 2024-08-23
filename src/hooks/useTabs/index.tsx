import { useEffect, useState } from 'react';
import { Tab } from '../../components/Tabs';

interface useTabsProps {
  tabs: Tab[];
  storageKey?: string;
}

const useTabs = ({ tabs, storageKey }: useTabsProps) => {
  const getInitialTab = () => {
    if (storageKey) {
      const savedTab = localStorage.getItem(storageKey);
      return savedTab ?? tabs[0]?.id;
    }

    return tabs[0]?.id;
  };

  const [activeTab, setActiveTab] = useState<string>(getInitialTab);

  const switchTab = (tabName: string): void => setActiveTab(tabName);

  useEffect(() => {
    if (storageKey && activeTab) {
      localStorage.setItem(storageKey, activeTab);
    }
  }, [activeTab, storageKey]);

  return { activeTab, switchTab, tabs };
};

export default useTabs;

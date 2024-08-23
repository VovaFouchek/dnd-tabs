import { useCallback, useEffect, useState } from 'react';
import { Tab } from '../../components/Tabs';
import { useDrop } from 'react-dnd';

interface useTabsProps {
  initialTabs: Tab[];
  storageKey?: string;
}

const useTabs = ({ initialTabs, storageKey }: useTabsProps) => {
  const getInitialTab = () => {
    if (storageKey) {
      const savedTab = localStorage.getItem(storageKey);
      return savedTab ?? tabs[0]?.id;
    }

    return tabs[0]?.id;
  };

  const [tabs, setTabs] = useState<Tab[]>(initialTabs);
  const [activeTab, setActiveTab] = useState<string>(getInitialTab);

  const findTab = useCallback(
    (id: string) => {
      const tab = tabs.filter((tab) => tab.id === id)[0];
      return {
        tab,
        index: tabs.indexOf(tab),
      };
    },
    [tabs],
  );

  const moveTab = useCallback(
    (id: string, atIndex: number) => {
      const { tab, index } = findTab(id);

      const updatedTabs = [...tabs];
      updatedTabs.splice(index, 1);
      updatedTabs.splice(atIndex, 0, tab);

      setTabs(updatedTabs);
    },
    [findTab, tabs],
  );

  const [, drop] = useDrop(() => ({ accept: 'TAB' }));

  const togglePin = (id: string) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => (tab.id === id ? { ...tab, isPinned: !tab.isPinned } : tab)),
    );
  };

  const switchTab = (tabName: string): void => setActiveTab(tabName);

  useEffect(() => {
    if (storageKey && activeTab) {
      localStorage.setItem(storageKey, activeTab);
    }
  }, [activeTab, storageKey]);

  return { activeTab, switchTab, tabs, moveTab, findTab, drop, togglePin };
};

export default useTabs;

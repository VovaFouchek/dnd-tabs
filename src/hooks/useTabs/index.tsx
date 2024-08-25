import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDrop } from 'react-dnd';

import { Tab } from '@/components/Tabs';
import { localStore } from '@/utilities/localStorage';

interface useTabsProps {
  initialTabs: Tab[];
  storageKey?: string;
}

const useTabs = ({ initialTabs, storageKey }: useTabsProps) => {
  const getInitialTabs = () => {
    if (storageKey) {
      const savedTabs = localStore.getData(`${storageKey}-tabs`);

      if (savedTabs) {
        return savedTabs as Tab[];
      }
    }
    return initialTabs;
  };

  const getInitialTab = () => {
    if (storageKey) {
      const savedTab = localStore.getData(`${storageKey}-activeTab`);

      return savedTab ?? tabs[0]?.id;
    }

    return tabs[0]?.id;
  };

  const [tabs, setTabs] = useState<Tab[]>(getInitialTabs);
  const [activeTab, setActiveTab] = useState<string>(getInitialTab);

  const [pinnedTabs, unpinnedTabs] = useMemo(() => {
    const pinned = tabs.filter((tab) => tab.isPinned);
    const unpinned = tabs.filter((tab) => !tab.isPinned);

    return [pinned, unpinned];
  }, [tabs]);

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

      if (tab.isPinned) return;

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
    if (storageKey) {
      localStore.update(`${storageKey}-tabs`, tabs);
    }
  }, [tabs, storageKey]);

  useEffect(() => {
    if (storageKey && activeTab) {
      localStore.update(`${storageKey}-activeTab`, activeTab);
    }
  }, [activeTab, storageKey]);

  return {
    pinnedTabs,
    unpinnedTabs,
    activeTab,
    switchTab,
    moveTab,
    findTab,
    drop,
    togglePin,
  };
};

export default useTabs;

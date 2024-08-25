import { useCallback, useMemo, useState } from 'react';

import { Tab } from '@/components/Tabs';

interface UseVisibleTabsProps {
  tabs: Tab[];
}

const useVisibleTabs = ({ tabs }: UseVisibleTabsProps) => {
  const [hiddenTabs, setHiddenTabs] = useState<string[]>([]);

  const handleVisibilityChange = useCallback((id: string, isVisible: boolean) => {
    setHiddenTabs((prevHiddenTabs) =>
      isVisible ? prevHiddenTabs.filter((tabId) => tabId !== id) : [...prevHiddenTabs, id],
    );
  }, []);

  const filteredHiddenTabs = useMemo(
    () => tabs.filter((tab) => hiddenTabs.includes(tab.id)),
    [tabs, hiddenTabs],
  );

  return { filteredHiddenTabs, handleVisibilityChange };
};

export default useVisibleTabs;

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import useTabs from '@/hooks/useTabs';
import DropdownMenu from '../DropdownMenu';
import TabCard from '../TabCard';

import './tabs.scss';

export interface Tab {
  readonly id: string;
  label: string;
  icon: string;
  isPinned?: boolean;
  content?: React.ReactNode; // * in production it needs to be require field
}

interface TabsProps {
  initialTabs: Tab[];
  storageKey?: string;
}

const Tabs = ({ initialTabs, storageKey }: TabsProps) => {
  const navigate = useNavigate();
  const { pinnedTabs, unpinnedTabs, activeTab, switchTab, drop, moveTab, findTab, togglePin } =
    useTabs({ initialTabs, storageKey });

  const tabs = useMemo(() => [...pinnedTabs, ...unpinnedTabs], [pinnedTabs, unpinnedTabs]);

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

  useEffect(() => {
    const { tab } = findTab(activeTab);

    if (tab) {
      navigate(`/dnd-tabs/${tab.id}`);
    }
  }, [activeTab, findTab, navigate]);

  if (pinnedTabs.length === 0 && unpinnedTabs.length === 0) {
    return <div className="tabs__empty">No tabs available</div>;
  }

  return (
    <>
      <div className="wrapper">
        <div className="tabs" ref={drop}>
          <div className="tabs__pinned-inner">
            {tabs.map((tab) => (
              <TabCard
                onVisibilityChange={handleVisibilityChange}
                key={tab.id}
                tab={tab}
                moveTab={moveTab}
                findTab={findTab}
                activeTab={activeTab}
                switchTab={switchTab}
                isPinned={tab.isPinned}
                togglePin={togglePin}
              />
            ))}
          </div>

          {filteredHiddenTabs.length > 0 && (
            <DropdownMenu arrowIcon menuItems={filteredHiddenTabs} />
          )}
        </div>
      </div>

      {tabs.map((tab) =>
        activeTab === tab.id ? (
          <div className="tab__content" key={tab.id}>
            {tab.content}
          </div>
        ) : null,
      )}
    </>
  );
};

export default Tabs;

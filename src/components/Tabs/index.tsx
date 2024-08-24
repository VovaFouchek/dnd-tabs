import React from 'react';

import useTabs from '../../hooks/useTabs';
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
  const { pinnedTabs, unpinnedTabs, activeTab, switchTab, drop, moveTab, findTab, togglePin } =
    useTabs({ initialTabs, storageKey });

  if (pinnedTabs.length === 0 && unpinnedTabs.length === 0) {
    return <div className="tabs__empty">No tabs available</div>;
  }

  return (
    <>
      <div className="wrapper">
        <div className="tabs" ref={drop}>
          <div className="tabs__pinned-inner">
            {pinnedTabs.map((tab) => (
              <TabCard
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

          {unpinnedTabs.map((tab) => (
            <TabCard
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
      </div>

      {[...pinnedTabs, ...unpinnedTabs].map((tab) =>
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

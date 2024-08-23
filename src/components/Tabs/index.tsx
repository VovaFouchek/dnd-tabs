import React from 'react';

import useTabs from '../../hooks/useTabs';
import TabCard from '../TabCard';

import './tabs.scss';

export interface Tab {
  readonly id: string;
  label: string;
  icon: string;
  content?: React.ReactNode; // * in production it needs to be require field
}

interface TabsProps {
  initialTabs: Tab[];
  storageKey?: string;
}

const Tabs = ({ initialTabs, storageKey }: TabsProps) => {
  const {
    activeTab,
    switchTab,
    tabs: tabItems,
    drop,
    moveTab,
    findTab,
  } = useTabs({ initialTabs, storageKey });

  if (tabItems.length === 0) {
    return <div className="tabs__empty">No tabs available</div>;
  }

  return (
    <>
      <div className="wrapper">
        <div className="tabs" ref={drop}>
          {tabItems.map((tab) => (
            <TabCard
              key={tab.id}
              tab={tab}
              moveTab={moveTab}
              findTab={findTab}
              activeTab={activeTab}
              switchTab={switchTab}
            />
          ))}
        </div>
      </div>

      {tabItems.map((tab) =>
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

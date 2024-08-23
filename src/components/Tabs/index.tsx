import React from 'react';
import './tabs.scss';

import cx from 'classnames';
import useTabs from '../../hooks/useTabs';

export interface Tab {
  readonly id: string;
  label: string;
  icon: string;
  content?: React.ReactNode; // * in production it needs to be require field
}

interface TabsProps {
  tabs: Tab[];
  storageKey?: string;
}

const Tabs = ({ tabs, storageKey }: TabsProps) => {
  const { activeTab, switchTab, tabs: tabItems } = useTabs({ tabs, storageKey });

  if (tabs.length === 0) {
    return <div className="tabs__empty">No tabs available</div>;
  }

  return (
    <>
      <div className="wrapper">
        <div className="tabs">
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => switchTab(tab.id)}
              className={cx('tab', {
                active: activeTab === tab.id,
              })}
            >
              <img src={tab.icon} className="tab__icon" alt={tab.id} />
              {tab.label}
            </button>
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

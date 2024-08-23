import { memo, useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import TabCard from '../Card/index';

interface Tab {
  id: string;
  label: string;
}

const initialTabs: Tab[] = [
  { id: '1', label: 'Tab 1' },
  { id: '2', label: 'Tab 2' },
  { id: '3', label: 'Tab 3' },
  { id: '4', label: 'Tab 4' },
  { id: '5', label: 'Tab 5' },
];

const containerStyle = {
  width: 400,
  margin: '0 auto',
};

const TabContainer = () => {
  const [tabs, setTabs] = useState<Tab[]>(initialTabs);

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

  return (
    <div ref={drop} style={containerStyle}>
      {tabs.map((tab) => (
        <TabCard key={tab.id} id={tab.id} label={tab.label} moveTab={moveTab} findTab={findTab} />
      ))}
    </div>
  );
};

export default memo(TabContainer);

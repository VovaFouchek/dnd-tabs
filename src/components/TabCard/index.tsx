import { memo } from 'react';

import { useDrag, useDrop } from 'react-dnd';
import cx from 'classnames';

import { Tab } from '../Tabs';

interface TabCardProps {
  tab: Tab;
  activeTab: string;
  switchTab: (id: string) => void;
  moveTab: (id: string, to: number) => void;
  findTab: (id: string) => { index: number };
}

interface DragItem {
  id: string;
  originalIndex: number;
}

const TabCard = ({ tab, activeTab, switchTab, moveTab, findTab }: TabCardProps) => {
  const { id, label, icon } = tab;
  const originalIndex = findTab(id).index;

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'TAB',
      item: { id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();

        if (!didDrop) {
          moveTab(droppedId, originalIndex);
        }
      },
    }),
    [id, originalIndex, moveTab],
  );

  const [, drop] = useDrop(
    () => ({
      accept: 'TAB',
      hover({ id: draggedId }: DragItem) {
        if (draggedId !== id) {
          const { index: overIndex } = findTab(id);
          moveTab(draggedId, overIndex);
        }
      },
    }),
    [findTab, moveTab],
  );

  return (
    <button
      role="tab"
      id={id}
      key={id}
      ref={(node) => drag(drop(node))}
      onClick={() => switchTab(id)}
      aria-selected={activeTab === id}
      className={cx('tab', {
        active: activeTab === id,
        draggable: isDragging,
      })}
    >
      <img src={icon} className="tab__icon" alt={id} />
      {label}
    </button>
  );
};

export default memo(TabCard);

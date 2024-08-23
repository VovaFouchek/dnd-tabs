import { memo, useEffect, useRef, useState } from 'react';

import { useDrag, useDrop } from 'react-dnd';
import cx from 'classnames';

import { Tab } from '../Tabs';
import ContextMenu from '../ContextMenu';

interface TabCardProps {
  tab: Tab;
  activeTab: string;
  isPinned?: boolean;
  togglePin: (id: string) => void;
  switchTab: (id: string) => void;
  moveTab: (id: string, to: number) => void;
  findTab: (id: string) => { index: number };
}

interface DragItem {
  id: string;
  originalIndex: number;
}

const DELAY_FOR_LONG_PRESS = 2000;

const TabCard = ({
  tab,
  activeTab,
  switchTab,
  moveTab,
  findTab,
  isPinned,
  togglePin,
}: TabCardProps) => {
  const { id, label, icon } = tab;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpenMenu = Boolean(anchorEl);

  const ref = useRef<HTMLButtonElement>(null);
  const touchTimeoutRef = useRef<number | undefined>();

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
      canDrag: !isPinned,
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

  const handleContextMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleTouchStart = () => {
      touchTimeoutRef.current = window.setTimeout(() => {
        const dragEvent = new DragEvent('dragstart', {
          bubbles: true,
          cancelable: true,
        });

        node.dispatchEvent(dragEvent);
      }, DELAY_FOR_LONG_PRESS);
    };

    const handleTouchEnd = () => {
      if (touchTimeoutRef.current) {
        clearTimeout(touchTimeoutRef.current);
      }
    };

    node.addEventListener('touchstart', handleTouchStart, { passive: true });
    node.addEventListener('touchend', handleTouchEnd, { passive: true });
    node.addEventListener('touchmove', handleTouchEnd, { passive: true });

    return () => {
      node.removeEventListener('touchstart', handleTouchStart);
      node.removeEventListener('touchend', handleTouchEnd);
      node.removeEventListener('touchmove', handleTouchEnd);
    };
  }, []);

  drag(drop(ref));

  return (
    <>
      <button
        role="tab"
        id={id}
        key={id}
        ref={ref}
        onClick={() => switchTab(id)}
        onContextMenu={handleContextMenu}
        className={cx('tab', {
          active: activeTab === id,
          draggable: isDragging,
          pinned: isPinned,
        })}
        aria-selected={activeTab === id}
        aria-controls={isOpenMenu ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isOpenMenu ? 'true' : undefined}
      >
        <img src={icon} className="tab__icon" alt={id} />
        <span>{label}</span>

        <ContextMenu
          id={id}
          anchorEl={anchorEl}
          isOpenMenu={isOpenMenu}
          isPinned={isPinned}
          togglePin={togglePin}
          handleCloseMenu={handleCloseMenu}
        />
      </button>
    </>
  );
};

export default memo(TabCard);

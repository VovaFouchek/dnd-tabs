import { memo, useState } from 'react';

import cx from 'classnames';

import useTabDragAndDrop from '../../hooks/useTabDragAndDrop';
import ContextMenu from '../ContextMenu';
import { Tab } from '../Tabs';

interface TabCardProps {
  tab: Tab;
  activeTab: string;
  isPinned?: boolean;
  togglePin: (id: string) => void;
  switchTab: (id: string) => void;
  moveTab: (id: string, to: number) => void;
  findTab: (id: string) => { index: number };
}

const TabCard = ({
  tab,
  activeTab,
  isPinned,
  togglePin,
  switchTab,
  moveTab,
  findTab,
}: TabCardProps) => {
  const { id, label, icon } = tab;
  const { ref, isDragging } = useTabDragAndDrop({ id, isPinned, moveTab, findTab });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpenMenu = Boolean(anchorEl);

  const handleContextMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

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

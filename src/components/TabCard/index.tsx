import { memo, useEffect, useState } from 'react';

import cx from 'classnames';
import { Tooltip } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { mergeRefs } from 'react-merge-refs';

import useTabDragAndDrop from '@/hooks/useTabDragAndDrop';
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
  onVisibilityChange: (id: string, inView: boolean) => void;
}

const tooltipStylesProps = {
  tooltip: {
    sx: {
      padding: '15px',
      borderRadius: '7px',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: '500',
      fontSize: '14px',
      color: '#343434',
      bgcolor: '#fff',
      boxShadow: '0px 5px 10px 2px #223c5023',
    },
  },
};

const TabCard = ({
  tab,
  activeTab,
  isPinned,
  togglePin,
  switchTab,
  moveTab,
  findTab,
  onVisibilityChange,
}: TabCardProps) => {
  const { id, label, icon } = tab;
  const { ref: dragRef, isDragging } = useTabDragAndDrop({ id, isPinned, moveTab, findTab });
  const { ref: viewRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0,
  });
  const mergedRef = mergeRefs([dragRef, viewRef]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpenMenu = Boolean(anchorEl);

  const handleContextMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    onVisibilityChange(id, inView);
  }, [id, inView, onVisibilityChange]);

  const tooltipTitle = () => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={icon} alt={id} style={{ marginRight: '10px' }} />
      <span>{label}</span>
    </div>
  );

  return (
    <>
      <Tooltip
        componentsProps={tooltipStylesProps}
        title={isPinned && !isOpenMenu && tooltipTitle()}
      >
        <button
          role="tab"
          id={id}
          key={id}
          ref={mergedRef}
          onClick={() => switchTab(id)}
          onContextMenu={handleContextMenu}
          className={cx('tab', {
            active: activeTab === id,
            draggable: isDragging,
            pinned: isPinned,
          })}
          aria-selected={activeTab === id}
          aria-controls={isOpenMenu ? 'menu' : undefined}
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
      </Tooltip>
    </>
  );
};

export default memo(TabCard);

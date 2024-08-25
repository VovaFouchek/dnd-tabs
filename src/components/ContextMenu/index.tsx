import { Menu, MenuItem } from '@mui/material';
import IPin from '../../../public/icons/pin.svg';

interface ContextMenuProps {
  id: string;
  anchorEl: HTMLElement | null;
  isOpenMenu: boolean;
  isPinned?: boolean;
  togglePin: (id: string) => void;
  handleCloseMenu: () => void;
}

const menuItemStyles = {
  fontFamily: 'Poppins, sans-serif',
  fontSize: '14px',
};

const ContextMenu = ({
  id,
  anchorEl,
  isOpenMenu,
  isPinned,
  togglePin,
  handleCloseMenu,
}: ContextMenuProps) => {
  return (
    <>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={isOpenMenu}
        onClose={handleCloseMenu}
        MenuListProps={{
          'aria-labelledby': 'button',
        }}
      >
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            togglePin(id);
          }}
          sx={menuItemStyles}
        >
          <img src={IPin} alt="pin" style={{ marginRight: '10px' }} />
          {isPinned ? 'Tab lösen' : 'Tab anpinnen'}
        </MenuItem>
      </Menu>
    </>
  );
};

export default ContextMenu;

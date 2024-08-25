import { useState } from 'react';

import cx from 'classnames';
import { MenuItem, Menu, Button } from '@mui/material';

import { Tab } from '../Tabs';
import ArrowIcon from '../../assets/icons/arrow.svg';

import './dropdownMenu.scss';

interface DropdownMenuProps {
  menuItems: Tab[];
  buttonLabel?: string;
  arrowIcon?: boolean;
}

const DropdownMenu = ({ buttonLabel, menuItems, arrowIcon }: DropdownMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = () => {
    console.log('test');
  };

  return (
    <div className="dropdown-menu">
      <Button
        id="dropdown-button"
        aria-controls={open ? 'dropdown-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className={cx('dropdown-menu__button', {
          open: open,
        })}
      >
        {buttonLabel}
        {arrowIcon && (
          <img
            src={ArrowIcon}
            className={cx('arrow__icon', {
              open: open,
            })}
            alt="arrow"
          />
        )}
      </Button>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'dropdown-button',
        }}
      >
        {menuItems?.map((item) => (
          <MenuItem key={item.id} onClick={handleMenuItemClick}>
            {/* <img src={item.icon} className="tab__icon" /> */}
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropdownMenu;

import React from 'react';
import { Avatar, Menu, MenuItem, IconButton, Tooltip } from '@mui/material';

export default function AccountMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event: { currentTarget: React.SetStateAction<null>; }) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar alt="Aarav" src="/static/images/avatar/1.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem disabled>Hello, {props.name}</MenuItem>
          <MenuItem onClick={()=>IMPLEMENT_THIS()}>Logout</MenuItem>
        </Menu>
      </>
    );
  }
import Button from '@mui/material/Button';
import React, { useState , useEffect} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import SellIcon from '@mui/icons-material/Sell';

export default function ProfileLogo({Username}) {
        const [anchorEl, setAnchorEl] = useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
        setAnchorEl(null);
        };    
        const handleLogout = () =>{
            localStorage.removeItem("AuthToken");
            window.location.href = "/";
        }
        return (
        <div>
            <Button
                startIcon={<SellIcon/>}
                variant='outlined'
                color = 'primary'
                size="small"
                component={Link} 
                to="/addProduct"
                >
                新增拍賣品
            </Button>
            <Button
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                startIcon={<AccountCircleIcon/>}
            >
            {Username}
            </Button>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem component={Link} to= "/profile" onClick={handleClose}>個人資料</MenuItem>
                <MenuItem onClick={handleLogout}>登出</MenuItem>
            </Menu>
        </div>
    )
}

import Button from '@mui/material/Button';
import React, { useState , useEffect} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddProductButton from './AddProductButton';
import { Link } from 'react-router-dom';

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
            <AddProductButton/>
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

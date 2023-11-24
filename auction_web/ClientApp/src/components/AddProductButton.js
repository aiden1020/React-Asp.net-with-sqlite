import Button from '@mui/material/Button';
import React, { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import SellIcon from '@mui/icons-material/Sell';

export default function ProfileLogo() {

    return (

        <Link to="/addProduct">
            <Button
                startIcon={<SellIcon/>}
                variant='contained'
                color = 'primary'
                size="small"
                >
                新增拍賣品
            </Button>
        </Link>
    )
}

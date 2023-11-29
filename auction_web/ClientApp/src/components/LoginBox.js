import React from 'react';
import {Button,Typography,TextField,Stack,Box} from '@mui/material';

import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Link from '@mui/material/Link';
export default function LoginBox({ handleShowRegister,handleClose,handlehaslogined}) {
    const handleLogin = () => {
        const apiUrl = "/api/Login";
        const username =document.getElementById("login_username").value;
        const password =document.getElementById("login_password").value;

        const login_info ={
            UserName : username,
            Password : password
        }
        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(login_info),
        })
            .then((response) => {
              if (response.ok) {
                handleClose();
                handlehaslogined(username);
                return response.json();
              } else if(response.status === 409){
                return response.text();
              } 
              else {
                throw new Error('Login error');  
              }

            })
            .then((data) => {
              if (data == "用戶名或密碼錯誤" || data == "用戶名不存在"){
                alert(data)
              }
              else{
                const {token} =data;
                localStorage.setItem("AuthToken",token)
            }
            })
            .catch((error) => {
              console.error('Error:', error); 
            });
        }
    
    return(
        <Box className="centered-box">
          <IconButton onClick={handleClose} className="cross-button">
            <ClearIcon />
          </IconButton>
          <Stack justifyContent="center" alignItems="center" spacing={1}>
            <Typography variant="h5">登入</Typography>
            <TextField id="login_username" label="用戶名" variant="outlined"  fullWidth/>
            <TextField id="login_password"  label="密碼" variant="outlined" type="password"fullWidth/>
            <Stack spacing={15} direction="row" alignItems="center" justifyContent="center">
              <Typography>沒有帳號？</Typography>
              <Link component="button"onClick={handleShowRegister}>創辦新帳號</Link>
            </Stack>
            <Button variant="contained" onClick={handleLogin} fullWidth>登入</Button>
         </Stack>
        </Box>

    );
}


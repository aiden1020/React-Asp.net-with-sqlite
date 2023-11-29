import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack'; 
export default function RegisterBox ( {handleClose}) {
    const validateEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
      };
    
      const validatePassword = (password ) => {
        return password.length >= 8 ;
      };
      const validateDoublePassword = (password, double_password) => {
        return password == double_password;
        };
      const handleRegister = () => {
        const email = document.getElementById("register_email").value;
        const password = document.getElementById("register_password").value;
        const double_password = document.getElementById("register_double_password").value;

        if (!validateEmail(email)) {
          alert("請輸入有效的電郵 ");
          return;
        }
    
        if (!validatePassword(password )) {
          alert("密碼必須包含8個字符以上");
          return;
        }
        if (!validateDoublePassword(password, double_password )) {
            alert("重新輸入密碼不相同");
            return;
        }
        const user = {
          UserName: document.getElementById("register_username").value,
          LastName: document.getElementById("register_last_name").value,
          FirstName: document.getElementById("register_first_name").value,
          PhoneNumber: document.getElementById("register_phone").value,
          Email: email,
          Password: password,
        };
        fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user), 
        })
          .then((response) => {
            if (response.ok) {
              alert("註冊成功");
              handleClose();
            } else {
              response.text().then(text => {
                alert(text);  
              });
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };
    
      return (
        <Box className="centered-box">
          <IconButton onClick={handleClose} className="cross-button">
            <ClearIcon />
          </IconButton>
          <Stack justifyContent="center" alignItems="center" spacing={2}>
            <Typography variant="h5">註冊</Typography>
            <TextField id="register_username" label="用戶名" variant="outlined" fullWidth/> 
            <Stack justifyContent="center" alignItems="center"  direction="row" spacing={2}>
              <TextField id="register_last_name" label="姓氏" variant="outlined" fullWidth/>
              <TextField id="register_first_name" label="名字" variant="outlined" fullWidth/>
            </Stack>
            <TextField id="register_phone" label="電話號碼" variant="outlined" fullWidth/>
            <TextField id="register_email" label="電郵" variant="outlined" fullWidth/>
            <TextField id="register_password" label="創建密碼" variant="outlined" type="password" fullWidth/>
            <TextField id="register_double_password" label="重新輸入密碼" variant="outlined" type="password" fullWidth/>
            <Button variant="contained" className="register_button" onClick={handleRegister}>註冊</Button>
          </Stack>
        </Box>
      );
    }
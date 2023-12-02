import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

const RegisterBox = ({ handleClose }) =>{
    const [username, setUsername] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [doublePassword, setDoublePassword] = useState('');

    const validateEmail = (email) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const validateDoublePassword = (password, doublePassword) => {
        return password === doublePassword;
    };

    const handleRegister = () => {
        if (!validateEmail(email)) {
            alert("請輸入有效的電郵 ");
            return;
        }

        if (!validatePassword(password)) {
            alert("密碼必須包含8個字符以上");
            return;
        }

        if (!validateDoublePassword(password, doublePassword)) {
            alert("重新輸入密碼不相同");
            return;
        }

        const user = {
            UserName: username,
            LastName: lastName,
            FirstName: firstName,
            PhoneNumber: phone,
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
                    response.text().then((text) => {
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
                <TextField
                    label="用戶名"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Stack justifyContent="center" alignItems="center" direction="row" spacing={2}>
                    <TextField
                        label="姓氏"
                        variant="outlined"
                        fullWidth
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                        label="名字"
                        variant="outlined"
                        fullWidth
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Stack>
                <TextField
                    label="電話號碼"
                    variant="outlined"
                    fullWidth
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <TextField
                    label="電郵"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="創建密碼"
                    variant="outlined"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    label="重新輸入密碼"
                    variant="outlined"
                    type="password"
                    fullWidth
                    value={doublePassword}
                    onChange={(e) => setDoublePassword(e.target.value)}
                />
                <Button variant="contained" className="register_button" onClick={handleRegister}>
                    註冊
                </Button>
            </Stack>
        </Box>
    );
}
export default RegisterBox;
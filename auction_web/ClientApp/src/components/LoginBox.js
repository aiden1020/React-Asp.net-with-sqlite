import React, { useState } from 'react';
import { Button, Typography, TextField, Stack, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Link from '@mui/material/Link';

const LoginBox = ({ handleShowRegister, handleClose, handlehaslogined }) =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const apiUrl = "/api/Login";

        const loginInfo = {
            UserName: username,
            Password: password
        };

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginInfo),
        })
            .then((response) => {
                if (response.ok) {
                    handleClose();
                    handlehaslogined(username);
                    return response.json();
                } else if (response.status === 409) {
                    return response.text();
                } else {
                    throw new Error('Login error');
                }
            })
            .then((data) => {
                if (data === "用戶名或密碼錯誤" || data === "用戶名不存在") {
                    alert(data);
                } else {
                    const { token } = data;
                    localStorage.setItem("AuthToken", token);
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
            <Stack justifyContent="center" alignItems="center" spacing={1}>
                <Typography variant="h5">登入</Typography>
                <TextField
                    label="用戶名"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="密碼"
                    variant="outlined"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Stack spacing={15} direction="row" alignItems="center" justifyContent="center">
                    <Typography>沒有帳號？</Typography>
                    <Link component="button" onClick={handleShowRegister}>
                        創辦新帳號
                    </Link>
                </Stack>
                <Button variant="contained" onClick={handleLogin} fullWidth>
                    登入
                </Button>
            </Stack>
        </Box>
    );
}
export default LoginBox;
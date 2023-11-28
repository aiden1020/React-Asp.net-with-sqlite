import React,{useEffect,useState} from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack'; 
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ProfileInfo() {
    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        firstname: '',
        lastname: ''
      });
    const loadingState ='Loading';
    useEffect(() => {
        const authToken = localStorage.getItem("AuthToken");
      
        fetch('/api/profileinfo', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              return response.text().then(text => {
                throw new Error(text);
              });
            }
          })
          .then((data) => {
            setUserInfo({
                username: data.username,
                email: data.email,
                firstname: data.firstname,
                lastname: data.lastname
              });
          })
          .catch((error) => {
            console.error('Error:', error);
            alert('發生錯誤，請稍後再試！');
          });
    }, []); 
    return(
        <Box className="centered-box">
            <Stack justifyContent="center" alignItems="center" spacing={2}>
                <AccountCircleIcon/>
                <Typography variant="h8">用戶名稱: {userInfo.username? userInfo.username: loadingState}</Typography>
                <Typography variant="h8">電郵: {userInfo.email? userInfo.email: loadingState}</Typography>
                <Typography variant="h8">姓氏: {userInfo.firstname? userInfo.firstname: loadingState}</Typography>
                <Typography variant="h8">名字: {userInfo.lastname? userInfo.lastname: loadingState}</Typography>
            </Stack>
        </Box>
    );

}
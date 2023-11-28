import React, { useState , useEffect} from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import './Login.css';  
import LoginBox from "./LoginBox" 
import RegisterBox from "./RegisterBox" 
import LoginIcon from '@mui/icons-material/Login';
import ProfileLogo from './ProfileLogo';

export default function AuthenticationLayout() {
  const [open, setOpen] =useState(false);
  const [haslogined, sethaslogined] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [Username, setUsername] =useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setShowRegister(false);  
  };
  useEffect(() => {
    const authToken = localStorage.getItem("AuthToken");
    fetch('/api/loginstatus', {
      method: 'GET', 
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
    .then(response => response.json()) 
    .then(data => {
      const { haslogined, username } = data;
      sethaslogined(haslogined);
      setUsername(username);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, []); 
  const handleShowRegister = () => {
    setOpen(false);
    setShowRegister(true);  
  };
  const handlehaslogined = (uName) => {
    sethaslogined(true);
    setUsername(uName);

  };

  return (
    <div>
      {!haslogined && <Button onClick={handleOpen} startIcon={<LoginIcon />}  >登入</Button>}
      {haslogined && <ProfileLogo Username = {Username}/>} 

      <Modal open={open} onClose={handleClose} >
          <LoginBox handleShowRegister={ handleShowRegister } handleClose={handleClose} handlehaslogined={handlehaslogined}/>
      </Modal>
      <Modal open={showRegister} onClose={handleClose}>
        <RegisterBox showRegister={showRegister} handleClose={handleClose}/>
      </Modal>
    </div>
  );
}
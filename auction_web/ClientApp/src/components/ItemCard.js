import React, { useState , useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // 如果你想使用預設的樣式，請引入這個 CSS 文件

export default function ItemCard({itemName,description,days_left,imgsrc,productId}) {
  
  const handleDeleteItem = async()=>{
    const authToken = localStorage.getItem("AuthToken");
    fetch(`/api/deleteproduct/${productId}`, {
          method: 'DELETE',
          headers: {
              'Authorization': `Bearer ${authToken}`
          }
      })
      .then(response => {
        if (response.ok) {
          window.location.reload();
          return response.text();
        } else {
          return response.text();
        }
      })
      .then(data=>{
        alert(data)
      })
      .catch(error => {
          console.error('Error during delete request:', error);
      });
    }
  

  const  submit = () => {
    confirmAlert({
      title: '確認刪除',
      message: `你確定要刪除 ${itemName} 這個商品嗎？`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDeleteItem()
        },
        {
          label: 'No',
        }
      ]
    })
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image = {imgsrc}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {itemName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <b>拍賣品描述：</b><br />
          {description.length > 10 ? `${description.substring(0, 10)}...` : description}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          <b>拍賣時間剩下：</b><br/>
          {days_left}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/personal-item/details/${productId}`}>詳細內容</Button>
        <Button size="small" variant='contained' color="error" onClick={submit}>刪除商品</Button>
      </CardActions>
    </Card>
    
  );
}
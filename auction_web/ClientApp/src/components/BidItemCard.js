import React, { useState , useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // 如果你想使用預設的樣式，請引入這個 CSS 文件
import { CardActionArea } from '@mui/material';

export default function ItemCard({itemName,description,days_left,imgsrc,productId,starting_price,highest_bid_price,owner_name,isOwner}) {
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
        <Card sx={{ ':hover': {boxShadow: 20,},
                    maxWidth: 345 }
                    }>
        <CardActionArea component={Link} to={`/personal-item/details/${productId}/${isOwner}`}>

        <CardMedia
            sx={{ height: 140 }}
            image = {imgsrc}
        />
        <CardContent>
            <Typography variant="h6" component="div">{itemName}</Typography>
            {!isOwner && <Typography variant="body2" color="text.secondary">
            by <b>{owner_name}</b>
            </Typography>}
            <Typography variant="body2" color="text.secondary">
            <b>起拍價：</b><br/>
            ${starting_price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            <b>拍賣品描述：</b><br />
            {description.length > 10 ? `${description.substring(0, 10)}...` : description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            <b>拍賣時間剩下：</b><br/>
            {days_left}
            </Typography>
            {highest_bid_price && <Typography variant="body2" color="text.secondary">
            <b>目前最高價：</b><br/>
            ${highest_bid_price}
            </Typography>}
        </CardContent>
        </CardActionArea>
        <CardActions>
        {isOwner && <Button size="small" variant='contained' color="error" onClick={submit}>刪除商品</Button>}
        </CardActions>

        </Card>
    
  );
}
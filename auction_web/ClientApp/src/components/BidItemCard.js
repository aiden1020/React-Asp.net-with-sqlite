import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { CardActionArea } from '@mui/material';

const BidItemCard = ({itemName,description,days_left,imgsrc,productId,starting_price,highest_bid_price,owner_name,isOwner})  =>{
      return(
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
            {!isOwner && 
              <Typography variant="body2" color="text.secondary">
                by <b>{owner_name}</b>
              </Typography>
            }
            <Typography variant="body2" color="text.secondary">
              <b>起拍價：</b><br/>
              ${starting_price}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>拍賣品描述：</b><br />
              {description.length > 10 ? `${description.substring(0, 10)}...` : description}
            </Typography>
            {days_left[0] !== '-'?
              <Typography variant="body2" color="text.secondary">
                <b>拍賣時間剩下：</b><br/>
                {days_left}
              </Typography> :
              <Typography variant="body2" color="text.secondary">
                <b>拍賣已結束</b><br/>
              </Typography>
            }
            {highest_bid_price && 
              <Typography variant="body2" color="text.secondary">
              <b>目前最高價：</b><br/>
              ${highest_bid_price}
              </Typography>
            }
            </CardContent>
          </CardActionArea>
        </Card>
      );
}
export default BidItemCard
import React, { useState ,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductData } from './fetchProductData';
import Typography from '@mui/material/Typography';
import Carousel from 'react-material-ui-carousel'
import { Divider } from '@mui/material';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // 如果你想使用預設的樣式，請引入這個 CSS 文件
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const ProductDetail = () =>{
  const [productinfo, setProductinfo] = useState([]);
  const[price,setPrice] =useState();
  const { productId ,isOwner} = useParams();
  const authToken = localStorage.getItem("AuthToken");
  var arrow ='>';
  var highest_price = productinfo.current_highest_price ? productinfo.current_highest_price :productinfo.starting_price
  useEffect(()=>{
    const fetchData = async () => {
      try {
        var api_URL = `/api/getproductdetails/${productId}`;
        const updatedProducts = await fetchProductData(api_URL);
        setProductinfo(updatedProducts[0]);
      } catch (error) {
        console.error('Error in useEffect:', error);
      }
    };
    fetchData();
  }, [productId]);
  const handBid = async () => {
    if (price>highest_price){
      try {
        const response = await fetch(`/api/bid/${productId}/bid?bidPrice=${price}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
    
        if (!response.ok) {
          if(response.status === 400){
            alert("賣家不能投標自己的商品");
          }else if (response.status === 401){
            alert("請先登入");
          }
          else{
            alert(response.status)
            throw new Error('Bid request failed');
          }
        }
        else{
          alert("成功下標，如得標會電郵通知");
          window.location.reload();
        }
      } catch (error) {
        console.error('Error in handBid:', error);
      }
    }
    else{
      alert("下標金額必須高於當前最高出價")
    }
  };
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
          window.location.href = "personal-item";

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
    const handEarlyEnd = async () => {
      if (productinfo.biduser_id) {
        try {
          const response = await fetch(`/api/bid/${productId}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${authToken}`,
            },
          });
    
          if (!response.ok) {
            throw new Error('Bid request failed');
          } else {
            // 成功結標
            alert("成功結標");
            window.location.reload();
          }
        } catch (error) {
          console.error('Error in handEarlyEnd:', error);
        }
      } else {
        alert("沒投標者不能提早結標");
      }
    };
    
  const handleDeleteConfirm = () => {
      submit('確認刪除', `你確定要刪除 ${productinfo.productName} 這個商品嗎？`, handleDeleteItem);
  };
    
  const handleBidConfirm = () => {
      submit('確認下標', `你確定要下標 ${productinfo.productName} 金額${price}嗎？`, handBid);
  };
  const handleEarlyEndConfirm = () => {
      submit('確認提前結標', `你確定要提前結標嗎？`, handEarlyEnd);
  };
  const submit = (title, message, onClickHandler) => {
      confirmAlert({
        title: title,
        message: message,
        buttons: [
          {
            label: 'Yes',
            onClick: onClickHandler
          },
          {
            label: 'No',
          }
        ]
      });
  };
    
      return(
      <div>
      <Typography variant='subtitle2' style={{ color: 'grey' }}>{productinfo.category} {arrow} {productinfo.subcategory}</Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Carousel>
            {productinfo.img_src &&
              productinfo.img_src.map((imgSrc, imgIndex) => (
                <img
                  key={imgIndex}
                  src={imgSrc}
                  alt={`Image ${imgIndex + 1}`}
                  style={{ height: 300, margin: 'auto' }}
                />
              ))
            }
          </Carousel>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant='h3'><strong>{productinfo.productName}</strong></Typography>
              <Typography variant='subtitle2'>賣家 <b>{productinfo.owner_name}</b></Typography>

              {productinfo.current_highest_price &&
                <Typography variant='h6'>NT${productinfo.current_highest_price}  當前最高出價 {productinfo.biduser_name}</Typography>
              }
              <Typography variant='h7'style={{ color: 'grey' }}>NT${productinfo.starting_price} 起拍</Typography>
              <Divider></Divider>
              <Typography variant='b4' ><b>商品說明</b></Typography>
              <Typography variant='subtitle2'style={{ color: 'grey' }} paragraph={true}>{productinfo.description}</Typography>
              <Typography variant='b4'><b>拍賣時間剩下</b><br/></Typography>
              <Typography variant='subtitle2' style={{ color: 'grey' }}>{productinfo.days_left}</Typography>
              {authToken && isOwner === "false" &&
                <Grid container spacing={2}>
                  <Grid item>
                    <TextField
                      label="下標價"
                      type="number"
                      InputProps={{ inputProps: { min: highest_price } }}
                      id="outlined-number"
                      onChange={(event) => setPrice(parseInt(event.target.value, 10))}
                      style={{ width: '200px' }}
                      InputLabelProps={{
                        style: {
                          fontSize: '16px',
                        },
                      }}
                    />
                  </Grid>
                  <Grid item><Button size="large" variant='contained' onClick={handleBidConfirm}>下標</Button></Grid>
                </Grid>
              }
              {isOwner=== "true" && 
              <Grid>
                  <Button size="small" variant='contained' sx={{ marginRight: 1 }} color="error" onClick={handleDeleteConfirm}>刪除商品</Button>
                  <Button size="small"  variant='contained' onClick={handleEarlyEndConfirm} > 提前結標 </Button>
            </Grid>

              }
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
export default ProductDetail;
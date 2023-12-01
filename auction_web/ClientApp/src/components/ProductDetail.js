import React, { useState ,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductData } from './fetchProductData';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Carousel from 'react-material-ui-carousel'
import { Divider } from '@mui/material';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // 如果你想使用預設的樣式，請引入這個 CSS 文件


export default function ProductDetail() {
  const [productinfo, setProductinfo] = useState([]);
  const[price,setPrice] =useState();
  const { productId ,isOwner} = useParams();
  const authToken = localStorage.getItem("AuthToken");
  var arrow ='>>';
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
          alert(response.status)
          throw new Error('Bid request failed');
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

  const  submit = () => {
    confirmAlert({
          title: '確認下標',
          message: `你確定要下標 ${productinfo.productName} 金額${price}嗎？ `,
          buttons: [
            {
              label: 'Yes',
              onClick: () => handBid()
            },
            {
              label: 'No',
            }
          ]
        })
      };
  return(
    <Box>
    <Carousel>
        {
            productinfo.img_src &&
            productinfo.img_src.map((imgSrc, imgIndex) => (
                <img
                    key={imgIndex}
                    src={imgSrc}
                    alt={` Image ${imgIndex + 1}`}
                    style={{ height: 300, margin: 'auto' }} 
                />
            ))
        }
    </Carousel>
     <br/> 
      <Stack spacing={2}>
      <Typography variant='h5'>{productinfo.productName}</Typography>
      {productinfo.current_highest_price ?
        <Typography variant='h4'><b>當前最高出價 NT${productinfo.current_highest_price}</b></Typography> :
        <Typography variant='h4'><b>當前最高出價 NT${productinfo.starting_price}</b></Typography>
      }
      <Typography variant='h6'><b>起拍 NT${productinfo.starting_price}</b></Typography>
      <Typography variant='subtitle2'>{productinfo.category} {arrow} {productinfo.subcategory}    by 賣家 <b>{productinfo.owner_name}</b></Typography>
      <Divider></Divider>
      <Typography variant='b4'><b>商品說明</b></Typography>
      <Typography variant='subtitle2' paragraph={true}>{productinfo.description}</Typography>
      <Typography variant='b4'><b>拍賣時間剩下</b><br/></Typography>
      <Typography variant='subtitle2'>{productinfo.days_left}</Typography>
      {authToken&&isOwner === "false" &&<Grid container spacing={2} >
        <Grid item>
        <TextField
                  label="下標價"
                  type="number"
                  InputProps={{ inputProps: { min: highest_price } }} 
                  id="outlined-number"
                  onChange={(event) =>setPrice(parseInt(event.target.value, 10))}
                  style={{ width: '200px' }} 
                  InputLabelProps={{
                      style: {
                          fontSize: '16px',  
                      },
                  }}
        />     
        </Grid>
        <Grid item><Button size="large" variant='contained' onClick={submit}>下標</Button></Grid>
      </Grid>
      }


      </Stack>

    </Box>
  );
}


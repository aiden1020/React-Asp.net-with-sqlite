import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BidItemCard from './BidItemCard'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { fetchProductData } from './fetchProductData';
export default function CategoryItem() {
    const { category } = useParams();
    const [productinfo, setProductinfo] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            var api_URL = `/api/getproductdetails/category/${category}`;
            const updatedProducts = await fetchProductData(api_URL);
            setProductinfo(updatedProducts);
          } catch (error) {
            console.error('Error in useEffect:', error);
          }
        };
    
        fetchData();
      }, [category]);

    return(
        <Box sx={{ flexGrow: 1 }}>
        <Typography variant='h6'>{category}</Typography>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {productinfo && (
                productinfo.map((element,index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <BidItemCard
                            itemName={element.productName}
                            description={element.description}
                            days_left= {element.days_left}
                            imgsrc= {element.img_src[0]}
                            productId ={element.productId}
                            starting_price ={element.starting_price}
                            owner_name={element.owner_name}
                            isOwner = {false}
                        />
                    </Grid>
                ))
            )}
        </Grid>
        </Box>
    );
}


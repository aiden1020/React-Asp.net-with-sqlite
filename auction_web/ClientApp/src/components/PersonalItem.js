import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import ItemCard from './ItemCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function PersonalItem() {
    const [productinfo, setProductinfo] = useState([]);
    useEffect(() => {
        fetchProductData();
    }, []);
    const fetchProductData = async () => {
        const authToken = localStorage.getItem("AuthToken");
    
        try {
            const response = await fetch('/api/getproductdetails', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch product data');
            }
    
            const data = await response.json();
    
            // 使用 map 而不是 forEach，以便返回一個新的數組
            const updatedProducts = data.map((element) => {
                const timeDifference = new Date(element.end_date) - Date.now();
                const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hoursDifference = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const days_left = `${daysDifference}天 ${hoursDifference}小時`;
    
                return {
                    productId: element.productId,
                    productName: element.productName,
                    description: element.description,
                    start_date: element.start_date,
                    end_date: element.end_date,
                    days_left: days_left,
                    img_src : element.image
                };
            });
            setProductinfo(updatedProducts);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
        <Typography variant='h6'>我的拍賣品</Typography>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {productinfo && (

                productinfo.map((element,index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <ItemCard
                            itemName={element.productName}
                            description={element.description}
                            days_left= {element.days_left}
                            imgsrc= {element.img_src[0]}
                            productId ={element.productId}
                        />
                    </Grid>
                ))
            )}
        </Grid>

        </Box>

    );
}

export default PersonalItem;

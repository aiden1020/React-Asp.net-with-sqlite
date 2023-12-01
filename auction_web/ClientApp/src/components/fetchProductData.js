export const fetchProductData = async ( URL) => {    
    try {
        const authToken = localStorage.getItem("AuthToken");

        const response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        if (!response.ok) {
            throw new Error('api failed');
        }

        const data = await response.json();

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
                img_src : element.image,
                starting_price : element.starting_price,
                owner_name :element.owner_name,
                category: element.category,
                subcategory:element.subcategory,
                current_highest_price :element.current_highest_price
            };
        });
        return updatedProducts;
    } catch (error) {
        console.error('Error fetching product data:', error);
        return [];
    }
};
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';


export default function ProductDetail() {
  const { productId } = useParams();
  return(
    <h1>{productId}</h1>
  );
}


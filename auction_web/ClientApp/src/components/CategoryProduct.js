import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function CategoryProduct() {
    const { category } = useParams();
    return(
      <h1>{category}</h1>
    );
}


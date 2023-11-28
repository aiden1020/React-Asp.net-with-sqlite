import Home  from "./components/Home";
import React, { useEffect, useState } from 'react';
const LoadingSpinner =()=> {
  return (
    <h1>Loading</h1>
  );
}
function checkAuthentication(){
  const authToken = localStorage.getItem("AuthToken");

  return fetch('/api/checkauth', {
    method: 'GET', 
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  })
  .then(response => {
    if (response.ok) {
      return true;
    } else {
      console.error('Authentication failed:', response.statusText);
      return false;
    }
  })
  .catch(error => {
    console.error('Error during authentication request:', error);
    return false;
  });
};

export const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await checkAuthentication();
        setIsAuthenticated(result);
      } catch (error) {
        console.error('Error during authentication:', error);
        setIsAuthenticated(false);
      }
    };

    fetchData();
  }, []); 

  if (isAuthenticated == null) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? children : <Home />;
};


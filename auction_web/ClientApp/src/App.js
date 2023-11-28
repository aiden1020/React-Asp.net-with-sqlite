import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import {Layout}  from './components/Layout';
import './custom.css';
import {PrivateRoute} from './PrivateRoute'
const App = () => {
  return (
    <Layout>
      <Routes>
        {AppRoutes.map((route, index) => {
          const { element, private: isPrivate, ...rest } = route;
          const routeElement = isPrivate ? (
            <PrivateRoute>{element}</PrivateRoute>
          ) : (
            element
          );

          return <Route key={index} {...rest} element={routeElement} />;
        })}
      </Routes>
    </Layout>
  );
};

export default App;


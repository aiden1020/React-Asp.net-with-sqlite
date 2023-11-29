import Home  from "./components/Home";
import AddProduct from "./components/AddProduct"
import ProfileInfo from "./components/ProfileInfo";
import PersonalItem from "./components/PersonalItem";
import ProductDetail from "./components/ProductDetail";
import CategoryProduct from "./components/CategoryProduct"

const AppRoutes = [
  {
    index: true,
    element: <Home />,
    private: false
  },
  {
    path: '/categories/:category',
    element: <CategoryProduct />,
    private: false
  },
  {
    path: '/addProduct',
    element: <AddProduct />,
    private: true
  },
  {
    path: '/profile',
    element:<ProfileInfo/>,
    private: true
  },
  {
    path: '/personal-item',
    element:<PersonalItem/>,
    private: true
  },
  {
    path: '/personal-item/details/:productId',
    element:<ProductDetail/>,
    private: true
  },
];

export default AppRoutes;

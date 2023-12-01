import Home  from "./components/Home";
import AddProduct from "./components/AddProduct"
import ProfileInfo from "./components/ProfileInfo";
import PersonalItem from "./components/PersonalItem";
import ProductDetail from "./components/ProductDetail";
import CategoryItem from "./components/CategoryItem"

const AppRoutes = [
  {
    index: true,
    element: <Home />,
    private: false
  },
  {
    path: '/categories/:category',
    element: <CategoryItem />,
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
    path: '/personal-item/details/:productId/:isOwner',
    element:<ProductDetail/>,
    private: false
  },
];

export default AppRoutes;

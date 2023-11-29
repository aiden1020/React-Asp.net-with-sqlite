import Home  from "./components/Home";
import  Wallet   from "./components/brand/Wallet"
import   Packet  from "./components/brand/Packet" 
import  Phone  from "./components/electronic/Phone"
import  Earphone  from "./components/electronic/Earphone" 
import  Computer  from "./components/electronic/Computer"
import  Car  from "./components/car/Car" 
import AddProduct from "./components/AddProduct"
import ProfileInfo from "./components/ProfileInfo";
import PersonalItem from "./components/PersonalItem";
import ProductDetail from "./components/ProductDetail";
const AppRoutes = [
  {
    index: true,
    element: <Home />,
    private: false
  },
  {
    path: '/categories/wallet',
    element: <Wallet />,
    private: false
  },
  {
    path: '/categories/packet',
    element: <Packet />,
    private: false
  },
  {
    path: '/categories/mobile-phone',
    element: <Phone />,
    private: false
  },
  {
    path: '/categories/earphone',
    element: <Earphone />,
    private: false
  },
  {
    path: '/categories/computer-component',
    element: <Computer />,
    private: false
  },
  {
    path: '/categories/car',
    element: <Car />,
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

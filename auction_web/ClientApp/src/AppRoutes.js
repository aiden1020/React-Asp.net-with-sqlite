import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import Home  from "./components/Home";
import  Wallet   from "./components/brand/Wallet"
import   Packet  from "./components/brand/Packet" 
import  Phone  from "./components/electronic/Phone"
import  Earphone  from "./components/electronic/Earphone" 
import  Computer  from "./components/electronic/Computer"
import  Car  from "./components/car/Car" 
import AddProduct from "./components/AddProduct"
const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/categories/wallet',
    element: <Wallet />
  },
  {
    path: '/categories/packet',
    element: <Packet />
  },
  {
    path: '/categories/mobile-phone',
    element: <Phone />
  },
  {
    path: '/categories/earphone',
    element: <Earphone />
  },
  {
    path: '/categories/computer-component',
    element: <Computer />
  },
  {
    path: '/categories/car',
    element: <Car />
  },
  {
    path: '/addProduct',
    element: <AddProduct />
  }
];

export default AppRoutes;

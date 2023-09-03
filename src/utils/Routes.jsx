import { Route, Routes } from "react-router-dom";
import ProductListing from "../screens/ProductListing";
import Cart from "../screens/Cart";

const RouteDetails = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductListing />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default RouteDetails;

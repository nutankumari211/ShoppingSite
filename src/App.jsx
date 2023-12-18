
import Home from "./Components/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Use BrowserRouter instead of Router
import Product from "./Components/Products.jsx";
import ProductCategories from "./Components/ProductCategories.jsx"
import ProductByCategory from "./Components/ProductByCategory.jsx"
import ProductDetail from "./Components/ProductDetail.jsx";
import Footer from "./Components/Footer.jsx";

function App() {
return (
<>
<BrowserRouter>
<Routes>
<Route path="/products" element={<Product />} />
<Route path="/categories" element={<ProductCategories />} />
<Route
path="/products/category/:category/*"
element={<ProductByCategory />}
/>
<Route path="/" element={<Home />} />
<Route path="/products/:id" element={<ProductDetail />} />


</Routes>
</BrowserRouter>
<Footer/>
</>
);
}

export default App;
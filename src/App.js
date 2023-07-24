import productsData from "./mockData/productsData.json";
import ProductsList from "./components/productsList/productsList.component.jsx";
import "./App.css";

function App() {
  return (
    <div>
      <ProductsList products={productsData.products}></ProductsList>
    </div>
  );
}

export default App;

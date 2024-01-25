import "../styles/style.css"
import React from 'react';
import { useSelector } from 'react-redux';
import ProductsRegion1Comp from "../components/productsRegion1";



const Products = () => {
    const total= useSelector(state=> state.purchasesReducer.totalAmount);
    const AllProducts = useSelector(state=> state.productsReducer.products);
    const AllCustomers = useSelector(state=> state.customersReducer.customers);
    const AllPurchases = useSelector(state=> state.purchasesReducer.purchases);


    return (
      <div>
        <h1>Products:</h1>
          <div className="left-region" ><br/>
            {
              AllProducts?.map(product=> {
                return <ProductsRegion1Comp key={product.id} details={{"product":product, "AllCustomers":AllCustomers, "AllPurchases": AllPurchases}}/>})
            }
              <br/>
          </div>
          
          <div className="right-region" style={{background:"yellow"}}>
              Total: {total}<br/>
          </div>
      </div>
      
    );
  };
  
  export default Products;
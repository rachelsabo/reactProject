import "../styles/style.css"
import React from 'react';
import { useState } from "react";
import { useSelector } from 'react-redux';
import ProductsRegion1Comp from "../components/productsRegion1";
import AddProductComp from "../components/addProduct";


const Products = () => {
    const total= useSelector(state=> state.purchasesReducer.totalAmount);
    const AllProducts = useSelector(state=> state.productsReducer.products);
    const AllCustomers = useSelector(state=> state.customersReducer.customers);
    const AllPurchases = [{id:1, CustomerID:'Ai4yKjouP7TF9aoGs5h3',ProductID:"JIQw2YkN7rY0cvQS0dyu", Date:"2024-01-02" },
                          {id:2, CustomerID:'Ai4yKjouP7TF9aoGs5h3',ProductID:"KCYI08XqTb6Kmy2VKXlt", Date:"2024-01-02"},
                          {id:3, CustomerID:'QTkEdATGxzxN6iNdONoW',ProductID:"KCYI08XqTb6Kmy2VKXlt", Date:"2024-01-02"}];

    const isAddProduct = useSelector(state=> state.productsReducer.isDisplayAddProduct);

    return (
      <div>
        <h1>Products:</h1>
          <div className="left-region" ><br/>
            {
              isAddProduct? <AddProductComp AllProducts={AllProducts}/>:
              (AllProducts?.map(product=> {
                return <ProductsRegion1Comp key={product.id} details={{"product":product, "AllCustomers":AllCustomers, "AllPurchases": AllPurchases}}/>}))
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
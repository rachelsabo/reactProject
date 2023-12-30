import { useState } from "react";
import ComboBoxComp from "../components/comboBox";
import { useSelector } from 'react-redux';


const PurchasesComp = () => {
    const AllProducts = useSelector(state=> state.productsReducer.products);
    const AllCustomers = useSelector(state=> state.customersReducer.customers);
    
    const [selectedProduct , setSelectedProduct ] = useState('');
    const [selectedCustomer , setSelectedCustomer ] = useState('');
    const [selectedDate , setSelectedDate ] = useState('');

    const searchPurchases = ()=>
    {
      console.log(selectedProduct);
      console.log(selectedCustomer);

      console.log(selectedDate);
    }
    

    return (
      <div >
        <h1>Purchases: </h1>
        <ComboBoxComp items={AllProducts} type="products" callBack={item => setSelectedProduct(item) }/>&nbsp; &nbsp;
        <ComboBoxComp items={AllCustomers} type="customers" callBack={item => setSelectedCustomer(item) }/>&nbsp; &nbsp;
        date: <input type="date" onInput={e=> setSelectedDate( e.target.value)}/>&nbsp; &nbsp;
        <button onClick={searchPurchases}>Search</button>
      </div>
    );
  };
  
  export default PurchasesComp;
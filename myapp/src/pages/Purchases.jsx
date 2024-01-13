import { useState } from "react";
import ComboBoxComp from "../components/comboBox";
import { useSelector } from 'react-redux';


const PurchasesComp = () => {
    const AllProducts = useSelector(state=> state.productsReducer.products);
    const AllCustomers = useSelector(state=> state.customersReducer.customers);
    const AllPurchases = [{id:1, CustomerID:'Ai4yKjouP7TF9aoGs5h3',ProductID:"JIQw2YkN7rY0cvQS0dyu", Date:"2024-01-02" },
                          {id:2, CustomerID:'Ai4yKjouP7TF9aoGs5h3',ProductID:"KCYI08XqTb6Kmy2VKXlt", Date:"2024-01-02"}]
    //useSelector(state=> state.purchasesReducer.purchases);

    const [selectedProduct , setSelectedProduct ] = useState('');
    const [selectedCustomer , setSelectedCustomer ] = useState('');
    const [selectedDate , setSelectedDate ] = useState('');
    const [isSearchClicked , setIsSearchClicked ] = useState(false);
    const [selectedPurchases , setSelectedPurchases ] = useState([]);


    const searchPurchases = ()=>
    {
      setIsSearchClicked(true);
      const selectedPurchases = AllPurchases.filter(purchase => ((purchase.CustomerID === selectedCustomer) || (selectedCustomer ===''))&&
                                                                ((purchase.ProductID === selectedProduct )|| (selectedProduct === ''))&&  
                                                               ((purchase.Date === selectedDate) || (selectedDate === '')));
      const selectedPurchasesforTable = selectedPurchases.map(purchase=> ({customerName: AllCustomers.find(customer=>(customer.id===purchase.CustomerID)).FirstName,
                                                                           productName:AllProducts.find(product=>(product.id===purchase.ProductID)).name,
                                                                           date:purchase.Date}));
      setSelectedPurchases(selectedPurchasesforTable);
    }
    

    return (
      <div >
        <h1>Purchases: </h1>
        <ComboBoxComp items={AllProducts} type="products" callBack={item => setSelectedProduct(item) }/>&nbsp; &nbsp;
        <ComboBoxComp items={AllCustomers} type="customers" callBack={item => setSelectedCustomer(item) }/>&nbsp; &nbsp;
        date: <input type="date" onInput={e=> setSelectedDate( e.target.value)}/>&nbsp; &nbsp;
        <button onClick={searchPurchases}>Search</button><br/><br/>
        {
         isSearchClicked && <table border="1">
          <thead>
            <tr>
              <th>customer</th>
              <th>product</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
              {selectedPurchases.map((val, key) => {
                      return (
                          <tr key={key}>
                              <td>{val.customerName}</td>
                              <td>{val.productName}</td>
                              <td>{val.date}</td>
                          </tr>
                      )
                  })}
            </tbody>
            
          
        </table>
        }
        
      </div>
    );
  };
  
  export default PurchasesComp;
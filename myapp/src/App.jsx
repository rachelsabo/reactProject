import { useState,useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import Menu from './pages/Menu';
import Products from './pages/Products';
import CustomersComp from './pages/Customers';
import PurchasesComp from './pages/Purchases';
import {
  query,
  collection,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import db from './firebase';
import { useDispatch } from 'react-redux';
import AddProductComp from './pages/addProduct';
import EditCustomerComp from './pages/EditCustomer';
import EditProductComp from './pages/EditProduct';


function App() {

  const dispatch = useDispatch();

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [purchases, setPurchases] = useState([]);
    /*useState([{id:1, CustomerID:'Ai4yKjouP7TF9aoGs5h3',ProductID:"JIQw2YkN7rY0cvQS0dyu", Date:"2024-01-02" },
  {id:2, CustomerID:'Ai4yKjouP7TF9aoGs5h3',ProductID:"KCYI08XqTb6Kmy2VKXlt", Date:"2024-01-02"}]);*/


  const getAllata = (type) => {

    const q = query(collection(db, type));
    onSnapshot(q, (querySnapshot) => {
   
        if (type =="customers")
        {
          setCustomers(
            querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        }
        if(type =="products")
        {
          setProducts(
            querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        }
         if(type =="purchases")
        {
          setPurchases(
            querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
        }
      
    });
  };
  const initTotal = ()=>
  {
    if(products.length > 0 && purchases.length > 0)
    {
      const total = purchases.map(purchase=> +([products.find(product=>(product.id===purchase.ProductID)).price])).reduce((previousValue, currentValue) => previousValue + currentValue);
      dispatch({ type: 'UPDATE_TOTAL', payload: total});
    }
     
  }

  useEffect(()=>
  {
    dispatch({ type: 'INIT_CUSTOMERS', payload: customers });
  },[customers]);

  useEffect(()=>
  {
    dispatch({ type: 'INIT_PRODUCTS', payload: products });
  },[products]);

  useEffect(()=>
  {
    dispatch({ type: 'INIT_PURCHASES', payload: purchases });
    initTotal();

  },[purchases]);
  
  useEffect(()=>
  {
    getAllata('customers');
    getAllata('products');
    getAllata('purchases');
  },[]);
  

  return (
    <>
      <Link to='/products'>Products</Link> <br />
      <Link to='/customers'>Customers</Link> <br />
      <Link to='/purchases'>Purchases</Link> <br />


      <Routes>
        <Route path='/' element={<Menu/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/customers' element={<CustomersComp/>}/>
        <Route path='/purchases' element={<PurchasesComp/>}/>
        <Route path='/addProduct/:sourcePage/:customerID' element={<AddProductComp/>}/>
        <Route path='/editCustomer/:sourcePage/:customerID' element={<EditCustomerComp/>}/>
        <Route path='/editProduct/:sourcePage/:productID' element={<EditProductComp/>}/>
      </Routes>
      <br/>

    </>
  )
}

export default App

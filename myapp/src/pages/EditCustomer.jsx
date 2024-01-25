
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate,useParams } from 'react-router-dom';
import {doc, updateDoc, deleteDoc} from 'firebase/firestore';
import db from '../firebase'


const EditCustomerComp = () => {

    const AllCustomers = useSelector(state=> state.customersReducer.customers);
    const AllPurchases = useSelector(state=> state.purchasesReducer.purchases);
    const AllProducts = useSelector(state=> state.productsReducer.products);

    const {sourcePage , customerID } = useParams();
    const navigate = useNavigate();

    const [customerProducts, setCustomerProducts] = useState([]);
    const [customer, setCustomer] = useState({ City: '', FirstName: '', LastName:'' });

    useEffect(()=>
    {
        var products = AllPurchases?.filter(purchase => ((purchase.CustomerID === customerID))).map(product=> product.ProductID);
        var productsDetails = AllProducts?.filter(product=> products.find(p =>p  === product.id) );
        setCustomerProducts(productsDetails);

        if(AllCustomers.length > 0)
        {
            const c =  AllCustomers?.find(customer => customer.id === customerID);
            setCustomer({City: c.City , FirstName: c.FirstName, LastName: c.LastName });
        }
        

    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateCustomer(customer);
        navigate(`/${sourcePage}`);
      };
    
      const deleteCustomer = async () => {
        await deletePurchases();
        await deleteDoc(doc(db, 'customers',customerID ));

        navigate(`/${sourcePage}`);
      };
    
      const deletePurchases = async () => {
        var purchases = AllPurchases.filter(p=> p.CustomerID === customerID);
        if (purchases.length > 0)
        {
            purchases.map(async p=> await deleteDoc(doc(db, 'purchases',p.id )));
        }
        };

      const updateCustomer = async (obj) => {
         await updateDoc(doc(db, 'customers',customerID ), obj);
        };
    
  return (
    <div>
        <div className="left-region" >
            <br/><br/>
            <h1>Edit Customer:</h1>

            <form onSubmit={handleSubmit}>
                FirstName:{' '}
                <input type='text'
                value={customer.FirstName ||""}
                onInput={(e) => setCustomer({ ...customer, FirstName: e.target.value })}
                />
                <br /><br/>
                LastName:{' '}
                <input type='text'
                value={customer.LastName||""}
                onInput={(e) => setCustomer({ ...customer, LastName: e.target.value })}/>
                <br/><br/>
                City:{' '}
                <input type='text'
                value={customer.City||""}
                onInput={(e) => setCustomer({ ...customer, City: e.target.value })}/>
                <br /><br/>
                <button type='submit'>Update</button>
                <button onClick={deleteCustomer}>Delete</button>
                <button onClick={()=>{navigate(`/${sourcePage}`);}}>Cancel</button>
            </form>
        </div>
          
        <div className="right-region">
            <br/><br/><br/>
            {
                customerProducts.length > 0 && <h3>products:</h3>
            }
            <ul>
                {  

                  customerProducts?.map(product => {return <li key={product.id}><Link to={`/editProduct/products/${product.id}`}>{ product.name}</Link></li>}  )      
                }
            </ul>
         
        </div>
    </div>
  )
};

export default EditCustomerComp;
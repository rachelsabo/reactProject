import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate,useParams } from 'react-router-dom';
import {doc, updateDoc, deleteDoc} from 'firebase/firestore';
import db from '../firebase'


const EditProductComp = () => {

    const AllCustomers = useSelector(state=> state.customersReducer.customers);
    const AllPurchases = useSelector(state=> state.purchasesReducer.purchases);
    const AllProducts = useSelector(state=> state.productsReducer.products);

    const {sourcePage , productID } = useParams();
    const navigate = useNavigate();

    const [productCustomers, setProductCustomers] = useState([]);
    const [product, setProduct] = useState({ name: '', price: '', quantity:'' });

    useEffect(()=>
    {
        var customers = AllPurchases?.filter(purchase => ((purchase.ProductID === productID))).map(customer=> customer.CustomerID);
        var customersDetails = AllCustomers?.filter(customer=> customers.find(c=>c === customer.id) );
        setProductCustomers(customersDetails);

        if(AllProducts.length>0)
        {
            const p =  AllProducts?.find(prod=> prod.id === productID);
           setProduct({name: p.name , price: p.price, quantity: p.quantity });
        }
        

    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateProduct(product);
        navigate(`/${sourcePage}`);
      };
    
      const deleteProduct = async () => {
        await deletePurchases();
        await deleteDoc(doc(db, 'products',productID ));

        navigate(`/${sourcePage}`);
      };
    
      const deletePurchases = async () => {
        var purchases = AllPurchases.filter(p=> p.ProductID === productID);
        if (purchases.length>0)
        {
            purchases.map(async p=> await deleteDoc(doc(db, 'purchases',p.id )));
        }
        };

      const updateProduct = async (obj) => {
         await updateDoc(doc(db, 'products',productID ), obj);
        };
    
  return (
    <div>
        <div className="left-region" >
            <br/><br/>
            <h1>Edit Product:</h1>

            <form onSubmit={handleSubmit}>
                Name:{' '}
                <input type='text'
                value={product.name ||""}
                onInput={(e) => setProduct({ ...product, name: e.target.value })}
                />
                <br /><br/>
                Price:{' '}
                <input type='number'
                value={product.price||""}
                onInput={(e) => setProduct({ ...product, price: e.target.value })}/>
                <br/><br/>
                Quantity:{' '}
                <input type='number'
                value={product.quantity||""}
                onInput={(e) => setProduct({ ...product, quantity: e.target.value })}/>
                <br /><br/>
                <button type='submit'>Update</button>
                <button onClick={deleteProduct}>Delete</button>
                <button onClick={()=>{navigate(`/${sourcePage}`);}}>Cancel</button>
            </form>
        </div>
          
        <div className="right-region">
            <br/><br/><br/>
            {
                productCustomers.length>0 && <h3>customers:</h3>
            }
            <ul>
                {  

                    productCustomers?.map(customer => {return <li key={customer.id}><Link to={`/editCustomer/products/${customer.id}`}>{ customer.FirstName +" "+ customer.LastName }</Link></li>}  )      
                }
            </ul>
         
        </div>
    </div>
  )
};

export default EditProductComp;
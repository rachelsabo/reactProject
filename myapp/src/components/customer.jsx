import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';



const CustomerComp = (props) => {
    
    const navigate = useNavigate();


    const [customer, setCustomer] = useState('');

    useEffect(()=>
    {
        const customer = props.customers.find(item=>(item.id === props.purchase.CustomerID));
        setCustomer(customer);
    },[])

    return (
        <div>
            <div style={{border:"solid"}}>
                Name:  <Link to={`/editCustomer/products/${customer.id}`}>{ customer.FirstName +" "+ customer.LastName }</Link><br/>
                Date: {props.purchase.Date}<br/>
               <button onClick={()=> navigate(`/addProduct/products/${customer.id}`)}>Add</button><br/><br/>
            </div>
            <br/>
        </div>
        
    );
  };
  
  export default CustomerComp;
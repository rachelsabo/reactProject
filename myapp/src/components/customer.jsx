import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';


const CustomerComp = (props) => {
    
    const dispatch = useDispatch();

    const [customerName, setCustomerName] = useState('');

    useEffect(()=>
    {
        const customer = props.customers.find(item=>(item.id === props.purchase.CustomerID));
        setCustomerName(customer.FirstName +" "+ customer.LastName);
    },[])

    return (
        <div>
            <div style={{border:"solid"}}>
                Name: {customerName}<br/>
                Date: {props.purchase.Date}<br/>
               <button onClick={()=>{dispatch({ type: 'DISPLAY_ADD_PRODUCT', payload: true})}}>Add</button><br/><br/>
            </div>
            <br/>
        </div>
        
    );
  };
  
  export default CustomerComp;
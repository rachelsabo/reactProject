import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';



const CustomersComp = () => {

    const AllProducts = useSelector(state=> state.productsReducer.products);
    const AllCustomers = useSelector(state=> state.customersReducer.customers);
    const AllPurchases = useSelector(state=> state.purchasesReducer.purchases);

    const [tableData,setTableData] = useState([]);
    const [customerID,setCustomerId] = useState('');
    const [isSelectedRow, setIsSelectedRow] = useState(false);
    const [isAlert, setIsAlert] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>
    {
      var newArray =[];
      AllCustomers?.map(customer => 
        {
          var purchases = AllPurchases.filter(purchase => ((purchase.CustomerID === customer.id)));
          var productsIds = purchases.map(purchase=> purchase.ProductID);
          var productsDetails = AllProducts.filter(product=> productsIds.find(p =>p  === product.id) );
          var obj = {id: customer.id, name:customer.FirstName + " "+customer.LastName, products: productsDetails, purchases:purchases};
          newArray = [...newArray,obj] 
          
      });
      setTableData(newArray);
    },[]);

    const selectedRow=(id)=>
    {
      if(isSelectedRow)
      {
        setCustomerId("");
      } 
      else
      {
        setCustomerId(id);
        setIsAlert(false);
      }
      setIsSelectedRow(!isSelectedRow);
    }

    const buyProduct = ()=>
    {
      if(customerID!="")
      {
        navigate(`/addProduct/customers/${customerID}`);
      }
      else{
        setIsAlert(true);
      }
    }


    return (
      <div >
        <div className="left-region" ><br/>
            <h1>Customers: </h1>
            
              <table border={1} >
                <tbody>
                  {
                    tableData.map(customer=> {return <tr style={{backgroundColor: (isSelectedRow && customer.id== customerID)? "azure": "transparent"}} onMouseDown={()=>{selectedRow(customer.id)}} key={customer.id}>
                      <td > {customer.name}</td>
                      <td >
                        <ul>
                          {
                            customer.products.map(product=> {return <li key={product.id}> <Link to={`/editProduct/customers/${product.id}`}>{ product.name}</Link></li>})
                          }
                        </ul>
                      </td>
                      <td>
                        <ul>
                          {
                            customer.purchases.map(purchase=> {return <li key={purchase.id}> {purchase.Date}</li>})
                          }
                          </ul>
                      </td>
                    </tr>})
                  }
                </tbody>

              </table>
            
          </div>
          
          <div className="right-region" >
            <br/><br/><br/><br/><br/><br/>
            <button  onClick={buyProduct}>Buy product</button>
            {
                isAlert && <Alert severity="warning">
                please choose a customer!</Alert>
            }
          </div>
       
      </div>
    );
  };
  
  export default CustomersComp;
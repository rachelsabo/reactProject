import { useDispatch,useSelector } from 'react-redux';
import ComboBoxComp from '../components/comboBox';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import {collection, addDoc} from 'firebase/firestore';
import db from '../firebase'



const AddProductComp = () => {

    const AllProducts = useSelector(state=> state.productsReducer.products);
    const {sourcePage , customerID } = useParams();
    const dispatch = useDispatch();
    const [selectedProduct , setSelectedProduct ] = useState('');
    const [isAlert, setIsAlert] = useState(false);
    const navigate = useNavigate();


     useEffect(()=>{
        setIsAlert(false);
     },[selectedProduct])

    const updatePurchases = async()=>
    {
        if(selectedProduct!='')
        {  
            var product = AllProducts.find(p=> p.id === selectedProduct);
            var date = getCurrentDate();
            var newPurchase = {CustomerID:customerID, ProductID: product.id, Date:date};
            await addPurcase(newPurchase);
            navigate(`/${sourcePage}`);

        }
        else
        {
            setIsAlert(true);

        }
    }

    const getCurrentDate = (separator='-')=>
    {

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`;
        }

    const addPurcase = async (obj) => {
        await addDoc(collection(db, 'purchases'), obj);
        };


    return (
        <div style={{border:"solid",borderColor:"green"}}>
            <ComboBoxComp  items={AllProducts} type="products" callBack={item => setSelectedProduct(item) }/> <br/><br/>
            <button onClick={()=> updatePurchases()}>{(sourcePage=='customers')? "Buy" : "Save"}</button>
            <button onClick={()=>{navigate(`/${sourcePage}`)}}>Cancle</button> 
            {
                isAlert && <Alert severity="warning">
                please choose a product!</Alert>
            }

            
        </div>
    );
  };
  
  export default AddProductComp;
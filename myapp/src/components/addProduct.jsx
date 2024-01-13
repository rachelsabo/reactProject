import { useDispatch } from 'react-redux';
import ComboBoxComp from './comboBox';
import { useState } from 'react';


const AddProductComp = ({AllProducts}) => {

    const dispatch = useDispatch();
    const [selectedProduct , setSelectedProduct ] = useState('');

    const updatePurchases =()=>
    {
        dispatch({ type: 'DISPLAY_ADD_PRODUCT', payload: false});
        if(selectedProduct!='')
        {
            var product = AllProducts.find(p=> p.id === selectedProduct);
            var newPurchase = {CustomerID:"",ProductID: product.id, Date:""};
            dispatch({ type: 'ADD_PURCHASE', payload: newPurchase});

        }
    }

    return (
        <div style={{border:"solid",borderColor:"green"}}>

            <ComboBoxComp items={AllProducts} type="products" callBack={item => setSelectedProduct(item) }/> <br/><br/>
            <button onClick={()=> updatePurchases()}>Save</button>
           
        </div>
    );
  };
  
  export default AddProductComp;
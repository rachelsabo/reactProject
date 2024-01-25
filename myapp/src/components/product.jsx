import {Link } from 'react-router-dom';


const ProductComp = ({details}) => {

    return (
        <div style={{border:"solid",borderColor:"green"}}>
            Name:  <Link to={`/editProduct/products/${details.id}`}>{details.name}</Link><br/>
            Price: {details.price}<br/>
            Quantity: {details.quantity}<br/><br/>
        </div>
    );
  };
  
  export default ProductComp;
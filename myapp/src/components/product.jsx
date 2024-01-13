

const ProductComp = ({details}) => {

    return (
        <div style={{border:"solid",borderColor:"green"}}>
            Name: {details.name}<br/>
            Price: {details.price}<br/>
            Quantity: {details.quantity}<br/><br/>
        </div>
    );
  };
  
  export default ProductComp;
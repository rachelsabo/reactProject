import { useEffect, useState } from "react";
import CustomerComp from "./customer";
import ProductComp from "./product";


const ProductsRegion1Comp = ({details}) => {

    const [purchasesByProduct,setPurchasesByProduct] = useState([]);

    useEffect(()=>
    {
        const purchases = details.AllPurchases.filter(purchase => ((purchase.ProductID === details.product.id)));
        setPurchasesByProduct(purchases);
    },[])
    

    return (
        <div className="content" style={{border:"solid",borderColor:"red"}}>
            <div className="left-region2" >
                <ProductComp key={details.product.id}  details={details.product}/>
            </div>
            <div className="right-region2" >
                {
                    purchasesByProduct?.map(purchase=>
                        {
                            return <CustomerComp key={purchase.id} purchase={purchase} customers={details.AllCustomers}/>
                        })
                }

            </div>
        </div>
    );
  };
  
  export default ProductsRegion1Comp;
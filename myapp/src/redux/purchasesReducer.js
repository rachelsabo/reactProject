
const initialState = {
  purchases: [],
  totalAmount: 0,
};

  const purchasesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INIT_PURCHASES':
        return { ...state, purchases: action.payload };
      case 'INCREASE_TOTAL':
        return {...state, totalAmount: state.totalAmount + action.payload};
      
        case 'DECREASE_TOTAL':
          return {...state, totalAmount: state.totalAmount - action.payload};

        case 'ADD_PURCHASE':
        var newPurchase = [...state.purchases, action.payload] ;
        console.log("newPurchase:", newPurchase)
        return { ...state, purchases: newPurchase };

        
      default:
        return state;
    }
  };
  
    
  export default purchasesReducer;
  

const initialState = {
  purchases: [],
  totalAmount: 0,
};

  const purchasesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INIT_PURCHASES':
        return { ...state, purchases: action.payload };
      case 'UPDATE_TOTAL':
        return {...state, totalAmount:  action.payload};
      
        case 'DECREASE_TOTAL':
          return {...state, totalAmount: state.totalAmount - action.payload};

        
      default:
        return state;
    }
  };
  
    
  export default purchasesReducer;
  
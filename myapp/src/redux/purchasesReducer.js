
const initialState = {
  purchases: [],
};

  const purchasesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INIT_PURCHASES':
        return { ...state, purchases: action.payload };
      
  
      default:
        return state;
    }
  };
  
    
  export default purchasesReducer;
  
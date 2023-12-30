
const initialState = {
  customers: [],
};

  const customersReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INIT_CUSTOMERS':
        return { ...state, customers: action.payload };
      
  
      default:
        return state;
    }
  };
  
  export default customersReducer;
  
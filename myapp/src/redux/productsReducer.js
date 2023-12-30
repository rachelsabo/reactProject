
const initialState = {
  products: [],
};

  const productsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INIT_PRODUCTS':
        console.log("productsReducer",action.payload)
        return { ...state, products: action.payload };
      
  
      default:
        return state;
    }
  };
  
  
  export default productsReducer;
  
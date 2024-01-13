
const initialState = {
  products: [],
  isDisplayAddProduct: false,
};

  const productsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INIT_PRODUCTS':
        return { ...state, products: action.payload };

      case 'DISPLAY_ADD_PRODUCT':
          return { ...state, isDisplayAddProduct: action.payload };

      default:
        return state;
    }
  };
  
  
  export default productsReducer;
  
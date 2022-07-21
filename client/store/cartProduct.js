import Axios from 'axios';

const GET_CART_PRODUCT = 'GET_CART_PRODUCT';
const SUB_QUANTITY = 'SUB_QUANTITY';
const ADD_QUANTITY = 'ADD_QUANTITY';

const getCartProduct = (cartProduct) => {
  return {
    type: GET_CART_PRODUCT,
    cartProduct,
  };
};
export const subtractQuantity = (product) => {
  return {
    type: SUB_QUANTITY,
    product,
  };
};

//WHATS SENT BACK FROM BACKEND TO UPDATE STATE
export const addQuantity = (product) => {
  return {
    type: ADD_QUANTITY,
    product,
  };
};

export const getCartProductThunk = (cartId) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem('token');
    const { data: cartProducts } = await Axios.get(`/api/cart/${cartId}`, {
      headers: {
        authorization: token,
      },
    });
    dispatch(getCartProduct(cartProducts));
   
  } catch (error) {
    console.log(error);
  }
};

export const addQuantityThunk = (productId) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem('token');
    const { data } = await Axios.put(
      `/api/cart/plusOne/${productId}`,{
        authorization: token,
      }
    );
    dispatch(addQuantity(data));
    // console.log("data", data);
  } catch (error) {
    console.log(error);
  }
};

export const subQuantityThunk = ( productId) => async (dispatch) => {
  try {
    const token = window.localStorage.getItem('token');
    const { data } = await Axios.put(
      `/api/cart/minusOne/${productId}`,{
        authorization: token,
      }
    );
    dispatch(subtractQuantity(data));
    // console.log("data", data);
  } catch (error) {
    console.log(error);
  }
};

export default function cartProductReducer(state = [], action) {
  switch (action.type) {
    case GET_CART_PRODUCT:
      return action.cartProduct;
    case ADD_QUANTITY:
      return state.map((product) => {
        if (product.productId === action.product.productId) {
          product.quantity = action.product.quantity;
        }
        return product;
      });
    case SUB_QUANTITY:
      return state.map((product) => {
        if (product.productId === action.product.productId) {
          product.quantity = action.product.quantity;
        }
        return product;
      });
    default:
      return state;
  }
}

import React from 'react';
import { connect } from 'react-redux';
import { getCartProductThunk } from '../store/cartProduct';
import { addQuantityThunk, subQuantityThunk } from '../store/cartProduct';
import { Button } from "@material-ui/core";
import { Wrapper } from "./Cartitem.styles";

class EditCart extends React.Component {
  constructor() {
    super();
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSub = this.handleSub.bind(this);
  }
  componentDidMount() {
    this.props.getCartProduct(this.props.cartId);
  }

  handleAdd() {
    const productId = this.props.productId;
    
    this.props.addQuantity(productId);
  }

  handleSub() {
   
    const productId = this.props.productId;

    this.props.subQuantity(productId);
  }

  render() {
    
    return (

      <Wrapper>
      <div class="relative max-w-7xl  my-2 flex-shrink-2 content-around ">
        <span>
        <Button 
               size='medium'
               variant="contained"
               color='default' onClick={this.handleAdd}> + </Button>
        </span>
        {this.props.cartProduct.length > 0 ? (
          
          <span class="font-serif text-2xl mt-6 md:mt-0 ">
            {this.props.cartProduct.map((product) => {
              if (
                parseInt(product.productId) === parseInt(this.props.productId)
              ) {
                return (
                  <div key={product.productId}>
                    <h3 class="font-serif font-medium text-2xl mt-6 md:mt-0">Qty:{product.quantity}</h3>
                  </div>
                );
              }
            })}
          </span>
        ) : (
          <p>-</p>
        )}
      <span>
        <Button 
               size='medium'
               variant="contained"
               color='default' onClick={this.handleSub}> - </Button>
      </span>
      </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  cartProduct: state.cartProductReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getCartProduct: (cartId) => dispatch(getCartProductThunk(cartId)),
  addQuantity: ( productId) =>
    dispatch(addQuantityThunk( productId)),
  subQuantity: ( productId) =>
    dispatch(subQuantityThunk( productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCart);

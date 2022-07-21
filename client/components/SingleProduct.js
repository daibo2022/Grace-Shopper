import React from "react";
import { connect } from "react-redux";
import { singleProduct } from "../store/singleProduct";
import { addToCartThunk } from "../store/cart";

class SingleProduct extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.singleProduct(id);
    }

    handleClick(event) {
        const productId = event.target.value;
        this.props.addToCart(productId);
    }

    render() {
        const product = this.props.product;

        return (
            <div class="relative max-w-7xl mx-auto my-7">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div class="flex-shrink-0">
                        <img
                            src={product.imageURL}
                            class="h-fit w-full object-cover rounded-lg"
                        />
                    </div>
                    <div class="space-y-2">
                        <h4 class="font-sans text-base uppercase text-left">
                            {product.productType}
                        </h4>
                        <h4 class="font-sans text-base text-left font-bold italic">
                            {product.brandName}
                        </h4>
                        <div class="title text-left mt-2 text-lg md:text-3xl font-serif font-semibold">
                            <h1>{product.productName}</h1>
                        </div>
                        <div class="mt-12 pt-4 is-inview entered">
                            <p>{product.description}</p>
                        </div>
                        <h2 class="font-serif font-bold text-2xl mt-6 md:mt-0">
                            ${product.price}
                        </h2>

                        <button
                            type="button"
                            value={product.id}
                            onClick={this.handleClick}
                            class="rounded-lg px-3 py-2 font-medium bg-orange-300 hover:bg-yellow-300"
                        >
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    product: state.singleProductReducer,
    user: state.user,
});

const mapDispatchToProps = (dispatch) => {
    return {
        singleProduct: (id) => dispatch(singleProduct(id)),
        addToCart: (productId) => dispatch(addToCartThunk(productId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
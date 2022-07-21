import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../store/products";

class Nail extends React.Component {
    componentDidMount() {
        this.props.fetchProducts();
    }

    render() {
        const nailProducts = this.props.products.filter(
            (product) => product.productType === "nail"
        );

        return (
            <div class="relative max-w-7xl mx-auto">
                <h2 class="text-2xl pt-1 font-sans">Nail Products</h2>
                <div class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                    {nailProducts.length &&
                        nailProducts.map((product) => {
                            return (
                                <div
                                    key={product.id}
                                    class="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white"
                                >
                                    <div class="flex-shrink-0">
                                        <Link to={`/products/${product.id}`}>
                                            <img
                                                src={product.imageURL}
                                                class="h-fit w-full object-cover"
                                            />
                                        </Link>
                                    </div>
                                    <p class="pl-3 italic font-bold">
                                        {product.brandName}
                                    </p>
                                    <div class="text-center">
                                        <Link to={`/products/${product.id}`}>
                                            <p class="font-bold text-lg">
                                                {product.productName}
                                            </p>
                                        </Link>

                                        <p>${product.price}</p>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ products: state.products });

const mapDispatchToProps = (dispatch) => ({
    fetchProducts: () => dispatch(fetchProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nail);

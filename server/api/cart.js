const router = require('express').Router();

const { Cart, Product, CartProduct, User } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const cart = await Cart.findOrCreate({
      where: {
        userId: user.id,
        isCompleted: false,
      },
      include: Product,
    });
    // console.log(Cart.prototype)
    res.send(cart[0]);
  } catch (error) {
    next(error);
  }
});

router.get('/checkout/:cartId', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        id: req.params.cartId,
      },
      include: Product,
    });
   
    await cart.update({isCompleted: true})

    res.send('Thank you for shopping with us!');
  } catch (error) {
    next(error);
  }
});


router.post('/:productId', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.body.authorization);
    const product = await Product.findByPk(req.params.productId);
    //find user's uncompleted cart associated to their id
    const [cart, created] = await Cart.findOrCreate({
      where: { 
        userId: user.id ,
        isCompleted: false
    },
      include: Product,
  });
    //
    const cartProduct = await CartProduct.findOne({
      where: {
        cartId: cart.id,
        productId: product.id,
      },
    });
    if (cartProduct) {
      const updatedQty = cartProduct.quantity + 1;
      await cart.addProduct(product, {
        through: {
          quantity: updatedQty,
          price: product.price,
        },
      });
    } else {
      await cart.addProduct(product, {
        through: { quantity: 1, price: product.price },
      });
    }
    // console.log(product);
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

//update a single product's quantity
 router.put('/plusOne/:productId', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.body.authorization);
    const product = await Product.findByPk(req.params.productId);
    const cart = await Cart.findOne({
      where: {
        userId: user.id,
        isCompleted: false
      },
      include: Product,
    });
    const cartproduct = await CartProduct.findOne({
      where: { cartId: cart.id, productId: product.id },
    });
    const updatedTotalQty = (await cartproduct.quantity) + 1;
    await cart.addProduct(product, { through: { quantity: updatedTotalQty } });
    // console.log(cartproduct)
    const cartproduct1 = await CartProduct.findOne({
      where: { cartId: cart.id, productId: product.id },
    });
    res.send(cartproduct1);
  } catch (error) {
    next(error);
  }
});

router.put('/minusOne/:productId', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.body.authorization);
    const product = await Product.findByPk(req.params.productId);
    const cart = await Cart.findOne({
      where: {
        userId: user.id,
        isCompleted: false
      },
      include: Product,
    });
    const cartproduct = await CartProduct.findOne({
      where: { cartId: cart.id, productId: product.id },
    });

    const updatedTotalQty = (await cartproduct.quantity) - 1;
    if (updatedTotalQty <= 0) {
      updatedTotalQty = 1;
    } else {
      await cart.addProduct(product, {
        through: { quantity: updatedTotalQty },
      });
    }
    // console.log(cart)
    const cartproduct1 = await CartProduct.findOne({
      where: { cartId: cart.id, productId: product.id },
    });
    res.send(cartproduct1);
    1;
  } catch (error) {
    next(error);
  }
});

//remove a product from cart
router.delete('/:cartId/:productId', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        id: req.params.cartId,
      },
      include: Product,
    });
    const product = await Product.findByPk(req.params.productId);
    await cart.removeProduct(product, {
      through: { productId: product.id },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});


//get specific product in cart to retrieve quantity
router.get('/:cartId', async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const cart = await Cart.findOne({
      where: {
        userId: user.id,
        isCompleted: false,
      },
    });
    const cartProduct = await CartProduct.findAll({
      where: {
        cartId: cart.id,
      },
    });

    res.send(cartProduct);
  } catch (error) {
    next(error);
  }
});

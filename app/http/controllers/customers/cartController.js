function cartController() {
  return {
    index(req, res) {
      res.render('customers/cart');
    },
    update(req, res) {
      console.log(req.body);

      if (!req.session.cart) {
        req.session.cart = {
          items: {},
          totalQty: 0,
          totalPrice: 0,
        };
      }

      let cart = req.session.cart;

      // check if item does not exist in cart
      if (!cart.items[req.body._id]) {
        cart.items[req.body._id] = {
          item: req.body,
          qty: 1, // set initial quantity to 1
        };
        cart.totalQty += 1;
        cart.totalPrice += req.body.totalPrice;
      } else {
        cart.items[req.body._id].qty += 1;
        cart.totalQty += 1;
        cart.totalPrice += req.body.totalPrice;
      }

      return res.json({ totalQty: req.session.cart.totalQty });
    },
  };
}

module.exports = cartController;

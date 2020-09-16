export const addItemToCart = (item, next) => {
  let cart = [];
  let count = 1;
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    let index;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i]._id === item._id) {
        index = i;
        break;
      }
    }
    if (index >= 0) {
      cart[index].count += 1;
    } else {
      cart.push({
        ...item,
        count: 1,
      });
    }

    if (localStorage.getItem("count")) {
      count = JSON.parse(localStorage.getItem("count")) + 1;
    }

    localStorage.setItem("count", JSON.stringify(count));
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
  return [];
};

export const incDecItems = (productId, val) => {
  let cart = [];
  let count = 0;
  let tmp = 0;
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, i) => {
      if (product._id === productId) {
        cart[i].count += val;
        tmp = cart[i].count;
      }
    });

    if (localStorage.getItem("count")) {
      count = JSON.parse(localStorage.getItem("count")) + val;
    }

    localStorage.setItem("count", JSON.stringify(count));
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  if (tmp == 0) {
    removeItemFromCart(productId);
  }
};

export const removeItemFromCart = (productId) => {
  let cart = [];
  let cartCount = 0;
  let count = 0;
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, i) => {
      if (product._id === productId) {
        cartCount = cart[i].count;
        cart.splice(i, 1);
      }
    });
    if (localStorage.getItem("count")) {
      count = JSON.parse(localStorage.getItem("count"));
    }
    localStorage.setItem("count", JSON.stringify(count - cartCount));
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const emptyCart = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart");
    localStorage.removeItem("count");
    next();
  }
};

export const cartEmpty = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart");
    let cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("count", JSON.stringify(0));
    next();
  }
};

export const cartCounter = () => {
  let count = 0;

  if (typeof window !== undefined) {
    count = 0;
    if (localStorage.getItem("count")) {
      count = JSON.parse(localStorage.getItem("count"));
    }
  }
  return count;
};

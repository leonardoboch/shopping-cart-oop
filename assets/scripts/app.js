class Product {
  constructor(title = "DEFAULT", image, desc, price) {
    // class constructor on which we specify the parameters
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
};
class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  };

};
class Component {
  constructor(renderHookId) {
    this.hook = renderHookId;
  };
  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if(attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hook).append(rootElement);
    return rootElement;
  };
};
class ShoppingCart {
  items = [];
  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2> Total: \$ ${this.totalAmount.toFixed(2)}</h2>`;
  };
  get totalAmount() {
    const sum = this.items.reduce((prevValue, currentItem) => {
      return prevValue + currentItem.price;
    }, 0);
    return sum;
  };
  addProduct(prod) {
    const updatedItems = [...this.items];
    updatedItems.push(prod);
    this.cartItems = updatedItems;
  };
  render () {
    const cartEl = document.createElement('section');
    cartEl.innerHTML = `
      <h2> Total \$${0} </h2>
      <button> Order Now! </button>
    `;
    cartEl.className = 'cart'
    this.totalOutput = cartEl.querySelector('h2');
    return cartEl;
  };
};

class ProductItem {
  constructor(product) {
    this.product = product;
  };
  addToCart() {
    console.log('adding product to cart');
    console.log(this.product);
    App.addProductToCart(this.product);
  };
  render() {
    const prodEl = document.createElement("li");
    prodEl.className = "product-item";
    prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}" />
          <div class="product-item__content">
            <h2> ${this.product.title} </h2>
            <h3> \$${this.product.price} </h3>
            <p> ${this.product.description} </p>
            <button> Add to cart </button>
          </div>
        </div>
      `;
      const addCartButton = prodEl.querySelector('button');
      //We have to use bind here, because this keyword binds it to wherever
      // method or instance we have called it.
      // so, with bind, we pass the instance scope
      addCartButton.addEventListener('click', this.addToCart.bind(this))
      return prodEl;
  }
}

class ProductList {
  products = [
    new Product(
      "A pillow",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1hmEEAgvZkgJjI0xFaErd13pJ3ifeuB1UM8GNrOTM2hX52CIIzcHqhiiQ&s=10",
      "A soft pillow!",
      19.99,
    ),
    new Product(
      "A carpet",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYd3PtQ3kF0pr1e4WZIfdKIYwuTrda04InzFx73z1IFquVMdWHzE7sjf6O&s=10",
      "A carpet which you might like - or not.",
      89.99,
    ),
  ];
  render() {
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    return prodList;
  }
}


class Shop {
  render() {
    const renderHook = document.getElementById("app");
    this.cart = new ShoppingCart();
    const cartEl = this.cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();
    renderHook.append(cartEl);
    renderHook.append(prodListEl);
    
  };
};

class App {
  static cart;

  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  };
  static addProductToCart(prod) {
    this.cart.addProduct(prod);
  };
};

App.init();
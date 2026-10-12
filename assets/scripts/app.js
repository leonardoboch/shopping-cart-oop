class Product {
  constructor(title = "DEFAULT", image, desc, price) {
    // class constructor on which we specify the parameters
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}
class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}
class Component {
  constructor(renderHookId, render = true) {
    this.hook = renderHookId;
    if(render) {
      this.render();
    }
  }
  render() {}
  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hook).append(rootElement);
    return rootElement;
  }
}
class ShoppingCart extends Component {
  // We can only extend one class in JS
  items = [];
  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2> Total: \$ ${this.totalAmount.toFixed(2)}</h2>`;
  }
  get totalAmount() {
    const sum = this.items.reduce((prevValue, currentItem) => {
      return prevValue + currentItem.price;
    }, 0);
    return sum;
  }

  constructor(renderHookId) {
    // average constructor for ShoppingCart class
    super(renderHookId); //calls superclass constructor
  }
  addProduct(prod) {
    const updatedItems = [...this.items];
    updatedItems.push(prod);
    this.cartItems = updatedItems;
  }
  render() {
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
      <h2> Total \$${0} </h2>
      <button> Order Now! </button>
    `;
    cartEl.className = "cart";
    this.totalOutput = cartEl.querySelector("h2");
    //console.log(cartEl);
    //console.log(this.totalOutput);
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }
  addToCart() {
    //console.log('adding product to cart');
    //console.log(this.product);
    App.addProductToCart(this.product);
  }
  render() {
    console.log("Entrou no ProductItem.render()")
    const prodEl = this.createRootElement("li", "product-item");
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
    const addCartButton = prodEl.querySelector("button");
    //We have to use bind here, because this keyword binds it to wherever
    // method or instance we have called it.
    // so, with bind, we pass the instance scope
    addCartButton.addEventListener("click", this.addToCart.bind(this));
  }
}

class ProductList extends Component {
  products = [];
  constructor(renderHookId) {
    super(renderHookId);
    this.fetchProducts();
  };
  fetchProducts() { 
    this.products = [
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
    this.renderProducts();
  };
  renderProducts() {
    for (const prod of this.products) {
      new ProductItem(prod, 'prod-list');
    }

  };
  render() {
    console.log('entrou no ProductList.render()');
    const prodList = this.createRootElement("ul", "product-list", [
      new ElementAttribute("id", "prod-list"),
    ]);
    console.log(this.products);
    if(this.products && this.products.length > 0) {
      this.renderProducts();
    }
  }
}

class Shop {
  constructor() {
    this.render();
  }
  render() {
    this.cart = new ShoppingCart("app");
    new ProductList("app");
  }
}

class App {
  static cart;
  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }
  static addProductToCart(prod) {
    this.cart.addProduct(prod);
  }
}

App.init();

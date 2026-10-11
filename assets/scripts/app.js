class Product {
  constructor(title = "DEFAULT", image, desc, price) {
    // class constructor on which we specify the parameters
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }
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
    const renderHook = document.getElementById("app");
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    renderHook.append(prodList);
  }
}

const productList = new ProductList();
productList.render();

class ProductManager {
  constructor() {
    this.products = [];
    this.id = 0;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Todos los campos son requeridos.");
      return;
    }

    for (const product of this.products) {
      if (product.code === code) {
        console.error("El producto existe.");
        return;
      }
    }

    const product = {
      id: this.id,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock
    };
    this.products.push(product);
    this.id++;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    for (const product of this.products) {
      if (product.id === id) {
        return product;
      }
    }
    console.error("Not Found");
    return null;
  }
}
const productManager = new ProductManager();

productManager.addProduct("Producto 1", "Ejemplo1", 100, "thumbnail.jpg", "01", 10);
productManager.addProduct("Producto 2", "Ejemplo2", 200, "thumbnail.jpg", "02", 20);
productManager.addProduct("Producto 2", "Ejmplo2", 200, "thumbnail.jpg", "02", 20);

console.log(productManager.getProducts());

const product = productManager.getProductById(0);
console.log(product);
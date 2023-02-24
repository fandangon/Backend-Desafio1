const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ESCUCHANDO EN PUERTO 8080
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
server.on("error", (error) => console.log(`Error: ${error}`));

const cartRoutes = require('./routes/cart');
const productRoutes = require('./routes/product');

app.use("/api/carrito", cartRoutes);
app.use("/api/productos", productRoutes);

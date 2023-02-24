const express = require("express");
const { Router } = express;
const routerProductos = Router();

// Acceso a datos - data access
const contenedor = require("../archivos");
const productos = new contenedor("./productos.json");

// Autorización - authorization
let administrador = true; //VARIABLE QUE CONTROLA SI SE EJECUTA LAS PETICIONES O NO

const isAdmin = (req, res, next) => {
  if (administrador) {
    return next();
  } else {
    const response = {
      error: -1,
      description: `Ruta ${req.path} y método ${req.method} no autorizados`,
    };
    res.status(401).json(response);
  }
};

//TRAER TODOS LOS PRODUCTOS CON METODO GET
routerProductos.get("/", (req, res) => {
  res.header("Content-Type", "application/json; charset=UTF8");
  productos.getAll().then((products) => {
    res.json(products);
  });
});

//TRAER UN PRODUCTO POR ID
routerProductos.get("/:idProduct", isAdmin, (req, res) => {
  res.header("Content-Type", "application/json; charset=UTF8");
  const id = req.params.idProduct;
  productos.getById(id).then((products) => res.json(products));
});

//GUARDAR NUEVO PRODUCTO
routerProductos.post("/", isAdmin, (req, res) => {
  res.header("Content-Type", "application/json; charset=UTF8");
  productos.save(req.body).then((products) => res.json(products));
});

//ACTUALIZAR PRODUCTO MEDIANTE ID
routerProductos.put("/:id", isAdmin, (req, res) => {
  productos
    .updateProduct(req.params.id, req.body)
    .then((product) => res.json(product));
});

//ELIMINAR PRODUCTO POR ID
routerProductos.delete("/:idProductos", isAdmin, (req, res) => {
  res.header("Content-Type", "application/json; charset=UTF8");
  productos
    .deleteById(req.params.idProductos)

    .then((products) => res.json(products));
});

module.exports = routerProductos;

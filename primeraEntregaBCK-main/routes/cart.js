const express = require("express");
const { Router } = express;
const routerCarrito = Router();

// Acceso a datos - data access
const contenedor = require("../archivos");
const productos = new contenedor("../data/productos.json");
const carrito = new contenedor("../data/carrito.json");

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
routerCarrito.get("/", (req, res) => {
    res.header('Content-Type', 'application/json; charset=UTF8')
    carrito.getAll()
        .then((carrito) => res.json(carrito))
})



//CREAR NUEVO CARRITO
routerCarrito.post("/", isAdmin, (req, res) => {
  res.header("Content-Type", "application/json; charset=UTF8");
  carrito.saveCarrito().then((products) => res.json(products));
});

//TRAER UN CARRO POR ID
routerCarrito.get("/:id", isAdmin, (req, res) => {
  res.header("Content-Type", "application/json; charset=UTF8");
  const id = req.params.id;
  carrito.getById(id).then((products) => res.json(products));
});

//ELIMINAR CARRITO POR ID
routerCarrito.delete("/:id", isAdmin, (req, res) => {
  res.header("Content-Type", "application/json; charset=UTF8");
  carrito
    .deleteById(req.params.id)

    .then((products) => res.json(products));
});

//GRABAR CARRITO POR ID
routerCarrito.post("/:idCarro/:id", isAdmin, (req, res) => {
  res.header("Content-Type", "application/json; charset=UTF8");
  const idCarro = req.params.idCarro;
  productos.getById(req.params.id).then((products) =>
    carrito.saveProductsCarrito(products, idCarro)
  );
});

//TRAER PRODUCTOS DE UN CARRO POR ID
routerCarrito.get("/:idCarro/", isAdmin, (req, res) => {
  res.header("Content-Type", "application/json; charset=UTF8");
  const idCarro = req.params.idCarro;
  carrito.getAll(req.params.idCarro).then((products) => res.json(products));
});

//Elimina un producto indicado de un carro indicado
routerCarrito.delete("/:idCarro/:id", isAdmin, (req, res) => {
  carrito
    .eliminarProdDeCarro(req.params.idCarro, req.params.id)
    .then((products) => res.json(products));
});

module.exports = routerCarrito;
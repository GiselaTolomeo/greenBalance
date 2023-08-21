
let carrito = [];
let contenedor = document.getElementById("misprods");

function renderizarProductos() {
  for(const producto of productos){
  contenedor.innerHTML+= `
    <div class= "card col-12 col-md-6 col-lg-3">
        <img src="${producto.foto}" class="card-img-top" alt="imagen producto">
        <div class="card-body">
            <h4 class="card-title">${producto.nombre}</h4>
            <h4 class="card-text">UDS ${producto.precio}</h4>
            <button id= "btn${producto.id}" class="btn btn-primary">Comprar</button>
        </div>
    </div>
  `
  }
  productos.forEach((producto) => {
    document.getElementById(`btn${producto.id}`).addEventListener("click", () => agregarAlCarrito(producto))
  })
}

renderizarProductos()

function agregarAlCarrito(productoAComprar) {
  carrito.push(productoAComprar)
  
  Swal.fire({
    title: productoAComprar.nombre,
    text: 'Se ha cargado con éxito al carrito!',
    imageUrl: productoAComprar.foto,
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: 'Imagen del producto agregado al carro',
  })


  document.getElementById("tablabody").innerHTML+= `
  <tr>
    <td>${productoAComprar.id}</td>
    <td>${productoAComprar.nombre}</td>
    <td><button class="borrar"  onClick="eliminar(event)"> 🗑️ </button></td>
    <td>UDS${productoAComprar.precio}</td>
  </tr>
  `
  let total = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0)
  
  document.getElementById("total").innerHTML= `Total a pagar: UDS ${total}`
  console.log(carrito)
}

function eliminar (ev) {
  let fila = ev.target.parentElement.parentElement
  let id = fila.children[0].innerText
  let indice = carrito.findIndex (producto => producto.id == id)
  
  carrito.splice(indice, 1)
 
  fila.remove()

  let total = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0)
  
  document.getElementById("total").innerHTML= `Total a pagar: UDS ${total}`
}

//Obtenemos el valor del dolar de una api:
 function obtenerDolar () {
  fetch("https://api.bluelytics.com.ar/v2/latest")
  .then(response => response.json())
  .then(data => {
    
    const dolarBlue = data.blue
    
    document.getElementById("cotizacion").innerText+=`COTIZACIÓN DOLAR ARGENTINA: COMPRA: $${dolarBlue.value_buy} VENTA: $${dolarBlue.value_sell}`
  })
  .catch(error => console.log("No llego la información de la api"))
 }

 obtenerDolar();

 //Calculadora de IMC:

 const botonImc = document.getElementById("botonImc");

 botonImc.addEventListener("click", calcularImc )

 function calcularImc (peso, talla){
  peso = parseFloat(prompt("Ingese su peso en kiligramos"))
  talla = parseFloat(prompt("Ingese su talla en metros"))
  let total = peso / (talla * talla)

  if(total < 25 && total > 18.5){
   diagnostico = "Normopeso"
  }else if(total > 25 && total < 30){
    diagnostico = "Sobrepeso"
  }else if(total > 30 && total < 35){
    diagnostico = "Obesidad grado I"
  }else if(total > 35 && total < 40){
    diagnostico = "Obesidad grado II"
  }else if(total < 18.5){
    diagnostico = "Bajo Peso"
  } else if (total < 40){
    diagnostico = "Obesidad grado III"
  }
  else{
    diagnostico = ""
  }

  if (diagnostico == ""){
    Swal.fire({
      title: "Resultado de tu IMC",
      text: `Lo siento, debe ingresar un peso y/o talla validos`,
      imageUrl: "./images/logo.png",
      imageWidth: 80,
      imageHeight: 80,
      imageAlt: 'Logo de Green Garden'
    })
  }else{

  Swal.fire({
    title: "Resultado de tu IMC",
    text: `Su IMC es de: ${total.toFixed(1)} lo que es equivalente a ${diagnostico}`,
    imageUrl: "./images/logo.png",
    imageWidth: 80,
    imageHeight: 80,
    imageAlt: 'Logo de Green Garden'
  })}
 }

 // Evento boton de finalizar compra:

 let finalizarCompra = document.getElementById("fin");

finalizarCompra.addEventListener("click", verificarCarro);

function verificarCarro(){

    if (carrito == 0){

        Swal.fire({
            title: "Oops!",
            text: "Ud. no posee items en el carrito!",
            imageUrl: "./images/logo.png",
            imageWidth: 80,
            imageHeight: 80,
            imageAlt: 'Logo de Green Garden'
          })


    }else{
            Swal.fire({
                title: "Compra finalizada",
                text: "Por favor, pongase en contacto con nuestros asesores para confirmar la compra. Muchas gracias",
                imageUrl: "./images/logo.png",
                imageWidth: 80,
                imageHeight: 80,
                imageAlt: 'Logo de Green Garden'
              })
              carrito=[];
              document.getElementById("tablabody").innerHTML = ``;
              total.innerText=`TOTAL A PAGAR:`;
              
        }

    }
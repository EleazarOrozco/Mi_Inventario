const listaDiv = document.getElementById("lista");
const btIngresar = document.getElementById("ingresar");
const btListar = document.getElementById("listar");
const costoIn = document.getElementById("costo");           //seleccionar los inputs
const codigoIn = document.getElementById("codigo");
const nombreIn = document.getElementById("nombre");
const cantidadIn = document.getElementById("cantidad");
const btLisInv = document.getElementById("inverso");
const btBuscar = document.getElementById("buscar");
const btEliminar = document.getElementById("eliminar");
let txt = document.getElementById("lista");
let codigoE = document.getElementById("encontrado");
let btListarInverso = document.getElementById("inverso");

class Producto {
    constructor(codigo, nombre, costo, cantidad) {
        this.codigo=codigo;
        this.nombre = nombre;
        this.costo = costo;
        this.cantidad = cantidad;
       }
    }
class Inventario {
    constructor() {
        this.productos = []
    }

    agregar(productoNuevo) {
        this.productos.push(productoNuevo); 
        console.log(this.productos);
    }

    listar(){
        this.productos.forEach(producto =>{
            mostrarInventario(producto)
        }) //Destructuring; saca los valores para usarlos individualmentes
    }
    
    eliminar(codigo) {
        let encontrado = false;
        this.productos.forEach((producto, index) => {
            if(producto.codigo == codigo) {
                encontrado = true
            }
            if(encontrado) {
                this.productos[index] = this.productos[index + 1]
            }
        })
        if(encontrado == true) {
            this.productos.pop()
        }
    }
   
    buscar(codigo) {

        for (let i = 0; i < this.productos.length; i++) {
            if (this.productos[i].codigo == codigo) {
             return this.productos[i]
            }
           
        }

    }

    listarInverso() {
        for(let i = this.productos.length - 1; i >= 0; i--){
            mostrarInventario(this.productos[i])
        }
    }
}
const inventario = new Inventario();

btIngresar.addEventListener("click", agregarr) //funcion onclick del boton agregar
btListar.addEventListener("click", listarProductos) //funcion onclick del boton listar
btEliminar.addEventListener("click", eliminarProducto) //funcion onclick del boton eliminar
btBuscar.addEventListener("click", buscarProducto) //funcion onclick del boton eliminar
btListarInverso.addEventListener("click", listarInverso) //funcion onclick del boton eliminar

function LimpiarIn() {
    txt.innerHTML = ''; //limpia la lista del HTML
}

function agregarr(){                //agregar el producto
    const producto = new Producto(codigoIn.value, nombreIn.value, costoIn.value, cantidadIn.value); //selecciono el valor de los input
    inventario.agregar(producto);
}

function mostrarInventario(producto) { 
    const {codigo, nombre, costo, cantidad} = producto;
    txt.innerHTML += `Codigo: ${codigo} 
    Nombre: ${nombre} Costo: ${costo} Cantidad: ${cantidad} <br>`; //se pegan los valores del array al html
}

function listarProductos() {
    LimpiarIn();                    //LimpiarIn
    inventario.listar();            //listar productos
}

function eliminarProducto() {
    inventario.eliminar(codigoIn.value)    //eliminar producto
}

function buscarProducto() {
    const productoEncontrado = inventario.buscar(codigoIn.value);
    if(productoEncontrado) {
        const {codigo, nombre, costo, cantidad} = productoEncontrado;   //Destructuring, pega el valor encontrado en otro parrafo
        codigoE.innerHTML = `<h4> Producto Encontrado:</h4><br> Codigo: ${codigo} 
        Nombre: ${nombre} Costo: ${costo} Cantidad: ${cantidad} <br>`
    }
}   

function listarInverso() {
    LimpiarIn();
    inventario.listarInverso()
}
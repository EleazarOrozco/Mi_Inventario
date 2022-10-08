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
    ubicacion(codigo) {
        let i = 0;
        while ( codigo > this.productos[i]?.codigo) {
            i++
        }
        return i
    }
    agregar(productoNuevo) {
        //let ubi = this.ubicacion(productoNuevo?.codigo); esto así me lo acomoda por orden
        // leí que te deja leer los valores de la propiedad en una cadena de objetos sin tener que
        //validar cada referencia, si no se lo pongo me los añadé tal cual.
        let ubi = this.ubicacion(productoNuevo.codigo);
        for (let i = this.productos.length - 1; ubi <= i; i--) {
            this.productos[i + 1] = this.productos[i]
        }
        this.productos[ubi] = productoNuevo;
        console.log(this.productos);
    }

    listar(){
        this.productos.forEach(producto =>{
            mostrarInventario(producto)
        }) //Destructuring; saca los valores para usarlos individualmentes
    }
    
    eliminar(codigo) {
        let ubi = buscar(this.productos, codigo); //el eliminar depende de mi busqueda binaria que esta mal.
        let length = this.productos.length
        let i = 0
    
        while( i + ubi < length) {
            this.productos[ubi + i] = this.productos[ubi + i + 1]
            i++
        }
    
        this.productos.length -= 1;
    
        return this.productos;
    }
   
    buscar(codigo) {
        let bajo = 0;    
        let alto = this.productos.length - 1;   
        let position = -1;
        let encontrado = false;
        let mitad;
     
        while (encontrado === false && bajo <= alto) {
            mitad = Math.floor((bajo + alto)/2);
            if (this.productos[mitad] == codigo) {
                encontrado = true;
                position = mitad;
            } else if (this.productos[mitad] > codigo) {  
                alto = mitad - 1;
            } else {  
                bajo = mitad + 1;
            }
        }
        return position; //si esta linea de aqui se queda así, no me arroja el numero a buscar
        // pero no necesito el operador "?" en la linea 40, si cambio cualquier cosa en este
        // return position; necesito el operador si o si. ademas no se como obtener mi numero
        // que busco por codigo
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


function metodoAdd() {
    let ubi = ubicacion(this.productos, codigo);
    for (let i = this.productos.length - 1; ubi <= i; i--) {
        this.productos[i + 1] = this.productos[i]
    }
    this.productos[ubi] = codigo;
    return this.productos;
}

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
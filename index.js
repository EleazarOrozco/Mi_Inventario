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
        this.next = null;
        this.prev = null;
       }

       

    }
class Inventario {
    constructor() {
        this.primero = null;
        this.ultimo = null;
        this.size=0;
    }

    pushOrdered(newItem){
        if (this.primero == null){
            this.primero = newItem;
        }
        else if (this.primero.codigo >= newItem.codigo){
            newItem.next = this.primero;
            newItem.next.prev = newItem;
            this.primero = newItem;
        } else {
            let current = this.primero;
            while(current.next && current.next.codigo < newItem.codigo){
                current = current.next;
            }
            newItem.next = current.next;
            if(current.next){
                newItem.next.prev = newItem;
            }
            current.next = newItem;
            newItem.prev = current;
        }
        this.size++;
        // console.log(this.primero.next); //lo puse para ver si estaba funcionando y efectivamente funciona
    }
    
    headRemove() {
        if (!this.primero) {
            return null
        };

        if (this.primero === this.ultimo) {
            this.primero = null;
            this.ultimo = null;
        } else {
            this.primero = this.primero.next;
            this.primero.prev = null;
        };
        this.size--;
    }

    lastRemove() {
        if (!this.ultimo) {
            return null
        };

        if (this.primero === this.ultimo) {
            this.primero = null;
            this.ultimo = null;
        } else {
            this.ultimo = this.ultimo.prev;
            this.ultimo.next = null;
        };
        this.size--;
    };

    removeData(newItem) {
        let current = this.primero;
        let previous = null;

        while(current !== null) {
            if (current.codigo === newItem) {
                if (!previous) {
                    this.headRemove();
                } else if (!current.next) {
                    this.lastRemove();
                } else {
                    previous.next = current.next;
                    current.next.prev = previous;
                };
                this.size--;
                return current.codigo;
            };
            previous = current;
            current = current.next;
        };
        return null;
    }

    // print() {
    //     let current = this.primero;
    //     let result = '';
    //     while(current) {
    //         result += current.codigo + ' <-> ';
    //         current = current.next;
    //     };

    //     return result += 'null ';
    // };

    reverse(){
        let temp = null;
        let current = this.primero;
        while(current != null) {
            temp = current.next;
            current.next = current.prev;
            current.prev = temp;
            current = current.next;
        }
        if (temp != null){
            this.primero = temp.next;
        }
        return this.primero;
    }

    print() {
       let temp = null;
        let current = this.ultimo;
        while(current != null) {
            temp = current.prev;
            current.prev = current.next;
            current.next = temp;
            current = current.prev;
        }
        if (temp != null){
            this.primero = temp.prev;
        }
        // return this.primero;
        console.log(this.primero)
      }
}
const inventario = new Inventario();

btIngresar.addEventListener("click", agregarr) //funcion onclick del boton agregar
btListar.addEventListener("click", mostrarInventario) //funcion onclick del boton listar
btEliminar.addEventListener("click", eliminarProducto) //funcion onclick del boton eliminar
btBuscar.addEventListener("click", buscarProducto) //funcion onclick del boton eliminar
btListarInverso.addEventListener("click", listarInverso) //funcion onclick del boton eliminar



function LimpiarIn() {
    txt.innerHTML = ''; //limpia la lista del HTML
}

function agregarr(){                //agregar el producto
    const producto = new Producto(Number(codigoIn.value), nombreIn.value, costoIn.value, cantidadIn.value); //selecciono el valor de los input
    inventario.pushOrdered(producto);
}

function mostrarInventario(producto) { 
    const {codigo, nombre, costo, cantidad} = producto;
    txt.innerHTML += `Codigo: ${codigo} 
    Nombre: ${nombre} Costo: ${costo} Cantidad: ${cantidad} <br>`; //se pegan los valores del array al html
}

function listarProductos() {
    LimpiarIn();                    //LimpiarIn
    inventario.print();            //listar productos
}

function eliminarProducto() {
    inventario.removeData(codigoIn.value)    //eliminar producto
}

function buscarProducto() {
    let codigo = Number(document.getElementById("codigo").value);
    const productoEncontrado = inventario.findIndex(codigo);
    if(productoEncontrado) {
        const {codigo, nombre, costo, cantidad} = productoEncontrado  ;   //Destructuring, pega el valor encontrado en otro parrafo
        codigoE.innerHTML = `<h4> Producto Encontrado:</h4><br> Codigo: ${codigo} 
        Nombre: ${nombre} Costo: ${costo} Cantidad: ${cantidad} <br>`
    }
}   

function listarInverso() {
    LimpiarIn();
    inventario.reverse()
}
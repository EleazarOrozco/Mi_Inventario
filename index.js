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
       }
    }
class Inventario {
    constructor() {
        this.primero = null;
        this.size=0;
    }

    add(codigo){
        const newProducto = new Producto(codigo, null)
        if (!this.primero){
            this.primero = newProducto
        } else { 
            let actual = this.primero;
            while (actual.next){
                actual=actual.next;
            };
            actual.next = newProducto;
        };
        this.size++;
    };
    addAt(codigo, index){
        if(index < 0 || index > this.size){
            return null;
        };
        const newProducto = new Producto(codigo);
        let actual = this.primero;
        let previous;

        if(index == 0){
            newProducto.next = actual;
            this.head = newProducto;
        } else { 
            for (let i = 0; i<index; i++) {
                previous = actual;
                actual = actual.next;
            };
            newProducto.next= actual;
            previous.next= newProducto;
        };
    this.size++
    };
    print(nuevo){
        if (this.primero==null)
          this.primero=nuevo;
        else{
          let temp=this.primero;
          while (temp.next!=null)
            temp=temp.next;
          temp.next=nuevo;
        }
      }
    listarInverso(){
        let temp = this.primero;
        let str = "";
        while(!!temp){
            str =  temp.codigo + "" + str;
            temp = temp.next;  
        }
        str += null;
        return str;
    };
    removeCode(codigo){
        let actual = this.primero;
        let previous = null;

        while(actual != null){
            if(actual.codigo === codigo){
                if(!previous){
                    this.primero = actual.next;
                } else { 
                    previous.next = actual.next;
                };
                this.size--;
                return actual.codigo;
            };
            previous = actual;
            actual = actual.next;
        };
        return null;
    };
    removeIndex(index){
        if(index < 0 || index >= this.size){
            return null;
        }
        let actual = this.primero;
        let previous = null;

        if(index === 0){
            this.head = actual.next;
        } else{
            for (let i = 0; i<index; i++) {
                previous = actual;
                actual = actual.next;
            };
            previous.next = actual.next;

        };
        this.size--;
        return actual.codigo;
    };
    findIndex(codigo) {
        let lastIndex = this.size - 1;
        let actual = this.primero;
        let i;
        for (i = 0; i <= lastIndex; i++){
            if(i == codigo){
                return actual;
            } else { 
                actual = actual.next;
            }
        }
        return actual;
      }
    
}
const inventario = new Inventario();

btIngresar.addEventListener("click", agregarr) //funcion onclick del boton agregar
btListar.addEventListener("click", listarProductos) //funcion onclick del boton listar
btEliminar.addEventListener("click", eliminarProducto) //funcion onclick del boton eliminar
btBuscar.addEventListener("click", buscarProducto) //funcion onclick del boton eliminar
btListarInverso.addEventListener("click", listarInverso) //funcion onclick del boton eliminar


function metodoAdd(codigo) {
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
    const producto = new Producto(Number(codigoIn.value), nombreIn.value, costoIn.value, cantidadIn.value); //selecciono el valor de los input
    inventario.add(producto);
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
    inventario.removeCode(codigoIn.value)    //eliminar producto
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
    inventario.listarInverso()
}
class Node {
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
        this.prev = null;
        this.next = null;
        this.head = null;
        this.last = null;
    }
}
class Tree {
    constructor(){
        this.root = null;
        this.resul = '';
    }
    deconstruct(xpression){
        for (let i = 0; i < xpression.length; i++) {
            let node = new Node(xpression[i]);
           this.addToTree(node);         
        }

        // console.log(this.head);
    }
    addToTree(xpression){
        if(this.head){
            xpression.prev = this.last;
            this.last.next = xpression;
            this.last = xpression;
        } else 
            this.head = xpression;
            this.last = xpression;
        
    }
    delete(nodo) {
        if(this.head == nodo) {
            this.head = this.head.next;
            return;
        }
        if(nodo.next && nodo.prev) {
          nodo.next.prev = nodo.prev;
          nodo.prev.next = nodo.next;
          return;
        }
  
        if(!nodo.next) {
          this.last = nodo.prev;
          nodo.prev.next = nodo.next;
          return;
        }
    }
    createTree(xpression){
        this.deconstruct(xpression);
        let tmp = this.head;
        let root = null;
        console.log(tmp);
        while(tmp!=null){
            if(tmp.data == "*" || tmp.data == "/"){
                tmp.left = tmp.prev;
                tmp.right = tmp.next;
                // tmp.prev = tmp.prev.prev;
                // tmp.next = tmp.next.next;
                // tmp.prev.next = tmp;
                // tmp.next.prev = tmp;
                this.delete(tmp.next)
                this.delete(tmp.prev)
            if (tmp.next == null){
                this.last = tmp;
            }
            if (tmp.prev == null){
                    this.head = tmp;
                } 
                root = tmp;            
            }
            
            tmp = tmp.next;
        }
        this.root = root;
        tmp = this.head;

        while(tmp !=null){
            if(tmp.data == "+" || tmp.data == "-"){
                tmp.left = tmp.prev;
                tmp.right = tmp.next;
                // tmp.prev = tmp.prev.prev;
                // tmp.next = tmp.next.next;
                // tmp.prev.next = tmp; //esto lo tengo en la parte del * y / pero aquí no se por que no entra
                // tmp.next.prev = tmp;

                this.delete(tmp.next)
                this.delete(tmp.prev)
            if (tmp.next == null){
                this.last = tmp;
            }
            if (tmp.prev == null){
                    this.head = tmp;
                }
                root = tmp;  
            }
            tmp = tmp.next;
        }
        this.root = root;
        tmp=this.head;
    }
    preorder(){
        this.resul = '';
        if(this.root == null){
            return false;
        } else{
        this._preOrder(this.root);
        }
        return this.resul;
    } 
    
    _preOrder(node)
    {
        this.resul += node.data;
        if(node.left != null){
            this._preOrder(node.left);
        }
        if(node.right != null){
            this._preOrder(node.right);
        }

    }

    postorder(){
        this.resul = '';
        if(this.root == null){
            return false;
        } else{
        this._postOrder(this.root);
        }
        return this.resul;
    }
    
    _postOrder(node)
    {
       
        if(node.left != null){
            this._postOrder(node.left);
        }
        if(node.right != null){
            this._postOrder(node.right);
        }
        this.resul += node.data;

    }

}
class Pila {
    constructor(){
        this.head = null;
        this.last = null;
    }
    delete(nodo) {
        if(this.head == nodo) {
            this.head = this.head.next;
            return;
        }
        if(nodo.next && nodo.prev) {
          nodo.next.prev = nodo.prev;
          nodo.prev.next = nodo.next;
          return;
        }
  
        if(!nodo.next) {
          this.last = nodo.prev;
          nodo.prev.next = nodo.next;
          return;
        }
    }
    deconstruct2(xpression){
        for (let i = 0; i < xpression.length; i++) {
            let node = new Node(xpression[i]);
            this.add2(node);
            this.delete(node);

        }
    }

    add2(data){
        if (this.head==null){
            this.head=data;
            this.last=data;
        }else{
            this.last.next=data;
            data.prev=this.last;
            this.last=data;
        }

    }
    deconstruct1(xpression){
        for (let i = xpression.length -1; i>=0; i--) {
            let node = new Node(xpression[i]);
            this.add2(node);
            this.delete(node);
        }
    }

    operation(node){
        let a;
        let b;
        let resul = 0;
        switch (node.data) {
            case '+':
                resul = a + b;
                break;
            case '-':
                resul = a - b;
                break;
            case '/':
                resul = a / b;
                break;
            case '*':
                resul = a * b;
                break;
            default:
                break;
        }
    }
    extraer() {
        let aux = this.last;
        this.delete(this.last);
        return aux;
    }
}
let trees = new Tree ();
let pila = new Pila();
console.log(trees.postorder())
trees.createTree("3+5*2+3");
trees.postorder();
pila.deconstruct2(trees.postorder());
// trees.preorder();
// // trees.deconstruct("2+5*4+5");
// console.log()

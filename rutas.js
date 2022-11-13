
class Base{
    constructor(route, time){  
        this.route = route
        this.time = time
        this.next= null
    }
}

class Routes{
    constructor(){
        this.head = null
    }

    add(nRoute){
        if(!this.head){
            this.head = nRoute
        }else{
            let temp = this.head;
            while(temp.next != this.head){
                temp = temp.next
            }
            temp.next = nRoute;
        }
        nRoute.next = this.head;
    }

    trail(routeStart, startTime, minute, endTime, endMinute){
        let start = this.find(routeStart)
        if(!start){
            return null;
        }else{
            let inicio, final, temp, rutas, hora, minutos;
            inicio = startTime * 60 + minute;
            final = endTime * 60 + endMinute;
            temp = this.head;
            rutas = ''
            hora = Math.floor(inicio/60)
        
            while(inicio < final){
                inicio += temp.time;
                let hora = Math.floor(inicio/60)
                minutos = inicio - hora * 60; 
                rutas += `La ruta va por ${temp.route} a las ${hora}:${minutos} \n`
                
                temp = temp.next
            }
            return rutas;
        }
      }
      find(route){
        let temp = this.head
          do{
              if(route == temp.route){
                  return temp;
  
              }
              temp = temp.next;
  
         } while(temp != this.head);
         return null;
  
        }

    show(){
        let res="";
        let temp = this.head;
        while(temp.next != this.head){
            res += temp.route + "  ";
            temp=temp.next;
        }
        return res;
      }

      delete(route){
        if(!this.head)
            return null;
        
        let current, previous;
        current = this.head;
        previous = this.head;
        while (current.route !== route) {
            if(current.next = this.head){
                return null;
            }
            previous = current;
            current = current.next;
        }
        if(current == this.head && current.next == this.head){
            this.head = null;
            return this.head;
        }
        if(current == this.head){
            previous = this.head;
            while(previous.next != this.head)
                previous = previous.next;
            this.head = current.next;
            previous.next = this.head;            
        }
        else if (current.next == this.head){
            previous.next = head;
        }else{
            previous.next = current.next;
        }
        return this.head;
      }

      
}

const node = new Routes();
let base = new Base("Rancho de villa", 30);
node.add(base)
base = new Base("Coquimatlan", 15)
node.add(base)
// node.delete(base, "UdC"); //no me funcionó el delete, no se por que
base = new Base("Manzanillo", 20)
node.add(base)
base = new Base("Tecoman", 30)
node.add(base)
base = new Base("Armeria", 50)
node.add(base)
base = new Base("VdA", 10)
node.add(base)
console.log(node.trail("Manzanillo", 5,30, 22,40))
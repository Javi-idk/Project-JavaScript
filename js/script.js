'use strict';

    /***********************************************************************************************************************************************************************************************************
    ****************************************************************************************** USER LOGIN *****************************************************************************************************
    ***********************************************************************************************************************************************************************************************************/
    
    let islogged = false;
    const DOMuser = document.getElementById("user");
    const DOMpassword = document.getElementById("password");
    const form = document.getElementById("loginform");
    const parrafo = document.getElementById("warnings");
    const message1 = document.getElementById("welcome");
    const welcome = document.getElementById("firstLogin");
    const DOMbuy = document.querySelector('#buyingBtn');
    const DOMrestablish = document.querySelector('#restablishQuantity');
    hiddeBuyDetails();

    //Creación de usuario por defecto
    const defaultUser = {
      _user: "FirstUser",
      _password: "My_Pass123"
    };

    function logState(){
      form.addEventListener("submit", e=>{
          e.preventDefault();
          let warnings = "";
          let send = false;
          parrafo.innerHTML = "";
          if(DOMuser.value != defaultUser._user){
              warnings += `El usuario no es válido <br>`;
              send = true;
          }
          if(DOMpassword.value != defaultUser._password){
              warnings += `La contraseña es incorrecta <br>`;
              send = true;
          }
          if(send){
              parrafo.innerHTML = warnings;
              document.getElementById("user").value = "";
              document.getElementById("password").value = "";
          }else{
              sessionStorage.setItem("islogged", "true");
              welcome.innerHTML = `Bienvenido ${defaultUser._user}`;
              message1.innerHTML = `Bienvenido ${defaultUser._user}`;
              hidde();
              show();
              document.getElementById("buy").style.visibility = 'block';
          }
      });
  }

  logState();
  
  function hiddeBuyDetails() {
    document.getElementById('buy').style.display = 'none';
  };

  function hidde(){
    document.getElementById('label-user').style.display = 'none';
    document.getElementById('user').style.display = 'none';
    document.getElementById('label-password').style.display = 'none';
    document.getElementById('password').style.display = 'none';
    document.getElementById('submit').style.display = 'none';
};

function show(){
    document.getElementById('buy').style.display = 'block';
};
window.onload = () => {

    /***********************************************************************************************************************************************************************************************************
    ****************************************************************************************** PRODUCTS *****************************************************************************************************
    ***********************************************************************************************************************************************************************************************************/

    //Base de datos, cada producto tiene un id, nombre, precio, imagen de referencia y cantidad
    const listProduct = [
      {
          id: 1, name: 'Lechuga', price: 1000, img: 'img/lechuga.jpg', quantity: 5
      },
      {
          id: 2, name: 'Pimentón', price: 500, img: 'img/pimenton.png', quantity: 5
      },
      {
          id: 3, name: 'Mango', price: 950, img: 'img/mango.jpg', quantity: 5
      },
      {
          id: 4, name: 'Alcachofa', price: 600, img: 'img/alcachofa.jpg', quantity: 5
      },
      {
          id: 5, name: 'Melón', price: 1200, img: 'img/melon.jpeg', quantity: 5
      },
      {
          id: 6, name: 'Choclo', price: 450, img: 'img/choclo.jpg', quantity: 5
      },
      {
        id: 7, name: 'Zapallo Italiano', price: 550, img: 'img/zapallo-italiano.jpg', quantity: 5
      },
      {
        id: 8, name: 'Sandía', price: 2000, img: 'img/sandia.jpg', quantity: 5
      },
      {
      id: 9, name: 'Coco', price: 1500, img: 'img/coco.jpg', quantity: 5
      }
  ];

  let shoppingCart = [];
  let total = 0;
  const shippingCost = 1500;
  const extraCost = 350;
  let shippingAmount = 0;
  let totalAmount = 0;
  let max = Infinity;

  const DOMitems = document.querySelector('.container-2-img');
  const DOMshoppingCart = document.querySelector('#shoppingCart');
  const DOMtotal = document.querySelector('#subtotals');
  const DOMshippingCost = document.querySelector('#shippingCost');
  const DOMtotalAmount = document.querySelector('#total-Amount');
  
  const DOMadditionalCost = document.querySelector('#additional');
  const miLocalStorage = window.localStorage;
  const miStockStorage = window.localStorage;
  
  // ***************************************************************** CREACION PRODUCTOS A LA VENTA *****************************************************************

  //Creacion dinamica de los productos a la venta
  function creatingProducts(dataBase, DOMsection){
                  
    dataBase.forEach((info) => {
 
      const sectionPhoto = document.createElement('div');
      sectionPhoto.classList.add('section-photo');
      
      const addTitle = document.createElement('h4');
      addTitle.classList.add('name-product');
      addTitle.textContent = info.name;

      const addImg = document.createElement('img');
      addImg.classList.add('photo');
      addImg.setAttribute('src', info.img);
      addImg.setAttribute('id', `img-${info.id}`);

      const addPrice = document.createElement('p');
      addPrice.classList.add('price-product');
      addPrice.textContent = `$ ${info.price}`;

      const addQuantity = document.createElement('p');
      addQuantity.classList.add('quantity-product');
      addQuantity.innerHTML = `<span id="idcompare${info.id}">${info.quantity}</span> unidades disponibles`;

      const abbBtn = document.createElement('button');
      abbBtn.classList.add('btn-buy', 'btnagregar');
      abbBtn.textContent = 'AGREGAR A CARRO';
      abbBtn.setAttribute('marcador', info.id);
      abbBtn.setAttribute('id', `item-${info.id}`);
      abbBtn.addEventListener('click', addToCart);

      const quantityInCart = document.createElement('p');
      quantityInCart.classList.add('quantity-cart');
      quantityInCart.innerHTML = `<span id="art-${info.id}"><b>0</b></span> ud. en el carrito`;

      sectionPhoto.appendChild(addImg);
      sectionPhoto.appendChild(addTitle);
      sectionPhoto.appendChild(addPrice);
      sectionPhoto.appendChild(addQuantity);
      sectionPhoto.appendChild(abbBtn);
      sectionPhoto.appendChild(quantityInCart);
      DOMsection.appendChild(sectionPhoto);
      
  });
 }

 /*
 El CSS esta pensando para soportar 3 productos en cada fila, para agregar productos se deben agregar en la JSON "listProducts", luego realizar un slice a la 
 base e insertarla a un DOM, luego asignar ambos parametros a la función creatinProducts
 */

 // Realizar Slice
 const dataPartOne = listProduct.slice(0, 3);
 const dataPartTwo = listProduct.slice(3, 6);
 const dataPartThree = listProduct.slice(6, 9);

 // Crear un DOM el cual este asignado a una parte del HTML
 const DOMproducts1 = document.querySelector('.container-2-img');
 const DOMproducts2 = document.querySelector('#container-2-img-v2');
 const DOMproducts3 = document.querySelector('#container-2-img-v3');
 
 // Asignación de la parte de base a datos a un DOM
 creatingProducts(dataPartOne, DOMproducts1);
 creatingProducts(dataPartTwo, DOMproducts2);
 creatingProducts(dataPartThree, DOMproducts3);

 // ***************************************************************** CALCULA EL TOTAL DE LA COMPRA *****************************************************************
  
  let newCost =0;
  function amountTotal() {
    total = 0;
    totalAmount = 0;
    shoppingCart.forEach((item) => {
      const myItem = listProduct.filter((itemBaseDatos) => {
      return itemBaseDatos.id === parseInt(item);
    });
      total = total + myItem[0].price;
    });
                  
    deliveryCost();
    let newCost = extraCost * shoppingCart.length;
    totalAmount = shippingAmount + total + newCost;
    DOMtotal.textContent = total;
    DOMshippingCost.textContent = shippingAmount;
    DOMadditionalCost.textContent = newCost;
    DOMtotalAmount.textContent = totalAmount;
  }

  function deliveryCost(){
    if ( shoppingCart.length == 0 ) {
      shippingAmount = 0;
    } else {
      shippingAmount = shippingCost;
    }
  }

// ***************************************************************** CALCULAR NUEVA CANTIDAD *****************************************************************

  function compareStock() {
    total = 0;
    if (miStockStorage.length > 0 ) {
      const  obj = JSON.parse(miStockStorage['quantity']);
      const noDuplicateProduct = [...new Set(obj)];
      noDuplicateProduct.forEach((item) => {
        const units = obj.reduce((total, productID) => {          
          if (productID === item) {
            return total - 1;
          }else{
            return total;
          }
        }, 0);
          
        const prefijo = "idcompare";
        const idDOM = prefijo.concat(item);
        let DOMquantity = document.getElementById(idDOM).textContent;
        let newQuantity = 0;
        let itemStock = [];
                        
        const arrQuantity = listProduct.filter((itemBaseDatos) => {
          if ( itemBaseDatos.id === parseInt(item)){
            itemStock = JSON.parse(itemBaseDatos.quantity);
            return itemStock;
          }
        });
          
        if ( Number(itemStock) === Number(DOMquantity) ) {
          newQuantity = Number(DOMquantity) + Number(units);
        } else if ( Number(itemStock) > Number(units)) {
            setTimeout(() => {
              newQuantity = Number(units) + Number(DOMquantity);
              
          }, 300);
        }
        document.getElementById(idDOM).textContent = newQuantity;
                            
        if (parseInt(newQuantity) === 0) {
          const prefijoid = "item-";
          const idSection = prefijoid.concat(item);
          
          let noStock = document.querySelector(`#${idSection}`);
          noStock.textContent = "AGOTADO";
          noStock.disabled = true;
          noStock.classList.remove('btnagregar');
          noStock.classList.add('btnagregado', 'titleBtn');

          const prefijoimg = "img-";
          const idimg = prefijoimg.concat(item);
          document.querySelector(`#${idimg}`);
        }
      });
    }          
  }
  
  function productForSell() {
    const recorrerJSON = new Promise((resolve) => {
      setTimeout(() => {
        resolve(showProducts());
      }, 0);
    });
    if(miStockStorage.length != 0){               
      recorrerJSON.then(setTimeout(() => {
        compareStock();
      }, 100));
    }
  }
  
  // ***************************************************************** AGREGAR PRODUCTOS AL CARRITO *****************************************************************

  function addToCart(evento) {
    let total = 0;
    let itemStock = [];
    const units = shoppingCart.reduce((total, productID) => {
      const arrQuantity = listProduct.filter((itemBaseDatos) => {
        if ( itemBaseDatos.id === parseInt(productID)){
          itemStock = itemBaseDatos.quantity;
          return itemStock;
        }
      });

      let isJson = JSON.stringify(arrQuantity);
      let obj = JSON.parse(isJson);
      max = printValues(obj);
      const prefijo = "idcompare";
      const idDOM = prefijo.concat(productID);
      let DOMquantity = document.getElementById(idDOM).textContent;

      if ( max == DOMquantity ) {
        max;
      } else {
        max = Number(max) - Number(DOMquantity);
      }
      if (productID === evento.target.getAttribute('marcador') && total < max) {
        return total += 1;
      }else{
        return total;
      }
    }, 0);
                
    if ( units < max) {
      shoppingCart.push(evento.target.getAttribute('marcador'));
      amountTotal();
      dinamicProduct();
      keepCartInStorage();
    }else{
      dinamicProduct();
    }
  }
  
  // ***************************************************************** CREA LOS ELEMENTOS DEL CARRITO *****************************************************************

  function dinamicProduct() {
    DOMshoppingCart.textContent = '';
    const carritoSinDuplicados = [...new Set(shoppingCart)];
    carritoSinDuplicados.forEach((item) => {
      const myItem = listProduct.filter((itemBaseDatos) => {
        return itemBaseDatos.id === parseInt(item);
       });
            
      let itemStock = [];
      const arrQuantity = listProduct.filter((itemBaseDatos) => {
        if ( itemBaseDatos.id === parseInt(item)){
          itemStock = itemBaseDatos.quantity;
          return itemStock;
        }
      });
      let isJson = JSON.stringify(arrQuantity);
      let obj = JSON.parse(isJson)

      const units = shoppingCart.reduce((total, productID) => {
        if (productID === item && total < printValues(obj)) {
          total ++;
          return total;
        }else{
          return total;
        }
      }, 0);
            
      let totalForProduct = units * myItem[0].price;
            
      const sectionDetail = document.createElement('div');
      sectionDetail.classList.add("div-img");
            
      sectionDetail.innerHTML = `
                          </div class="product-section">
                            <img src="${myItem[0].img}" class="photo-2"  >
                            <div class="cart-detail">
                              <p>${myItem[0].name}</p>
                              <p>$ ${myItem[0].price} p/u</p>
                              <p>${units} unidades</p>
                              <p>Total $ ${totalForProduct}</p>
                            </div>
                          </div>`;
            
      let id = `art-${myItem[0].id}`;
      let encarrito = document.getElementById(id);
      encarrito.textContent = units;

      DOMshoppingCart.appendChild(sectionDetail);
            
    });
  }

  function printValues(obj) {
    for(let k in obj) {
      if(obj[k] instanceof Object) {
        let num = obj[k].quantity;
        return num;
      } else {
        let num = obj[k].quantity;
          return num;
      };
    }
  };
            
// ***************************************************************** LIMPIAR CARRITO *****************************************************************

  function cleanShoppingCart() {
      cleanQuantity();
      refresh();
      setTime();
      amountTotal();
  }

  function cleanQuantity(){
    keepStockInStorage();
    shoppingCart = [];
    DOMitems.textContent = '';
    DOMtotal.textContent = '';
  }
  
  function setTime(){
    new Promise((resolve)=>{
      setTimeout(() =>{
        resolve(productForSell());
      }, 3000);
    });
    new Promise((resolve)=>{
      setTimeout(() =>{
        resolve(dinamicProduct());
      }, 3000);
    });
  }
  function refresh(){
    DOMproducts1.textContent = '';
    DOMproducts2.textContent = '';
    DOMproducts3.textContent = '';
    creatingProducts(dataPartOne, DOMproducts1);
    creatingProducts(dataPartTwo, DOMproducts2);
    creatingProducts(dataPartThree, DOMproducts3);
  }

  DOMbuy.addEventListener('click', () => {  
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(cleanShoppingCart());
      }, 300);
    });
  });
  DOMrestablish.addEventListener('click', () => {  
    cleanQuantity();
    refresh();    
    productForSell();
  });

  
// ***************************************************************** GUARDA EL CARRITO EN EL LOCAL STORAGE *****************************************************************
  function keepCartInStorage () {
    miLocalStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
  }
  function keepStockInStorage () {
      let cloneCarrito = JSON.stringify(shoppingCart);
        miStockStorage.setItem('quantity', cloneCarrito);
        miLocalStorage.removeItem('shoppingCart');
  }

  function keepProductInStorage () {
    if (miLocalStorage.getItem('shoppingCart') !== null) {
      shoppingCart = JSON.parse(miLocalStorage.getItem('shoppingCart'));
    }
  }

  keepProductInStorage();
  productForSell();
  amountTotal();
  dinamicProduct();
}
    
// ****************************************************** FUNCIONES GATILLADAS AL PRESIONAR EL BOTON COMPRAR  *****************************************************
    
let btadd = document.querySelectorAll('.btn-buy');
let buttons = document.getElementsByTagName('button');

  //Asigna distintos mensajes según el proceso de compra en el que se encuentra
  function detailMessage(idMessage){
    switch (idMessage) {
      case 1:
        document.getElementById('detailMessage').textContent = "Realizando Transacción";
        break;
      case 2:
        document.getElementById('detailMessage').textContent = "Compra Exitosa";
        break;
      case 3:
        document.getElementById('detailMessage').textContent = " ";
        break;
    }
  }
  
  //Llama la ejecución de los mensajes
  let prom = new Promise((resolve) => {
    setTimeout(() => {
      resolve(detailMessage(0));
    },0);
  });

  //Asigna los mensajes
  function asigneMessage(){
    prom.then((trax)=>{
      return new Promise((resolve)=>{
        setTimeout(()=>{
          resolve(detailMessage(1), disabledBtn());
        },0);
      });
    }).then((trax)=>{
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(detailMessage(2));
        }, 3000); // Espera 3 segundos para resolver la compra
      });
    }).then((trax)=>{
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(detailMessage(3));
        }, 2000); // Durante 2 segundos muestra el mensaje de compra exitosa, luego borra el mensaje
      });
    });
  }
    
  //llama la función de rehabilitar los botones posterior a realizar la compra
  function activeBtn() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(enabledBtn()); 
      }, 5000); // Espera 5 segundos para rehabilitar (3, Realizando transaccion + 2, Compra exitosa) y limpiar el carrito
    });
  }
  
  //Habilita todos los botones que se encuentran en la página
  function enabledBtn() {
    const buttonActive = Object.keys(buttons);
    buttonActive.forEach((key) => {
      buttons[key].disabled = false;
    });
  }
  
  //Deshabilita todos los botones que se encuentran en la página
  function disabledBtn() {
    const buttonDisabled = Object.keys(buttons);
    buttonDisabled.forEach((key) => {
      buttons[key].disabled = true;
    });
  }
  //Crea los productos en venta, según sección asignada
  function showProducts(){
    creatingProducts(dataPartOne, DOMproducts1);
    creatingProducts(dataPartTwo, DOMproducts2);
    creatingProducts(dataPartThree, DOMproducts3);
  }

  window.addEventListener('DOMContentLoaded', function() {
    document.getElementById('buyingBtn').addEventListener("click", () => {
      disabledBtn();
      activeBtn(); 
      asigneMessage();
    });
  });


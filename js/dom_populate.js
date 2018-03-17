"use strict";
/*Documento para crear las distintas funciones que cargaran datos desde Store */

//initDB();//YA NO ES NECESARIO, la carga se hace con AJAX y JSON
//init();//YA NO ES NECESARIO, la carga se realiza atraves de indexedDB

var Store = StoreHouse.getInstance();
var IdMainCont = document.getElementById("main-cont");
var divShopsMenu = document.getElementById("ShopsMenu");
var divCloseWindow = document.getElementById("closeWindow");
divCloseWindow.appendChild(btnCloseWindows());

function initPopulate()
/*Funcion que inicializa la pagina cargando las tiendas que existen dentro del storehouse. Todo el texto comentado es codigo con DOM... */
{
  clearMainCont();

  var divCab = $('<div></div>',{'id':'cabecera','class':'row'});
  $('#main-cont').append(divCab);
  /*
  var divCab = document.createElement("div");
  divCab.setAttribute("id","cabecera");
  divCab.className = "row";
  IdMainCont.appendChild(divCab);
  */

  var h2Cab =$("<h2></h2>",{id:"titleStore",class:"col-md-12 textCenter"}).text(Store.nombre);
  $(divCab).append(h2Cab);

  /*
  var h2Cab = document.createElement("h2");
  h2Cab.setAttribute("id","titleStore");
  h2Cab.className = "col-md-12 text-center";
  h2Cab.appendChild(document.createTextNode(Store.nombre));
  divCab.appendChild(h2Cab);
  */

  var divSotreMap = $("<div></div>",{id:"StoreMap",class:"maps map_store"});
  $(divCab).append(divSotreMap);
  
  /*
  var divStoreMap = document.createElement("div");
  divStoreMap.setAttribute("id","StoreMap");
  divStoreMap.className = "maps map_store";
  divCab.appendChild(divStoreMap);
  */

  var divTiendas = $("<div></div>",{id:"tiendas",class:"row"});
  $("#main-cont").append(divTiendas);

  /*
  var divTiendas = document.createElement("div");
  divTiendas.setAttribute("id","tiendas");
  divTiendas.className = "row";
  IdMainCont.appendChild(divTiendas);
  */

  var shopsIte = Store.shopIte;
  var shop = shopsIte.next();
  var index = 1;
  while(!shop.done){

    var divTienda = $("<div></div>", {id:"divTienda",class:"col-sm-4 text-center"});
    $(divTiendas).append(divTienda);
    /*
    var divTienda = document.createElement("div");
    divTienda.setAttribute("id","divTienda");
    divTienda.className = "col-sm-4 text-center";
    divTiendas.appendChild(divTienda);
    */
    
    var h3Tienda =$("<h3></h3>",{id:"titleShop"}).text(shop.value.nombre);
    $(divTienda).append(h3Tienda);

    /*
    var h3Tienda = document.createElement("h3");
    h3Tienda.setAttribute("id","titleShop"+index);
    h3Tienda.appendChild(document.createTextNode(shop.value.nombre));
    divTienda.appendChild(h3Tienda);
    */

    var divShopMap = $("<div></div>",{id:shop.value.cif, class: "maps mapShop_mini"});
    $(divTienda).append(divShopMap);

    /*
    var divShopMap = document.createElement("div");
    divShopMap.setAttribute("id",shop.value.cif);
    divShopMap.className = "maps mapShop_mini";
    divTienda.appendChild(divShopMap);
    */
    
    $(divTienda).append(menuCategoryShopPopulate(shop.value));

    //divTienda.appendChild(menuCategoryShopPopulate(shop.value));

    var BtnVerTienda = $("<button></button>",{id:"showShop"+index,class:"btn btn-success"}).text("Ver Tienda");
    $(BtnVerTienda).click(shopPopulate(shop.value));
    $(divTienda).append(BtnVerTienda);
    
    /*
    var BtnVerTienda = document.createElement("button");
    BtnVerTienda.setAttribute("id","showShop"+index);
    BtnVerTienda.className = "btn btn-success";
    BtnVerTienda.appendChild(document.createTextNode("Ver Tienda"));
    divTienda.appendChild(BtnVerTienda);
    BtnVerTienda.addEventListener("click",shopPopulate(shop.value));
    */

    index++;
    shop = shopsIte.next();
  }

  myMap();

}




function shopPopulate(shop)
/*Funcion para mostrar los productos de una tienda una vez se ha seleccionado una tienda en concreto */
{
  var tienda = shop;
  return function(){
    clearMainCont();
    var divCab = $("<div></div>",{id: "cabecera", class: "row"});
    $("#main-cont").append(divCab);

    /* 
    var divCab = document.createElement("div");
    divCab.setAttribute("id","cabecera");
    divCab.className = "row";
    IdMainCont.appendChild(divCab);
    */

    var h2Cab = $("<h2></h2>",{id: "titleStore", class: "col-md-12 text-center"}).text("" + tienda.nombre);
    $(divCab).append(h2Cab);

    /*
    var h2Cab = document.createElement("h2");
    h2Cab.setAttribute("id","titleStore");
    h2Cab.className = "col-md-12 text-center";
    h2Cab.appendChild(document.createTextNode(tienda.nombre));
    divCab.appendChild(h2Cab);
    */

    var divinfoShop = $("<div></div>",{ class: "row"});
    $("#main-cont").append(divinfoShop);

    /*
    var divinfoShop = document.createElement("div");
    divinfoShop.className = "row";
    IdMainCont.appendChild(divinfoShop);
    */

    var divInfoShopMap = $("<div></div>",{class: "col-md-10"});
    $(divinfoShop).append(divInfoShopMap);
    
    /*
    var divInfoShopMap = document.createElement("div");
    divInfoShopMap.className = "col-md-10";
    divinfoShop.appendChild(divInfoShopMap);
    */
    
    var divMapShop = $("<div></div>", {id: shop.cif, class:"maps mapShop_medium"});
    $(divInfoShopMap).append(divMapShop);
    
    /*
    var divMapShop = document.createElement("div");
    divMapShop.className = "maps mapShop_medium";
    divMapShop.setAttribute("id",shop.cif);
    divInfoShopMap.appendChild(divMapShop);
    */

    var divInfoShopText = $("<div></div>",{class:"col-md-2"});
    $(divinfoShop).append(divInfoShopText);

    /*
    var divInfoShopText = document.createElement("div");
    divInfoShopText.className = "col-md-2";
    divinfoShop.appendChild(divInfoShopText);
    */
    
    var infoTienda = $("<p></p>", {class: "infoTienda"}).text("Cif: " + tienda.cif);
    $(divInfoShopText).append(infoTienda);
    
    /*
    var infoTienda = document.createElement("p");
    infoTienda.className = "infoTienda";
    infoTienda.innerHTML = "Cif: "+tienda.cif;
    divInfoShopText.appendChild(infoTienda);
    */
    var infoTienda1 = $("<p></p>", {class: "infoTienda"}).text("Direccion: " + tienda.direccion);
    $(divInfoShopText).append(infoTienda1);

    /*
    var infoTienda1 = document.createElement("p");
    infoTienda1.className = "infoTienda";
    infoTienda1.innerHTML = "Direccion: "+tienda.direccion;
    divInfoShopText.appendChild(infoTienda1);
    */

    var infoTienda2 = $("<p></p>", {class: "infoTienda"}).text("telefono: " + tienda.telefono);
    $(divInfoShopText).append(infoTienda2);
    
    /*
    var infoTienda2 = document.createElement("p");
    infoTienda2.className = "infoTienda";
    infoTienda2.innerHTML = "Telefono: "+tienda.telefono;
    divInfoShopText.appendChild(infoTienda2);
    */
    
    var divProductos = $("<div></div>",{id :"items"});
    $("#main-cont").append(divProductos);
    
    /*
    var divProductos = document.createElement("div");
    divProductos.setAttribute("id","items");
    IdMainCont.appendChild(divProductos);
    */
    var stockShop = tienda.stockIte;
    var item = stockShop.next();
    while(!item.done){
      
      var detPro = $("<div></div>",{class: "col-sm-12 detProd"})
      $(divProductos).append(detPro);
      
      /*
      var detPro = document.createElement("div");
      detPro.className = "col-sm-12 detProd";
      divProductos.appendChild(detPro);
      */
      
      var NomPro = $("<h3></h3>",{class: "cabProd"}).text(item.value.producto.nombre);
      $(detPro).append(NomPro);
      
      /*
      var NomPro = document.createElement("h3");
      NomPro.className = "cabProd";
      NomPro.appendChild(document.createTextNode(item.value.producto.nombre));
      detPro.appendChild(NomPro);
      */
      
      var divImg = $("<div></div>",{class: "col-sm-6 text-center"});
      $(detPro).append(divImg);

      /*
      var divImg = document.createElement("div");
      detPro.appendChild(divImg);
      divImg.className = "col-sm-6 text-center";
      */

      var imgPro = $("<img>",{src:item.value.producto.imagenes,"id": item.value.producto.SN +";"+tienda.cif,class:"imgPro", draggable: true});
      $(divImg).append(imgPro);
      
      /*
      var imgPro = document.createElement("img");
      imgPro.setAttribute("src",item.value.producto.imagenes);
      imgPro.setAttribute("id",item.value.producto.SN +";"+tienda.cif);
      imgPro.setAttribute("draggable","true");
      imgPro.className = "imgPro";
      divImg.appendChild(imgPro);
      */
      
      //Si hay un usuario registrado habilitamos el producto para que se pueda borrar mediante drag&drop
      if(document.cookie){
        document.getElementById(item.value.producto.SN +";"+tienda.cif).addEventListener("dragstart",dragProduct);
      }

      var divInfo = $("<div></div>",{class: "col-sm-6 infoPro divInfo"});
      $(detPro).append(divInfo);

      /*
      var divInfo = document.createElement("div");
      detPro.appendChild(divInfo);
      divInfo.className = "col-sm-6 infoPro";
      */
      
      var InfoProducto = $("<p></p>").html("<b>Nombre: </b>" + item.value.producto.nombre);
      $(divInfo).append(InfoProducto);

      /*
      var InfoProducto = document.createElement("p");
      InfoProducto.innerHTML = "<b>Nombre: </b>" + item.value.producto.nombre;
      divInfo.appendChild(InfoProducto);
      */

      var InfoProducto1 = $("<p></p>").html("<b>Marca: </b>" + item.value.producto.marca);
      $(divInfo).append(InfoProducto1);

      /*
      var InfoProducto1 = document.createElement("p");
      InfoProducto1.innerHTML = "<b>Marca: </b>" + item.value.producto.marca;
      divInfo.appendChild(InfoProducto1);
      */

      var InfoProducto4 = $("<p></p>").html("<b>En Stock: </b>" + item.value.cantidad + " Unidades");
      $(divInfo).append(InfoProducto4);
      
      /*
      var InfoProducto4 = document.createElement("p");
      InfoProducto4.innerHTML = "<b>En Stock: </b>" + item.value.cantidad + " Unidades";
      divInfo.appendChild(InfoProducto4);
      */

      var InfoProducto2 = $("<p></p>").html("<b>Precio + I.V.A: </b>" + item.value.producto.precioConIVA + " €");
      $(divInfo).append(InfoProducto2);

      /*
      var InfoProducto2 = document.createElement("p");
      InfoProducto2.innerHTML = "<b>Precio + I.V.A: </b>" + item.value.producto.precioConIVA + " €";
      divInfo.appendChild(InfoProducto2);
      */

      var InfoProducto3 = $("<p></p>").html("<b>I.V.A (%): </b>" + item.value.producto.IVA + " %");
      $(divInfo).append(InfoProducto3);

      /*
      var InfoProducto3 = document.createElement("p");
      InfoProducto3.innerHTML = "<b>I.V.A (%): </b>" + item.value.producto.IVA + " %";
      divInfo.appendChild(InfoProducto3);
      */
      
      var BtnDetalleProducto = $("<button></button>",{class:"btn btn-default"}).append("Detalles del producto");
      $(divInfo).append(BtnDetalleProducto);
      $(BtnDetalleProducto).click(productShopPopulate(shop,item.value.producto.IdProduct));

      /*
      var BtnDetalleProducto = document.createElement("button");
      BtnDetalleProducto.className = "btn btn-default";
      BtnDetalleProducto.appendChild(document.createTextNode("Detalles del producto"));
      divInfo.appendChild(BtnDetalleProducto);
      BtnDetalleProducto.addEventListener("click",productShopPopulate(shop,item.value.producto.IdProduct));
      */

      var BtnGlobalProducto = $("<button></button>",{class:"btn btn-default"}).append("Producto en todo el ERP");
      $(divInfo).append(BtnGlobalProducto);
      $(BtnGlobalProducto).click(globalProductPopulate(item.value.producto.IdProduct));
      
      /*
      var BtnGlobalProducto = document.createElement("button");
      BtnGlobalProducto.className = "btn btn-default";
      BtnGlobalProducto.appendChild(document.createTextNode("Producto en todo el ERP"));
      divInfo.appendChild(BtnGlobalProducto);
      BtnGlobalProducto.addEventListener("click",globalProductPopulate(item.value.producto.IdProduct));
      */
      
      var BtnVerProducto = $("<button></button>",{class:"btn btn-success"}).append("Ver Producto");
      $(divInfo).append(BtnVerProducto);
      $(BtnVerProducto).click(ProductInWindowFromShop(shop,item.value.producto.IdProduct));
      
      /*
      var BtnVerProducto = document.createElement("button");
      BtnVerProducto.className = "btn btn-success";
      BtnVerProducto.appendChild(document.createTextNode("Ver Producto"));
      divInfo.appendChild(BtnVerProducto);
      BtnVerProducto.addEventListener("click",ProductInWindowFromShop(shop,item.value.producto.IdProduct));
      */

      //Si hay un suario registrado habilitamos el producto para que se pueda borrar mediante drag&drop
      
      if(document.cookie){

        var aux = document.getElementsByClassName("divInfo");
       
        var BtnDropProducto = document.createElement("button");
        BtnDropProducto.className = "btn btn-danger";
        BtnDropProducto.style.marginLeft = "4px";
        var spanIcon = document.createElement("span");
        spanIcon.className = "glyphicon glyphicon-trash";
        BtnDropProducto.appendChild(spanIcon);

        aux[aux.length-1].appendChild(BtnDropProducto);
        BtnDropProducto.addEventListener("dragover",allowDropProduct);
        BtnDropProducto.addEventListener("drop",dropProduct);
      }
      
      item = stockShop.next();
    }

    var divAtras = $("<div></div>",{class: "row text-center"});
    $("#main-cont").append(divAtras);

    /*
    var divAtras = document.createElement("div");
    divAtras.className = "row text-center";
    IdMainCont.appendChild(divAtras);
    */

    var BtnAtras = $("<button></button>",{class: "btn btn-success btn-lg"});
    $(divAtras).append(BtnAtras);
    $(BtnAtras).click(initPopulate).text("Atras");

    var iconGalon = $("<span></span>",{class: "glyphicon glyphicon-chevron-left"});
    $(BtnAtras).append(iconGalon);

    /*
    var BtnAtras = document.createElement("button");
    BtnAtras.className = "btn btn-success btn-lg";
    var iconGalon = document.createElement("span");
    iconGalon.className = "glyphicon glyphicon-chevron-left";
    BtnAtras.appendChild(iconGalon);
    BtnAtras.appendChild(document.createTextNode("Atras"));
    IdMainCont.appendChild(BtnAtras);
    BtnAtras.addEventListener("click",initPopulate);
    */

    myMap();
  };

}




function productShopPopulate(shop,IdPro)
/*Funcion que muestra los detalles de un producto en una tienda una vez se ha seleccionado el producto en dicha tienda*/
{
  var tienda = shop;
  var item = tienda.getProduct(IdPro);
  return function(){
    clearMainCont();

    var divCab = document.createElement("div");
    divCab.setAttribute("id","cabecera");
    divCab.className = "row";
    IdMainCont.appendChild(divCab);

    var h2Cab = document.createElement("h2");
    h2Cab.setAttribute("id","titleStore");
    h2Cab.className = "col-md-12";
    h2Cab.appendChild(document.createTextNode(tienda.nombre));
    divCab.appendChild(h2Cab);

    var infoTienda = document.createElement("p");
    infoTienda.className = "infoTienda";
    infoTienda.innerHTML = "Cif: "+tienda.cif;
    IdMainCont.appendChild(infoTienda);

    var infoTienda1 = document.createElement("p");
    infoTienda1.className = "infoTienda";
    infoTienda1.innerHTML = "Direccion: "+tienda.direccion;
    IdMainCont.appendChild(infoTienda1);

    var infoTienda2 = document.createElement("p");
    infoTienda2.className = "infoTienda";
    infoTienda2.innerHTML = "Telefono: "+tienda.telefono;
    IdMainCont.appendChild(infoTienda2);

    var divProducto = document.createElement("div");
    divProducto.setAttribute("id","items");
    IdMainCont.appendChild(divProducto);

    var detPro = document.createElement("div");
    detPro.className = "col-sm-12 detProd";
    detPro.borderBottom = "1px solid rgba(3, 33, 55, 1)";
    divProducto.appendChild(detPro);
    
    var NomPro = document.createElement("h3");
    NomPro.className = "cabProd";
    NomPro.appendChild(document.createTextNode(item.producto.nombre + " en la tienda \"" + tienda.nombre + "\""));
    detPro.appendChild(NomPro);

    var divImg = document.createElement("div");
    detPro.appendChild(divImg);
    divImg.className = "col-sm-6 text-center";

    var imgPro = document.createElement("img");
    imgPro.className = "imgProDet";
    imgPro.setAttribute("src",item.producto.imagenes);
    divImg.appendChild(imgPro);

    var divInfo = document.createElement("div");
    divInfo.className = "col-sm-6 infoPro";
    detPro.appendChild(divInfo);

    var InfoProducto = document.createElement("p");
    InfoProducto.innerHTML = "<b>Nombre: </b>" + item.producto.nombre;
    divInfo.appendChild(InfoProducto);

    var InfoProducto1 = document.createElement("p");
    InfoProducto1.innerHTML = "<b>Marca: </b>" + item.producto.marca;
    divInfo.appendChild(InfoProducto1);

    var InfoProducto2 = document.createElement("p");
    InfoProducto2.innerHTML = "<b>En Stock: </b>" + item.cantidad + " Unidades";
    divInfo.appendChild(InfoProducto2);

    var InfoProducto3 = document.createElement("p");
    InfoProducto3.innerHTML = "<b>Precio + I.V.A: </b>" + item.producto.precioConIVA + " €";
    divInfo.appendChild(InfoProducto3);

    var InfoProducto4 = document.createElement("p");
    InfoProducto4.innerHTML = "<b>I.V.A (%): </b>" + item.producto.IVA + " %";
    divInfo.appendChild(InfoProducto4);

    var InfoProducto5 = document.createElement("p");
    InfoProducto5.innerHTML = "<b>Descripcion: </b>" + item.producto.descripcion ;
    divInfo.appendChild(InfoProducto5);

    if(item.producto instanceof Movil){
      var InfoProducto6 = document.createElement("p");
      InfoProducto6.innerHTML = "<b>Camara: </b>" + item.producto.camara ;
      divInfo.appendChild(InfoProducto6);

      var InfoProducto7 = document.createElement("p");
      InfoProducto7.innerHTML = "<b>Memoria: </b>" + item.producto.memoria ;
      divInfo.appendChild(InfoProducto7);
    }

    if(item.producto instanceof Ordenador){
      var InfoProducto6 = document.createElement("p");
      InfoProducto6.innerHTML = "<b>CPU: </b>" + item.producto.cpu ;
      divInfo.appendChild(InfoProducto6);

      var InfoProducto7 = document.createElement("p");
      InfoProducto7.innerHTML = "<b>Memoria: </b>" + item.producto.memoria ;
      divInfo.appendChild(InfoProducto7);
    }

    if(item.producto instanceof VideoConsola){
      var InfoProducto6 = document.createElement("p");
      InfoProducto6.innerHTML = "<b>Numero de Jugadores: </b>" + item.producto.numJugadores ;
      divInfo.appendChild(InfoProducto6);

      var InfoProducto7 = document.createElement("p");
      InfoProducto7.innerHTML = "<b>Portatil: </b>" + item.producto.portatil ;
      divInfo.appendChild(InfoProducto7);
    }

    if(item.producto instanceof Camara){
      var InfoProducto6 = document.createElement("p");
      InfoProducto6.innerHTML = "<b>Lente: </b>" + item.producto.lente ;
      divInfo.appendChild(InfoProducto6);

      var InfoProducto7 = document.createElement("p");
      InfoProducto7.innerHTML = "<b>Memoria: </b>" + item.producto.memoria ;
      divInfo.appendChild(InfoProducto7);
    }


    var divAtras = document.createElement("div");
    divAtras.className = "row text-center";
    IdMainCont.appendChild(divAtras);

    var BtnAtras = document.createElement("button");
    BtnAtras.className = "btn btn-success btn-lg";

    var iconGalon = document.createElement("span");
    iconGalon.className = "glyphicon glyphicon-chevron-left";

    BtnAtras.appendChild(iconGalon);
    BtnAtras.appendChild(document.createTextNode("Atras"));
    IdMainCont.appendChild(BtnAtras);


    BtnAtras.addEventListener("click",shopPopulate(tienda));
  }

}





function menuCategoryShopPopulate(shop)
/*Funcion que muestra un menu de categorias de cada tienda */
{
  var menuCategory = document.createElement("ul");
  menuCategory.className = "list-group text-center";
  var catIte = shop.categoryIte;
  var category = catIte.next();
  while(!category.done){
    if(category.value.IdCategory !== 0){//La categoria general no debe aparece en la lista
      var liCategory = document.createElement("li");
      liCategory.className = "list-group-item";
      liCategory.appendChild(document.createTextNode(category.value.titulo));
      menuCategory.appendChild(liCategory);
      liCategory.addEventListener("click",productCategoryShopPopulate(shop,category.value.IdCategory));
    }
    category = catIte.next();
  }
  return menuCategory;
}





function productCategoryShopPopulate(shop,IdCategory)
/*Funcion que muestra los productos de una tienda filtrados por categoria*/
{
  var tienda = shop;
  var IdCategory = IdCategory;
  return function(){
    clearMainCont();
    var divCab = document.createElement("div");
    divCab.setAttribute("id","cabecera");
    divCab.className = "row";
    IdMainCont.appendChild(divCab);

    var h2Cab = document.createElement("h2");
    h2Cab.setAttribute("id","titleStore");
    h2Cab.className = "col-md-12";
    h2Cab.appendChild(document.createTextNode(tienda.nombre));
    divCab.appendChild(h2Cab);

    var infoTienda = document.createElement("p");
    infoTienda.className = "infoTienda";
    infoTienda.innerHTML = "Cif: "+tienda.cif;
    IdMainCont.appendChild(infoTienda);

    var infoTienda1 = document.createElement("p");
    infoTienda1.className = "infoTienda";
    infoTienda1.innerHTML = "Direccion: "+tienda.direccion;
    IdMainCont.appendChild(infoTienda1);

    var infoTienda2 = document.createElement("p");
    infoTienda2.className = "infoTienda";
    infoTienda2.innerHTML = "Telefono: "+tienda.telefono;
    IdMainCont.appendChild(infoTienda2);

    var divProductos = document.createElement("div");
    divProductos.setAttribute("id","items");
    IdMainCont.appendChild(divProductos);

    var stockShop = tienda.categoriesIte(IdCategory);
    var item = stockShop.next();
    while(!item.done){
      
      var detPro = document.createElement("div");
      detPro.className = "col-sm-12 detProd";
      divProductos.appendChild(detPro);
      
      var NomPro = document.createElement("h3");
      NomPro.className = "cabProd";
      NomPro.appendChild(document.createTextNode(item.value.producto.nombre));
      detPro.appendChild(NomPro);

      var divImg = document.createElement("div");
      detPro.appendChild(divImg);
      divImg.className = "col-sm-6 text-center";

      var imgPro = document.createElement("img");
      imgPro.setAttribute("src",item.value.producto.imagenes);
      imgPro.className = "imgPro";
      divImg.appendChild(imgPro);

      var divInfo = document.createElement("div");
      detPro.appendChild(divInfo);
      divInfo.className = "col-sm-6 infoPro";
      divInfo.style.borderLeft = "2px solid rgba(3, 33, 55, 1)";

      var InfoProducto = document.createElement("p");
      InfoProducto.innerHTML = "<b>Nombre: </b>" + item.value.producto.nombre;
      divInfo.appendChild(InfoProducto);

      var InfoProducto1 = document.createElement("p");
      InfoProducto1.innerHTML = "<b>Marca: </b>" + item.value.producto.marca;
      divInfo.appendChild(InfoProducto1);

      var InfoProducto4 = document.createElement("p");
      InfoProducto4.innerHTML = "<b>En Stock: </b>" + item.value.cantidad + " Unidades";
      divInfo.appendChild(InfoProducto4);

      var InfoProducto2 = document.createElement("p");
      InfoProducto2.innerHTML = "<b>Precio + I.V.A: </b>" + item.value.producto.precioConIVA + " €";
      divInfo.appendChild(InfoProducto2);

      var InfoProducto3 = document.createElement("p");
      InfoProducto3.innerHTML = "<b>I.V.A (%): </b>" + item.value.producto.IVA + " %";
      divInfo.appendChild(InfoProducto3);

      var BtnDetalleProducto = document.createElement("button");
      BtnDetalleProducto.className = "btn btn-default";
      BtnDetalleProducto.appendChild(document.createTextNode("Detalles del producto"));
      divInfo.appendChild(BtnDetalleProducto);
      BtnDetalleProducto.addEventListener("click",productShopPopulate(tienda,item.value.producto.IdProduct));

      var BtnGlobalProducto = document.createElement("button");
      BtnGlobalProducto.className = "btn btn-default";
      BtnGlobalProducto.appendChild(document.createTextNode("Producto en todo el ERP"));
      divInfo.appendChild(BtnGlobalProducto);
      BtnGlobalProducto.addEventListener("click",globalProductPopulate(item.value.producto.IdProduct));

      var BtnVerProducto = document.createElement("button");
      BtnVerProducto.className = "btn btn-success";
      BtnVerProducto.appendChild(document.createTextNode("Ver Producto"));
      divInfo.appendChild(BtnVerProducto);
      BtnVerProducto.addEventListener("click",ProductInWindowFromShop(shop,item.value.producto.IdProduct));

      item = stockShop.next();
    }

    var divAtras = document.createElement("div");
    divAtras.className = "row text-center";
    IdMainCont.appendChild(divAtras);

    var BtnAtras = document.createElement("button");
    BtnAtras.className = "btn btn-success";

    var iconGalon = document.createElement("span");
    iconGalon.className = "glyphicon glyphicon-chevron-left";

    BtnAtras.appendChild(iconGalon);
    BtnAtras.appendChild(document.createTextNode("Atras"));
    IdMainCont.appendChild(BtnAtras);


    BtnAtras.addEventListener("click",initPopulate);
  }
}

function menuShopPopulate(){

  var ulShops = document.createElement("ul");
  ulShops.className = "list-group text-center";
  ulShops.style.margin = "10px auto";
  ulShops.style.width = "20%";

  var liCabecera = document.createElement("li");
  liCabecera.className = "list-group-item list-group-item-info active";
  liCabecera.appendChild(document.createTextNode("TIENDAS"));
  liCabecera.addEventListener("click",initPopulate);
  ulShops.appendChild(liCabecera);

  var shopsIte = Store.shopIte;
  var shop = shopsIte.next();
  while(!shop.done){
    var liItem = document.createElement("li");
    liItem.className = "list-group-item list-group-item-info";
    liItem.appendChild(document.createTextNode(shop.value.nombre));
    liItem.addEventListener("click",shopPopulate(shop.value));
    ulShops.appendChild(liItem);
    shop = shopsIte.next();
  }
  return ulShops;
}


function globalProductPopulate(IdProducto)
/*Funcion que muestra un producto seleccionado en todo el ERP */
{
  var IdProducto = IdProducto;

  return function(){
    clearMainCont();
    var item = Store.getGlobalProduct(IdProducto);

    var divCab = document.createElement("div");
    divCab.setAttribute("id","cabecera");
    divCab.className = "row";
    IdMainCont.appendChild(divCab);

    var h2Cab = document.createElement("h2");
    h2Cab.setAttribute("id","titleStore");
    h2Cab.className = "col-md-12";
    h2Cab.appendChild(document.createTextNode(item.producto.nombre + " en el Store House " + Store.nombre));
    divCab.appendChild(h2Cab);

    var divProducto = document.createElement("div");
    divProducto.setAttribute("id","items");
    IdMainCont.appendChild(divProducto);

    var detPro = document.createElement("div");
    detPro.className = "row";
    detPro.borderBottom = "1px solid rgba(3, 33, 55, 1)";
    divProducto.appendChild(detPro);
    
    var divImg = document.createElement("div");
    detPro.appendChild(divImg);
    divImg.className = "col-sm-6 text-center";

    var imgPro = document.createElement("img");
    imgPro.setAttribute("src",item.producto.imagenes);
    imgPro.className = "imgProDet";
    divImg.appendChild(imgPro);

    var divInfo = document.createElement("div");
    divInfo.className = "col-sm-6 infoPro";
    detPro.appendChild(divInfo);
    divInfo.style.borderLeft = "2px solid rgba(3, 33, 55, 1)";

    var InfoProducto = document.createElement("p");
    InfoProducto.innerHTML = "<b>Nombre: </b>" + item.producto.nombre;
    divInfo.appendChild(InfoProducto);

    var InfoProducto1 = document.createElement("p");
    InfoProducto1.innerHTML = "<b>Marca: </b>" + item.producto.marca;
    divInfo.appendChild(InfoProducto1);

    var InfoProducto2 = document.createElement("p");
    InfoProducto2.innerHTML = "<b>En Stock: </b>" + item.cantidad + " Unidades";
    divInfo.appendChild(InfoProducto2);

    var InfoProducto3 = document.createElement("p");
    InfoProducto3.innerHTML = "<b>Precio + I.V.A: </b>" + item.producto.precioConIVA + " €";
    divInfo.appendChild(InfoProducto3);

    var InfoProducto4 = document.createElement("p");
    InfoProducto4.innerHTML = "<b>I.V.A (%): </b>" + item.producto.IVA + " %";
    divInfo.appendChild(InfoProducto4);

    var InfoProducto5 = document.createElement("p");
    InfoProducto5.innerHTML = "<b>Descripcion: </b>" + item.producto.descripcion ;
    divInfo.appendChild(InfoProducto5);

    if(item.producto instanceof Movil){
      var InfoProducto6 = document.createElement("p");
      InfoProducto6.innerHTML = "<b>Camara: </b>" + item.producto.camara ;
      divInfo.appendChild(InfoProducto6);

      var InfoProducto7 = document.createElement("p");
      InfoProducto7.innerHTML = "<b>Memoria: </b>" + item.producto.memoria ;
      divInfo.appendChild(InfoProducto7);
    }

    if(item.producto instanceof Ordenador){
      var InfoProducto6 = document.createElement("p");
      InfoProducto6.innerHTML = "<b>CPU: </b>" + item.producto.cpu ;
      divInfo.appendChild(InfoProducto6);

      var InfoProducto7 = document.createElement("p");
      InfoProducto7.innerHTML = "<b>Memoria: </b>" + item.producto.memoria ;
      divInfo.appendChild(InfoProducto7);
    }

    if(item.producto instanceof VideoConsola){
      var InfoProducto6 = document.createElement("p");
      InfoProducto6.innerHTML = "<b>Numero de Jugadores: </b>" + item.producto.numJugadores ;
      divInfo.appendChild(InfoProducto6);

      var InfoProducto7 = document.createElement("p");
      InfoProducto7.innerHTML = "<b>Portatil: </b>" + item.producto.portatil ;
      divInfo.appendChild(InfoProducto7);
    }

    if(item.producto instanceof Camara){
      var InfoProducto6 = document.createElement("p");
      InfoProducto6.innerHTML = "<b>Lente: </b>" + item.producto.lente ;
      divInfo.appendChild(InfoProducto6);

      var InfoProducto7 = document.createElement("p");
      InfoProducto7.innerHTML = "<b>Memoria: </b>" + item.producto.memoria ;
      divInfo.appendChild(InfoProducto7);
    }


    var divAtras = document.createElement("div");
    divAtras.className = "row text-center";
    IdMainCont.appendChild(divAtras);

    var BtnAtras = document.createElement("button");
    BtnAtras.className = "btn btn-success";

    var iconGalon = document.createElement("span");
    iconGalon.className = "glyphicon glyphicon-chevron-left";

    BtnAtras.appendChild(iconGalon);
    BtnAtras.appendChild(document.createTextNode("Atras"));
    IdMainCont.appendChild(BtnAtras);

    BtnAtras.addEventListener("click",initPopulate);
  }
}

function clearMainCont()
/*Funcion para limpiar el contenido de la division con id main-cont */
{
  var allChilds = IdMainCont.children;
  while(allChilds.length > 0) {
    IdMainCont.removeChild(allChilds[0]);
  }
}

window.setTimeout(function(){
  initPopulate();
  divShopsMenu.appendChild(menuShopPopulate());
  window.clearTimeout();
},200);



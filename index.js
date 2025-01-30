//SEARCH SECTION// 
const search_section=document.getElementById("search-section");
let search_visible=false;
function showSearchSection(){
    document.getElementById("title-buttons-section").style.display="none";
    document.getElementById("option-menu-section").style.display="none";
    search_section.style.display="flex";
    search_section.style.position="sticky";
    header.style.zIndex="10";
    //search_section.style.top="0";
    document.querySelector("main").classList.add("disabled");
    document.querySelector("body").style.overflow="hidden";
    search_visible=true;
}
function closeSearchSection(){
    search_section.style.display="none";
    document.getElementById("title-buttons-section").style.display="flex";
    document.getElementById("option-menu-section").style.display="flex";
    document.querySelector("main").classList.remove("disabled");
    document.querySelector("body").style.overflow="auto";
    document.querySelector("section.search-section form").reset();
    search_visible=false;
}
const search_button=document.getElementById("search-button");
search_button.addEventListener('click', function(event){
    showSearchSection();
    event.stopPropagation();
});
const close_button=document.getElementById("close-button");
close_button.addEventListener('click', function(event){
    closeSearchSection();
    event.stopPropagation();
})

// RISE LABEL WHEN FOCUSING ON SEARCH BAR INPUT
const search_bar_input=document.querySelector('input[name="search"]');
search_bar_input.addEventListener('focus', ()=>{
    const search_label=document.querySelector('label[for="search"]');
    search_label.style.fontSize="10px";
    search_label.style.bottom="1rem";
})
search_bar_input.addEventListener('blur', ()=>{
    const search_label=document.querySelector('label[for="search"]');
    search_label.style.fontSize="1rem";
    search_label.style.bottom="0";
})

//NAV MENU//
let dropdown_visible=false;
const button_links=Array.from(document.querySelectorAll('ul.navbar a[role="button"]'));
const all_dropdowns=document.querySelectorAll("ul.dropdown-content");
button_links.forEach(link=>{
    if(link.querySelector('ion-icon')){
        link.addEventListener('click', showHideDropdown)
    }
    else{
        const subcategory=link.textContent.toLowerCase();
        const category=subcategory;
        const url=`${link.getAttribute('href')}?category=${category}&subcategory=${subcategory}`;
        link.href=url;
    }
});

function showHideDropdown(){ 
    event.preventDefault();
    const link=event.target;
    const arrow=link.querySelector("ion-icon");
    const dropdown_content=(link.closest("li")).querySelector("ul.dropdown-content");
    dropdown_content.classList.toggle("dropdown-content-visible");
    if(dropdown_content.classList.contains("dropdown-content-visible")){
        arrow.style.rotate="180deg";
        dropdown_visible=true;
        all_dropdowns.forEach(dropdown=>{
            if(dropdown!==dropdown_content && dropdown.classList.contains("dropdown-content-visible")){
                dropdown.classList.toggle("dropdown-content-visible");
                const dropdown_arrow=(dropdown.closest("li")).querySelector("ion-icon");
                dropdown_arrow.style.rotate="360deg";
            }
        })
    }
    else{
        arrow.style.rotate="360deg";
        dropdown_visible=false;
    }
}

window.addEventListener('click', function(event){
    // CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
    if(dropdown_visible===true && !button_links.includes(event.target)){
        
        all_dropdowns.forEach(dropdown=>{
            if(dropdown.classList.contains("dropdown-content-visible")){
                dropdown.classList.toggle("dropdown-content-visible");
                const arrow=(dropdown.closest("li")).querySelector("ion-icon");
                arrow.style.rotate="360deg";
            }
        })
    }
    // CLOSE SEARCH SECTION WHEN CLICKING OUTSIDE
    if(event.target!==search_section && event.target!==search_button && !search_section.contains(event.target) && search_visible===true){
        closeSearchSection();
    }
});

// HIDE HEADER WHEN SCROLLING DOWN
const header=document.querySelector('header');
let lastScroll=0;
window.addEventListener('scroll', function(){
    let currentScroll=window.pageYOffset||document.documentElement.scrollTop;
    if(currentScroll>lastScroll && currentScroll<=190){
        header.style.position="static";
    }
    else if(currentScroll>lastScroll && currentScroll>190){
        header.classList.add("hidden");
    }
    else{
        header.classList.remove("hidden");
        header.style.position="sticky";
    }
    lastScroll = currentScroll;
    
})

//SHOW SHOPPING CART
let visibleCart=false;
function showShoppingCart(){
    let totalPrice=0;
    const shopping_cart_container=document.getElementById("shopping-cart-container");
    const shopping_cart_summary=document.getElementById("shopping-cart-summary");
    shopping_cart_summary.innerHTML=``;
    const shopping_cart=JSON.parse(localStorage.getItem('cart'))||[];
    const shopping_cart_header=document.getElementById("shopping-cart-header");
    
    if(shopping_cart.length<1){
        shopping_cart_header.innerHTML=`
        <b>Tu carrito está vacío</b>
        <a href="./index.html"><button class="black-button">Seguir comprando</button></a>`;
        shopping_cart_summary.innerHTML+=`
        <b>¿Tienes una cuenta?</b>
        <p><a href="#">Inicia sesión</a> para finalizar tus compras con mayor rapidez</p>
        `;
        
    }
    else{
        const table=document.createElement('table');
        table.className="products-table";
        table.innerHTML+=`
        <tr>
            <th>preview</th>
            <th>producto</th>
            <th>precio</th>
            <th>cantidad</th>
        </tr>`;
        shopping_cart.forEach(({id, nombre, precio, cantidad, img})=>{
            table.innerHTML+=`
            <tr>
                <td><img src="${img}" width="80%"></td>
                <td>${nombre}</td>
                <td>$${precio}</td>
                <td>x${cantidad}</td>
                <td><button class="" onclick="quitarDelshopping_cart('${id}')">&#8722</button></td>
                
            </tr>`;
            totalPrice+=(precio*cantidad);
        });
        shopping_cart_summary.appendChild(table);
        shopping_cart_summary.innerHTML+=`
        <p><b>monto total: $${totalPrice}</b></p>
        <div class="shopping_cart-buttons">
            <button class="" onclick="">Limpiar</button>
            <button class="" onclick="closeShoppingCart()">Cerrar</button>
        </div>
        `;
    }
    shopping_cart_container.style.width="24rem";
    shopping_cart_container.appendChild(shopping_cart_summary);
    document.querySelector('section.body-overlay').style.display="inline";
    document.querySelector("body").style.overflow="hidden";
    visibleCart=true;
}
function closeShoppingCart(){
    const shopping_cart_container=document.getElementById("shopping-cart-container");
    shopping_cart_container.style.width="0";
    document.querySelector('section.body-overlay').style.display="none";
    document.querySelector("body").style.overflow="auto";
    visibleCart=false;
}
const shopping_cart_button=document.getElementById("shopping-cart-button");
shopping_cart_button.addEventListener('click', function(){
    if(visibleCart){
        closeShoppingCart();
    }
    else{
        showShoppingCart();
    }
})

//BODY

const current_discount=15;

//GET PRODUCTS FROM JSON
document.addEventListener('DOMContentLoaded', async function(){
        const response=await fetch("/productos.json");
        const json= await response.json();
        //DISPLAY PRODUCTS CARDS ON HOME PAGE
        if(document.getElementById("previews-home-container")){
            showFourProducts(json.calzado,"botas", "four-cards-container1");
            showFourProducts(json.aros, "plata", "four-cards-container2");
        }
        const params= new URLSearchParams(window.location.search);
        const category=params.get('category');
        const subcategory=params.get('subcategory');
        if(category&&subcategory){
            showProducts(subcategory,json[category]);
        }
})
const dropdown_links=Array.from(document.querySelectorAll('ul.dropdown-content a'));
dropdown_links.forEach(link => link.addEventListener('click', function(e){
    //e.preventDefault();
    const subcategory=link.textContent.split(" ")[0].toLowerCase();
    const category=link.closest('ul.dropdown-content').previousElementSibling.textContent.toLowerCase();
    const url=`${link.getAttribute('href')}?category=${category}&subcategory=${subcategory}`;
    link.href=url;
    //window.location.href=url;
}));
const shortcuts_links=Array.from(document.querySelectorAll('div.shortcut-card a'));
shortcuts_links.forEach(link=> link.addEventListener('click', function(e){
    const product=link.nextElementSibling.textContent;
    if(product==="botas"){
        const subcategory="botas";
        const category="calzado";
        const url=`${link.getAttribute('href')}?category=${category}&subcategory=${subcategory}`;
        link.href=url;
    }
    else if(product==="calzado"){
        const subcategory="todos";
        const category="calzado";
        const url=`${link.getAttribute('href')}?category=${category}&subcategory=${subcategory}`;
        link.href=url;
    }
    else if(product.includes("aros")){
        const subcategory=product.split(" ").pop();
        const category="aros";
        const url=`${link.getAttribute('href')}?category=${category}&subcategory=${subcategory}`;
        link.href=url;
    }
    else if(product==="carteras"){
        const subcategory="carteras";
        const category="carteras";
        const url=`${link.getAttribute('href')}?category=${category}&subcategory=${subcategory}`;
        link.href=url;
    }
    else{
        const subcategory="accesorios";
        const category="accesorios";
        const url=`${link.getAttribute('href')}?category=${category}&subcategory=${subcategory}`;
        link.href=url;
    }
    
}))

//PRODUCTS DISPLAY

//CREATE PRODUCT CARD
function createProductCard(product){
    const discounted_price=product.price-((product.price*current_discount)/100);
    const product_card=document.createElement('div');
    product_card.innerHTML=`
    <img src="../${product.img[0]}" alt="" height="100%">
    <div class="product-data">
        <div class="name-price">
            <p>${product.name}</p>
            <div class="prices"><s>$${product.price}</s><p>$${discounted_price}</p></div>
        </div>
        <button class="icon-button buy-button" id="buy-button"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/></svg></button>
    </div>
    `;
    product_card.className="product-card";
    //CHANGE PICTURE WHEN HOVERING OVER PRODUCT CARD
    product_card.addEventListener('mouseover', function(event){
        const card=event.target;
        if(product.img.length>1){
            card.src=`../${product.img[1]}`;
        }
    });
    product_card.addEventListener('mouseout', function(event){
        const card=event.target;
        if(product.img.length>1){
            card.src=`../${product.img[0]}`;
        }
    })
    return product_card;
}

//DISPLAY OF FOUR PRODUCTS CARDS ON THE HOME PAGE
function showFourProducts(data, category, section){
    const card_section=document.getElementById(section);
    const products_in_category=data.filter(product=>product.category===category);
    (products_in_category.slice(0,4)).forEach(product=> {
        const product_card=createProductCard(product);
        card_section.appendChild(product_card);
    })
}

//DISPLAY OF PRODUCTS CARDS ON THE PRODUCTS PAGES
function showProducts(subcategory, products){
    const products_section=document.getElementById(subcategory+"-section");
    products_section.querySelector('h2').textContent=subcategory.toLowerCase();
    const products_cards_conatiner=products_section.querySelector('section.products-cards-conatiner');
    if(subcategory==="todos"){
        products.forEach(product=>{
            const product_card=createProductCard(product);
            products_cards_conatiner.appendChild(product_card);
        })
    }
    else{
        products.forEach(product=>{
            if(product.category===subcategory){
                const product_card=createProductCard(product);
                products_cards_conatiner.appendChild(product_card);
            }
        })
    }
}

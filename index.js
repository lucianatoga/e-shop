//SEARCH SECTION// 
const search_section=document.getElementById("search-section");
let search_visible=false;
function showSearchSection(){
    document.getElementById("title-buttons-section").style.display="none";
    document.getElementById("option-menu-section").style.display="none";
    search_section.style.display="flex";
    search_section.style.position="sticky";
    header.style.zIndex="10";
    document.querySelector("main").classList.add("disabled");
    document.querySelector("body").style.overflow="hidden";
    search_visible=true;
}
function closeSearchSection(){
    search_section.style.display="none";
    document.getElementById("title-buttons-section").style.display="flex";
    if(menuVisible){
        document.getElementById("option-menu-section").style.display="flex";
    }
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
    if(event.target===document.querySelector("section.body-overlay")){
        closeShoppingCart();
    }
});

//SHOW MENU WHEN CLICKING MENU BUTTON FOR LESS THAN 700PX SCREEN
let menuVisible=true;
const expand_menu_button=document.getElementById("expand-menu-button");
const option_menu_section=document.getElementById("option-menu-section");
const ulist_navbar=document.querySelector("ul.ulist");
expand_menu_button.addEventListener('click', function(){
    if(option_menu_section.style.display==="none"){
        option_menu_section.style.display="inline";
        menuVisible=true;
    }
    else{
        option_menu_section.style.display="none";
        menuVisible=false;
    }
})

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
    const shopping_cart_footer=document.getElementById("shopping-cart-footer");
    if(shopping_cart.length<1){
        shopping_cart_header.innerHTML=`
        <b>Tu carrito está vacío</b>
        <a href="../index.html"><button class="black-button">Seguir comprando</button></a>`;
        shopping_cart_summary.innerHTML+=`
        <b>¿Tienes una cuenta?</b>
        <p><a href="#">Inicia sesión</a> para finalizar tus compras con mayor rapidez</p>
        `;
        shopping_cart_footer.innerHTML=``;
    }
    else{
        shopping_cart_header.innerHTML=`
        <h2>Tu carrito</h2>`;
        const table=document.createElement('table');
        table.className="products-table";
        table.innerHTML+=`
        <tr>
            <th>PRODUCTO</th>
            <th></th>
            <th>TOTAL</th>
        </tr>`;
        shopping_cart.forEach((product)=>{
            table.innerHTML+=`
            <tr>
                <td><img src=".${product.img[0]}" width="80%"></td>
                <td><div class="td-data">
                    <b>${product.name}</b> 
                    <p>$${product.price} u</p>
                    <div class="qty-input-bin-button">
                        <div class="qty-input">
                            <button onclick="decreaseProdQty(${product.id})">&#8722</button>
                            <input type="number" value="${product.qty}">
                            <button onclick="increaseProdQty(${product.id})"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/></svg></button>
                        </div>
                        <button id="bin-button" onclick="removeFromCart(${product.id})"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16"><path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                        </svg></button>
                    </div>
                </div></td>
                <td>$${product.price*product.qty}</td>
            </tr>`;
            totalPrice+=(product.price*product.qty);
        });
        shopping_cart_summary.appendChild(table);
        shopping_cart_summary.innerHTML+=`
        <div class="order-notes">
            <a href="#" role="button">Instrucciones especiales del pedido<ion-icon name="chevron-down-outline"></ion-icon></a>
            <textarea rows="4" cols="35" class="notes-textarea"></textarea>
        </div>`;
        const notes_link=shopping_cart_summary.querySelector("a");
        notes_link.addEventListener('click', function(){
            notes_link.querySelector("ion-icon").classList.toggle("ion-icon-rotate")
            notes_link.nextElementSibling.classList.toggle("notes-textarea-visible");
        })
        shopping_cart_footer.innerHTML=`
        <p><b>Subtotal</b> $${totalPrice} UYU</p>
        <button class="black-button">Pagar pedido</button>
        `;
    }
    shopping_cart_container.style.display="flex";
    shopping_cart_container.style.width="24rem";
    document.querySelector('section.body-overlay').style.display="block";
    document.querySelector('section.body-overlay').style.top=`${window.pageYOffset||document.documentElement.scrollTop}px`;
    document.querySelector("body").style.overflow="hidden";
    visibleCart=true;
}
function closeShoppingCart(){
    const shopping_cart_container=document.getElementById("shopping-cart-container");
    shopping_cart_container.style.display="none";
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

//ADD PRODUCTS TO SHOPPING CART
function countProducts(){
    let counter=0;
    const shopping_cart=JSON.parse(localStorage.getItem('cart'))||[];
    shopping_cart.length===0 ? counter=0 : shopping_cart.forEach(product=>counter+=product.qty);
    const counter_html=document.getElementById("counter");
    counter_html.innerHTML=`${counter}`;
}
countProducts();

function addToCart(product_selected){
    const shopping_cart=JSON.parse(localStorage.getItem('cart'))||[];
    const existing_product=shopping_cart.find((product)=>product.id==product_selected.id);
    existing_product ? existing_product.qty++ : shopping_cart.push({...product_selected, qty:1});
    localStorage.setItem('cart', JSON.stringify(shopping_cart));
    if(visibleCart){
        showShoppingCart();
    }
    countProducts()
}
function removeFromCart(id){
    const shopping_cart=JSON.parse(localStorage.getItem('cart'))||[];
    const existing_product=shopping_cart.find((product)=>product.id==id);
    shopping_cart.splice(shopping_cart.indexOf(existing_product),1);
    localStorage.setItem('cart', JSON.stringify(shopping_cart));
    showShoppingCart();
    countProducts();
}
function decreaseProdQty(id){
    const shopping_cart=JSON.parse(localStorage.getItem('cart'))||[];
    const existing_product=shopping_cart.find((product)=>product.id==id);
    existing_product.qty>1 ? existing_product.qty-- : shopping_cart.splice(shopping_cart.indexOf(existing_product),1);
    localStorage.setItem('cart', JSON.stringify(shopping_cart));
    showShoppingCart();
    countProducts();
}
function increaseProdQty(id){
    const shopping_cart=JSON.parse(localStorage.getItem('cart'))||[];
    const existing_product=shopping_cart.find((product)=>product.id==id);
    existing_product.qty++ ;
    localStorage.setItem('cart', JSON.stringify(shopping_cart));
    showShoppingCart();
    countProducts();
}


//BODY

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
    else{
        const subcategory=product;
        const category=product;
        const url=`${link.getAttribute('href')}?category=${category}&subcategory=${subcategory}`;
        link.href=url;
    }
    
}))

//PRODUCTS DISPLAY

//CREATE PRODUCT CARD
function createProductCard(product){
    const product_card=document.createElement('div');
    product_card.innerHTML=`
    <img src="../${product.img[0]}" alt="" height="100%">
    <div class="product-data">
        <div class="name-price">
            <p>${product.name}</p>
            <div class="prices"><p>$${product.price}</p></div>
        </div>
        <button class="icon-button add-button" id="add-button"><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/></svg></button>
    </div>
    `;
    product_card.className="product-card";
    product_card.querySelector("button.add-button").addEventListener("click", function(){addToCart(product)});
    //CHANGE PICTURE WHEN HOVERING OVER PRODUCT CARD
    product_card.addEventListener('mouseover', function(event){
        const card=event.target;
        if(product.img.length>1){
            card.src=`.${product.img[1]}`;
        }
    });
    product_card.addEventListener('mouseout', function(event){
        const card=event.target;
        if(product.img.length>1){
            card.src=`.${product.img[0]}`;
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
let i=1;
document.querySelectorAll("div.footer-card").forEach(card=>{
    card.id="footer-card"+i;
    i++;
})


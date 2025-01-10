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
button_links.forEach(link=>link.addEventListener('click', showHideDropdown));

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

// HIDE HEADER WHEN SCROLLING UP
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

//BODY

const current_discount=15;
//const products_section=document.querySelector("products-section");
//GET PRODUCTS FROM JSON

document.addEventListener('DOMContentLoaded', async function(){
        const response=await fetch("/productos.json");
        const json= await response.json();
        //DISPLAY PRODUCTS CARDS ON HOME PAGE
        if(document.getElementById("previews-home-container")){
            showFourProducts(json.calzado,"botas", "four-cards-container1");
            showFourProducts(json.aros, "plata", "four-cards-container2");
        }
        // if(document.querySelector("section.products-section")){
        //     //console.log(document.title);
        //     const subcategory=document.title;
        //     const category="calzado";
        //     showProducts(subcategory,json[category]);
        // }
        
        const params= new URLSearchParams(window.location.search);
        const category=params.get('category');
        const subcategory=params.get('subcategory');
        if(category&&subcategory){
            //console.log(category, subcategory);
            showProducts(subcategory,json[category]);
        }
})
const dropdown_links=Array.from(document.querySelectorAll('ul.dropdown-content a'));
        dropdown_links.forEach(link => link.addEventListener('click', function(e){
            //e.preventDefault();
            const subcategory=link.textContent.split(" ")[0].toLowerCase();
            const category=link.closest('ul.dropdown-content').previousElementSibling.textContent.toLowerCase();
            const url=`${link.getAttribute('href')}?category=${category}&subcategory=${subcategory}`;
            //console.log(url);
            link.href=url;
            //window.location.href=url;
        }));
function showFourProducts(data, category, section){
    const card_section=document.getElementById(section);
    const products_in_category=data.filter(product=>product.category===category);
    (products_in_category.slice(0,4)).forEach(product=> {
        const discounted_price=product.price-((product.price*current_discount)/100);
        const product_card=document.createElement('div');
        product_card.innerHTML=`
        <img src="${product.img[0]}" alt="" height="100%">
        <p>${product.name}</p>
        <div class="prices"><s>$${product.price}</s><p>$${discounted_price}</p></div>
        `;
        product_card.className="product-card";
        //CHANGE PICTURE WHEN HOVERING OVER PRODUCT CARD
        product_card.addEventListener('mouseover', function(event){
            const card=event.target;
            if(product.img.length>1){
                card.src=product.img[1];
            }
        });
        product_card.addEventListener('mouseout', function(event){
            const card=event.target;
            if(product.img.length>1){
                card.src=product.img[0];
            }
        });
        card_section.appendChild(product_card);
    })
}

//PRODUCTS PAGES

function showProducts(subcategory, products){
    const products_section=document.getElementById(subcategory+"-section");
    products_section.querySelector('h2').textContent=subcategory.toUpperCase();
    const products_cards_conatiner=products_section.querySelector('section.products-cards-conatiner');
    //console.log(products_section);
    if(subcategory==="todos"){
        products.forEach(product=>{
            const discounted_price=product.price-((product.price*current_discount)/100);
            const product_card=document.createElement('div');
            product_card.innerHTML=`
            <img src="../${product.img[0]}" alt="" height="100%">
            <p>${product.name}</p>
            <div class="prices"><s>$${product.price}</s><p>$${discounted_price}</p></div>
            `;
            product_card.className="product-card";
            products_cards_conatiner.appendChild(product_card);
        })
    }
    else{
        products.forEach(product=>{
            if(product.category===subcategory){
                const discounted_price=product.price-((product.price*current_discount)/100);
                const product_card=document.createElement('div');
                product_card.innerHTML=`
                <img src="../${product.img[0]}" alt="" height="100%">
                <p>${product.name}</p>
                <div class="prices"><s>$${product.price}</s><p>$${discounted_price}</p></div>
                `;
                product_card.className="product-card";
                products_cards_conatiner.appendChild(product_card);
            }
        })
    }
}
//add products to json
//show products in all pages
//add the hover over functionalities
//add responsiveness
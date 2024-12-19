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
const links=Array.from(document.querySelectorAll("ul.navbar a"));
const all_dropdowns=document.querySelectorAll("ul.dropdown-content");
links.forEach(link=>link.addEventListener('click', showHideDropdown));

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
    if(dropdown_visible===true && !links.includes(event.target)){
        
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

//DISPLAY PRODUCTS CARDS
const calzado_section=document.getElementById("calzado-cards-container");

//CHANGE PICTURE WHEN HOVERING OVER PRODUCT CARD

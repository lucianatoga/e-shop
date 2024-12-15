//SEARCH SECTION//
const search_section=document.getElementById("search-section");
function showSearchSection(){
    document.getElementById("title-buttons-section").style.display="none";
    document.getElementById("option-menu-section").style.display="none";
    search_section.style.display="flex";
    search_section.style.position="absolute";
    search_section.style.top="0";
    document.querySelector("main").classList.add("disabled");
    document.querySelector("body").style.overflow="hidden";
}
function closeSearchSection(){
    search_section.style.display="none";
    document.getElementById("title-buttons-section").style.display="flex";
    document.getElementById("option-menu-section").style.display="flex";
    document.querySelector("main").classList.remove("disabled");
    document.querySelector("body").style.overflow="auto";
    document.querySelector("section.search-section form").reset();
}
const search_button=document.getElementById("search-button");
search_button.addEventListener('click', showSearchSection);
const close_button=document.getElementById("close-button");
close_button.addEventListener('click', closeSearchSection)

const search_bar_input=document.querySelector('input[name="search"]');
search_bar_input.addEventListener('focus', ()=>{
    const search_label=document.querySelector('label[for="search"]');
    search_label.style.fontSize="10px";
    search_label.style.top="3.1rem";
})
search_bar_input.addEventListener('blur', ()=>{
    const search_label=document.querySelector('label[for="search"]');
    search_label.style.fontSize="1rem";
    search_label.style.top="3.8rem";
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
    if(dropdown_visible===true && !links.includes(event.target)){
        
        all_dropdowns.forEach(dropdown=>{
            if(dropdown.classList.contains("dropdown-content-visible")){
                dropdown.classList.toggle("dropdown-content-visible");
                const arrow=(dropdown.closest("li")).querySelector("ion-icon");
                arrow.style.rotate="360deg";
            }
        })
            
    }
})

//HOVER OVER BUTTONS
// const simple_buttons=document.querySelectorAll("button.simple-button");
// simple_buttons.forEach(button=>button.addEventListener('mousemove', function(event){
//     const button=event.target;
//     button.style.width=button.width+"2px";
//     button.style.height=button.height+"2px";
// }))
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
}
const search_button=document.getElementById("search-button");
search_button.addEventListener('click', showSearchSection);
const close_button=document.getElementById("close-button");
close_button.addEventListener('click', closeSearchSection)

const search_bar_input=document.querySelector('input[name="search"]');
search_bar_input.addEventListener('focus', ()=>{
    const search_label=document.querySelector('label[for="search"]');
    search_label.style.fontSize="10px";
    search_label.style.top="3.5rem";
})
search_bar_input.addEventListener('blur', ()=>{
    const search_label=document.querySelector('label[for="search"]');
    search_label.style.fontSize="1rem";
    search_label.style.top="3.8rem";
})

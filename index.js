const search_section=document.getElementById("search-section");

const search_button=document.getElementById("search-button");
search_button.addEventListener('click', ()=>{
    search_section.style.display="flex";
    search_section.style.position="absolute";
    search_section.style.top="5rem";
    search_section.style.zIndex="100"

})
const close_button=document.getElementById("close-button");
close_button.addEventListener('click', ()=>{
    search_section.style.display="none";
})

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

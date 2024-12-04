const search_button=document.getElementById("search-button");
search_button.addEventListener('click', ()=>{
    const search_section=document.getElementById("search-section");
    search_section.style.display="flex";
    search_section.style.position="absolute";
    search_section.style.top="6rem";
    search_section.style.zIndex="100"

})
const close_button=document.getElementById("close-button");
close_button.addEventListener('click', ()=>{
    const search_section=document.getElementById("search-section");
    search_section.style.display="none";
})
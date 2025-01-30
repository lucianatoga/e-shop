function createProductCard(product){
    //const products_cards_conatiner=products_section.querySelector('section.products-cards-conatiner');
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
    //products_cards_conatiner.appendChild(product_card);
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
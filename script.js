function onLoad(){
    onProductsResize();
    window.addEventListener("resize", onProductsResize);
}
function onProductsResize(){
    let products=document.getElementsByClassName("products-container").item(0);
    let productsRowWidth=parseInt(products.clientWidth*0.8/150);
    if(productsRowWidth===0)
        productsRowWidth=1;
    products.style.gridTemplateColumns="repeat("+productsRowWidth.toString()+",1fr)"
}
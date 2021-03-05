let productsCategoriesFile = "[{\"name\":\"Бытовая техника\",\"id\":\"appliances\",\"products\":[{\"name\":\"Электрическая плита Electrolux EKI954901W белый\",\"id\":\"ElectricStoveElectroluxEKI954901WWhite\",\"cost\":63399},{\"name\":\"Холодильник многодверный Hitachi R-M702 GPU2 GS серебристый\",\"id\":\"RefrigeratorMulti-doorHitachiR-M702GPU2GSSilver\",\"cost\":364999},{\"name\":\"Микроволновая печь LG MH6336GIB черный\",\"id\":\"MicrowaveOvenLGMH6336GIBBlack\",\"cost\":9899},{\"name\":\"Стиральная машина Kuppersbusch WA 1940.0 R\",\"id\":\"WashingMachineKuppersbuschWA1940.0R\",\"cost\":359499}]},{\"name\":\"Смартфоны и гаджеты\",\"id\":\"smartphonesAndGadgets\",\"products\":[]},{\"name\":\"ТВ и развлечения\",\"id\":\"tvAndEntertainment\",\"products\":[]},{\"name\":\"Компьютеры\",\"id\":\"computers\",\"products\":[]},{\"name\":\"Офис и сеть\",\"id\":\"officeAndNetwork\",\"products\":[]},{\"name\":\"Аксессуары\",\"id\":\"accessories\",\"products\":[]},{\"name\":\"Ремонт и декор\",\"id\":\"renovationAndDecor\",\"products\":[]},{\"name\":\"Инструменты\",\"id\":\"instruments\",\"products\":[]}]";
let productsCategories = JSON.parse(productsCategoriesFile);
let theme = "light";
let themes = [
    new Map([
        ["color", "black"],
        ["background-color", "white"],
        ["first-header-line-background-color", "darkgreen"],
        ["shop-path-shadow", "0px 5px 5px -5px rgba(0, 0, 0, 0.6) inset"],
        ["second-line-background-color", "orange"]
    ]),
    new Map([
        ["color", "white"],
        ["background-color", "#1f1f1f"],
        ["first-header-line-background-color", "#004212"],
        ["shop-path-shadow", "0px 5px 5px -5px rgba(255, 255, 255, 0.6) inset"],
        ["second-line-background-color", "#8b5a00"]
    ])
];
let themesParameters = [
    ["id", "first-line", "backgroundColor", "first-header-line-background-color"],
    ["id", "second-line", "backgroundColor", "second-line-background-color"],
    ["id", "third-line", "backgroundColor", "background-color"],
    ["id", "third-line", "color", "color"],
    ["id", "product-buy-button", "backgroundColor", "second-line-background-color"],
    ["id", "product-buy-button", "color", "color"],
    ["id", "product-name", "backgroundColor", "background-color"],
    ["id", "product-name", "color", "color"],
    ["class", "shop-path", "color", "color"],
    ["class", "shop-path", "backgroundColor", "background-color"],
    ["class", "shop-path", "boxShadow", "shop-path-shadow"],
    ["tag", "main", "backgroundColor", "background-color"],
    ["tag", "main", "color", "color"],
    ["class", "product-category-wrapper", "color", "color"],
    ["class", "product-category-wrapper", "backgroundColor", "background-color"],
    ["class", "product-wrapper", "color", "color"],
    ["class", "product-wrapper", "backgroundColor", "background-color"],
    ["class", "noDecorationLink", "color", "color"],
    ["class", "in-header-line-contained", "color", "color"]
];

function setCurrentTheme() {
    for (let themeParameter of themesParameters) {
        let command = "";
        if (themeParameter[0] === "id")
            command = "if(document.getElementById(\"" + themeParameter[1] + "\")!=undefined)document.getElementById(\"" + themeParameter[1] + "\").style." + themeParameter[2] + "=\"" + themes[theme === "light" ? 0 : 1].get(themeParameter[3]) + "\";";
        else if (themeParameter[0] === "class")
            command = "Array.from(document.getElementsByClassName(\"" + themeParameter[1] + "\")).forEach((el)=> {el.style." + themeParameter[2] + "=\"" + themes[theme === "light" ? 0 : 1].get(themeParameter[3]) + "\";});";
        else if (themeParameter[0] === "tag")
            command = "Array.from(document.getElementsByTagName(\"" + themeParameter[1] + "\")).forEach((el)=> {el.style." + themeParameter[2] + "=\"" + themes[theme === "light" ? 0 : 1].get(themeParameter[3]) + "\";});";
        eval(command);
    }
}

function changeTheme() {
    theme === "light" ? theme = "dark" : theme = "light";
    localStorage.setItem("theme", theme);
    setCurrentTheme();
}

function onProductsCategoriesLoad() {
    if (localStorage.getItem("theme") === "dark")
        changeTheme();
    for (let productCategory of productsCategories) {
        document.getElementsByClassName("products-categories-container")[0].innerHTML += "<a href=\"products.html?productCategoryId=" + productCategory["id"] + "\" class=\"product-category-wrapper\"><img src=\"img/" + productCategory["id"] + ".png\" alt=\"" + productCategory["id"] + "\" class=\"product-category-img\"> <div class=\"product-category-text\">" + productCategory["name"] + "</div></a>";
    }
    setCurrentTheme();
    onProductsResize();
    window.addEventListener("resize", onProductsResize);
}

function onProductsResize() {
    let products = document.getElementsByClassName("products-categories-container").item(0);
    let productsRowWidth = parseInt(products.clientWidth * 0.8 / 150);
    if (productsRowWidth === 0)
        productsRowWidth = 1;
    products.style.gridTemplateColumns = "repeat(" + productsRowWidth.toString() + ",1fr)"
}

function getAllUrlParams(url) {
    let queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    let obj = {};
    if (queryString) {
        queryString = queryString.split('#')[0];
        let arr = queryString.split('&');
        for (let i = 0; i < arr.length; i++) {
            let a = arr[i].split('=');
            let paramNum = undefined;
            let paramName = a[0].replace(/\[\d*\]/, function (v) {
                paramNum = v.slice(1, -1);
                return '';
            });
            let paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
            if (obj[paramName]) {
                if (typeof obj[paramName] === 'string')
                    obj[paramName] = [obj[paramName]];
                if (typeof paramNum === 'undefined')
                    obj[paramName].push(paramValue);
                else
                    obj[paramName][paramNum] = paramValue;
            } else
                obj[paramName] = paramValue;
        }
    }
    return obj;
}

function onCartLoad() {
    if (localStorage.getItem("cart") === null)
        localStorage.setItem("cart", "[]");
    localStorage.getItem("theme") === "dark" ? changeTheme() : setCurrentTheme();
}

function onBuyButtonClicked() {
    let cart = JSON.parse(localStorage.getItem("cart")), isProductDetectedInCart = false,
        productCategoryId = getAllUrlParams().productCategoryId, productId = getAllUrlParams().productId;
    cart.forEach(function (cartElement) {
        if (cartElement["productCategoryId"] === productCategoryId && cartElement["productId"] === productId) {
            ++cartElement["count"];
            isProductDetectedInCart = true;
        }
    });
    if (!isProductDetectedInCart)
        cart.push({
            productCategoryId: productCategoryId,
            productId: productId,
            count: 1
        });
    localStorage.setItem("cart", JSON.stringify(cart));
    document.getElementById("product-buy-button").remove();
    let buyButton=document.createElement("a");
    buyButton.setAttribute("href","cart.html");
    buyButton.setAttribute("class","noDecorationLink");
    buyButton.setAttribute("id","product-buy-button");
    buyButton.innerText="Куплено, перейти в корзину";
    document.getElementsByClassName("product-container")[0].appendChild(buyButton);
    setCurrentTheme();
}

function onProductLoad() {
    if (localStorage.getItem("cart") === null)
        localStorage.setItem("cart", "[]");
    let productCategoryId = getAllUrlParams().productCategoryId, productId = getAllUrlParams().productId,
        productsCategory, product, cart = JSON.parse(localStorage.getItem("cart")), isInCart = false;
    productsCategories.forEach(function (productCategory) {
        if (productCategory["id"] === productCategoryId) productsCategory = productCategory;
    });
    productsCategory["products"].forEach(function (_product) {
        if (_product["id"] === productId) product = _product;
    });
    cart.forEach(function (cartElement) {
        if (cartElement["productCategoryId"] === productCategoryId && cartElement["productId"] === productId)
            isInCart = true;
    });
    document.getElementsByClassName("shop-path")[0].innerHTML += "<a href=\"products.html?productCategoryId=" + productsCategory["id"] + "\" class=\"noDecorationLink\">" + productsCategory["name"] + "</a> > " + "<a href=\"\" class=\"noDecorationLink\">" + product["name"] + "</a>";
    document.getElementById("product-name").innerText = product["name"];
    document.getElementById("product-photo").setAttribute("src", "img/" + productsCategory["id"] + "/" + product["id"] + ".png");
    document.getElementById("product-photo").setAttribute("alt", product["id"] + ".png");
    document.getElementById("product-cost").innerText = product["cost"] + "₽";
    if(!isInCart)
        document.getElementById("product-buy-button").setAttribute("onclick", "onBuyButtonClicked()");
    else {
        document.getElementById("product-buy-button").remove();
        let buyButton=document.createElement("a");
        buyButton.setAttribute("href","cart.html");
        buyButton.setAttribute("class","noDecorationLink");
        buyButton.setAttribute("id","product-buy-button");
        buyButton.innerText="Куплено, перейти в корзину";
        document.getElementsByClassName("product-container")[0].appendChild(buyButton);
    }
    localStorage.getItem("theme") === "dark" ? changeTheme() : setCurrentTheme();
}

function onProductsLoad() {
    let productCategoryId = getAllUrlParams().productCategoryId, productsCategory;
    productsCategories.forEach(function (productCategory) {
        if (productCategory["id"] === productCategoryId) productsCategory = productCategory;
    });
    document.getElementsByClassName("shop-path")[0].innerHTML += "<a href=\"\" class=\"noDecorationLink\">" + productsCategory["name"] + "</a>";
    productsCategory["products"].forEach(function (product) {
        document.getElementsByClassName("products-container")[0].innerHTML += "<a href=\"product.html?productCategoryId=" + productCategoryId + "&productId=" + product["id"] + "\" class=\"product-wrapper\"><img src=\"img/" + productsCategory["id"] + "/" + product["id"] + ".png\" alt=\"" + productsCategory["id"] + "/" + product["id"] + "\" class=\"product-img\"> <div class=\"product-text\">" + product["name"] + "</div><div class=\"product-cost\">" + product["cost"] + "₽</div></a>";
    });
    localStorage.getItem("theme") === "dark" ? changeTheme() : setCurrentTheme();
}
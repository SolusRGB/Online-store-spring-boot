var productsInCart = new Map();
var localStorage = Window.localStorage;
$( document ).ready(function() {
    console.log( "ready!" );
    populateCategories();
    attachHandlerToAllCategory();
    attachHandlerToDealsCategory();
    attachedHandlerProductsButtons();
    loadProductsFromLocalStorage();
});

function loadProductsFromLocalStorage() {
    var numberOfProducts = 0;
    if (localStorage.getItem("shoppingCart")) {
        var shoppingCartString = JSON.parse(localStorage.getItem("shoppingCart"));
        productsInCart = new Map(shoppingCartString);

        productsInCart.forEach(function (product){
            numberOfProducts = numberOfProducts + product["quantity"];
        });
    }
    updateNumberOfProductsInCartElement(numberOfProducts);
}

function updateNumberOfProductsInCartElement(numberOfProducts) {
    var numberElement = $("#number-of-products-in-cart");
    numberElement.empty();
    numberElement.text(numberOfProducts);
    if (numberOfProducts == 0) {
        $("#checkout-button").attr("disabled", "true");
    } else {
        $("#checkout-button").removeAttr("disabled");
    }
}

function incrementNumberOfProductsInCartElement() {
    var numberElement = $("#number-of-products-in-cart");
    var currentNumberOfProducts = parseInt(numberElement.text());
    numberElement.empty();
    numberElement.text(currentNumberOfProducts + 1);
    $("#checkout-button").removeAttr("disabled");
}

function decrementNumberOfProductsInCartElement() {
    var numberElement = $("#number-of-products-in-cart");
    var newNumberOfProducts = parseInt(numberElement.text()) - 1;
    numberElement.empty();
    numberElement.text(newNumberOfProducts);
    if (newNumberOfProducts == 0) {
        $("#checkout-button").attr("disabled", "true");
    }
}

function attachClickHandlerToCategory(target, url) {
    target.on("click", function(){
    console.log(target.text() + " was clicked" );
        $.ajax({
              url: url,
              method: "GET",
              dataType: 'json',
              context: document.body
            })
            .done(onGetProductsResponse)
            .fail(function() {
                console.log("error loading products" );
            });
    });
}

function attachHandlerToAllCategory() {
    var target = $( "#all-products-category" );
    var url = "products";
    attachClickHandlerToCategory(target, url);
}

function attachHandlerToDealsCategory() {
    var target = $( "#deals-category" )
    var url = "deals_of_the_day/6";
    attachClickHandlerToCategory(target, url);
}
function populateCategories() {
// Load categories
    $.ajax({
      url: "categories",
      method: "GET",
      context: document.body
    })
    .done(function(data) {
        console.log( data );
        // the loading categories into navigation bar
        const categories = data.split(",");
        const categoriesRow = $( "#categories-row" );
        categoriesRow.on("click", ".category-button", onClickCategory);
        categories.forEach( function(category) {
            addCategory(category, categoriesRow);
        });
      })
    .fail(function() {
        console.log("error loading categories" );
    });
}

function addCategory(category, categoriesRow) {
    var formattedCategoryString = capitalizeFirstLetter(category.toLowerCase());
    const categoryHtmlElement = `<div class="col"><a class="category-button py-2 d-none d-md-inline-block btn btn-link" data-category="${category}">${formattedCategoryString}</a></div>`;

    categoriesRow.append(categoryHtmlElement);
}

function onClickCategory(event) {
    var target = $( event.target );
    console.log(target.data("category") + "is clicked");
    const url = "products?category="+ target.data("category");
    $.ajax({
      url: url,
      method: "GET",
      dataType: 'json',
      context: document.body
    })
    .done(onGetProductsResponse)
    .fail(function() {
        console.log("error loading products" );
    });
}

function onGetProductsResponse(productsData) {
    const parentProductsElement = $("#products-row");
    parentProductsElement.empty();
    productsData.products.forEach(function(productObject) {
        addProductToPage(productObject, parentProductsElement);
    });
}

function addProductToPage(productObject, parentProductsElement) {
    var newProductElement = $("#hidden-product").clone();
    newProductElement.find(".product-name").text(productObject.name);
    newProductElement.find(".product-description").text(productObject.description);

    newProductElement.find(".product-price").text("$"+ productObject.priceUSD);

    newProductElement.find("button").data("product-id", productObject.id);
    newProductElement.find("button").data("product-price", productObject.priceUSD);
    newProductElement.find("button").data("product-name", productObject.name);
    newProductElement.find("button").data("product-description", productObject.description);
    newProductElement.find("img").attr("src","product-images/" + productObject.imageFileName);

    newProductElement.removeAttr('hidden');
    newProductElement.removeAttr('id');
    newProductElement.appendTo(parentProductsElement);
}

function attachedHandlerProductsButtons() {
    const parentProductsElement = $("#products-row");
    parentProductsElement.on("click", ".add-product-button", addToCartHandler);
    parentProductsElement.on("click", ".remove-product-button", removeFromCartHandler);
}

function addToCartHandler(event) {
    var target = $(event.target);
    var productId = target.data("product-id");
    var productPrice = target.data("product-price");
    var productName = target.data("product-name");
    var productDescription = target.data("product-description");
    console.log("Adding product id" + productId + " name: " + productName + " to cart");
    if (productsInCart.has(productId)) {
        const productObject = productsInCart.get(productId);
        productObject["quantity"]++;
    } else {
        const productObject = new Object();
        productObject["price"] = productPrice;
        productObject["name"] = productName;
        productObject["price"] = productPrice;
        productObject["description"] = productDescription;
        productObject["quantity"] = 1;
        productsInCart.set(productId, productObject);
    }
    incrementNumberOfProductsInCartElement();
    updateLocalStorage();
}

function removeFromCartHandler(event) {
    var target = $(event.target);
    var productId = target.data("product-id");
    var productName = target.data("product-name");
    console.log("Removing product id" + productId + " name: " + productName + " from cart");
    if (productsInCart.has(productId)) {
            const productObject = productsInCart.get(productId);
            if (productObject["quantity"] > 0) {
                productObject["quantity"]--;
            }
            if (productObject["quantity"]  ==  0) {
                productsInCart.delete(productId);
            }
            decrementNumberOfProductsInCartElement();
            updateLocalStorage();
    }
}

function updateLocalStorage() {
    var productsAndCartString = JSON.stringify(Array.from(productsInCart.entries()));
    localStorage.setItem("shoppingCart", productsAndCartString);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
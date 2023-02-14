var localStorage = Window.localStorage;
var productsInCart = new Map();
$( document ).ready(function() {
    loadProductInCart();
    attachOnClickEventOnCompletePurchase();
});

function loadProductInCart() {
    if (localStorage.getItem("shoppingCart")) {
        var shoppingCartString = JSON.parse(localStorage.getItem("shoppingCart"));
        productsInCart = new Map(shoppingCartString);
        var listOfProductsInCartParent = $("#list-of-items-in-cart");
        var totalPrice = 0;
        var numberOfItems = 0;
        productsInCart.forEach(function (product){
            numberOfItems = numberOfItems + product["quantity"];
            totalPrice = totalPrice + product["price"]  * product["quantity"];
            var cartItem = $("#hidden-item").clone();
            cartItem.find("h6").text(product["name"]);
            cartItem.find("small").text(product["description"]);
            cartItem.find("span").text("$" + product["price"] + " x " + product["quantity"]);
            cartItem.addClass('<li id="hidden-item"  class="list-group-item d-flex justify-content-between lh-sm">');
            cartItem.removeAttr('id');
            listOfProductsInCartParent.prepend(cartItem);
        });
        $("#total-price").text("$" + parseFloat(totalPrice).toFixed( 2 ));
        $("#number-of-items").text(numberOfItems);
    }
}

function attachOnClickEventOnCompletePurchase() {
    $("form").on("submit", function(event) {
        var requestBody = buildPurchaseRequest();
        console.log("sending " +  requestBody);
        $.ajax({
          url: "/checkout",
          method: "POST",
          contentType: "application/json",
          dataType: 'text',
          data: requestBody,
          context: document.body
        })
        .done(onConfirmPurchaseSuccess)
        .fail(onConfirmPurchaseError);
        event.preventDefault();
    });
}


function onConfirmPurchaseSuccess() {
    var completeCheckoutButton = $("#complete-checkout");
    completeCheckoutButton.attr("disabled", "true");
    completeCheckoutButton.removeClass("btn-primary");
    completeCheckoutButton.addClass("btn-success");
    completeCheckoutButton.text("success")
    localStorage.clear();
}

function onConfirmPurchaseError(jqXHR, textStatus, errorThrown ) {
    alert("Error completing purchase "  + textStatus + " errorThrown: " + errorThrown);
}

function buildPurchaseRequest() {
    var requestBody = new Object();
    requestBody["firstName"] = $("#firstName").val();
    requestBody["lastName"] = $("#lastName").val();
    requestBody["email"] = $("#email").val();
    requestBody["shippingAddress"] = $("#address").val();
    requestBody["creditCard"] = $("#credit-card-info").val();

    requestBody["products"] = [];
    productsInCart.forEach(function(product, productId){
        requestBody["products"].push({productId: productId, quantity: product["quantity"]});
    });
    return JSON.stringify(requestBody);
}
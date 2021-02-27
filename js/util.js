var productType = "teddies" 
var APIURL = "http://localhost:3000/api/" + productType + "/";

// initialize basket if it isnt exist in localStorage
if(! localStorage.getItem("basket")){;
  	//Le panier est un tableau de produits
  	localStorage.setItem("basket", "{}");
};

// fill the basket count in html page
document.getElementById("basketCount").innerHTML = getBasketCount().toString()


function getBasketCount() {
    
    // get the number of products in basket from the localStorage
    
    let count = 0;
    let basket = JSON.parse(localStorage.getItem("basket"));
    for (let id in basket) {
        count += basket[id]["nb"];
    }
    return count;
}




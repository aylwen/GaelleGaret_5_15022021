
function getProducts(id="") {
    
    // if id is defined, return data this product id from API 
    // else return all products list
    
    let url = APIURL+id
    let data = fetch(url, {}).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw response.status
        }
    }).catch(error => {
        console.log(error)
        alert("DB connection problem")        
        })
    return data
}


function createIndexPage() {
    
    // complete main of index.html page for showing all available products
    
    getProducts().then(products => {
        const main = document.getElementById("main");
        for (let i = 0; i < products.length; i++) {
            // add a container for each product
            divContainer = getProductCard(products[i])
            main.appendChild(divContainer);
        }
    })
}


function getProductPage(id){
    
    // complete main of index.html page for showing a id product page
    
    getProducts(id).then(product => {
        divContainer = getProductCard(product, true)
        const main = document.getElementById("main");
        main.innerHTML = '';
        
        // add the container of product defined by id
        main.appendChild(divContainer);
    })
}



function getProductCard(product, page_product=false){
    
    // construct a container showing a product
    // if it's a product page, show a buy button and option of colour, else show button
    
    let divContainer = document.createElement("div");
    divContainer.classList.add("container", "d-flex", "mt-50", "mb-50", "row", "justify-content-md-center")


    let divCard = document.createElement("div");
    divContainer.appendChild(divCard);
    divCard.classList.add("card", "card-body", "rounded", "col-md-10", "media", "align-items-center", "align-items-lg-start", "text-center", "text-lg-left", "flex-column", "flex-lg-row");

    // Création des élements images et div avec la classe card body, enfants de divParent 
    let image = document.createElement("img");
    divCard.appendChild(image);
    image.classList.add("mr-2", "mb-3", "mb-lg-0", "img-fluid");
    image.src = product.imageUrl;
    image.width = "150"
    image.height = "150"

    let divCardBody = document.createElement("div");
    divCard.appendChild(divCardBody);
    divCardBody.classList.add("media-body");

    // Création des éléments enfants de divCardBody
    let title = document.createElement("h6");
    divCardBody.appendChild(title);
    title.classList.add("product-title", "font-weight-bold");
    title.textContent = product.name;

    let description = document.createElement("p");
    divCardBody.appendChild(description);
    description.classList.add("mt-4");
    description.textContent = product.description;

    
    let divCardRight = document.createElement("div");
    divCard.appendChild(divCardRight);
    divCardRight.classList.add("mt-3", "mt-lg-0", "ml-lg-3", "text-center");
    
    // Création d'une div englobant prix et bouton
    let price = document.createElement("h3");
    divCardRight.appendChild(price);
    price.classList.add("mb-0", "font-weight-semibold");
    price.textContent = product.price + ' $';

    let link = document.createElement("a");
    link.classList.add("btn", "btn-warning", "mt-3", "text-white");
    
    if (page_product) {

        let divSelection = document.createElement("div");
        divSelection.classList.add("mt-2");
        divCardRight.appendChild(divSelection)
        
        let selection = document.createElement("select");
        divSelection.appendChild(selection)
        selection.classList.add("form-select");
        product.colors.forEach((color)=>{
    		let option = document.createElement("option");
    		selection.appendChild(option).innerHTML = color;
    	});
        
        link.textContent = "Acheter";
        link.href = "javascript:addToBasket(\""+product._id+"\",\""+product.name+"\",\""+product.price+"\");"
      
        
    } else {

        link.textContent = "Voir l'article";
        link.href = "javascript:getProductPage(\""+product._id+"\");"
    }
    
    divCardRight.appendChild(link);  
    
    return divContainer
}


function addToBasket(id, name, price){
    
    // add a product 
    
    //update basket in localStorage
    let basket  = JSON.parse(localStorage.getItem("basket"));
    if (!(id in basket)){
        basket[id] = {"nb": 1, "price": price, "name": name};
    } else {
        basket[id]["nb"] += 1;
    }
    
    localStorage.setItem("basket", JSON.stringify(basket));

    //fill the number of products in basket in html page 
    const number = document.getElementById("basketCount");
    number.innerHTML = (parseInt(number.innerHTML) + 1).toString()
    
}






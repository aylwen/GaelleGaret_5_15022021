const productType = "teddies" 
const APIURL = "http://localhost:3000/api/" + productType + "/";


if(! localStorage.getItem("basket")){;
  	//Le panier est un tableau de produits
    var basket = {}
  	localStorage.setItem("basket", JSON.stringify(basket));
};


const number = document.getElementById("basketCount");
number.innerHTML = getBasketCount().toString()
  

function getBasketCount() {
    let count = 0;
    let basket = JSON.parse(localStorage.getItem("basket"));
    console.log(basket);
    for (let id in basket) {
        count += basket[id]["nb"];
    }
    return count;
}


async function getProducts(id="") {
    try {
        let url = APIURL+id
        let response = await fetch(url);
        if (response.ok) {
            let products = await response.json();
            return products;
        } else {
            console.error(response.status)
        }
    } catch (e) {
        console.log(e);
    }
}

async function createIndexPage() {
    const products = await getProducts();
    const main = document.getElementById("main");
    console.log(products)
    for (let i = 0; i < products.length; i++) {
        divContainer = getProductCard(products[i])
        main.appendChild(divContainer);
        
    }
}


function getProductCard(product, page_product=false){
    
    let divContainer = document.createElement("div");
    divContainer.classList.add("container", "d-flex", "mt-50", "mb-50", "row", "justify-content-md-center")


    let divCard = document.createElement("div");
    divContainer.appendChild(divCard);
    divCard.classList.add("card", "card-body", "rounded", "col-md-10", "media", "align-items-center", "align-items-lg-start", "text-center", "text-lg-left", "flex-column", "flex-lg-row");

    // Création des élements images et div avec la classe card body, enfants de divParent 
    let image = document.createElement("img");
    divCard.appendChild(image);
    image.classList.add("mr-2", "mb-3", "mb-lg-0", "rounded-circle");
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


async function getProductPage(id){
    const product = await getProducts(id);
    divContainer = getProductCard(product, true)
    const main = document.getElementById("main");
    main.innerHTML = '';
    main.appendChild(divContainer);
}


async function addToBasket(id, name, price){
    let basket  = JSON.parse(localStorage.getItem("basket"));
    if (!(id in basket)){
        basket[id] = {"nb": 1, "price": price, "name": name};
        console.log(basket)
    } else {
        basket[id]["nb"] += 1;
    }
    
    localStorage.setItem("basket", JSON.stringify(basket));
    console.log(localStorage.getItem("basket"))

    const number = document.getElementById("basketCount");
    number.innerHTML = (parseInt(number.innerHTML) + 1).toString()
    
}

async function fillBasketPage(){

    let totalAmount = 0;
    let totalQuantity = 0;
    
    let basket  = JSON.parse(localStorage.getItem("basket"));


    console.log(basket)
    
    const main = document.getElementById("basket_table");
    main.innerHTML = '';

    
    
    let table = document.createElement("table");
    main.appendChild(table)
    table.classList.add("table")
    
    let thead = document.createElement("thead");
    table.appendChild(thead)
    
    let trThead = document.createElement("tr");
    thead.appendChild(trThead)
    
    const arrayNames = ["Nom", "Prix", "Quantité", "Total"];
    
    for (let i in arrayNames){
            let th = document.createElement("th");
            trThead.appendChild(th)
            th.textContent = arrayNames[i]
    }
    
    let tbody = document.createElement("tbody");
    table.appendChild(tbody)

    
    for (let i in basket) {
        console.log(i)
    
        let item = document.createElement("tr");
        tbody.appendChild(item)
    
        
        let name = basket[i]["name"]
        let price = basket[i]["price"] + " $"
        let quantity = basket[i]["nb"]
        let total = (parseInt(price) * quantity).toString() + " $"
        
        const arrayAttributes = [name, price, quantity, total];
        
        for (let attribut in arrayAttributes){
            let td = document.createElement("td");
            item.appendChild(td)
            td.textContent = arrayAttributes[attribut]
        }
        
        totalQuantity += quantity;
        totalAmount += parseInt(total);
    }
    
    totalAmount = totalAmount.toString() + " $"
    
    localStorage.setItem("amount", totalAmount);
    
    let item = document.createElement("tr");
    tbody.appendChild(item)
    const arrayTotal = ["", "", totalQuantity, totalAmount];
    for (let attribut in arrayTotal){
        let tdTotal = document.createElement("th");
        item.appendChild(tdTotal)
        tdTotal.textContent = arrayTotal[attribut]
        }
    
}

async function emptyBasket(){
    
  	localStorage.setItem("basket", "{}");
    
    const number = document.getElementById("basketCount");
    number.innerHTML = "0"
    
    fillBasketPage()
    
}

async function checkForm(){

    let form = document.getElementById('myForm');
    
    if (localStorage.getItem('basket') == "{}"){
        window.alert('votre panier est vide !');
        return false
    }
    
    if (form.checkValidity()) {
        form.classList.add('was-validated');
        updateData()
    }
    else {
        form.classList.add("input_invalid")
        
    }
}

class Contact {
    constructor(name, surname, adress, city, email) {
        this.firstName = name;
        this.lastName = surname;
        this.address = adress;
        this.city = city;
        this.email = email;
    }
}


function getFormInfos() {
    let firstname = document.getElementById('first_name').value;
    let lastname = document.getElementById('name').value;
    let adress = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let email = document.getElementById('email').value;
    contact = new Contact(firstname, lastname, adress, city, email);
    return contact
}

async function updateData(){
    let contact = getFormInfos();
    console.log(contact)
    let products = []
    let basket = JSON.parse(localStorage.getItem("basket"));
    for (let id in basket) {
        products.push(id);
    }
    
    dataToSend = JSON.stringify({contact, products})
    
    try {
        let url = APIURL+"order"
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: dataToSend,
        });
        
        if (response.ok) {
            let orderId = await response.json()
            localStorage.setItem("order_id", orderId.orderId)
            localStorage.setItem("basket", "{}")
            window.location.href = "confirmation.html";
        } else {
            console.error(response.status)
        }
    } catch (e) {
        console.log(e);
    }
    
}

async function fillConfirmation(){
    let orderId = localStorage.getItem("order_id");
    console.log(orderId)
    let orderIdHtml = document.getElementById("order_id");
    orderIdHtml.textContent = orderId;
    let amount = localStorage.getItem("amount");
    let amountHtml = document.getElementById("total");
    amountHtml.textContent = amount;
}

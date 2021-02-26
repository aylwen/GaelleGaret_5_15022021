
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


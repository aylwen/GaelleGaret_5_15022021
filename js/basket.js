
function fillBasketPage(){
    
    // fill the basket_table element in basket.html

    let totalAmount = 0;
    let totalQuantity = 0;
    
    const basket  = JSON.parse(localStorage.getItem("basket"));
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
    
    // keep trace of total amount for confirmation page
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


function emptyBasket(){
    
    // empty basket
    
    //reinitialize basket in localStorage 
  	localStorage.setItem("basket", "{}");
    
    //put 0 for number of products in basket in html page 
    const number = document.getElementById("basketCount");
    number.innerHTML = "0"
    
    //rewrite html basket page
    fillBasketPage()
    
}



const productType = "teddies" 
const APIURL = "http://localhost:3000/api/" + productType + "/";

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

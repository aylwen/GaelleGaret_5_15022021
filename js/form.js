function checkForm(){

    // check form entries before buy validation 
    
    let form = document.getElementById('myForm');
    
    // check if basket is not empty 
    if (localStorage.getItem('basket') == "{}"){
        window.alert('votre panier est vide !');
        return false
    }
    
    // if check ok, update data and go to confirmation page
    if (form.checkValidity()) {
        form.classList.add('was-validated');
        updateData()
    }
    
    // else stay on basket page and show invalid fields
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
    
    // get informations from form and return a Contact object
    
    let firstname = document.getElementById('first_name').value;
    let lastname = document.getElementById('name').value;
    let adress = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let email = document.getElementById('email').value;
    contact = new Contact(firstname, lastname, adress, city, email);
    return contact
}

async function updateData(){
    

    // get form and basket infos
    // send them to api to get an order id
    // empty basket and go to confirmation page
    
    
    let contact = getFormInfos();
    let products = []
    let basket = JSON.parse(localStorage.getItem("basket"));
    for (let id in basket) {
        products.push(id);
    }
    

    dataToSend = JSON.stringify({contact, products})
    
    let url = APIURL+"order"
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: dataToSend,
    }).then(response => {
        if (response.ok) {
            return response.json()
        }
        else {
            throw response.status
        }
    }).then(data => {
            localStorage.setItem("order_id", data.orderId)
            localStorage.setItem("basket", "{}")
            window.location.href = "confirmation.html";
    }).catch(error => console.log(error))
    
}

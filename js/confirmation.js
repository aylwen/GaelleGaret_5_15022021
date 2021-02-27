function fillConfirmation(){
    
    // fill elements of confirmation.html
    
    let orderId = localStorage.getItem("order_id");
    let orderIdHtml = document.getElementById("order_id");
    orderIdHtml.textContent = orderId;
    let amount = localStorage.getItem("amount");
    let amountHtml = document.getElementById("total");
    amountHtml.textContent = amount;
}

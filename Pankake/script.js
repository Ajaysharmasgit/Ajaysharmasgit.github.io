const priceDisplayDiv = document.querySelector('#totalPrice');
let orders = [];

// Function to calculate total price
function calculateTotal() {
    const pancakeType = document.getElementById('pancakeType');
    const toppingCheckboxes = document.querySelectorAll('.customization-section:nth-of-type(3) input[type="checkbox"]');
    const extraCheckboxes = document.querySelectorAll('.customization-section:nth-of-type(4) input[type="checkbox"]');
    const deliveryMethod = document.querySelector('input[name="delivery"]:checked');

    let basePrice = parseInt(pancakeType.value);
    let toppingsPrice = 0;
    let extrasPrice = 0;
    let deliveryPrice = 0;
    let totalPrice = basePrice;

    toppingCheckboxes.forEach((topping) => {
        if (topping.checked) {
            toppingsPrice += parseInt(topping.value);
        }
    });

    extraCheckboxes.forEach((extra) => {
        if (extra.checked) {
            extrasPrice += parseInt(extra.value);
        }
    });

    if (deliveryMethod && deliveryMethod.value === 'Delivery') {
        deliveryPrice = 5;
    }

    totalPrice += toppingsPrice + extrasPrice + deliveryPrice;

    showPrice(totalPrice);
}

// Function to update price 
function showPrice(totalPrice) {
    priceDisplayDiv.innerText = `€${totalPrice}`;
}

// Function to display the current order
function displayOrder() {
    const customerName = document.getElementById('customerName').value;
    const pancakeType = document.getElementById('pancakeType');
    const pancakeTypeSelected = pancakeType.options[pancakeType.selectedIndex].text;

    const selectedToppings = Array.from(document.querySelectorAll('.customization-section:nth-of-type(3) input[type="checkbox"]:checked'))
        .map(t => t.parentElement.textContent.trim()).join(', ');

    const selectedExtras = Array.from(document.querySelectorAll('.customization-section:nth-of-type(4) input[type="checkbox"]:checked'))
        .map(e => e.parentElement.textContent.trim()).join(', ');

    const deliveryMethod = document.querySelector('input[name="delivery"]:checked') ? document.querySelector('input[name="delivery"]:checked').value : 'None';

    const totalPrice = parseFloat(priceDisplayDiv.innerText.replace('€', ''));

    // Creating the order object
    const order = {
        customerName,
        pancakeType: pancakeTypeSelected,
        selectedToppings,
        selectedExtras,
        deliveryMethod,
        totalPrice
    };

    // Pushing orders
    orders.push(order);

    // order display
    const orderSummaryDiv = document.getElementById('orderSummary');
    orderSummaryDiv.innerHTML = `
        <h3>Order Summary</h3>
        <p><strong>Customer Name:</strong> ${order.customerName}</p>
        <p><strong>Pancake Type:</strong> ${order.pancakeType}</p>
        <p><strong>Toppings:</strong> ${selectedToppings || 'None'}</p>
        <p><strong>Extras:</strong> ${selectedExtras || 'None'}</p>
        <p><strong>Delivery Method:</strong> ${deliveryMethod}</p>
        <p><strong>Total Price:</strong> €${totalPrice.toFixed(2)}</p>
    `;
}


document.getElementById('pancakeType').addEventListener('change', calculateTotal);

document.querySelectorAll('.customization-section:nth-of-type(3) input[type="checkbox"]').forEach(topping => {
    topping.addEventListener('change', calculateTotal);
});

document.querySelectorAll('.customization-section:nth-of-type(4) input[type="checkbox"]').forEach(extra => {
    extra.addEventListener('change', calculateTotal);
});

document.querySelectorAll('input[name="delivery"]').forEach(option => {
    option.addEventListener('change', calculateTotal);
});


document.getElementById('seeOrder').addEventListener('click', displayOrder);



// total calculation
calculateTotal();

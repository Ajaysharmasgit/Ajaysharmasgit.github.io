//Pancakes in different parts
const priceDisplayDiv = document.querySelector('.price-display span');
let orders = [];


function calculateTotal() {
    // Took help from Andrei with this part
    const pancakeType = document.getElementById('pancakeType');
    const toppingCheckboxes = document.querySelectorAll('.customization-section:nth-of-type(2) input[type="checkbox"]');
    const extraCheckboxes = document.querySelectorAll('.customization-section:nth-of-type(3) input[type="checkbox"]');
    const deliveryMethod = document.querySelector('input[name="delivery"]:checked'); // Delivery method selection

    // I put all the values zero to avoid my own confusion
    let basePrice = parseInt(pancakeType.value);
    let toppingsPrice = 0;
    let extrasPrice = 0;
    let deliveryPrice = 0;
    let totalPrice = basePrice;

    // Calculate toppings
    toppingCheckboxes.forEach((topping) => {
        if (topping.checked) {
            toppingsPrice += parseInt(topping.value);
        }
    });

    // Calculate extras
    extraCheckboxes.forEach((extra) => {
        if (extra.checked) {
            extrasPrice += parseInt(extra.value);
        }
    });

    // Only work if it ask for delivery.
    if (deliveryMethod && deliveryMethod.value === 'Delivery') {
        deliveryPrice = 5;
    }

    // Adding the price of toppings and extra
    totalPrice += toppingsPrice + extrasPrice + deliveryPrice;

    showPrice(totalPrice);
}

// Function to update price display
function showPrice(totalPrice) {
    // Update total price display
    priceDisplayDiv.innerText = `$${totalPrice}`;
}

// Function to display current order
function displayOrder() {//this part half is from AI
    const customerName = document.getElementById('customerName').value;
    const pancakeTypeSelected = pancakeType.options[pancakeType.selectedIndex].text;
    const selectedToppings = Array.from(document.querySelectorAll('.customization-section:nth-of-type(2) input[type="checkbox"]:checked')).map(t => t.nextSibling.textContent.trim()).join(', ');
    const selectedExtras = Array.from(document.querySelectorAll('.customization-section:nth-of-type(3) input[type="checkbox"]:checked')).map(e => e.nextSibling.textContent.trim()).join(', ');
    const deliveryMethod = document.querySelector('input[name="delivery"]:checked').value;
    const totalPrice = priceDisplayDiv.innerText;

    // Creating order with object
    const order = {
        customerName,
        pancakeType: pancakeTypeSelected,
        selectedToppings,
        selectedExtras,
        deliveryMethod,
        totalPrice
    };

    // Adding the order info
    orders.push(order);

    // This I took from AI sorry couldn't figure out.
    const orderSummaryDiv = document.getElementById('orderSummary');
    orderSummaryDiv.innerHTML = `
        <h3>Order Summary</h3>
        <p><strong>Customer Name:</strong> ${order.customerName}</p>
        <p><strong>Pancake Type:</strong> ${order.pancakeType}</p>
        <p><strong>Toppings:</strong> ${selectedToppings || 'None'}</p>
        <p><strong>Extras:</strong> ${selectedExtras || 'None'}</p>
        <p><strong>Delivery Method:</strong> ${deliveryMethod}</p>
        <p><strong>Total Price:</strong> ${totalPrice}</p>
    `;
}

// Event listeners for the pancakes with extras and toppings
document.getElementById('pancakeType').addEventListener('change', calculateTotal);
toppingCheckboxes.forEach((toppings) => {
    toppings.addEventListener('change', calculateTotal);
});
extraCheckboxes.forEach((extras) => {
    extras.addEventListener('change', calculateTotal);
});

// Add ingevent listener for delivery method
const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
deliveryOptions.forEach(option => {
    option.addEventListener('change', calculateTotal);
});

// Add event listener for "Check Order" button
document.getElementById('checkOrder').addEventListener('click', displayOrder);

// Showing the total calculation calculation
calculateTotal();


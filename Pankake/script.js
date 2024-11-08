

// Pancakes in different parts
const priceDisplayDiv = document.querySelector('.price-display span');
let orders = [];

// Function to calculate total price
function calculateTotal() {
    const pancakeType = document.getElementById('pancakeType');

    // Getting the checkboxes when the function is selected
    const toppingCheckboxes = document.querySelectorAll('.customization-section:nth-of-type(2) input[type="checkbox"]');
    const extraCheckboxes = document.querySelectorAll('.customization-section:nth-of-type(3) input[type="checkbox"]');

    const deliveryMethod = document.querySelector('input[name="delivery"]:checked'); // Delivery method selection

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

    // Delivery price (only if 'Delivery' is selected)
    if (deliveryMethod && deliveryMethod.value === 'Delivery') {
        deliveryPrice = 5;
    }

    // Add prices for toppings, extras, and delivery
    totalPrice += toppingsPrice + extrasPrice + deliveryPrice;

    // Update the price display
    showPrice(totalPrice);
}

// Function to update price display
function showPrice(totalPrice) {
    priceDisplayDiv.innerText = `$${totalPrice}`;
}

// Function to display the current order
function displayOrder() {
    const customerName = document.getElementById('customerName').value;
    const pancakeType = document.getElementById('pancakeType');
    const pancakeTypeSelected = pancakeType.options[pancakeType.selectedIndex].text;

    // Get selected toppings and extras dynamically
    const selectedToppings = Array.from(document.querySelectorAll('.customization-section:nth-of-type(2) input[type="checkbox"]:checked'))
        .map(t => t.nextSibling.textContent.trim()).join(', ');

    const selectedExtras = Array.from(document.querySelectorAll('.customization-section:nth-of-type(3) input[type="checkbox"]:checked'))
        .map(e => e.nextSibling.textContent.trim()).join(', ');

    const deliveryMethod = document.querySelector('input[name="delivery"]:checked').value;
    const totalPrice = priceDisplayDiv.innerText; // This is the string with "$" sign

    // Creating order object
    const order = {
        customerName,
        pancakeType: pancakeTypeSelected,
        selectedToppings,
        selectedExtras,
        deliveryMethod,
        totalPrice
    };

    // Adding the order to the orders array
    orders.push(order);

    // Displaying the order summary
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

// Event listeners for updating price
document.getElementById('pancakeType').addEventListener('change', calculateTotal);

// Get the dynamically added checkboxes and bind event listeners
document.querySelectorAll('.customization-section:nth-of-type(2) input[type="checkbox"]').forEach(topping => {
    topping.addEventListener('change', calculateTotal);
});

document.querySelectorAll('.customization-section:nth-of-type(3) input[type="checkbox"]').forEach(extra => {
    extra.addEventListener('change', calculateTotal);
});

// Event listener for delivery method
const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
deliveryOptions.forEach(option => {
    option.addEventListener('change', calculateTotal);
});

// Event listener for "Check Order" button
document.getElementById('checkOrder').addEventListener('click', displayOrder);

// Initial total calculation
calculateTotal();

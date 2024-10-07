"use strict";

// storing orders
let orders = [];

// calculating total price
function calculateTotal() {
  const pancakeType = document.getElementById("type");
  const basePrice = parseInt(pancakeType.value);
  //   console.log(basePrice);

  let totalPrice = basePrice;

  // getting all values from checkboxes
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      totalPrice += parseInt(checkbox.value);
      //   console.log(totalPrice);
    }
  });

  // delivery method: if they put delivery for the food then it will add $5 extra to the total price
  const deliveryOptions = document.querySelector(
    'input[name="delivery"]:checked'
  );
  totalPrice += parseInt(deliveryOptions.value);

  const bannerPriceDisplay = document.getElementById("totalPrice");
  const finalPriceDisplay = document.getElementById("finalPrice");
  bannerPriceDisplay.innerText = "$" + totalPrice;
  finalPriceDisplay.innerText = "$" + totalPrice;

  // simple animation for price display on the banner
  bannerPriceDisplay.style.transition = "transform 0.3s ease";
  bannerPriceDisplay.style.transform = "scale(1.3";

  setTimeout(function () {
    bannerPriceDisplay.style.transform = "scale(1)";
  }, 300);
}

// function to display order summary
function displayOrder() {
  const customerName = document.getElementById("customerName").value;
  const pancakeType =
    document.getElementById("type").options[
      document.getElementById("type").selectedIndex
    ].text;
  const deliveryMethod = document
    .querySelector('input[name="delivery"]:checked')
    .nextSibling.textContent.trim();
  const totalPrice = document.getElementById("finalPrice").innerText;

  // get selected toppings
  let toppings = [];
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      toppings.push(checkbox.nextSibling.textContent.trim());
    }
  });

  // creating order summary
  let orderSummary = `
    <h3>Order Summary</h3>
    <p><strong>Customer Name:</strong> ${customerName}</p>
    <p><strong>Pancake Type:</strong> ${pancakeType}</p>
    <p><strong>Toppings:</strong> ${
      toppings.length > 0 ? toppings.join(", ") : "None"
    }</p>
    <p><strong>Delivery Method:</strong> ${deliveryMethod}</p>
    <p><strong>Total Price:</strong> ${totalPrice}</p>
  `;

  // displaying the order summary
  document.getElementById("orderSummary").innerHTML = orderSummary;

  // store the order in the array
  let order = {
    customerName: customerName,
    pancakeType: pancakeType,
    toppings: toppings,
    deliveryMethod: deliveryMethod,
    totalPrice: totalPrice,
  };

  // add to orders array (update if exists)
  const orderIndex = orders.findIndex(
    (order) => order.customerName === customerName
  );
  if (orderIndex > -1) {
    orders[orderIndex] = order; // update existing order
  } else {
    orders.push(order); // add new order
  }

  console.log(orders); // log orders for debugging
}

document.getElementById("type").addEventListener("change", calculateTotal);
document
  .querySelectorAll('input[type="checkbox"]')
  .forEach(function (checkbox) {
    checkbox.addEventListener("change", calculateTotal);
  });
document.querySelectorAll('input[name="delivery"]').forEach(function (option) {
  option.addEventListener("change", calculateTotal);
});

// event listener for 'See Order' button
document.getElementById("seeOrder").addEventListener("click", displayOrder);

// initialize the total price on page load
window.addEventListener("load", calculateTotal);
document.getElementById("type").addEventListener("change", calculateTotal);
document
  .querySelectorAll('input[type="checkbox"]')
  .forEach(function (checkbox) {
    checkbox.addEventListener("change", calculateTotal);
  });
document.querySelectorAll('input[name="delivery"]').forEach(function (option) {
  option.addEventListener("change", calculateTotal);
});

// event listener for 'See Order' button
document.getElementById("seeOrder").addEventListener("click", displayOrder);

// initialize the total price on page load
window.addEventListener("load", calculateTotal);

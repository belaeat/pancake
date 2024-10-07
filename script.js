"use strict";

function calculateTotal() {
  const pancakeType = document.getElementById("type");
  const basePrice = parseInt(pancakeType.value);
  //   console.log(basePrice);

  let totalPrice = basePrice;

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      totalPrice += parseInt(checkbox.value);
      //   console.log(totalPrice);
    }
  });

  const bannerPriceDisplay = document.getElementById("totalPrice");
  const finalPriceDisplay = document.getElementById("finalPrice");
  bannerPriceDisplay.innerText = "$" + totalPrice;
  finalPriceDisplay.innerText = "$" + totalPrice;

  bannerPriceDisplay.style.transition = "transform 0.3s ease";
  bannerPriceDisplay.style.transform = "scale(1.3";

  setTimeout(function () {
    bannerPriceDisplay.style.transform = "scale(1)";
  }, 300);
}

document.getElementById("type").addEventListener("change", calculateTotal);

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", calculateTotal);
});

window.addEventListener("load", calculateTotal);

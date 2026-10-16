
const checkoutForm = document.getElementById("checkoutForm");
const formMessage = document.getElementById("formMessage");

const products = [
  { name: "ZenBook 14 Laptop", price: 899 },
  { name: "Studio Headphones", price: 89 },
  { name: "Wireless Mouse Pro", price: 78 }
];

const delivery = 5;

const subtotal = products.reduce(
  (sum, product) => sum + product.price,
  0
);

document.getElementById("subtotal").textContent =
  `$${subtotal.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;

document.getElementById("delivery").textContent =
  `$${delivery.toFixed(2)}`;

document.getElementById("total").textContent =
  `$${(subtotal + delivery).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;

checkoutForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!checkoutForm.checkValidity()) {
    checkoutForm.reportValidity();
    return;
  }

  formMessage.textContent =
    "Information validated. Order submission is not connected yet.";
});

document.getElementById("newsletterForm").addEventListener(
  "submit",
  function (event) {
    event.preventDefault();
    alert("Newsletter form demo: no email was saved.");
    this.reset();
  }
);

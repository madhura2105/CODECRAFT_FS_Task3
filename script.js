let cart = [];
let total = 0;

function addToCart(productName, price) {
    const existingItem = cart.find(function(item) {
        return item.name === productName;
    });

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });
    }

    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";
    total = 0;

    cart.forEach(function(item, index) {
        total += item.price * item.quantity;

        const li = document.createElement("li");

        li.innerHTML = `
            ${item.name} - ₹${item.price}
            <button onclick="decreaseQuantity(${index})">−</button>
            <span> ${item.quantity} </span>
            <button onclick="increaseQuantity(${index})">+</button>
            <button onclick="removeItem(${index})">Remove</button>
        `;

        cartItems.appendChild(li);
    });

    cartTotal.textContent = total;
}
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    document.getElementById("checkout-form").style.display = "block";
}
function increaseQuantity(index) {
    cart[index].quantity += 1;
    updateCart();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }

    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}
function placeOrder() {
    const name = document.getElementById("customer-name").value;
    const phone = document.getElementById("customer-phone").value;
    const address = document.getElementById("customer-address").value;

    if (name === "" || phone === "" || address === "") {
        alert("Please fill all details.");
        return;
    }

    alert("Order placed successfully! Total amount: ₹" + total);

    cart = [];
    total = 0;
    updateCart();

    document.getElementById("checkout-form").style.display = "none";
}
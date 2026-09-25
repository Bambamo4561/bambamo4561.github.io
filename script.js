
// ================================
// PERFUME BY HARAM
// SHOPPING CART
// ================================


// ================================
// ALL 3 PRODUCTS
// ================================

let cart = [

    {
        name: "Olive Blossom",
        price: 3500,
        quantity: 0
    },

    {
        name: "Green Elegance",
        price: 4000,
        quantity: 0
    },

    {
        name: "Velvet Bloom",
        price: 4500,
        quantity: 0
    }

];


// ================================
// ADD TO CART
// ================================

function addToCart(name, price) {

    let product = cart.find(function(item) {

        return item.name === name;

    });


    if (product) {

        product.quantity++;

    }


    updateCartCount();

    document.getElementById("cartPopup").style.display = "flex";

    displayCart();

}


// ================================
// UPDATE CART NUMBER
// ================================

function updateCartCount() {

    let count = 0;


    cart.forEach(function(product) {

        count = count + product.quantity;

    });


    // Cart count element agar HTML mein ho

    let cartCount = document.getElementById("cartCount");


    if (cartCount) {

        cartCount.innerText = count;

    }

}


// ================================
// SHOW CART
// ================================

function showCart() {

    document.getElementById("cartPopup").style.display = "flex";

    displayCart();

}


// ================================
// DISPLAY CART
// ================================

function displayCart() {

    let cartItems = document.getElementById("cartItems");

    let cartTotal = document.getElementById("cartTotal");


    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach(function(product, index) {

        let productTotal =
            product.price * product.quantity;


        total = total + productTotal;


        cartItems.innerHTML += `

            <div class="cart-item">

                <h3>${product.name}</h3>

                <p>
                    Price: Rs. ${product.price}
                </p>


                <p>

                    Quantity:

                    <button
                        onclick="decreaseQuantity(${index})">
                        −
                    </button>


                    <strong>
                        ${product.quantity}
                    </strong>


                    <button
                        onclick="increaseQuantity(${index})">
                        +
                    </button>

                </p>


                <p>
                    Product Total:
                    Rs. ${productTotal}
                </p>


                <hr>

            </div>

        `;

    });


    cartTotal.innerText = "Rs. " + total;

}


// ================================
// INCREASE QUANTITY
// ================================

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCartCount();

    displayCart();

}


// ================================
// DECREASE QUANTITY
// ================================

function decreaseQuantity(index) {

    if (cart[index].quantity > 0) {

        cart[index].quantity--;

    }


    updateCartCount();

    displayCart();

}


// ================================
// REMOVE PRODUCT
// ================================

function removeItem(index) {

    cart[index].quantity = 0;

    updateCartCount();

    displayCart();

}


// ================================
// CLOSE CART
// ================================

function closeCart() {

    document.getElementById("cartPopup").style.display = "none";

}


// ================================
// PLACE ORDER
// ================================
function placeOrder(event) {

    event.preventDefault();

    let name = document.getElementById("customerName").value;
    let phone = document.getElementById("customerPhone").value;
    let address = document.getElementById("customerAddress").value;
    let paymentMethod = document.getElementById("paymentMethod").value;

    let orderedProducts = [];
    let totalQuantity = 0;
    let total = 0;

    cart.forEach(function(product) {

        if (product.quantity > 0) {

            orderedProducts.push(
                product.name + " x " + product.quantity
            );

            totalQuantity =
                totalQuantity + product.quantity;

            total =
                total + (product.price * product.quantity);
        }

    });

    if (totalQuantity === 0) {

        alert("Please select at least one perfume.");

        return;
    }

    let orderData = {

        name: name,
        phone: phone,
        address: address,
        products: orderedProducts.join(", "),
        quantity: totalQuantity,
        total: total,
        paymentMethod: paymentMethod
    };


    fetch("https://script.google.com/macros/s/AKfycbwKbuwT4wUWa8TGUWAjBECtATr0G74_f4lGlRwFDIt4M8VE43CWYt1jgNM9uF5kHvLn-Q/exec", {

        method: "POST",

        body: new URLSearchParams(orderData)

    })

    .then(function() {

    let whatsappNumber = "923112556930";

    let whatsappMessage =
        "🛍️ New Order - Perfume by Haram\n\n" +
        "Customer: " + name + "\n" +
        "Phone: " + phone + "\n" +
        "Address: " + address + "\n\n" +
        "Products: " + orderedProducts.join(", ") + "\n" +
        "Total Quantity: " + totalQuantity + "\n" +
        "Total Bill: Rs. " + total + "\n\n" +
        "Payment: " + paymentMethod;

    let whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(whatsappMessage);

    window.open(whatsappURL, "_blank");

    alert(
        "Thank you " +
        name +
        "!\n\nYour order has been received."
    );

    document.getElementById("cartPopup").style.display = "none";

    document.querySelector(".order-box form").reset();

})


    .catch(function(error) {

        alert("Order could not be sent. Please try again.");

        console.error(error);

    });

}
document.getElementById("paymentMethod").addEventListener("change", function() {

    let bankDetails = document.getElementById("bankDetails");

    if (this.value === "Bank Transfer") {

        bankDetails.style.display = "block";

    } else {

        bankDetails.style.display = "none";

    }

});
/* =========================
   PREMIUM 3D MOUSE EFFECT
========================= */

document.querySelectorAll(".perfume-card").forEach(card => {

    card.addEventListener("mousemove", function(e) {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY =
            ((x - centerX) / centerX) * 8;

        const rotateX =
            ((centerY - y) / centerY) * 8;

        card.style.transform = `
            perspective(1200px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-15px)
            scale(1.02)
        `;
    });

    card.addEventListener("mouseleave", function() {

        card.style.transform = "";

    });

});
document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCountElement = document.getElementById("cart-count");

    // Ensure cart count updates on every page
    if (cartCountElement) {
        cartCountElement.textContent = `(${cart.length})`;
    }

    // Only run the add-to-cart functionality if the buttons exist
    let addToCartButtons = document.querySelectorAll(".add-to-cart");
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                let productCard = event.target.closest(".card");
                let productName = productCard.querySelector(".card-title").textContent;
                let productPrice = productCard.querySelector(".card-text").textContent.replace("$", "");
                let productImage = productCard.querySelector("img").src;

                // Store product details
                cart.push({ name: productName, price: productPrice, image: productImage });
                localStorage.setItem("cart", JSON.stringify(cart));

                // Update cart count on all pages
                if (cartCountElement) {
                    cartCountElement.textContent = `(${cart.length})`;
                }

                // Show toast notification
                let toastElement = new bootstrap.Toast(document.getElementById("cartToast"));
                document.querySelector("#cartToast .toast-body").textContent = `${productName} added to cart!`;
                toastElement.show();
            });
        });
    }
});

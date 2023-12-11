const productsList = document.getElementById("productsList");
const reviewsList = document.getElementById("reviewsList");
const products = JSON.parse(localStorage.getItem("products")) || [];

function updateProductsList(products) {
    productsList.innerHTML = "";
    products.forEach((product) => {
        const option = document.createElement("option");
        option.value = product.name;
        option.textContent = product.name;
        productsList.appendChild(option);
    });
}

updateProductsList(products);

function updateReviews(reviews) {
    reviewsList.innerHTML = "";

    reviews.forEach((review, index) => {
        const reviewItem = document.createElement("div");
        reviewItem.className = "review-item";

        const reviewText = document.createElement("p");
        reviewText.textContent = `${index + 1}. ${review.text}`;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", () => {
            reviews.splice(index, 1);

            localStorage.setItem("products", JSON.stringify(products));

            updateReviews(reviews);
        });

        reviewItem.appendChild(deleteButton);
        reviewItem.appendChild(reviewText);
        reviewsList.appendChild(reviewItem);
    });
}

productsList.addEventListener("change", () => {
    const selectedProduct = productsList.value;
    const products = JSON.parse(localStorage.getItem("products")) || [];

    const selectedProductData = products.find((product) => product.name === selectedProduct);

    if (selectedProductData) {
        reviewsList.innerHTML = "";

        selectedProductData.reviews.forEach((review, index) => {
            const reviewItem = document.createElement("div");
            reviewItem.className = "review-item";

            const reviewText = document.createElement("p");
            reviewText.textContent = `${index + 1}. ${review.text}`;

            const deleteButton = document.createElement("button");
            deleteButton.className = "delete-button";
            deleteButton.addEventListener("click", () => {
                selectedProductData.reviews.splice(index, 1);
                localStorage.setItem("products", JSON.stringify(products));

                updateReviews(selectedProductData.reviews);
            });

            reviewItem.appendChild(reviewText);
            reviewItem.appendChild(deleteButton);
            reviewsList.appendChild(reviewItem);
        });
    } else {
        reviewsList.innerHTML = "";
    }
});

reviewsList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        const selectedProduct = productsList.value;
        const products = JSON.parse(localStorage.getItem("products")) || [];
        const selectedProductData = products.find((product) => product.name === selectedProduct);

        if (selectedProductData) {
            const reviewItem = event.target.closest(".review-item");
            if (reviewItem) {
                const reviewIndex = Array.from(reviewsList.children).indexOf(reviewItem);

                if (reviewIndex !== -1) {
                    selectedProductData.reviews.splice(reviewIndex, 1);
                    localStorage.setItem("products", JSON.stringify(products));
                    
                    updateReviews(selectedProductData.reviews);
                }
            }
        }
    }
});

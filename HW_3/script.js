document.addEventListener("DOMContentLoaded", () => {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const productNameInput = document.getElementById("productName");
    const reviewTextInput = document.getElementById("reviewText");
    const addReviewButton = document.getElementById("addReview");

    addReviewButton.addEventListener("click", () => {

        try {
            const productName = productNameInput.value;
            const reviewText = reviewTextInput.value;

            if (!productName.trim() || !reviewText.trim()) {
                throw new Error("Поля не должны быть пустыми!");
            }

            let products = JSON.parse(localStorage.getItem("products")) || [];
            const productIndex = products.findIndex((product) => product.name === productName);

            if (productIndex === -1) {
                products.push({ name: productName, reviews: [{ text: reviewText }] });
            } else {
                products[productIndex].reviews.push({ text: reviewText });
            }

            localStorage.setItem("products", JSON.stringify(products));

            productNameInput.value = "";
            reviewTextInput.value = "";

        } catch (error) {
            console.error(error);
            alert(error.message);
        }

    });

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
});

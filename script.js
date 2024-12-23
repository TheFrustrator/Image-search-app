const accessKey = "ndrHnY-EQ3ACTVgPrkTAz_7zFsTA0MZS0gGorZQt1js";
const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = searchInputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (page === 1) {
            searchResultEl.innerHTML = ""; // Clear previous results on a new search
        }

        const results = data.results;

        results.forEach((result) => {
            // Create a container for each image and its link
            const imageWrapper = document.createElement("div");
            imageWrapper.classList.add("search-result");

            // Create and set the image element
            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description || "Image";

            // Create and set the link element
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.rel = "noopener noreferrer";
            imageLink.textContent = result.alt_description || "View Image";

            // Append the image and link to the wrapper
            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);

            // Append the wrapper to the results container
            searchResultEl.appendChild(imageWrapper);
        });

        // Show the "Show More" button if results are available
        if (results.length > 0) {
            showMoreButtonEl.style.display = "block";
        } else {
            showMoreButtonEl.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching images:", error);
        searchResultEl.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
    }
}

// Event listener for form submission
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1; // Reset to the first page for a new search
    searchImages();
});

// Event listener for "Show More" button
showMoreButtonEl.addEventListener("click", () => {
    page++; // Increment the page number
    searchImages();
});

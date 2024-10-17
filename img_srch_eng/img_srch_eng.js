const accessKey = "eSUSeEvbEZPG0kIRJF6vHk4dndYYkCjd6Rezq61hD0g"

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

let keyword = "";
let page = 1;

async function searchImages(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

const response = await fetch(url);      // Send a request to the Unsplash API and wait for the response
const data = await response.json();     // Convert the response to JSON format

if(page === 1){                          //If it's the first page of results, clear the previous search results
    searchResult.innerHTML = "";
}

const results = data.results;           //Get the search results from the API response

results.map((result)=>{                 // Use the map function to create image elements for each result
    const image = document.createElement("img");
        image.src = result.urls.small; // Set the image source to the small version of the image URL
        const imageLink = document.createElement("a");          // Create an <a> element for the link to the Unsplash page
        imageLink.href = result.links.html; // Set the link to the full image page on Unsplash
        imageLink.target = "_blank"; // Ensure the link opens in a new tab

        // Add the image to the link
        imageLink.appendChild(image);

        // Add the link to the search results container
        searchResult.appendChild(imageLink);
    });
showMoreBtn.style.display = "block";    // Make the "Show More" button visible

}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission behavior (which would reload the page)
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click",() =>{
    page++;
    searchImages();
})


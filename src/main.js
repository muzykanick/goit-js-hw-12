import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { getInfo } from "./js/pixabay-api.js";
import { createMarkup } from "./js/render-functions.js";

const form = document.querySelector(".search-form ");
const list = document.querySelector(".js-list");
const loader = document.querySelector(".loader");
const loadMoreButton = document.querySelector(".load-more-button");

form.addEventListener("submit", searchImages);
loadMoreButton.addEventListener("click", loadMore);

function loaderShow() {
    loader.classList.toggle("visible");
}

function showLoadMoreButton(isVisible) {
    if (isVisible) {
        loadMoreButton.classList.add("visible-button");
    } else {
        loadMoreButton.classList.remove("visible-button");
    }
}

const lightbox = new SimpleLightbox('.images a', {
    captionsData: 'alt',
    captionDelay: 250,
});


let searchQuery = "";
let page = 1;
let totalPages = 0;




async function searchImages(event) {
    event.preventDefault();
    list.innerHTML = "";  
    page = 1; 

    const { query } = event.currentTarget.elements;
    searchQuery = query.value.trim();

    if (searchQuery === '') {
        iziToast.error({
            title: 'Error',
            message: 'The field cannot be empty!!!',
            position: 'topRight',
        });
        return;
    };

    loaderShow();

    try {
        const data = await getInfo(searchQuery, page);
        if (data.hits.length === 0) {
            iziToast.warning({
                title: '',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
            });
            showLoadMoreButton(false);  
            return;
        }
        list.insertAdjacentHTML("beforeend", createMarkup(data.hits));
        lightbox.refresh();
        totalPages = Math.ceil(data.totalHits / 15);
        showLoadMoreButton(page < totalPages); 
        form.reset();
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'An error occurred while fetching data. Please try again later.',
            position: 'topRight',
        });
    } finally {
        loaderShow();
    }
}

async function loadMore() {
    page += 1;
    loaderShow();

    try {
        const data = await getInfo(searchQuery, page);
        list.insertAdjacentHTML("beforeend", createMarkup(data.hits));
        lightbox.refresh();

        if (page === totalPages) {
            showLoadMoreButton(false);  
            iziToast.info({
                title: '',
                message: "We're sorry, but you've reached the end of search results.",
                position: 'bottomRight',
            });
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'An error occurred while fetching data. Please try again later.',
            position: 'topRight',
        });
    } finally {
        loaderShow();
    }
}




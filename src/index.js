import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"
import Notiflix from "notiflix";

const form = document.querySelector("#search-form");
form.addEventListener("submit", serch)
const input = document.querySelector("input");
const galleryEl = document.querySelector(".gallery");
const buttonLodeMore = document.querySelector(".load-more");
buttonLodeMore.addEventListener("click", build);


let value = null;
let page = 1;
let gallery = new SimpleLightbox('.gallery a');


async function serch(event) {
    event.preventDefault();

    if (value === input.value.trim()) {
        return;
    }
    
    clear()
    page = 1;
    value = input.value.trim();

    if (input.value.trim().length <= 0) {
        return
    }
    
    try {
        const serverAnsvear = await searchImages(input.value, 1);
        if (serverAnsvear.total === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
            return;
        }
        Notiflix.Notify.info(`Hooray! We found ${serverAnsvear.total} images.`)

        if (!buttonLodeMore.classList.contains("display-none")) {
            buttonLodeMore.classList.add("display-none")
        }

        build()
        if (serverAnsvear.total > 40) {
            buttonLodeMore.classList.remove("display-none");
        }
        
        return;
    } catch (error) {
        Notiflix.Notify.failure("error: " + error.massege)
    }
}

async function searchImages(text, numberOfPage) {
    const serverAnsvear = await axios.get(`https://pixabay.com/api/?key=34918981-d8b731f885ecb543159a62dfc&q=${text.split(" ").join("+")}&image_type=photo&orientation=horizontal&safesearch=true&page=${numberOfPage}&per_page=${numberOfPage === 13 ? 20 : 40}`)
        

    return serverAnsvear.data;
}

async function build() {
    const imagesToPage = await searchImages(value, page);
    if (imagesToPage.hits.length < 40) {
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
        buttonLodeMore.classList.add("display-none")
    }
    try {
        for (let i = 0; imagesToPage.hits.length > i; i += 1) {
            galleryEl.insertAdjacentHTML("beforeend", `
            <div class="photo-card">
            <a class="gallery__link" href=${imagesToPage.hits[i].largeImageURL}>
            <img src=${imagesToPage.hits[i].webformatURL} alt=${imagesToPage.hits[i].tags} href=${imagesToPage.hits[i].largeImageURL} loading="lazy" width="360"/>
            </a>
            <div class="info">
            <p class="info-item">
            <b>Likes</br>${imagesToPage.hits[i].likes}</b>
            </p>
            <p class="info-item">
            <b>Views</br>${imagesToPage.hits[i].views}</b>
            </p>
            <p class="info-item">
            <b>Comments</br>${imagesToPage.hits[i].comments}</b>
            </p>
            <p class="info-item">
            <b>Downloads</br>${imagesToPage.hits[i].downloads}</b>
            </p>
            </div>
            </div>
            `);
        };

        page += 1;
        gallery.refresh(); 
    } catch (error) {
        Notiflix.Notify.failure("error: " + error.massege)
    }
    return;
}

function clear() {
    [...galleryEl.children].forEach(element => element.remove());
}
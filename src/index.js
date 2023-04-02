import axios from "axios";

const form = document.querySelector("#search-form");
form.addEventListener("submit", serch)
const input = document.querySelector("input");
const gallery = document.querySelector(".gallery");
const buttonLodeMore = document.querySelector(".load-more");
buttonLodeMore.addEventListener("click", build);


let value = null;
let page = 1;


async function serch(event) {
    event.preventDefault();

    clear()

    if (value === input.value.trim()) {
        return;
    }

    page = 1;
    value = input.value.trim();

    try {
        if (input.value.trim().length <= 0) {
            return
        }
       
        const serverAnsvear = await searchImages(input.value, 1);
        console.log(serverAnsvear)
        if (serverAnsvear.total === 0) {
            console.log("Sorry, there are no images matching your search query. Please try again.")
            return;
        }

        build()
        buttonLodeMore.classList.remove("dosplay-none");
        return;
    } catch (error) {
        console.log(error)
    }
}

async function searchImages(text, numberOfPage) {
    const serverAnsvear = await axios.get(`https://pixabay.com/api/?key=34918981-d8b731f885ecb543159a62dfc&q=${text.split(" ").join("+")}&image_type=photo&orientation=horizontal&safesearch=true&page=${numberOfPage}&per_page=40`)
        

    return serverAnsvear.data;
}

async function build() {
    const imagesToPage = await searchImages(value, page);
    try {
        for (let i = 0; imagesToPage.hits.length > i; i += 1) {
            gallery.insertAdjacentHTML("beforeend", `<div class="photo-card">
      <img src=${imagesToPage.hits[i].webformatURL} alt=${imagesToPage.hits[i].tags} href=${imagesToPage.hits[i].largeImageURL} loading="lazy" width="360"/>
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
    </div>`);
        };

        page += 1;
    } catch (error) {
        console.log(error);
    }
    return;
}

function clear() {
    [...gallery.children].forEach(element => element.remove());
    console.log(gallery.children)
}
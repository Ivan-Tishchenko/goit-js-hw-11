import axios from "axios";

console.log("Asdas")
console.log(searchImages("red").json());

 async function searchImages(text) {
    const serverAnsvear = await axios.get(`https://pixabay.com/api/?key=34918981-d8b731f885ecb543159a62dfc&q=${text.split(" ").join("+")}&image_type=photo&orientation=horizontal&safesearch=true`)
        

    return serverAnsvear;
}

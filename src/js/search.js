import axios from "axios";

export default async function searchImages(text) {
    const serverAnsvear = await axios.get(`https://pixabay.com/api/?key=34918981-d8b731f885ecb543159a62dfc&q=${text.split(" ").join("+")}&image_type=photo&orientation=horizontal&safesearch=true`)
    const imgJson = await serverAnsvear.then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    }).then(data => {
        if (data.length === 0) {
            // ("Sorry, there are no images matching your search query. Please try again.")
        } else {
            return data;
        }
    }).catch(error => {
        console.log(error.mesage);
    });

    return imgJson;
}
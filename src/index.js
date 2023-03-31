import searchImages from "./js/search";
import axios from "axios";

console.log("Asdas")
console.log(searchImages("red")
    .then(response => {
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
    }););
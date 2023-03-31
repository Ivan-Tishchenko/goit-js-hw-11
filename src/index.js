import searchImages from "./js/search";
import axios from "axios";

console.log("Asdas")
console.log(searchImages("red").then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    }).catch(error => {
        console.log(error.mesage);
    }));
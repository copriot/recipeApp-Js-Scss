import { Search } from "./js/api.js";
import { elements } from "./js/helpers.js";

//console.log(elements.resultsList);

function handleSubmit(e){
    e.preventDefault();
    //console.log("gönderildi");
    //aratılan kelime
    const query = elements.searchInput.value;
    //inputun içi boşsa bildirim gönder
    if(query == ""){
        alert("You did not fill the input")
    }else{

    }
    if(query){
        const search = new Search(query);
        console.log(search.getResults());
    }
};
elements.form.addEventListener("submit",handleSubmit)
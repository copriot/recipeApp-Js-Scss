import { Search } from "./js/api.js";
import { elements } from "./js/helpers.js";
import { renderResult } from "./js/ui.js";

//console.log(elements.resultsList);

async function handleSubmit(e){
    e.preventDefault();
    //console.log("gönderildi");
    //aratılan kelime
    const query = elements.searchInput.value.trim();
    //inputun içi boşsa bildirim gönder
    if(query == ""){
        alert("You did not fill the input")
    }else{

    }
    if(query){
        const search = new Search(query);

        //istek atma
        try{
            await search.getResults();
            renderResult(search.result)
        }catch(error){
            console.log(error);
        }
    }
};
elements.form.addEventListener("submit",handleSubmit)
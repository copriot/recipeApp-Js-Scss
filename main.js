import { Search } from "./js/api.js";
import { elements } from "./js/helpers.js";
import { Recipe } from "./js/recipe.js";
import { renderLoader, renderResult } from "./js/ui.js";


const recipe = new Recipe();



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
    //inputun içine herhangi bir şey yazarsak çalışır
    if(query){
        //search sınıfının bir örneğini oluşturur
        const search = new Search(query);
        //istek atmaya başlamadan önce loaderı çalıştırmalıyız ve ekrana aktarmalıyız
        renderLoader(elements.resultsList)
        //istek atma
        try{
            await search.getResults();
            //gelen veriyi ekrana renderlayan fonksiyon
            renderResult(search.result)
        }catch(error){
            console.log(error);
        }
    }
};
elements.form.addEventListener("submit",handleSubmit);
//tarif detaylarını alma
const controlRecipe = async () => {
// console.log("değişti");
// console.log(window);
const id = document.location.hash.replace("#", "");
//console.log(id);


if(id){
    //tarif bilgilerini al
   try {await recipe.getRecipe(id);

    //ekrana tarif arayüzünü aktarma
recipe.renderRecipe(recipe.info);

   }

   catch(error){
    console.log(error);
   };
}
};

//tekrar eden işlemlerde döngü kullanabiliriz.
// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);

["hashchange","load"].forEach((event)=> window.addEventListener(event, controlRecipe));
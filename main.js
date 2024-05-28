import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { v4 } from "https://jspm.dev/uuid";
import { Search } from "./js/api.js";
import { controlBtn, elements, getFromLocal, setLocalStorage } from "./js/helpers.js";
import { Recipe } from "./js/recipe.js";
import { renderBasketItems, renderLoader, renderResult } from "./js/ui.js";




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



let basket = getFromLocal("basket") || [];

document.addEventListener("DOMContentLoaded", ()=> {
renderBasketItems(basket);

//sepette eleman varsa butonu göster
controlBtn(basket)
});

//tarif alanındaki tıklamlarda çalışır
const handleClick = (e) => {
//console.log(e.target.id);
if(e.target.id === "add-to-basket"){
    //tarifler dizisini dön
recipe.ingredients.forEach((title)=> {
 const newItem = {
    id:v4 (),
    title,
 };//tarifleri basket dizisine ekleme
 basket.push(newItem)
});

//sepeti locale kaydetme
setLocalStorage("basket", basket);
//ekrana sepet elemaanlarını basma
renderBasketItems(basket);
//sepeti temizleme butonunu göster
controlBtn(basket);

}
if(e.target.id === "like-btn"){
recipe.controlLike();
}
};

//sepete ekle butonuna ve likelamaya tıklanma olayını izleme
elements.recipeArea.addEventListener("click", handleClick);
console.log(uuidv4());

elements.basketList.addEventListener("click", deleteItem);

//sepetten eleman kaldırma
function deleteItem (e){
    if(e.target.id === "delete-item"){
        console.log("delete-item id e tıkladın");
        const parent = e.target.parentElement;
        console.log(parent);
        //seçilen ürünü diziden kaldırmak için id e erişme
        basket =basket.filter((i)=>i.id !== parent.dataset.id);
        console.log(basket);
        //local storageyi güncelleme
        setLocalStorage("basket", basket);
        parent.remove();
        //temizle butonunu tekrar kontrol ettik
        controlBtn(basket);
    }
};
//temizleme butonuna tıklanma olayını izle
elements.clearBtn.addEventListener("click",handleClear)

function handleClear(){
    const response = confirm("Are you sure you want to delete the basket ?");
    if(response) {
        setLocalStorage("basket", null);
        basket = [];
        controlBtn(basket);
        elements.basketList.innerHTML = "";
        console.log(basket);
    }
}
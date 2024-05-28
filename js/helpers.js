export const elements = {
    form:document.querySelector("form"),
    searchInput:document.querySelector("form input"),
    resultsList:document.querySelector(".results"),
    recipeArea: document.querySelector(".recipe"),
    likeList:document.querySelector(".list"),
    basketList:document.querySelector(".shopping ul"),
    clearBtn: document.querySelector("#clear"),
};
//localStorage veri ekleme/güncelleme
export const setLocalStorage = (key, data) => {
    //verileri stringe çevirme
   const stringData = JSON.stringify(data);
   //verileri localstorageye kaydetme
   localStorage.setItem(key, stringData);
};
export const getFromLocal = (key) => {
    //veriyi localden string alma
   const stringData = localStorage.getItem(key);
  return JSON.parse(stringData);


  
};
// sepetin doluluk oranına göre sepeti temizle butonunu göster
// export const controlBtn = (basket) => {
//     // console.log(basket.length);
//     if (basket.length > 0) {
//       elements.clearBtn.style.display = "flex";
//     } else {
//       elements.clearBtn.style.display = "none";
//     }
//   };
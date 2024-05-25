export class Search {
    constructor(query) {
        this.query = query;
        this.result = [];
    }
    async getResults(){
       const res = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
     //  console.log(res);
    const data = await res.json();
    //console.log(data.recipes);
    this.result = data.recipes;
    }
}
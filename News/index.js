//variables
const generalbtn = document.getElementById("general");
const businessbtn = document.getElementById("business");
const sportsbtn = document.getElementById("sports");
const enetertainmentbtn = document.getElementById("entertainment");
const technologybtn = document.getElementById("technolgy");
const searchbtn = document.getElementById("searchbtn");
const newsquery = document.getElementById("newsquery")
const newstype = document.getElementById("newsType")
const newsdetails = document.getElementById("newsdetails")

// Array
var newsDataArray = [];

//apis
const API_KEY = "c45c6401f6614abeb196600f680d8a64"
const GENERAL_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey="
const HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines?country=us&apiKey="
const BUSINESS_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey="
const SPORTS_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey="
const ENTERTAINMENT_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey="
const TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey="
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q="

window.onload = function(){
    newstype.innerHTML = "<h4>Headlines</h4>"
    fetchHeadLines()
}

generalbtn.addEventListener("click",function(){
    newstype.innerHTML = "<h4>General News</h4>"

    fetchGeneralNews();


});


businessbtn.addEventListener("click",function(){
    newstype.innerHTML = "<h4>Business News</h4>"

    fetchbusinessNews();

});
sportsbtn.addEventListener("click",function(){
    newstype.innerHTML = "<h4>Sports News</h4>"

    fetchsportsNews();

});
enetertainmentbtn.addEventListener("click",function(){
    newstype.innerHTML = "<h4>Entertainment News</h4>"

    fetchentertainmentNews();

});
technologybtn.addEventListener("click",function(){
    newstype.innerHTML = "<h4>Technology News</h4>"

    fetchtechnologyNews();

});

searchbtn.addEventListener("click",function(){
    newstype.innerHTML = "<h4>Search : "+newsquery.value+"</h4>"

    fetchqueryNews();

});

const fetchHeadLines= async() =>{
    const response = await fetch(HEADLINES_NEWS+API_KEY);
    newsDataArray = [];

    if(response.status >= 200 &&  response.status < 300){
        const myjson = await response.json();
        newsDataArray = myjson.articles;

    }else{
        //handle errors
        console.log(response.status, response.statusText)
    }
    displaynews();
}





const fetchGeneralNews = async() =>{
    const response = await fetch(GENERAL_NEWS+API_KEY);
    newsDataArray = [];

    if(response.status >= 200 &&  response.status < 300){
        const myjson = await response.json();
        newsDataArray = myjson.articles;

    }else{
        //handle errors
        console.log(response.status, response.statusText)
    }
    displaynews();
}
const fetchbusinessNews = async() =>{
    const response = await fetch(BUSINESS_NEWS+API_KEY);
    newsDataArray = [];

    if(response.status >= 200 &&  response.status < 300){
        const myjson = await response.json();
        newsDataArray = myjson.articles;

    }else{
        //handle errors
        console.log(response.status, response.statusText)

    }
    displaynews();
}
const fetchsportsNews = async() =>{
    const response = await fetch(SPORTS_NEWS+API_KEY);
    newsDataArray = [];

    if(response.status >= 200 &&  response.status < 300){
        const myjson = await response.json();
        newsDataArray = myjson.articles;

    }else{
        //handle errors
        console.log(response.status, response.statusText)

    }
    displaynews();
}
const fetchentertainmentNews = async() =>{
    const response = await fetch(ENTERTAINMENT_NEWS+API_KEY);
    newsDataArray = [];

    if(response.status >= 200 &&  response.status < 300){
        const myjson = await response.json();
        console.log(myjson)
        newsDataArray = myjson.articles;

    }else{
        //handle errors
        console.log(response.status, response.statusText)

    }
    displaynews();
}
const fetchtechnologyNews = async() =>{
    const response = await fetch(TECHNOLOGY_NEWS+API_KEY);
    newsDataArray = [];

    if(response.status >= 200 &&  response.status < 300){
        const myjson = await response.json();
        newsDataArray = myjson.articles;

    }else{
        //handle errors
        console.log(response.status, response.statusText)

    }
    displaynews();
}
const fetchqueryNews = async() =>{

    if(newsquery.value == null)
        return;

    const response = await fetch(SEARCH_NEWS+ encodeURIComponent(newsquery.value)+"&apiKey="+API_KEY);
    newsDataArray = [];

    if(response.status >= 200 &&  response.status < 300){
        const myjson = await response.json();
        newsDataArray = myjson.articles;

    }else{
        //handle errors
        console.log(response.status, response.statusText)

    }
    displaynews();
}

function displaynews(){
    newsdetails.innerHTML = "";

    if(newsDataArray.length == 0){
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    newsDataArray.forEach(news =>{

        var date = news.publishedAt.split("T")

        var col = document.createElement('div')
        col.className = "col-sm-12 col-md-4 col-lg-3 p-2"

        var card = document.createElement('div')
        card.className = "p-2"
        var image = document.createElement('img');
        image.setAttribute("height","matchparnt");
        image.setAttribute("width","100%" )
        image.src =news.urlToImage;

        var cardbody = document.createElement('div')
        var newsHeading = document.createElement('h5')
        newsHeading.className = "card-title"
        newsHeading.innerHTML = news.title;

        var dateheading = document.createElement('h6')
        dateheading.className = "text-primary";
        dateheading.innerHTML = date[0];

        var description  = document.createElement('p')
        description.className = "text-muted";
        description.innerHTML = news.description;
         
        var link = document.createElement('a')
        link.className = "btn btn-dark"
        link.setAttribute("target","_blank")
        link.href = news.url
        link.innerHTML = "Read more"

        cardbody.appendChild(newsHeading)
        cardbody.appendChild(dateheading)
        cardbody.appendChild(description)
        cardbody.appendChild(link)

        card.appendChild(image)
        card.appendChild(cardbody)

        col.appendChild(card)

        newsdetails.appendChild(col)


    })
}
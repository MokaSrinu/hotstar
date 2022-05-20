
async function fetchhotstar(){
    try {
        var value=document.querySelector("#searchinput").value;
        var url=`http://www.omdbapi.com/?apikey=cd2f6af1&s=${value}`;
        //let url=`https://api.themoviedb.org/3/search/movie?api_key=36c22518537c38126cf3f7290a4e1da7&language=en-US&page=1&include_adult=false&query=${value}`
        let response=await fetch(url);
        let data=await response.json();
        console.log(data.Search);
        displaydata(data.Search);
    } catch (error) {
        
    }
}



function displaydata(data){
    document.querySelector("#container").innerHTML=""
    let card=document.createElement("div");
    card.setAttribute("id","card");
    data.forEach((ele)=>{
       let {imdbID,Title}=ele;
       let p=document.createElement("p");
       p.innerText=Title;
       document.querySelector("#container").style="overflow-y:scroll";
       p.addEventListener("click",()=>{
           console.log("click");
           document.querySelector("#searchinput").value=Title;
           document.querySelector("#container").innerHTML=" ";
           document.querySelector("#container").style="overflow-y:unset";
           localStorage.clear();
           localStorage.setItem("movieid",imdbID);
           searchthemovie();
       })
       card.append(p);
    })
    document.querySelector("#container").append(card);
}
let  timerid;
function debounce(func,delay){
   if(timerid){
       clearTimeout(timerid);
   }
   timerid=setTimeout(()=>{
       func();
   },delay);
}


async function displaymoviedata(){
    try {
        var movie_id=localStorage.getItem("movieid");
        //let url=`https://api.themoviedb.org/3/movie/${movie_id}?api_key=36c22518537c38126cf3f7290a4e1da7&language=en-US`
        var url="http://www.omdbapi.com/?apikey=cd2f6af1&i="+movie_id;
        let response=await fetch(url);
        let data=await response.json();
        console.log(data);
       // displaydata(data.results);
    } catch (error) {
        
    }
}

let url2=`https://api.themoviedb.org/4/?api_key=36c22518537c38126cf3f7290a4e1da7/movie/recommendations?page=1`
//https://image.tmdb.org/t/p/w500

function searchthemovie(){
    event.preventDefault();
    var movie_id=localStorage.getItem("movieid");
    var url="http://www.omdbapi.com/?apikey=cd2f6af1&i="+movie_id;
     const response=fetch(url);
       response.then(response1=>response1.json())
       .then((res)=>{
               document.querySelector("#container").innerHTML="";
               var box=document.createElement("div");
               var image=document.createElement("img");
               image.src=res.Poster;
               if(res.Poster==undefined){
                var image1=document.createElement("img");
                image1.src=" https://i.makeagif.com/media/11-04-2015/mfnzwt.gif";
                document.querySelector("#conatiner1").append(image1);
                throw new Error();
              }
               var title=document.createElement("p");
               title.innerText="Title:"+res.Title;
               var released=document.createElement("p");
               released.innerText="Release Date:"+res.Released;
               var rating=document.createElement("p");
               rating.innerText="IMDB Rating:"+res.imdbRating;
               if(res.imdbRating>8.5){
                   var tag=document.createElement("button");
                   tag.innerText="Recommonded";
                   tag.setAttribute("id","tag");
                   //image.append(tag);
                   box.append(image,tag,title,released,rating);
                   document.querySelector("#container").append(box);
               }else{
                box.append(image,title,released,rating);
                document.querySelector("#container").append(box);
               }
              
            })
    
} 


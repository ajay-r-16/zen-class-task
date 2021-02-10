


async function search(){
    let search_key = document.getElementById("text").value;
    
    let response = await fetch("http://api.tvmaze.com/search/shows?q="+search_key);
    let data = await response.json();
    let show_list = document.getElementById("shows");
    show_list.remove();
    show_list = document.createElement("div");
    show_list.className="container p-5 bg-light";
    show_list.id="shows";
    for(let i=0; i<data.length; i++){
        
        let div = document.createElement("div");
        div.className="card";
        div.style = "margin:10px; width:200px; border: 2px solid";
    
        let img = document.createElement("img");
        if(data[i].show.image==null){
            img.alt="";
        }
        else{
            img.src = data[i].show.image.medium; 
        }
        img.style="height:180px; width:200px";
        img.className="card-img-top";
        let title = document.createElement("p");
        title.innerHTML= "Name : "+ data[i].show.name;
        let premiered = document.createElement("p");
        premiered.innerHTML="Premiered on : "+data[i].show.premiered;
        let genres = document.createElement("p");
        genres.innerHTML = "Genres : "+data[i].show.genres;
        let network = document.createElement("p");
        network.innerHTML = "Network : "+data[i].show.network.name;
        div.append(img,title,premiered,genres,network);
        show_list.append(div);
        
    }
    show_list.style = "width: 90%;display: flex;flex-direction: row; flex-wrap: wrap;border-radius: 10px;"
    document.body.append(show_list);
}


const characters = 2134 ;
let page_size = 10;
let content = document.getElementById("data");

var Pagination = {

    code: '',

    Extend: function(data) {
        data = data || {};
        Pagination.size = data.size || 300;
        Pagination.page = data.page || 1;
        Pagination.step = data.step || 3;
    },

    Add: function(s, f) {
        for (var i = s; i < f; i++) {
            Pagination.code += '<a>' + i + '</a>';
        }
    },


    Last: function() {
        Pagination.code += '<i>...</i><a>' + Pagination.size + '</a>';
    },


    First: function() {
        Pagination.code += '<a>1</a><i>...</i>';
    },


    Click: function() {
        Pagination.page = +this.innerHTML;
        Pagination.Start();
        getData(Pagination.page);
    },

    Prev: function() {
        Pagination.page--;
        if (Pagination.page < 1) {
            Pagination.page = 1;
        }
        Pagination.Start();
        getData(Pagination.page);
    },

    
    Next: function() {
        Pagination.page++;
        if (Pagination.page > Pagination.size) {
            Pagination.page = Pagination.size;
        }
        Pagination.Start();
        getData(Pagination.page);
    },



    Bind: function() {
        var a = Pagination.e.getElementsByTagName('a');
        for (var i = 0; i < a.length; i++) {
            if (+a[i].innerHTML === Pagination.page) a[i].className = 'current';
            a[i].addEventListener('click', Pagination.Click, false);
        }
    },

    
    Finish: function() {
        Pagination.e.innerHTML = Pagination.code;
        Pagination.code = '';
        Pagination.Bind();
    },

    Start: function() {
        if (Pagination.size < Pagination.step * 2 + 6) {
            Pagination.Add(1, Pagination.size + 1);
        }
        else if (Pagination.page < Pagination.step * 2 + 1) {
            Pagination.Add(1, Pagination.step * 2 + 4);
            Pagination.Last();
        }
        else if (Pagination.page > Pagination.size - Pagination.step * 2) {
            Pagination.First();
            Pagination.Add(Pagination.size - Pagination.step * 2 - 2, Pagination.size + 1);
        }
        else {
            Pagination.First();
            Pagination.Add(Pagination.page - Pagination.step, Pagination.page + Pagination.step + 1);
            Pagination.Last();
        }
        Pagination.Finish();
    },



    Buttons: function(e) {
        var nav = e.getElementsByTagName('a');
        nav[0].addEventListener('click', Pagination.Prev, false);
        nav[1].addEventListener('click', Pagination.Next, false);
    },

    
    Create: function(e) {

        var html = [
            '<a>&#9668;</a>', 
            '<span></span>',  
            '<a>&#9658;</a>'  
        ];

        e.innerHTML = html.join('');
        Pagination.e = e.getElementsByTagName('span')[0];
        Pagination.Buttons(e);
    },

  
    Init: function(e, data) {
        Pagination.Extend(data);
        Pagination.Create(e);
        Pagination.Start();
    }
};





var init = function(a,b,c) {
    Pagination.Init(document.getElementById('pagination'), {
        size: a, 
        page: b, 
        step: c   
    });
};

function changeSize(event){
    
    page_size = +event.target.value
    init( Math.ceil(characters/page_size)  , 1, 3);
    getData(1);
}

document.addEventListener('DOMContentLoaded', ()=>{ init( Math.ceil(characters/page_size)  , 1, 3); getData(1) }, false);


async function getData(page){
    let response = await fetch('https://www.anapioficeandfire.com/api/characters?page='+page+'&pageSize='+page_size);
    let data = await response.json();
    console.log(data)
    let n = data.length;
    content.innerHTML = "";
    for(let i=0; i<n; i++){
        let div = document.createElement("div");
        div.style= "margin-bottom: 25px; background-color: lightgrey; padding: 10px 30px; border:3px solid grey";
        div.className = "card";
        let h3 = document.createElement("h3");
        h3.className = "card-title"
        let body = document.createElement("div");
        body.className = "card-body row"
        h3.innerHTML = data[i].name ? "<u>"+data[i].name+"</u>": "<u> Anonymous Character </u>";
        div.append(h3);
        for(let j in data[i]){
            if(j=="name")
                continue;

            let p = document.createElement("p");
            p.className = "col-md-6"
            
            if(typeof(data[i][j]) == "object"){
                let q = document.createElement("p"); 
                q.innerHTML = j.bold()+" : "
                p.append(q);
                data[i][j].map((a)=>{   
                                let q = document.createElement("p");
                                q.innerHTML = a; 
                                p.append(q)  
                            } );
                
            }
            else{
                p.innerHTML = j.bold()+" : "+(data[i][j].length != 0 ? data[i][j] : "-".bold());
            }
            body.append(p);
        }
        div.append(body);
        content.append(div);
    }
    
}



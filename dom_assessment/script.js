

//Create table structure to display contents
var content = document.createElement("div");
content.setAttribute("style","width:60%; margin: 50px auto; ");
var table = document.createElement("table");
table.setAttribute("style","font-family:Arial, Helvetica, sans-serif; border-collapse: collapse; width:100%");

var i,j, curr_page = 1; // curr_page represents the current active page.

//Table Heading
let row = document.createElement("tr");
let col1 = document.createElement("th");
col1.setAttribute("style","border: 2px solid white; padding-top:12px; padding-bottom:12px; text-align:center; background-color:#4CAF50; color:white");

let col2 = document.createElement("th");
col2.setAttribute("style","border: 2px solid white; padding-top:12px; padding-bottom:12px; text-align:center; background-color:#4CAF50; color:white");

let col3 = document.createElement("th");
col3.setAttribute("style","border: 2px solid white; padding-top:12px; padding-bottom:12px; text-align:center; background-color:#4CAF50; color:white");

col1.innerHTML="ID";
col2.innerHTML="Name";
col3.innerHTML="Email";
row.append(col1,col2,col3);

//Empty structure for 10 rows in a table to display details
table.append(row);
for(i=0; i<=9; i++){
    let row = document.createElement("tr");
    
    row.setAttribute("id","row"+i);
    row.setAttribute("style","background-color:#ddd");
    for(j=0;j<=2;j++){
        let col = document.createElement("td");
        col.setAttribute("id","col"+i+j);
        col.setAttribute("style","border: 2px solid white; padding:8px; text-align:center");
        row.append(col);
    }
    table.append(row);
    
}

content.append(table);



//Requesting JSON data 
var request = new XMLHttpRequest();
request.open("GET","https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json",true);
request.send();
var result;

request.onload = ()=>{
    result = JSON.parse(request.response); // response

    // Previous page button
    var div = document.createElement("div");
    div.setAttribute("style","display:flex; flex-direction:row;margin-top: 30px; justify-content: center");
    let div1 = document.createElement("div");
    div1.setAttribute("style","padding: 2px");
    let button = document.createElement("button");
    button.setAttribute("id","btn_prev");
    button.setAttribute("style","padding: 7px; background-color: #ddd; font-size:15px");
    button.innerHTML= "<<".bold();
    button.addEventListener("click",function(){
        document.getElementById("btn"+curr_page).setAttribute("style","padding: 7px; background-color: #ddd; font-size:15px");
        document.getElementById("btn"+(curr_page-1)).setAttribute("style","padding: 7px; background-color: green; color:white; font-size:15px");
        curr_page-=1;
        nextPage((curr_page-1)*10,(curr_page)*10);
    });
    div1.append(button);
    div.append(div1);

    //Button for pages 1 to 10
    for(let i=1;i<=10;i++){
        let div1 = document.createElement("div");
        div1.setAttribute("style","padding: 2px");
        let button = document.createElement("button");
        button.setAttribute("id","btn"+i);
        button.setAttribute("style","padding: 7px; background-color: #ddd; font-size:15px");
        button.innerHTML= String(i).bold();
        button.addEventListener("click",function(){
            document.getElementById("btn"+curr_page).setAttribute("style","padding: 7px; background-color: #ddd; font-size:15px");
            this.setAttribute("style","padding: 7px; background-color: green; color:white; font-size:15px");
            curr_page = i;
            nextPage((i-1)*10,i*10);
        });
    
            
        div1.append(button);
        div.append(div1);
    }

    //Next Button
    div1 = document.createElement("div");
    div1.setAttribute("style","padding: 2px");
    button = document.createElement("button");
    button.setAttribute("id","btn_next");
    button.setAttribute("style","padding: 7px; background-color: #ddd; font-size:15px");
    button.innerHTML= ">>".bold();
    button.addEventListener("click",function(){
        document.getElementById("btn"+curr_page).setAttribute("style","padding: 7px; background-color: #ddd; font-size:15px");
        document.getElementById("btn"+(curr_page+1)).setAttribute("style","padding: 7px; background-color: green; color:white; font-size:15px");
        curr_page+=1;
        nextPage((curr_page-1)*10,(curr_page)*10);
    });
    div1.append(button);
    div.append(div1);
    content.append(div);
    document.body.append(content); //Adding all the tags to body

    //Initially First page is shown
    nextPage(0,10);
    document.getElementById("btn1").setAttribute("style","padding: 7px; background-color: green; color:white; font-size:15px");
    
    

}


// Function to get the respective details for each page
function nextPage(i,j){
    if(curr_page==1){
        document.getElementById("btn_prev").disabled = true;
    }
    else{
        document.getElementById("btn_prev").disabled = false;
    }
    if(curr_page==10){
        document.getElementById("btn_next").disabled = true;
    }
    else{
        document.getElementById("btn_next").disabled = false;
    }
    loadPage(result.slice(i,j));
}


// Function to update table for each page
function loadPage(arr){
    for(let i=0;i<=9;i++){
        document.getElementById("col"+i+"0").innerHTML = arr[i].id;
        document.getElementById("col"+i+"1").innerHTML = arr[i].name;
        document.getElementById("col"+i+"2").innerHTML = arr[i].email;
    }
}


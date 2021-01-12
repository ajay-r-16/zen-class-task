let request = new XMLHttpRequest(); // create XMLHttpRequest object

request.open("GET","https://restcountries.eu/rest/v2/all",true); // open the Http connection

request.send(); // Send the connection

request.onload = ()=>{
    let country_details = JSON.parse (request.response) ;
    let n = country_details.length;
    for(let i =0; i<n; i++){
        console.log(country_details[i].flag);
    }
};
let request = new XMLHttpRequest();

request.open("GET", "https://restcountries.eu/rest/v2/all",true);

request.send();

request.onload = ()=>{

    try{
        let countries = JSON.parse(request.response);
        console.log(countries[33].latlng);
        for(let country of countries){
            let latitude = country.latlng[0];
            let longitude = country.latlng[1];
            getWeatherData(latitude,longitude);
        }
    }

    catch(error){
        alert("Error : "+error.message);
    }

};


function getWeatherData(latitude,longitude){
    let weather_request = new XMLHttpRequest();
    weather_request.open("GET",'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=1fb9f0239114bda7e5886e1a9d0338e7',true)

    weather_request.send();
    weather_request.onload = ()=>{
        let weather_data = JSON.parse(weather_request.response);
        console.log(weather_data.main.temp);
    }

}
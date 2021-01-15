let request = new XMLHttpRequest();

request.open("GET", "https://restcountries.eu/rest/v2/all",true);

request.send();

request.onload = ()=>{
    let countries = JSON.parse(request.response);

    // 1. Get all the countries from Asia continent / “region” using Filter function.

    let asia_countries = countries.filter((country)=>{
        return country.region == "Asia"
    });
    console.log("countries of Asia Region : ");
    for(country of asia_countries){
        console.log(country.name);
    }
    console.log("\n\n");

    // ******************************************************************************

    // 2. Get all the countries with population of less than 2 lacs using Filter function.

    let population_lt_2lakh = countries.filter((country)=>{
        return country.population < 200000 
    });
    console.log("population less than 2 lakhs : ");
    for(country of population_lt_2lakh){
        console.log(country.name);
    }
    console.log("\n\n");

    // *******************************************************************************

    // 3. Print the following details name, capital, flag using forEach function.

    countries.forEach(element => {
        console.log(element.name+" - "+element.capital+" - "+element.flag);
    });
    console.log("\n\n");

    // ******************************************************************************

    // 4. Print the total population of countries using reduce function.

    let total_population = countries.reduce((total,element)=>{
        return total + element.population ;
    },0);

    console.log("Total Population : "+total_population);
    console.log("\n\n");

    // ******************************************************************************

    // 5. Print the country which uses US Dollars as currency.

    let USD_countries = countries.filter((country)=>{
        for(let currency of country.currencies){
            if(currency.code=="USD"){
                return true;
            }
        }
        return false;
    })
    console.log("Countries using USD : ")
    for(country of USD_countries){
        console.log(country.name);
    }
};
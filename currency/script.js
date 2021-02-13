code1 = document.getElementById("code1");
code2 = document.getElementById("code2");
currency1 = document.getElementById("currency1");
currency2 = document.getElementById("currency2");
input1 = document.getElementById("input1");


async function getRate(code1 = this.code1.value,code2 = this.code2.value){
    let response = await fetch("https://api.exchangeratesapi.io/latest?base="+code1);
    let data = await response.json();
    input2.value = data.rates[code2]*parseInt((input1.value!=""? input1.value : 0));
}

function changeCode(event,code){
    document.getElementById(code).value = event.target.value;
    getRate();
}

function interchange(){
    let temp = code1.value;
    code1.value = code2.value;
    code2.value = temp;
    temp = currency1.value;
    currency1.value = currency2.value;
    currency2.value = temp;
    input2.interHTML="";
    getRate();
}

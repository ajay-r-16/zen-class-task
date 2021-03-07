function leapYear(year:number):boolean{
    if(year % 4 ===0){
        if(year % 100 ===0){
            if(year % 400 ===0){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return true;
        }
    }
    else{
        return false;
    }
}


function revString(str:string):string{
    let revstr:string="";
    let n = str.length - 1;
    for(let i=n ; i>=0 ; i--){
        revstr = revstr + str[i];
    }
    return revstr;
}


console.log( leapYear(2020) );
console.log( revString("Guvi") );
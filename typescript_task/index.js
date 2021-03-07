function leapYear(year) {
    if (year % 4 === 0) {
        if (year % 100 === 0) {
            if (year % 400 === 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    }
    else {
        return false;
    }
}
function revString(str) {
    var revstr = "";
    var n = str.length - 1;
    for (var i = n; i >= 0; i--) {
        revstr = revstr + str[i];
    }
    return revstr;
}
console.log(leapYear(2020));
console.log(revString("Hello"));

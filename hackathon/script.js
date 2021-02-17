
var auth = "Basic " + btoa("XH0q04CSrZcezgABF8e" + ":" + "X");

var xhr = new XMLHttpRequest();
tickets();

function tickets(){
    document.getElementById("heading").innerHTML = "All Tickets";
    var url = 'https://newaccount1613462048966.freshdesk.com//api/v2/tickets';

    xhr.open("GET", url);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", auth);

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        listTickets(JSON.parse(xhr.responseText));
    }};

    xhr.send();
    document.getElementById("main").innerHTML ="";
}


let other_emails = 0;

function get_time(ms){
    let result = ""
    if(ms){
        ms = parseInt(ms/1000);
        result = ms +" seconds";
    }
    if(ms >=60){
        ms = parseInt(ms/60);
        if(ms==1)
            result = "a minute";
        else
            result = ms+" minutes";
    }
    else{
        return result;
    }
    if(ms >=60){
        ms = parseInt( ms/60);
        if(ms == 1)
            result = "an hour";
        else
            result = ms+" hours";
    }
    else{
        return result;
    }
    if(ms>=24){
        ms= parseInt(ms/24);
        result = ms+ " day";

    }
    return result;
    
}

function contacts(){
    document.getElementById("heading").innerHTML = "All Contacts";
    var url = 'https://newaccount1613462048966.freshdesk.com//api/v2/contacts';

    xhr.open("GET", url);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", auth);

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        listContacts(JSON.parse(xhr.responseText));
    }};

    xhr.send();
    document.getElementById("main").innerHTML ="";
}

function listContacts(data){
    
    let div = document.createElement("div");
    div.className = "container";
    let table = document.createElement("table");
    table.className ="table table-responsive table-bordered table-hover";
    let tr1 = document.createElement("tr");
    tr1.style = "background-color:lightgrey";
    let th1 = document.createElement("th");
    th1.innerHTML = "Contact";
    let th2= document.createElement("th");
    th2.innerHTML = "Title";
    let th3 = document.createElement("th");
    th3.innerHTML = "Company";
    let th4 = document.createElement("th");
    th4.innerHTML = "Email address";
    let th5 = document.createElement("th");
    th5.innerHTML = "Work phone";
    let th6 = document.createElement("th");
    th6.innerHTML = "Facebook";
    let th7 = document.createElement("th");
    th7.innerHTML = "Twitter";
    let th8 = document.createElement("th");
    th8.innerHTML = "";
    tr1.append(th1,th2,th3,th4,th5,th6,th7,th8);
    table.append(tr1);
    let n = data.length;
    for(let i=0; i<n; i++){
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerHTML = data[i].name;
        let td2= document.createElement("td");
        td2.innerHTML = (data[i].job_title) ? data[i].job_title: "- -";
        let td3 = document.createElement("td");
        td3.innerHTML = (data[i].company_id) ? data[i].company_id: "- -";
        let td4 = document.createElement("td");
        td4.innerHTML = (data[i].email) ? data[i].email: "- -";
        let td5 = document.createElement("td");
        td5.innerHTML = (data[i].phone) ? data[i].phone: "- -";
        let td6 = document.createElement("td");
        td6.innerHTML = (data[i].facebook_id) ? data[i].facebook_id: "- -";
        let td7 = document.createElement("td");
        td7.innerHTML = (data[i].twitter_id) ? data[i].twitter_id: "- -";
        let td8 = document.createElement("td");
        let btn1 = document.createElement("button");
        btn1.innerHTML="Edit";
        btn1.className = "btn btn-block bg-primary";
        let btn2 = document.createElement("button");
        btn2.innerHTML = "Delete";
        btn2.className = "btn btn-block bg-danger";
        
        btn1.setAttribute("data-bs-toggle","modal");
        btn1.setAttribute("href","#update_contact_modal");
        btn1.addEventListener("click",()=>{
            updateContact(data[i]);
        });
        btn2.addEventListener("click", ()=>{delete_contact(data[i].id)});
        td8.append(btn1,btn2);
        tr.append(td1, td2, td3, td4, td5, td6, td7, td8);
        table.append(tr);
    }
    div.append(table);
    document.getElementById("main").style = "background-color: rgb(247, 247, 248)"
    document.getElementById("main").append(div);

}

function delete_contact(id){
    var url = "https://newaccount1613462048966.freshdesk.com//api/v2/contacts/"+id;
    xhr.open("DELETE", url);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", auth);

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        alert("Contact deleted");
        contacts();
    }};
    
    xhr.send();
}
var data_id = ""
function updateContact(data){
    
   document.getElementById("ufullname").value = data.name;
   document.getElementById("utitle").value = data.job_title;
   document.getElementById("uemail0").value = data.email;
   document.getElementById("uabout").value = data.description;
   document.getElementById("uaddress").value = data.address;
   document.getElementById("ulang").value = data.language;
   data_id = data.id;

}
function update_Contact(){
    let name = document.getElementById("ufullname").value;
    let title = document.getElementById("utitle").value;
   let email =document.getElementById("uemail0").value;
    let about = document.getElementById("uabout").value;
    let address = document.getElementById("uaddress").value;
   let lang = document.getElementById("ulang").value ;

   var url = "https://newaccount1613462048966.freshdesk.com///api/v2/contacts/"+data_id;
    xhr.open("PUT", url);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", auth);

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
        contacts();
    }};
   
    var data = JSON.stringify({ "name": name, "email": email,"address": address, "language": lang,  "job_title": title, "description": about});
    
    xhr.send(data);

}


let pri_list = ["","Low","medium","High","Urgent"];
let sta_list = ["","","Open","Pending","Resolved","Closed"];

function listTickets(data){
   
    let n = data.length;
    let div = document.createElement("div");
    div.className = "container";
    document.getElementById("main").style = "background-color:rgb(202, 202, 238)"
    let row = document.createElement("div");
    row.className = "row";
    for(let i=0; i<n; i++){
        var url = 'https://newaccount1613462048966.freshdesk.com/api/v2/contacts/'+data[i].requester_id;

        xhr.open("GET", url,false);

        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", auth);
        
        xhr.send();
        let profile =  JSON.parse(xhr.responseText);
        
        let col = document.createElement("div");
        col.className = "col-12 bg-light p-3 m-2";
        col.style = "display:flex; flex-direction:row; justify-content:start; border-radius: 5px; align-items:center";
        let p = document.createElement("p");
        p.className = "text-secondary px-3 py-2";
        p.innerHTML = profile.name[0].toUpperCase();
        p.style = "background-color: pink; border-radius:5px; font-size: 20px; margin-right: 10px";
        let div1 = document.createElement("div");
        
        let badge = document.createElement("span");
    
        if(data[i].fr_escalated){
            badge.innerHTML = "First response due";
            badge.className = "badge bg-danger mb-1"
        }
        else{
            badge.innerHTML = "New";
            badge.className = "badge bg-success mb-1"
        }
        let subject = document.createElement("h6");
        subject.innerHTML = data[i].subject+ " #"+data[i].id
        let det = document.createElement("p");
        let d1 = new Date(data[i].created_at);
        let d2 = new Date();
        let create_time = get_time(d2-d1);
        let due_time="";
        if(data[i].fr_escalated){
            due_time = "Due in "+get_time(new Date(data[i].due_by)-new Date())+" ago";
        }
        else{
            due_time = "First response due in "+get_time(new Date(data[i].fr_due_by)-new Date())+" ago";
        }
        det.style = "font-size: 13px"
        det.innerHTML = profile.name+" - Created "+create_time+" ago"+"  -  ".bold()+ due_time;
        div1.append(badge, subject, det);
        let div2 = document.createElement("div");
        div2.style = "margin-right:10px; margin-left:auto"
        let pri = document.createElement("P");
        pri.className="text-danger";
        pri.innerHTML = "Priority : "+ pri_list[parseInt( data[i].priority)];
        let status = document.createElement("p");
        status.className="text-success";
        status.innerHTML = "Status : "+sta_list[parseInt( data[i].status)];
        div2.append(pri,status)
        col.append(p,div1,div2);
        row.append(col);
                
            

    }
    
    
    div.append(row);
    document.getElementById("main").append(div);
}





function addCc(){
    let div = document.createElement("div");
    div.className = "mb-3";
    div.id = "Hide_Cc";
    div.style = "clear:both";
    let label = document.createElement("label");
    label.for = "cc_email";
    label.className = "form-label";
    label.innerHTML = "Cc";
    let input = document.createElement("input");
    input.type = "text";
    input.className = "form-control multiple-input";
    input.id = "cc_email";
    let a = document.createElement("a");
    a.className = "form-text text-primary";
    a.style="float:right";
    a.innerHTML = "Hide Cc";
    a.addEventListener("click",hideCc);

    div.append(label,input,a);
    document.getElementById("addCcButton").style = "display: none";
    document.getElementById("create_ticket").insertBefore(div, document.getElementById("pass"))
}

function hideCc(){
    document.getElementById("addCcButton").style = "display: block; float: right";
    document.getElementById("Hide_Cc").remove();
}

function createTicket(){
    
    let contact = document.getElementById("InputEmail").value;
    let subject = document.getElementById("subject").value;
    let type = document.getElementById("type").value;
    let source = document.getElementById("source").value;
    let status = document.getElementById("status").value;
    let priority = document.getElementById("priority").value;
    
    let desc = document.getElementById("desc").value;
    var url = "https://newaccount1613462048966.freshdesk.com/api/v2/tickets";
    xhr.open("POST", url);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", auth);

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
    }};

    var data = JSON.stringify({ "description": desc, "subject": subject,"type": type, "source": parseInt(source),  "email": contact, "priority": parseInt(priority), "status": parseInt(status), "cc_emails": ["ram@freshdesk.com","diana@freshdesk.com"] });
    
    xhr.send(data);

}

{/* <div class="input-group">
<div class="input-group-text">
<input id="radio0" class="form-check-input mt-0" type="radio" checked="true" aria-label="Radio button for following text input">
</div>
<input type="text" id="email0" class="form-control" aria-label="Text input with radio button">
</div>
<a id = "addEmail" class="form-text text-secondary" onclick="addEmail()" style="float: right;">Add another email</a> */}

function addEmail(){
    other_emails +=1
    let div = document.createElement("div");
    div.className="input-group";
    let div1 = document.createElement("div");
    div1.className="input-group-text";
    let radio = document.createElement("input");
    radio.className = "form-check-input mt-0";
    radio.id = "radio"+other_emails;
    radio.type = "radio";
    radio.name = "primary";
    div1.append(radio);
    let text = document.createElement("input");
    text.type = "text";
    text.id = "email"+other_emails;
    text.className = "form-control";
    div.append(div1,text);
    let a = document.createElement("a");
    a.style = "float:right;"
    a.innerHTML="Add another email";
    a.className = "form-text text-primary"
    a.addEventListener("click",addEmail);
    document.getElementById("emails").append(div,a);
}

function createContact(){
    let name = document.getElementById("fullname").value;
    let title = document.getElementById("title").value;
    let email = document.getElementById("email0").value;
    let company = document.getElementById("company").value;
    let address = document.getElementById("address").value;
    let lang = document.getElementById("lang").value;
    let about = document.getElementById("about");
    var url = "https://newaccount1613462048966.freshdesk.com//api/v2/contacts";
    xhr.open("POST", url);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", auth);

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
    }};
    console.log(name);
    var data = JSON.stringify({ "name": name, "email": email,"address": address, "language": lang,  "job_title": title, "description": about});
    
    xhr.send(data);
}
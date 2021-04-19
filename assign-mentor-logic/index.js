const express = require('express');

const app = express();

app.use(express.json());


let student_list = [];  // students list to store students details
let student_count = 101; // ID to be assigned to students starting from 101
let mentor_list = [];  // mentor list to store mentor details
let mentor_count = 1; // ID to be assigned to mentors starting from 1


// api to create student
app.post("/createStudent",(req,res)=>{

    let data = req.body;
    data["id"] = student_count;
    data["assigned_mentor_id"] = "";
    student_list.push(data);
    student_count += 1;
    
    res.send("student created");

});

// api to create mentor
app.post("/createMentor",(req,res)=>{

    let data = req.body;
    data["id"] = mentor_count;
    data["assigned_students"] = [];
    mentor_list.push(data);
    mentor_count += 1;
   
    res.send("Mentor created");

});

// api to assign multiple students to a mentor
app.put("/assignMentor/:sid/:mid",(req,res)=>{

    let sid = req.params.sid;
    let mid = req.params.mid;
    mentor_list.map((mentor)=>{
        if(mentor["id"] == mid){
            mentor["assigned_students"].push(+sid);
        }
    });
    student_list.map((student)=>{
        if(student["id"]==sid){
            student["assigned_mentor_id"] = mid ;
        }
    });

    res.send("mentor assigned");

})

//api to assign mentor to particular student
app.put("/assignStudent/:id",(req,res)=>{
    
    let list = req.body.students;
    let id = req.params.id;
    mentor_list.map((mentor)=>{
        if(mentor["id"] == id){
            mentor["assigned_students"].push(...list);
        }
    });
    student_list.map((student)=>{
        if(list.includes(student.id)){
            student["assigned_mentor_id"] = id ;
        }
    });

    res.send("Students Assigned to mentor");

});

// api to display all students assigned to a particular mentor
app.get("/showStudents/:id",(req,res)=>{
    let id = req.params.id;
    let students;
    mentor_list.map((mentor)=>{
        if(mentor.id == id){
            students =  mentor["assigned_students"];
        }
    });

    let details = [];
    student_list.map((student)=>{
        if(students.includes(student.id)){
            details.push(student);
        }
    });
    res.send(details);
});


app.listen( process.env.PORT || 3000,()=>{
    console.log("Server running");
});


const express = require("express");
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
const dburl = process.env.DB_URL;
let env  = require('dotenv');
env.config();


// api to create student
app.post("/create_student",async(req,res)=>{
    let Info;
    try{
        
        Info = await mongoClient.connect(dburl);
        let db = Info.db("studentMentor");
        let data = req.body;
        data["assigned_mentor_id"] = "";
        await db.collection("studentInfo").insertOne(data);
        res.status(200).json({message : "Student created"});
    }
    catch(error){
        console.log(error);
    }
    
    Info.close()
})

// api to create mentor
app.post("/create_mentor",async(req,res)=>{
    let Info;
    try{
        
        Info = await mongoClient.connect(dburl);
        let db = Info.db("studentMentor");
        let data = req.body;
        data["students_assigned"] = [];
        await db.collection("mentorInfo").insertOne(data);
        res.status(200).json({message : "Mentor created"});
    }
    catch(error){
        console.log(error);
    }
    
    Info.close()
})


// api to show all created students
app.get("/showStudents",async(req,res)=>{
    let Info;
    try{
        Info = await mongoClient.connect(dburl);
        let db = Info.db("studentMentor");
        let data = await db.collection("studentInfo").find().toArray();
        res.status(200).send(data);
    }catch(error){
        console.log(error);
    }
    Info.close();
})

//api to display all created mentors
app.get("/showMentor",async(req,res)=>{
    let Info;
    try{
        Info = await mongoClient.connect(dburl);
        let db = Info.db("studentMentor");
        let data = await db.collection("mentorInfo").find().toArray();
        res.status(200).send(data);
    }catch(error){
        console.log(error);
    }
    Info.close();
})

//api to assign multiple students to a mentor
app.put("/assignStudents/:id",async(req,res)=>{
    let Info;
    try{
        let id = req.params.id;
        let arr = req.body.students;
        Info = await mongoClient.connect(dburl);
        let db = Info.db("studentMentor");
        await db.collection("mentorInfo").findOneAndUpdate({_id : mongodb.ObjectID(id)},{$push : {students_assigned : {$each : arr} }})
        let a = arr.map((id)=>{   
            return mongodb.ObjectID(id);
        })
        
        await db.collection("studentInfo").updateMany({_id :{$in : a}},{$set : {assigned_mentor_id : id}});
        
        res.status(200).send("Students Assigned");
    }catch(error){
        console.log(error);
    }
    Info.close();
})

//api to assign mentor to a particular student
app.put("/assignMentor/:mid/:sid",async(req,res)=> {
    let mid = req.params.mid;
    let sid = req.params.sid;
    let info;
    try{
        info = await mongoClient.connect(dburl);
        let db = info.db("studentMentor");
        await db.collection("studentInfo").findOneAndUpdate({_id : mongodb.ObjectID(sid)},{$set: {assigned_mentor_id : mid}});
        await db.collection("mentorInfo").findOneAndUpdate({_id : mongodb.ObjectID(mid)}, {$push : {students_assigned : sid} });
        res.status(200).send("mentor assigned");
    }
    catch(error){
        console.log(error);
    }
    info.close();
})

app.listen(port,()=>{
    console.log("server is running with port: ",port);
  })
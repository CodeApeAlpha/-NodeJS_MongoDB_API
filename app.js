const express=require("express");
const app=express();
const {mongoose}=require("mongoose");
const {Person} =require("./model");
const bodyParser = require('body-parser');

// Configure
mongoose.connect("mongodb://localhost:27017/Contact").catch(error => console.log(error))
app.use(bodyParser.json());


app.listen(3000,()=>{
    console.log("App Listening To Port 3000");
});
     
// Get  All Person
app.get("/person",(req, res)=>{
    Person.find().then(results=>{
        res.status(200).json({person:results});
    }).catch((err)=>{
        res.status(500).json({err:err})
    })
});

// Get Person by ID
app.get("/person/:id",(req, res)=>{
    Person.findById(req.params.id)
    .then(results=>{
        res.status(200).json({person:results});
    }).catch((err)=>{
        res.status(500).json({err:err})
    });
});

// Delete Person By ID
app.delete("/person/:id",(req,res)=>{
    Person.deleteOne({_id:req.params.id})
    .then(results=>{
        res.status(200).json({person:results});
    }).catch((err)=>{
        res.status(500).json({err:err})
    });
});


// Post Request
app.post("/person",(req,res)=>{
    Person.create({
        contact:req.body.contact,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        gender:req.body.gender,
        app:req.body.app
    }).then((result)=>{
        res.status(201).json(result);
    }).catch((err)=>{
        res.status(500).json(err);
    })
});

// Update
app.put("/person",(req,res)=>{
    Person.findByIdAndUpdate(req.body.id,  {
        contact:req.body.contact,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        email:req.body.email,
        gender:req.body.gender,
        app:req.body.app
    },
    {new: true}
    ,(err,result)=>{
        if (err){
            res.status(500).json(err);
        }
        else{
            console.log("Updated User : ", result);
            res.status(201).json(result);
        }
    });
    
});
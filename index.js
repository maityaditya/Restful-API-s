const express=require("express");
const app=express();
const port=8080;
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override');
app.use(methodOverride('_method'));


app.listen(port,()=>{
    console.log(`Listening to the port ${port}`);
})

let posts=[
    {
        username:"@delta",
        content:"I love coding.",
        id:uuidv4()
    },
    {
        username:"@apnacollege",
        content:"Love,live and laugh.",
        id:uuidv4()
    },
    {
        username:"@aditya",
        content:"Consistency is important to achieve success.",
        id:uuidv4()
    }
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{
    res.render("form.ejs");
})

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({username,content,id});
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>
        id===p.id
    );
    res.render("show.ejs",{post});
})

app.get("/posts/:id/new",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>
        id===p.id
    );
    res.render("update.ejs",{post});
})

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>
        id===p.id
    );
    let content=req.body.content;
    post.content=content;
    res.redirect("/posts");
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>
        id!=p.id
    );
    res.redirect("/posts");
})
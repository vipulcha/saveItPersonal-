const express = require('express');
const { PostModel } = require('./db.js');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000 | process.env.PORT;
const cors = require('cors')
import('./db.js');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req,res)=>{
    res.send("Hello Bhai!");
})


app.get('/getPosts', async (req,res) => {
    try{
        const posts = await PostModel.find();
        res.json(posts ? posts : []);
    } catch(error) {
        console.log(error);
        res.send("Error");
    }
})

app.post('/addPosts', async (req,res) => {
    console.log(req.body);
    try{
        const dataInput = req.body.data;
        const doc = new PostModel({
            data: dataInput,
        });
        doc.save();
        res.send("Succefully Added!");
    } catch(error){
        console.log(error);
        res.send("Error");
    }
})

app.delete('/deletePosts/:id', async (req,res) => {
    try{
        const idToDelete = req.params.id;
        
        await PostModel.findByIdAndDelete(idToDelete);
        res.send("Posts deleted Successfully");
    } catch(error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

app.listen(PORT,()=>{
    console.log("Server Running Succesfully!");
})
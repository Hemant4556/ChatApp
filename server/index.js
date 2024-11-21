const express =require("express");
const mongoose =require("mongoose");
const userRoute=require("./Routes/userRoute");


const cors =require("cors");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use("/api/users",userRoute);
app.get("/",(req,res)=>{
    res.send("Hello World");
})
const port = process.env.PORT || 1200;
const uri = process.env.ATLAS_URI;
app.listen(port,(req,res)=>{
    console.log(`Serevr is running on port...: ${port}`);
})
mongoose.connect(uri).then(() => {
    console.log("mongoDB connection established");
}).catch((error) => {
    console.log("mongoDB connection failed: ", error.message);
});
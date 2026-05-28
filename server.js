
const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const dotenv=require("dotenv");

dotenv.config();

const app=express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

app.use(require("./routes/authRoutes"));
app.use(require("./routes/taskRoutes"));

app.listen(5000,()=>{
console.log("Server Running On Port 5000");
});

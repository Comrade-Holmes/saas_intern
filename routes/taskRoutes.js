
const router=require("express").Router();
const Task=require("../models/Task");
const auth=require("../middleware/authMiddleware");

router.post("/tasks",auth,async(req,res)=>{

const task=new Task({
title:req.body.title,
description:req.body.description,
userId:req.user.id
});

await task.save();

res.json({
message:"Task Added"
});

});

router.get("/tasks",auth,async(req,res)=>{

const tasks=await Task.find({
userId:req.user.id
});

res.json(tasks);

});

router.put("/tasks/:id",auth,async(req,res)=>{

await Task.findByIdAndUpdate(
req.params.id,
req.body
);

res.json({
message:"Task Updated"
});

});

router.delete("/tasks/:id",auth,async(req,res)=>{

await Task.findByIdAndDelete(
req.params.id
);

res.json({
message:"Task Deleted"
});

});

module.exports=router;

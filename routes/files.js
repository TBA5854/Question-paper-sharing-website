const router =require('express');
const multer =require('multer');
const path =require('path');
const File =require('../models/file')
const{v4:uuid4}=require('uuid');

let storage=multer.diskStorage({
    destination:(req,file,cb)=>cb(null,'uploads/'),
    filename:(req,file,cb)=>{
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
              cb(null, uniqueName)
    }
})
let upload =multer({
    storage:storage,
    limit:{fileSize:1000000*100},
}).single('');
router.post('/',(req,res)=>{
    if(!req.file){
        return res.json("please give the file.")
    }
    upload(req ,res,(err)=>{
        if(err){
            return res.status(500).send({error: err.message})
        }
        const file =new File({
            filename:req.file.filename,
            uuid:uuid4(),
            path:req.file.path,
            size:req.file.size
        });
        const response =  file.save();
        return res.json({file:`http://localhost:3000/files/${response.uuid}`})
    });
})
module.exports =router;
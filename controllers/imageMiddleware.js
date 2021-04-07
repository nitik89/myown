const multer=require('multer');
const path=require('path');
const storage= multer.diskStorage({

    destination:function(req,res,cb){
        cb(null,'./public')
    },
    filename:function(req,file,cb){
        console.log(file);
        cb(null,Date.now() + path.extname(file.originalname))
    }
})

const filterFilter=(req,file,cb)=>{
    cb(null,true)
}
let upload=multer({
    storage:storage,
    fileFilter:filterFilter
})
module.exports=upload.single('image');
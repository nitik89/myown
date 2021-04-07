const fs=require('fs')

module.exports=(req,res,next)=>{
    console.log(req.body);
    if(typeof(req.files)==="undefined"||typeof(req.body)==='undefined'){
        return res.status(400).json({
            errors:"Problem with sending data"
        })
    }
    console.log(req.file);
    let image=req.file.path;

    if(!(req.file.mimetype).includes('jpeg') && !(req.file.mimetype).includes('png') &&!(req.file.mimetype).includes('jpg')){
        fs.unlinkSync(image);
        return res.status(400).json({error:"Files not supported"})
    }
    if(req.file.size>1024*1024){
        fs.unlinkSync(image);
        return res.status(400).json({error:"File too large"});
    }
    if(!image){
        return res.status(400).json({error:"All fields are required"})
    }
    next();

}
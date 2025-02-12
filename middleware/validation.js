const validation = (Shema)=>{
return (req,res , next)=>
    {
    let {error} = Shema.validate(req.body);
    if(error){
    
         res.status(400).json({message : 'Invalid data', error});
    }else{
        next();
    }

    }

}

export default validation;
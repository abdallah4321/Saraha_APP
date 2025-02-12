import massageModel from "../../db/model/massage.model.js"


const addMessage = async (req,res)=> {
    let {id} = req.params ;
    let {title , massageContent} = req.body ;
    let addMessage =await massageModel.insertMany({title , massageContent , receivedId:id})

res.status(201).json({message : " Added message " , addMessage })
}

const allMeassage = async (req,res)=>{

let messages = await massageModel.find({receivedId : req.user.id}).populate("receivedId")

res.status(200).json({messages : " welcome " , messages})
}

const getSingleMessage = async (req,res)=>{

    let {id} = req.params ;
    let singleMessage = await massageModel.findById(id).populate("receivedId")
    res.status(200).json({message : " welcome " , singleMessage})

}


export {
    addMessage ,
    allMeassage,
    getSingleMessage
}
import Joi from "joi";

const signUpSchema = Joi.object({
    username:Joi.string().min(3).max(15).required() ,
    email: Joi.string().email().required(),
    password: Joi.string().required() ,
    confirmPassword: Joi.string().required() ,
    phone : Joi.string().min(10).max(15).required(),
    role: Joi.string().valid("admin", "user").required()

})

const signinSchema = Joi.object({  
    email: Joi.string().email({tlds:{allow : ['net' , 'com']} }).required(),
    password: Joi.string().required() ,
        })

    export {signUpSchema,signinSchema}  
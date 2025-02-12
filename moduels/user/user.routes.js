import  Express  from "express";
import  {signUp, signIn, getAllUsers} from "./user.controller.js";

import validation from "../../middleware/validation.js";
import { signinSchema, signUpSchema } from "./user.validation.js";
import  {auth}  from "../../middleware/auth.js";
const UserRoutes = Express.Router();



UserRoutes.post("/user/signUp" ,validation(signUpSchema) , signUp)
UserRoutes.post("/user/signin" ,validation(signinSchema) ,signIn )
UserRoutes.get("/getAlluser" ,auth ,getAllUsers)
 




export default UserRoutes ;  
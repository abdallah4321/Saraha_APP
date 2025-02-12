import express from 'express' ;
import { addMessage, allMeassage, getSingleMessage } from './message.controllers.js';
import { auth } from '../../middleware/auth.js';

const MessageRoutes = express.Router()


MessageRoutes.post("/message/:id" , addMessage)
MessageRoutes.get("/messages/:id" ,auth,allMeassage )
MessageRoutes.get("/message/:id" , getSingleMessage )




export default MessageRoutes
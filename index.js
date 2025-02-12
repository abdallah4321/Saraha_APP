import 'dotenv/config'
import express from "express";
import cors from "cors";
import { connection } from "./db/connection.js";
import UserRoutes from "./moduels/user/user.routes.js";
import MessageRoutes from "./moduels/message/message.routes.js";
import {auth} from "./middleware/auth.js";

const app = express()
app.use(express.json())
const port = process.env.PORT || 5000 
connection();
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization"
}));

app.use(UserRoutes); 
app.use(MessageRoutes);
app.get('/', (req, res) => res.send('server is run !'));
app.get('/api/protected', auth, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`)) ;
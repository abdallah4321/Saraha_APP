import userModel from "../../db/model/user.model.js";
import  { generateToken, comparePassword } from "../../middleware/auth.js"

// Sign Up (Register) a new user
const signUp = async (req, res) => {
    try {
        const { email, password , confirmPassword } = req.body;
        console.log('password',password)
        // Check if the email is already registered
        const foundedEmail = await userModel.findOne({ email });
        if (foundedEmail) {
            return res.status(409).json({ message: "Email already registered" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

    
        // Create a new user
        const newUser = await userModel.create({ 
            email,
            password: req.body.password,
            role: "user",  // Default role is 'user',
            username: req.body.username,
            phone: req.body.phone

        });

        // Generate a JWT token
        const token = generateToken(newUser);

        // Send response
        res.status(201).json({ message: "User registered successfully", user: newUser, token });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: "Error during registration", error: err.message });
    }
};

// Sign In (Login) user
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Email not found, please register" });
        }

        console.log('user',user.password);
        console.log('password',password)

        // Compare the password
        const isPasswordValid = await comparePassword(password, user.password);
        console.log('isPasswordValid',isPasswordValid)

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate a JWT token
        const token = generateToken(user);

        // Send response
        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        res.status(400).json({ message: "Error during login", error: err.message });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        console.log("req",req.user)
        const users = await userModel.find();
        res.status(200).json({ message: "Users retrieved successfully", users });
    } catch (err) {
        res.status(400).json({ message: "Error retrieving users", error: err.message });
    }
};

export { signUp, signIn, getAllUsers };
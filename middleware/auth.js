// middleware/auth.js
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Secret key for JWT
const JWT_SECRET = 'your_secret_key';

// Middleware to verify JWT token
const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log(token);
    if (!token) {
        console.log('token', token);
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Function to generate JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
};

// Function to hash password
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    let hash =  await bcrypt.hash(password,salt);
    return hash;
};


// Function to compare password
const comparePassword = async (password, hashedPassword) => {
   
 return  await bcrypt.compare(password, hashedPassword);

};

export  { 
    auth, 
    generateToken,
     hashPassword,
      comparePassword
     };
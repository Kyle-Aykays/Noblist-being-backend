// const bcrypt = require('bcrypt');
// const UserModel = require('../Models/User');
// const jwt = require('jsonwebtoken');

// const signup = async (req, res) =>{
//     try{
//         const { name, email, password} = req.body;
//         const user = await UserModel.findOne({ email })
//         if(user){
//             return res.status(409).json({ message: 'User is already exist, you can login', success: false });
//         }
//         const newUser = new UserModel({name, email, password});
//         newUser.password = await bcrypt.hash(password, 10);
//         await newUser.save();
//         res.status(201).json({
//             message: "Signup Successfully",
//             success: true
//         })
//     } catch (err) {
//         res.status(500).json({
//             message: "Internal Server Error "+ err,
//             success: false
//         })
//     }
// }

// const login = async (req, res) =>{
//     try{
//         const { email, password} = req.body;
//         const user = await UserModel.findOne({ email });
//         const errorMsg = "Auth failed email or password is wrong";
//         if( !user){
//             return res.status(403)
//             .json({ message: errorMsg, success: false });
//         }
//         const isPassEqual = await bcrypt.compare(password, user.password);
//         if(!isPassEqual){
//             return res.status(403)
//             .json({ message: errorMsg, success: false });
//         }
//         const jwtToken = jwt.sign(
//             {email: user.email, _id: user._id},
//             process.env.JWT_SECRET,
//             {expiresIn: '24h'}
//         )
//         res.status(200)
//         .json({
//             message: "Login Success",
//             success: true,
//             jwtToken,
//             email,
//             name: user.name
//         })
//     } catch (err) {
//         res.status(500).json({
//             message: "Internal Server Error" + err,
//             success: false
//         })
//     }
// }
// module.exports= {
//     signup,
//     login
// }

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User');

// Utility function to hash passwords
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

// Signup Controller
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Normalize email to lowercase
        const normalizedEmail = email.toLowerCase();

        // Check if the user already exists
        const existingUser = await UserModel.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists. Please login.',
                success: false,
            });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create a new user
        const newUser = new UserModel({
            name,
            email: normalizedEmail,
            password: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({
            message: 'Signup successful!',
            success: true,
        });
    } catch (err) {
        console.error('Signup Error:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
};

// Login Controller
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Normalize email to lowercase
        const normalizedEmail = email.toLowerCase();

        // Check if the user exists
        const user = await UserModel.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(403).json({
                message: 'Auth failed: Invalid email or password.',
                success: false,
            });
        }

        // Verify the password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).json({
                message: 'Auth failed: Invalid email or password.',
                success: false,
            });
        }

        // Generate a JWT
        const jwtToken = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: 'Login successful!',
            success: true,
            jwtToken,
            user: {
                email: user.email,
                name: user.name,
            },
        });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
};

module.exports = {
    signup,
    login,
};

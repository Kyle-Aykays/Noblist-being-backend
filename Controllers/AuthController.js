
const Checklist = require('../Models/Checklist');
const predefinedChecklists = require('../utils/checklistTemplates');
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
            password: password,
        });

        // Save the user to the database
        await newUser.save();

       // Create predefined checklists for the new user
       for (const checklistTemplate of predefinedChecklists) {
        const newChecklist = new Checklist({
            user: newUser._id,
            checklistType: checklistTemplate.checklistType,
            items: checklistTemplate.items,
        });
        await newChecklist.save();
    }

    res.status(201).json({
        message: 'Signup successful and checklists created',
        success: true,
        user: { id: newUser._id, email: newUser.email, name: newUser.name },
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
        console.log("working1 ")
        // Verify the password
        const isPasswordCorrect = await password == user.password;
        if (!isPasswordCorrect) {
            return res.status(403).json({
                message: 'Auth failed: Invalid email or password.',
                success: false,
            });
        }
        console.log("working2 ")

        // Generate a JWT
        const jwtToken = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: "Login successful!",
            success: true,
            user: {
                _id: user._id, // Include MongoDB ID in the response
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

const User = require('../Models/User');

const getUserProfile = async (req,res)=>{
    try{
        const { _id } = req.body; // Expecting _id in the request body
        if (!_id) {
            return res.status(400).json({
                message: 'User ID is required',
                success: false,
            });
        }
        const user = await User.findById(_id).select('-password')
        if(!user){
            return res.status(404).json({
                message: 'User not found', 
                success: false,
            })
            
        }
        res.status(200).json({
            message: "User profile retrieved successfully",
            success: true, 
            data: user,
        });
    }catch(err){
        console.error('Error fetching user profile ',err )
        res.status(500).json({
            message: "Internal Server Error", 
            success: false,
        })
    }
}; 



const updateUserProfile = async (req, res) => {
    try {
        const { _id, updates } = req.body; // Expecting _id in the request body

        if (!_id || !updates) {
            return res.status(400).json({
                message: 'User ID and updates are required',
                success: false,
            });
        }

        const allowedUpdates = ['name', 'goals', 'values', 'mission', 'vision', 'weight','BMI', 'calories','gender','height'];
        const isValidUpdate = Object.keys(updates).every((key) => allowedUpdates.includes(key));
        if (!isValidUpdate) {
            return res.status(400).json({
                message: 'Invalid updates',
                success: false,
            });
        }

        const user = await User.findByIdAndUpdate(
            _id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false,
            });
        }

        res.status(200).json({
            message: "User profile updated successfully",
            success: true,
            data: user,
        });
    } catch (err) {
        console.error('Error updating user profile', err);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};


module.exports = {
    getUserProfile,
    updateUserProfile,
};